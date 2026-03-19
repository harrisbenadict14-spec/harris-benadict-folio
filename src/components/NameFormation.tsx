import { useEffect, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Define star positions for "Harris Benadict" text
const createNamePositions = () => {
  const positions: number[] = [];
  const letterWidth = 0.6;
  const letterHeight = 1.2;
  const spacing = 0.2;
  const wordSpacing = 0.8;
  let currentX = -4.5; // Adjusted to center "Harris Benadict"
  
  // H
  positions.push(currentX, 0.6, 0);
  positions.push(currentX, 0, 0);
  positions.push(currentX, -0.6, 0);
  positions.push(currentX + letterWidth, 0.6, 0);
  positions.push(currentX + letterWidth, 0, 0);
  positions.push(currentX + letterWidth, -0.6, 0);
  positions.push(currentX, 0, 0);
  positions.push(currentX + letterWidth, 0, 0);
  currentX += letterWidth + spacing;
  
  // A
  positions.push(currentX, -0.6, 0);
  positions.push(currentX + letterWidth/2, 0.6, 0);
  positions.push(currentX + letterWidth, -0.6, 0);
  positions.push(currentX + 0.2, 0, 0);
  positions.push(currentX + letterWidth - 0.2, 0, 0);
  currentX += letterWidth + spacing;
  
  // R
  positions.push(currentX, 0.6, 0);
  positions.push(currentX, -0.6, 0);
  positions.push(currentX, 0.6, 0);
  positions.push(currentX + letterWidth, 0.6, 0);
  positions.push(currentX + letterWidth, 0, 0);
  positions.push(currentX, 0, 0);
  positions.push(currentX + letterWidth, -0.6, 0);
  currentX += letterWidth + spacing;
  
  // R (second)
  positions.push(currentX, 0.6, 0);
  positions.push(currentX, -0.6, 0);
  positions.push(currentX, 0.6, 0);
  positions.push(currentX + letterWidth, 0.6, 0);
  positions.push(currentX + letterWidth, 0, 0);
  positions.push(currentX, 0, 0);
  positions.push(currentX + letterWidth, -0.6, 0);
  currentX += letterWidth + spacing;
  
  // I
  positions.push(currentX, 0.6, 0);
  positions.push(currentX, 0, 0);
  positions.push(currentX, -0.6, 0);
  currentX += letterWidth + spacing;
  
  // S
  positions.push(currentX + letterWidth, 0.6, 0);
  positions.push(currentX, 0.6, 0);
  positions.push(currentX, 0.6, 0);
  positions.push(currentX, 0, 0);
  positions.push(currentX + letterWidth, 0, 0);
  positions.push(currentX + letterWidth, 0, 0);
  positions.push(currentX + letterWidth, -0.6, 0);
  positions.push(currentX, -0.6, 0);
  currentX += letterWidth + spacing;
  
  // Space between words
  currentX += wordSpacing;
  
  // B
  positions.push(currentX, 0.6, 0);
  positions.push(currentX, -0.6, 0);
  positions.push(currentX, 0.6, 0);
  positions.push(currentX + letterWidth, 0.6, 0);
  positions.push(currentX + letterWidth, 0, 0);
  positions.push(currentX, 0, 0);
  positions.push(currentX + letterWidth, 0, 0);
  positions.push(currentX + letterWidth, -0.6, 0);
  positions.push(currentX, -0.6, 0);
  currentX += letterWidth + spacing;
  
  // E
  positions.push(currentX, 0.6, 0);
  positions.push(currentX, -0.6, 0);
  positions.push(currentX, 0.6, 0);
  positions.push(currentX + letterWidth, 0.6, 0);
  positions.push(currentX, 0, 0);
  positions.push(currentX + letterWidth, 0, 0);
  positions.push(currentX, -0.6, 0);
  positions.push(currentX + letterWidth, -0.6, 0);
  currentX += letterWidth + spacing;
  
  // N
  positions.push(currentX, 0.6, 0);
  positions.push(currentX, -0.6, 0);
  positions.push(currentX + letterWidth, -0.6, 0);
  positions.push(currentX + letterWidth, 0.6, 0);
  positions.push(currentX, 0.6, 0);
  positions.push(currentX + letterWidth, -0.6, 0);
  currentX += letterWidth + spacing;
  
  // A
  positions.push(currentX, -0.6, 0);
  positions.push(currentX + letterWidth/2, 0.6, 0);
  positions.push(currentX + letterWidth, -0.6, 0);
  positions.push(currentX + 0.2, 0, 0);
  positions.push(currentX + letterWidth - 0.2, 0, 0);
  currentX += letterWidth + spacing;
  
  // D
  positions.push(currentX, 0.6, 0);
  positions.push(currentX, -0.6, 0);
  positions.push(currentX + letterWidth, 0.6, 0);
  positions.push(currentX + letterWidth, -0.6, 0);
  positions.push(currentX, 0.6, 0);
  positions.push(currentX + letterWidth, 0.6, 0);
  currentX += letterWidth + spacing;
  
  // I
  positions.push(currentX, 0.6, 0);
  positions.push(currentX, 0, 0);
  positions.push(currentX, -0.6, 0);
  currentX += letterWidth + spacing;
  
  // C
  positions.push(currentX + letterWidth, 0.6, 0);
  positions.push(currentX, 0.6, 0);
  positions.push(currentX, -0.6, 0);
  positions.push(currentX + letterWidth, -0.6, 0);
  positions.push(currentX, 0.6, 0);
  positions.push(currentX + letterWidth, 0.6, 0);
  
  return new Float32Array(positions);
};

// Create connecting lines between nearby stars
const createConnections = (positions: Float32Array) => {
  const lines: number[] = [];
  const maxDistance = 0.8; // Reduced for better connections with longer name
  
  for (let i = 0; i < positions.length; i += 3) {
    for (let j = i + 3; j < positions.length; j += 3) {
      const dx = positions[i] - positions[j];
      const dy = positions[i + 1] - positions[j + 1];
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < maxDistance && distance > 0.1) {
        lines.push(i / 3, j / 3); // Store indices
      }
    }
  }
  
  return lines;
};

