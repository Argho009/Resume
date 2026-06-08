import { useRef } from 'react';
import * as THREE from 'three';
import type { ViewState } from '../../App';
import { Text } from '@react-three/drei';

interface TreeProps {
  currentView: ViewState;
  onNavigate: (view: ViewState, projectId?: string) => void;
}

export default function CherryBlossomTree({ currentView, onNavigate }: TreeProps) {
  const treeRef = useRef<THREE.Group>(null);
  
  // A simplistic procedural generation of a tree shape for demonstration.
  // In a full production app, this would be a loaded GLTF model.
  
  const trunkMaterial = new THREE.MeshStandardMaterial({ color: '#3e2723', roughness: 0.9, metalness: 0.1 });
  const petalMaterial = new THREE.MeshStandardMaterial({ color: '#ffb7c5', roughness: 0.4, side: THREE.DoubleSide });

  return (
    <group ref={treeRef} position={[0, 0.5, 0]}>
      {/* Trunk */}
      <mesh material={trunkMaterial} position={[0, 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.8, 1.2, 4, 8]} />
      </mesh>

      {/* Main Canopy Base */}
      <mesh material={petalMaterial} position={[0, 5, 0]} castShadow>
        <sphereGeometry args={[3, 16, 16]} />
      </mesh>

      {/* --- Personal Details Branch (Left) --- */}
      <group 
        position={[-1.5, 3, 0]} 
        rotation={[0, 0, Math.PI / 4]}
        onClick={(e) => { e.stopPropagation(); onNavigate('personal'); }}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'auto'}
      >
        <mesh material={trunkMaterial} castShadow>
          <cylinderGeometry args={[0.3, 0.5, 4, 8]} />
        </mesh>
        <mesh material={petalMaterial} position={[0, 2.5, 0]} castShadow>
          <sphereGeometry args={[1.5, 8, 8]} />
        </mesh>
        <Text position={[0, 3, 2]} rotation={[0, 0, -Math.PI / 4]} fontSize={0.4} color="#ffffff" outlineWidth={0.02} outlineColor="#000000">
          Personal
        </Text>
      </group>

      {/* --- Internship Branch (Right) --- */}
      <group 
        position={[1.5, 3.5, 0]} 
        rotation={[0, 0, -Math.PI / 4]}
        onClick={(e) => { e.stopPropagation(); onNavigate('internship'); }}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'auto'}
      >
        <mesh material={trunkMaterial} castShadow>
          <cylinderGeometry args={[0.3, 0.4, 4, 8]} />
        </mesh>
        <mesh material={petalMaterial} position={[0, 2.5, 0]} castShadow>
          <sphereGeometry args={[1.5, 8, 8]} />
        </mesh>
        <Text position={[0, 3, 2]} rotation={[0, 0, Math.PI / 4]} fontSize={0.4} color="#ffffff" outlineWidth={0.02} outlineColor="#000000">
          Internships
        </Text>
      </group>

      {/* --- Projects Branch (Front Lower) --- */}
      <group 
        position={[0, 2.5, 1.5]} 
        rotation={[Math.PI / 3, 0, 0]}
        onClick={(e) => { e.stopPropagation(); onNavigate('projects'); }}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'auto'}
      >
        <mesh material={trunkMaterial} castShadow>
          <cylinderGeometry args={[0.4, 0.6, 3, 8]} />
        </mesh>
        <mesh material={petalMaterial} position={[0, 2, 0]} castShadow>
          <sphereGeometry args={[1.5, 8, 8]} />
        </mesh>
        <Text position={[0, 3, 1]} rotation={[-Math.PI / 3, 0, 0]} fontSize={0.4} color="#ffffff" outlineWidth={0.02} outlineColor="#000000">
          Projects
        </Text>

        {/* Sub-branches for projects (visible when projects view is active) */}
        {currentView === 'projects' || currentView === 'project-detail' ? (
          <>
            <group position={[-1, 1, 1]} rotation={[-0.2, -0.5, 0]} onClick={(e) => { e.stopPropagation(); onNavigate('project-detail', 'aegis'); }}>
              <mesh material={trunkMaterial}><cylinderGeometry args={[0.1, 0.15, 1.5]}/></mesh>
              <mesh material={petalMaterial} position={[0, 1, 0]}><sphereGeometry args={[0.5]}/></mesh>
              <Text position={[0, 1.5, 0]} rotation={[-1, 0, 0]} fontSize={0.2} color="white" outlineWidth={0.01} outlineColor="black">Aegis</Text>
            </group>
            
            <group position={[0, 1.5, 1]} rotation={[-0.5, 0, 0]} onClick={(e) => { e.stopPropagation(); onNavigate('project-detail', 'attendance'); }}>
              <mesh material={trunkMaterial}><cylinderGeometry args={[0.1, 0.15, 1.5]}/></mesh>
              <mesh material={petalMaterial} position={[0, 1, 0]}><sphereGeometry args={[0.5]}/></mesh>
              <Text position={[0, 1.5, 0]} rotation={[-1, 0, 0]} fontSize={0.2} color="white" outlineWidth={0.01} outlineColor="black">Attendance</Text>
            </group>

            <group position={[1, 1, 1]} rotation={[-0.2, 0.5, 0]} onClick={(e) => { e.stopPropagation(); onNavigate('project-detail', 'data-cleaning'); }}>
              <mesh material={trunkMaterial}><cylinderGeometry args={[0.1, 0.15, 1.5]}/></mesh>
              <mesh material={petalMaterial} position={[0, 1, 0]}><sphereGeometry args={[0.5]}/></mesh>
              <Text position={[0, 1.5, 0]} rotation={[-1, 0, 0]} fontSize={0.2} color="white" outlineWidth={0.01} outlineColor="black">OpenEnv</Text>
            </group>
          </>
        ) : null}
      </group>
    </group>
  );
}
