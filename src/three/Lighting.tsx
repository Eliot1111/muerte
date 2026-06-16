import { Environment, ContactShadows } from '@react-three/drei';
import { COLORS } from './config';

interface LightingProps {
  progress?: number;
  redIntensity?: number;
  keyIntensity?: number;
  ambient?: number;
}

export function Lighting({
  progress = 0,
  redIntensity = 1.2,
  keyIntensity = 2.5,
  ambient = 0.12,
}: LightingProps) {
  const warmth = 0.3 + progress * 0.4;
  const keyColor = progress > 0.5 ? '#ffecd0' : '#f5f0e8';

  return (
    <>
      {/* No scene background — canvas stays transparent over the page */}
      <Environment preset="night" environmentIntensity={0.65} background={false} />

      <ambientLight intensity={ambient} color="#2a2018" />

      <directionalLight
        position={[4, 6, 4]}
        intensity={keyIntensity}
        color={keyColor}
        castShadow
        shadow-mapSize={[512, 512]}
        shadow-camera-far={20}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
        shadow-bias={-0.0001}
      />

      <directionalLight
        position={[-4, 2, -2]}
        intensity={0.6 + warmth}
        color="#8b0000"
      />

      <spotLight
        position={[0, 4, 6]}
        angle={0.32}
        penumbra={1}
        intensity={1.8}
        color="#fff8f0"
      />

      <pointLight
        position={[-3, 1, 3]}
        intensity={redIntensity}
        color="#8b0000"
        distance={12}
      />

      <pointLight
        position={[3, -1, 4]}
        intensity={0.8}
        color={COLORS.gold}
        distance={10}
      />

      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.35}
        scale={8}
        blur={2.5}
        far={4}
        color="#000000"
      />
    </>
  );
}