interface NameFormationProps {
  isActive: boolean;
  progress: number; // 0 to 1
}

const NameFormation = ({ isActive, progress }: NameFormationProps) => {
  const meshRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const namePositions = useMemo(() => createNamePositions(), []);
  const connections = useMemo(() => createConnections(namePositions), [namePositions]);
  
  // Create random initial positions
  const initialPositions = useMemo(() => {
    const pos = new Float32Array(namePositions.length);
    for (let i = 0; i < pos.length; i += 3) {
      pos[i] = (Math.random() - 0.5) * 8;     // x
      pos[i + 1] = (Math.random() - 0.5) * 6; // y
      pos[i + 2] = (Math.random() - 0.5) * 2; // z
    }
    return pos;
  }, [namePositions.length]);
  
  // Create blinking phases for each star
  const blinkPhases = useMemo(() => {
    const phases = new Float32Array(namePositions.length / 3);
    for (let i = 0; i < phases.length; i++) {
      phases[i] = Math.random() * Math.PI * 2;
    }
    return phases;
  }, [namePositions.length]);
  
  // Interpolate between initial and name positions
  const currentPositions = useMemo(() => {
    const pos = new Float32Array(namePositions.length);
    for (let i = 0; i < pos.length; i++) {
      const start = initialPositions[i];
      const end = namePositions[i];
      // Smooth easing function
      const eased = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      pos[i] = start + (end - start) * eased;
    }
    return pos;
  }, [initialPositions, namePositions, progress]);
  
  // Create line positions
  const linePositions = useMemo(() => {
    const linePos = new Float32Array(connections.length * 3);
    for (let i = 0; i < connections.length; i += 2) {
      const idx1 = connections[i] * 3;
      const idx2 = connections[i + 1] * 3;
      
      linePos[i * 3] = currentPositions[idx1];
      linePos[i * 3 + 1] = currentPositions[idx1 + 1];
      linePos[i * 3 + 2] = currentPositions[idx1 + 2];
      
      linePos[i * 3 + 3] = currentPositions[idx2];
      linePos[i * 3 + 4] = currentPositions[idx2 + 1];
      linePos[i * 3 + 5] = currentPositions[idx2 + 2];
    }
    return linePos;
  }, [connections, currentPositions]);
  
  // Update geometries when positions change
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.geometry.setAttribute('position', 
        new THREE.BufferAttribute(currentPositions, 3)
      );
    }
    if (linesRef.current) {
      linesRef.current.geometry.setAttribute('position', 
        new THREE.BufferAttribute(linePositions, 3)
      );
    }
  }, [currentPositions, linePositions]);
  
  // Animate blinking
  useFrame(({ clock }) => {
    if (meshRef.current && meshRef.current.material) {
      const material = meshRef.current.material as THREE.PointsMaterial;
      const time = clock.getElapsedTime();
      
      // Create blinking effect with varying phases
      let avgOpacity = 0;
      for (let i = 0; i < blinkPhases.length; i++) {
        const blink = 0.3 + 0.7 * Math.abs(Math.sin(time * 2 + blinkPhases[i]));
        avgOpacity += blink;
      }
      avgOpacity /= blinkPhases.length;
      
      material.opacity = avgOpacity * 0.9 * progress;
    }
    
    // Animate line opacity
    if (linesRef.current && linesRef.current.material) {
      const material = linesRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.3 * progress;
    }
  });
  
  if (!isActive) return null;
  
  return (
    <>
      {/* Connecting lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#6080ff"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      
      {/* Stars forming the name */}
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={currentPositions.length / 3}
            array={currentPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#ffffff"
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
};

export default NameFormation;
