import { useRef } from 'react';
import * as THREE from 'three';

export default function Island() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Generate a procedural uneven terrain for the island
  return (
    <group>
      {/* Main Island Base */}
      <mesh ref={meshRef} position={[0, -0.5, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[8, 10, 2, 32, 1, false]} />
        <meshStandardMaterial 
          color="#3a5a40" 
          roughness={0.9} 
          metalness={0.1}
        />
      </mesh>
      
      {/* Rocky Edge details */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 8 + Math.random() * 1;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <mesh 
            key={i} 
            position={[x, -0.5 + Math.random() * 0.5, z]} 
            rotation={[Math.random(), Math.random(), Math.random()]}
            receiveShadow 
            castShadow
          >
            <dodecahedronGeometry args={[1.5 + Math.random()]} />
            <meshStandardMaterial color="#5c5c5c" roughness={0.8} />
          </mesh>
        );
      })}
    </group>
  );
}
