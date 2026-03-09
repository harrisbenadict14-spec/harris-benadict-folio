import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, Float } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

/* ── GPU Instanced Orbiting Particles ─────────────────────── */
const OrbitingParticles = ({ count = 28 }: { count?: number }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Pre-compute all random params once → stable across renders
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
const RingParticles = ({ count = 60 }: { count?: number }) => {
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

/* ── Main Wireframe Icosahedron ───────────────────────────── */
const MainShape = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);
  const { pointer } = useThree();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // outer wireframe
    meshRef.current.rotation.y = t * 0.12;
    meshRef.current.rotation.x = Math.sin(t * 0.08) * 0.15;
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      pointer.x * 0.3,
      0.04
    );
    meshRef.current.rotation.x += THREE.MathUtils.lerp(0, -pointer.y * 0.2, 0.04);

    // inner counter-rotating shape
    innerRef.current.rotation.y = -t * 0.08;
    innerRef.current.rotation.x = Math.cos(t * 0.06) * 0.1;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <group>
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

/* ── Scene ────────────────────────────────────────────────── */
const Scene = () => (
  <>
    <ambientLight intensity={0.15} />
    <pointLight position={[5, 5, 5]} intensity={0.3} color="#ffffff" />
    <pointLight position={[-4, -3, 3]} intensity={0.15} color="#8090ff" />
    <pointLight position={[0, 3, -2]} intensity={0.1} color="#aaaaff" />

    <MainShape />
    <OrbitingParticles count={28} />
    <RingParticles count={60} />

    <AdaptiveDpr pixelated />
  </>
);

/* ── Exported Component ───────────────────────────────────── */
const HeroScene = () => (
  <div
    className="mx-auto"
    aria-hidden="true"
    style={{
      width: "min(90vw, 560px)",
      height: "min(90vw, 560px)",
      WebkitMaskImage:
        "radial-gradient(ellipse 50% 50% at 50% 50%, black 20%, transparent 70%)",
      maskImage:
        "radial-gradient(ellipse 50% 50% at 50% 50%, black 20%, transparent 70%)",
    }}
  >
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 42 }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <Scene />
    </Canvas>
  </div>
);

export default HeroScene;
