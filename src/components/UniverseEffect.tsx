import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Starfield background
const Starfield = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(3000 * 3);
    const colors = new Float32Array(3000 * 3);
    const sizes = new Float32Array(3000);
    
    for (let i = 0; i < 3000; i++) {
      // Random sphere distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 20 + Math.random() * 30;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Star colors (white, blue, yellow tints)
      const colorChoice = Math.random();
      if (colorChoice < 0.3) {
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 1;
      } else if (colorChoice < 0.6) {
        colors[i * 3] = 0.7;
        colors[i * 3 + 1] = 0.8;
        colors[i * 3 + 2] = 1;
      } else {
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 0.9;
        colors[i * 3 + 2] = 0.7;
      }
      
      sizes[i] = Math.random() * 2 + 0.5;
    }
    
    return [positions, colors, sizes];
  }, []);
  
  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02;
      pointsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.01) * 0.1;
    }
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Nebula clouds
const Nebula = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = clock.getElapsedTime() * 0.005;
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.003) * 0.1;
    }
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime();
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[50, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          time: { value: 0 },
          color1: { value: new THREE.Color(0x1a1a2e) },
          color2: { value: new THREE.Color(0x16213e) },
          color3: { value: new THREE.Color(0x0f3460) }
        }}
        vertexShader={`
          varying vec2 vUv;
          varying vec3 vPosition;
          
          void main() {
            vUv = uv;
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float time;
          uniform vec3 color1;
          uniform vec3 color2;
          uniform vec3 color3;
          
          varying vec2 vUv;
          varying vec3 vPosition;
          
          void main() {
            float noise = sin(vPosition.x * 0.1 + time) * cos(vPosition.y * 0.1 + time) * 0.5 + 0.5;
            float dist = length(vUv - 0.5);
            
            vec3 color = mix(color1, color2, noise);
            color = mix(color, color3, dist);
            
            float alpha = 1.0 - smoothstep(0.3, 0.7, dist);
            alpha *= 0.3;
            
            gl_FragColor = vec4(color, alpha);
          }
        `}
        transparent
        side={THREE.BackSide}
      />
    </mesh>
  );
};

// Galaxy spiral arms
const GalaxySpiral = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const [positions] = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    
    for (let i = 0; i < 2000; i++) {
      const angle = (i / 2000) * Math.PI * 8;
      const radius = (i / 2000) * 15;
      const height = (Math.random() - 0.5) * 2;
      
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    
    return [positions];
  }, []);
  
  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.01;
    }
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#4a69bd"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Shooting stars
const ShootingStars = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const shootingStars = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      delay: Math.random() * 10,
      duration: 2 + Math.random() * 2,
      start: {
        x: (Math.random() - 0.5) * 40,
        y: 10 + Math.random() * 10,
        z: (Math.random() - 0.5) * 40
      },
      end: {
        x: (Math.random() - 0.5) * 40,
        y: -10,
        z: (Math.random() - 0.5) * 40
      }
    }));
  }, []);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const time = clock.getElapsedTime();
      
      shootingStars.forEach((star, i) => {
        const child = groupRef.current?.children[i];
        if (!child) return;
        
        const starTime = (time + star.delay) % (star.delay + star.duration + 5);
        if (starTime < star.duration && starTime > 0) {
          const progress = starTime / star.duration;
          child.visible = true;
          child.position.x = star.start.x + (star.end.x - star.start.x) * progress;
          child.position.y = star.start.y + (star.end.y - star.start.y) * progress;
          child.position.z = star.start.z + (star.end.z - star.start.z) * progress;
        } else {
          child.visible = false;
        }
      });
    }
  });
  
  return (
    <group ref={groupRef}>
      {shootingStars.map((star) => (
        <mesh key={star.id} visible={false}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}
    </group>
  );
};

interface UniverseEffectProps {
  intensity?: number;
}

const UniverseEffect = ({ intensity = 1 }: UniverseEffectProps) => {
  return (
    <group>
      <Starfield />
      <Nebula />
      <GalaxySpiral />
      <ShootingStars />
    </group>
  );
};

export default UniverseEffect;
