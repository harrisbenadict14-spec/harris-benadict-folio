import { useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";
import NameFormation from "./NameFormation";
import UniverseEffect from "./UniverseEffect";

/* ── GPU Instanced Orbiting Particles ─────────────────────── */
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
const isLowEnd = typeof window !== 'undefined' && navigator.hardwareConcurrency <= 4;

const OrbitingParticles = ({ count = isMobile ? 8 : isLowEnd ? 14 : 20 }: { count?: number }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const params = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        angle: (i / count) * Math.PI * 2,
        radius: 1.8 + (((i * 7 + 3) % 11) / 11) * 1.2,
        speed: 0.15 + (((i * 13 + 5) % 17) / 17) * 0.25,
        yOffset: (((i * 11 + 7) % 13) / 13 - 0.5) * 2.0,
        scale: 0.02 + (((i * 3 + 1) % 9) / 9) * 0.04,
      })),
    [count]
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    params.forEach((p, i) => {
      const phase = t * p.speed + p.angle;
      dummy.position.set(
        Math.cos(phase) * p.radius,
        Math.sin(phase * 1.3) * 0.6 + p.yOffset,
        Math.sin(phase) * p.radius
      );
      dummy.scale.setScalar(p.scale * (1 + Math.sin(t * 2 + i) * 0.3));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
    </instancedMesh>
  );
};

/* ── Floating Ring Particles (secondary layer) ────────────── */
const RingParticles = ({ count = isMobile ? 15 : isLowEnd ? 25 : 35 }: { count?: number }) => {
  const ref = useRef<THREE.Points>(null!);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + ((i * 7) % 11) * 0.1;
      const r = 2.5 + ((i * 3) % 7) / 7 * 1.2;
      pos[i * 3]     = Math.cos(angle) * r;
      pos[i * 3 + 1] = (((i * 11) % 13) / 13 - 0.5) * 1.0;
      pos[i * 3 + 2] = Math.sin(angle) * r;
      sz[i] = 1.0 + ((i * 5) % 9) / 9 * 2.0;
    }
    return [pos, sz];
  }, [count]);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.03;
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.05) * 0.1;
  });

  const shaderMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: /* glsl */ `
          attribute float aSize;
          uniform float uTime;
          varying float vAlpha;
          void main() {
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            float pulse = 0.7 + 0.3 * sin(uTime * 1.5 + position.x * 3.0);
            gl_PointSize = aSize * pulse * (200.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
            vAlpha = pulse * 0.35;
          }
        `,
        fragmentShader: /* glsl */ `
          varying float vAlpha;
          void main() {
            float d = length(gl_PointCoord - 0.5) * 2.0;
            float a = (1.0 - smoothstep(0.0, 1.0, d)) * vAlpha;
            gl_FragColor = vec4(0.7, 0.8, 1.0, a);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  useFrame(({ clock }) => {
    shaderMat.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
      </bufferGeometry>
      <primitive object={shaderMat} attach="material" />
    </points>
  );
};

/* ── Mouse-reactive Main Shape ───────────────────────────── */
const MainShape = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const { pointer } = useThree();

  // Smooth mouse tracking for rotation only
  const mouseSmooth = useRef({ x: 0, y: 0 });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Smooth interpolation toward pointer
    mouseSmooth.current.x += (pointer.x - mouseSmooth.current.x) * 0.05;
    mouseSmooth.current.y += (pointer.y - mouseSmooth.current.y) * 0.05;

    // Group stays at origin — only rotates based on mouse direction
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouseSmooth.current.x * 0.4,
      0.08
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mouseSmooth.current.y * 0.3,
      0.08
    );

    // Outer wireframe slow auto-rotation + subtle mouse influence
    meshRef.current.rotation.y = t * 0.1 + mouseSmooth.current.x * 0.15;
    meshRef.current.rotation.x = Math.sin(t * 0.08) * 0.15 + mouseSmooth.current.y * 0.1;

    // Subtle scale pulse based on mouse movement speed
    const mouseSpeed = Math.abs(pointer.x - mouseSmooth.current.x) + Math.abs(pointer.y - mouseSmooth.current.y);
    const scalePulse = 1 + Math.min(mouseSpeed * 0.3, 0.08);
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, scalePulse, 0.1));

    // Inner counter-rotating shape
    innerRef.current.rotation.y = -t * 0.08 - mouseSmooth.current.x * 0.2;
    innerRef.current.rotation.x = Math.cos(t * 0.06) * 0.1 + mouseSmooth.current.y * 0.2;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef}>
        {/* Outer wireframe */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshStandardMaterial
            color="#e0e0e0"
            wireframe
            transparent
            opacity={0.25}
            emissive="#ffffff"
            emissiveIntensity={0.03}
          />
        </mesh>

        {/* Inner glowing core */}
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial
            color="#6070cc"
            wireframe
            transparent
            opacity={0.12}
            emissive="#6070cc"
            emissiveIntensity={0.08}
          />
        </mesh>

        {/* Center glow sphere */}
        <mesh>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.04} />
        </mesh>
      </group>
    </Float>
  );
};

/* ── Mouse-reactive Light ────────────────────────────────── */
const MouseLight = () => {
  const lightRef = useRef<THREE.PointLight>(null!);
  const { pointer } = useThree();

  useFrame(() => {
    // Light orbits subtly around center based on mouse, stays close
    lightRef.current.position.x = pointer.x * 2;
    lightRef.current.position.y = pointer.y * 2;
  });

  return <pointLight ref={lightRef} position={[0, 0, 3]} intensity={0.4} color="#aabbff" />;
};

/* ── Scene ────────────────────────────────────────────────── */
const Scene = () => {
  const [nameFormationActive, setNameFormationActive] = useState(false);
  const [formationProgress, setFormationProgress] = useState(0);
  const scrollProgress = useRef(0);
  const startTime = useRef(Date.now());

  // Track scroll progress and time to trigger name formation
  useFrame(() => {
    if (typeof window !== 'undefined') {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = Math.min(scrollY / maxScroll, 1);

      // Time-based trigger (starts after 3 seconds)
      const elapsedTime = (Date.now() - startTime.current) / 1000;
      const timeProgress = Math.min((elapsedTime - 3) / 4, 1); // 4 second transition

      scrollProgress.current = currentScroll;

      // Trigger name formation with either scroll OR time
      const shouldActivate = currentScroll > 0.1 || elapsedTime > 3;

      if (shouldActivate) {
        setNameFormationActive(true);
        // Use whichever progress is greater
        const scrollZoneProgress = currentScroll > 0.1 ? Math.min((currentScroll - 0.1) / 0.5, 1) : 0;
        const finalProgress = Math.max(scrollZoneProgress, timeProgress);
        setFormationProgress(finalProgress);
      } else {
        setNameFormationActive(false);
        setFormationProgress(0);
      }
    }
  });

  return (
    <>
      <UniverseEffect intensity={0.7} />
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} intensity={0.3} color="#ffffff" />
      <pointLight position={[-4, -3, 3]} intensity={0.15} color="#8090ff" />
      <pointLight position={[0, 3, -2]} intensity={0.1} color="#aaaaff" />
      <MouseLight />

      <MainShape />
      <OrbitingParticles count={28} />
      <RingParticles count={60} />

      {/* Name formation overlay */}
      <NameFormation 
        isActive={nameFormationActive} 
        progress={formationProgress} 
      />
    </>
  );
};

/* Exported Scene Component */
const HeroScene = () => (
  <>
    <Scene />
  </>
);

export default HeroScene;
