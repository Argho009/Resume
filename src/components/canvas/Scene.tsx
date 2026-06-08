import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sky as DreiSky } from '@react-three/drei';
import * as THREE from 'three';
import type { ViewState } from '../../App';
import CherryBlossomTree from './CherryBlossomTree';
import Island from './Island';
import WaterSurface from './Water';
import FallingPetals from './FallingPetals';

interface SceneProps {
  currentView: ViewState;
  onNavigate: (view: ViewState, projectId?: string) => void;
}

export default function Scene({ currentView, onNavigate }: SceneProps) {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();

  // Target camera positions based on view
  useEffect(() => {
    if (!controlsRef.current) return;
    
    const targetPosition = new THREE.Vector3();
    const targetTarget = new THREE.Vector3(0, 3, 0); // Default look at tree center
    
    switch (currentView) {
      case 'home':
        targetPosition.set(0, 5, 18);
        targetTarget.set(0, 4, 0);
        break;
      case 'personal':
        targetPosition.set(-6, 6, 8); // Look at left branch
        targetTarget.set(-3, 6, 0);
        break;
      case 'internship':
        targetPosition.set(6, 7, 8); // Look at right branch
        targetTarget.set(3, 7, 0);
        break;
      case 'projects':
        targetPosition.set(0, 3, 10); // Look at lower center branch
        targetTarget.set(0, 3, 0);
        break;
      case 'project-detail':
        targetPosition.set(0, 2.5, 8); // Closer look at sub-branch
        targetTarget.set(0, 2.5, 0);
        break;
    }

    // Animate camera
    // We'll use a simple GSAP or custom frame loop in a real app, 
    // but for now we'll just snap or let OrbitControls interpolate if we use a custom hook
    // Here we'll just snap for simplicity, and add smooth dampening in useFrame
    camera.position.lerp(targetPosition, 0.1);
    controlsRef.current.target.lerp(targetTarget, 0.1);
    
  }, [currentView, camera]);

  useFrame((_, delta) => {
    // Smooth camera movements
    if (controlsRef.current) {
      const targetPosition = new THREE.Vector3();
      const targetTarget = new THREE.Vector3(0, 4, 0);
      
      switch (currentView) {
        case 'home':
          targetPosition.set(0, 5, 18);
          targetTarget.set(0, 4, 0);
          break;
        case 'personal':
          targetPosition.set(-6, 6, 8);
          targetTarget.set(-2, 6, 0);
          break;
        case 'internship':
          targetPosition.set(6, 7, 8);
          targetTarget.set(2, 7, 0);
          break;
        case 'projects':
        case 'project-detail':
          targetPosition.set(0, 3, 10);
          targetTarget.set(0, 2.5, 0);
          break;
      }
      
      camera.position.lerp(targetPosition, 3 * delta);
      controlsRef.current.target.lerp(targetTarget, 3 * delta);
      controlsRef.current.update();
    }
  });

  return (
    <>
      <OrbitControls 
        ref={controlsRef}
        enablePan={true}
        enableZoom={true}
        enableDamping={true}
        dampingFactor={0.05}
        maxPolarAngle={Math.PI / 2 + 0.1} // Allow looking slightly below the horizon
        minDistance={3}
        maxDistance={30}
      />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <hemisphereLight args={['#ffffff', '#444444', 0.6]} />
      <directionalLight 
        position={[10, 20, 10]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize-width={2048} 
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      >
        <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20, 0.1, 50]} />
      </directionalLight>

      {/* Environment */}
      <DreiSky sunPosition={[10, 20, 10]} turbidity={0.3} rayleigh={0.5} />

      {/* Objects */}
      <group position={[0, -1, 0]}>
        <Island />
        <CherryBlossomTree currentView={currentView} onNavigate={onNavigate} />
        <FallingPetals />
      </group>
      
      <WaterSurface />
    </>
  );
}
