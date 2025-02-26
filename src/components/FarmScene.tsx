
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import { Farm } from './Farm';
import { Sensors } from './Sensors';

export const FarmScene = () => {
  return (
    <div className="w-full h-[80vh] relative">
      <Canvas
        camera={{ position: [10, 10, 10], fov: 45 }}
        className="bg-background"
      >
        <Suspense fallback={null}>
          <Environment preset="sunset" />
          <hemisphereLight intensity={0.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.3}
            penumbra={1}
            intensity={1}
            castShadow
          />
          <Farm />
          <Sensors />
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
