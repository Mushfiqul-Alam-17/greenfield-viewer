
import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export const Sensors = () => {
  const sensorsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (sensorsRef.current) {
      sensorsRef.current.children.forEach((sensor, i) => {
        sensor.position.y = Math.sin(state.clock.getElapsedTime() + i) * 0.1 + 1;
      });
    }
  });

  return (
    <group ref={sensorsRef}>
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh
          key={i}
          position={[i * 2 - 3, 1, 0]}
          castShadow
        >
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial
            color="#7FFFD4"
            emissive="#7FFFD4"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
};
