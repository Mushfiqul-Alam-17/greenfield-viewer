
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export const Farm = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#2d4a28" />
      </mesh>
      
      {/* Sample field plots */}
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh
          key={i}
          position={[i * 2 - 3, 0.1, 0]}
          receiveShadow
          castShadow
        >
          <boxGeometry args={[1.8, 0.2, 4]} />
          <meshStandardMaterial color="#3a5a35" />
        </mesh>
      ))}
    </group>
  );
};
