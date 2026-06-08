import { MeshReflectorMaterial } from '@react-three/drei';

export default function WaterSurface() {
  return (
    <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={1024}
        mixBlur={1}
        mixStrength={40}
        roughness={0.2}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#104e8b"
        metalness={0.5}
        mirror={0.8}
      />
    </mesh>
  );
}
