import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function InteractiveShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // useFrame hooks into the render loop to animate the object
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.5, 0]} />
      <meshStandardMaterial color="#4f46e5" roughness={0.2} metalness={0.8} />
    </mesh>
  );
}

export default function Hero3D() {
  return (
    <div className="h-[500px] w-full rounded-2xl overflow-hidden bg-slate-950 relative">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="city" />
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
          <InteractiveShape />
        </Float>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}