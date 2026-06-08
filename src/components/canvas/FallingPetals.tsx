import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PETAL_COUNT = 300;

export default function FallingPetals() {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // Generate initial random positions, rotations, and falling speeds
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const petalsData = useMemo(() => {
    return new Array(PETAL_COUNT).fill(0).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        Math.random() * 15,
        (Math.random() - 0.5) * 20
      ),
      rotation: new THREE.Vector3(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ),
      speed: 0.02 + Math.random() * 0.03,
      swaySpeed: Math.random() * 2,
      swayOffset: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    petalsData.forEach((petal, i) => {
      // Fall down
      petal.position.y -= petal.speed;
      
      // Swaying in wind
      petal.position.x += Math.sin(state.clock.elapsedTime * petal.swaySpeed + petal.swayOffset) * 0.01;
      petal.position.z += Math.cos(state.clock.elapsedTime * petal.swaySpeed + petal.swayOffset) * 0.01;
      
      // Rotate as it falls
      petal.rotation.x += 0.01;
      petal.rotation.y += 0.02;

      // Reset position if it falls below the water
      if (petal.position.y < -1.1) {
        petal.position.y = 10 + Math.random() * 5;
        petal.position.x = (Math.random() - 0.5) * 20;
        petal.position.z = (Math.random() - 0.5) * 20;
      }

      dummy.position.copy(petal.position);
      dummy.rotation.set(petal.rotation.x, petal.rotation.y, petal.rotation.z);
      dummy.scale.set(0.2, 0.2, 0.2);
      dummy.updateMatrix();
      
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  // Simple curved geometry for a petal
  const petalGeometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(0.5, 0.8, 2, 2);
    const positions = geom.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 2] = Math.sin(positions[i] * Math.PI) * 0.2; // Curve it
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  return (
    <instancedMesh ref={meshRef} args={[petalGeometry, undefined, PETAL_COUNT]} castShadow>
      <meshStandardMaterial color="#ffc0cb" side={THREE.DoubleSide} roughness={0.4} />
    </instancedMesh>
  );
}
