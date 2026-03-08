import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, Float } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const OrbitingParticle = ({ index, total }: { index: number; total: number }) => {
  const ref = useRef<THREE.Mesh>(null!);
  const angle = (index / total) * Math.PI * 2;
  const radius = 2.2 + Math.random() * 0.5;
  const speed = 0.3 + Math.random() * 0.2;
  const yOffset = (Math.random() - 0.5) * 1.5;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + angle;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 1.5) * 0.5 + yOffset;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
    </mesh>
  );
};

const MainShape = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { pointer } = useThree();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Auto-rotate
    meshRef.current.rotation.y = t * 0.15;
    meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    // Tilt toward cursor
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      pointer.x * 0.3,
      0.05
    );
    meshRef.current.rotation.x += THREE.MathUtils.lerp(
      0,
      -pointer.y * 0.2,
      0.05
    );
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color="#e0e0e0"
          wireframe
          transparent
          opacity={0.35}
          emissive="#ffffff"
          emissiveIntensity={0.05}
        />
      </mesh>
    </Float>
  );
};

const Scene = () => {
  const particles = useMemo(() => Array.from({ length: 10 }, (_, i) => i), []);

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-3, -3, 2]} intensity={0.3} color="#aaaaaa" />
      <MainShape />
      {particles.map((i) => (
        <OrbitingParticle key={i} index={i} total={particles.length} />
      ))}
      <AdaptiveDpr pixelated />
    </>
  );
};

const HeroScene = () => (
  <div className="w-48 h-48 md:w-64 md:h-64 mx-auto">
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
      dpr={[1, 2]}
    >
      <Scene />
    </Canvas>
  </div>
);

export default HeroScene;
