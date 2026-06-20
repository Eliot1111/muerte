import { SantaMuerteSkull } from './SantaMuerteSkull';
import { Lighting } from './Lighting';
import { SceneController } from './SceneController';
import { useIsMobile } from '../hooks/useMediaQuery';

interface ScrollSceneProps {
  progress: number;
}

export function ScrollScene({ progress }: ScrollSceneProps) {
  const isMobile = useIsMobile();

  return (
    <>
      <Lighting
        progress={progress}
        redIntensity={1 + progress * 0.8}
        keyIntensity={2.4}
        ambient={0.14}
      />

      <SceneController progress={progress} isMobile={isMobile} />

      <SantaMuerteSkull
        visible={1}
        interactive={false}
        rotateSpeed={0.12}
        position={[0, 0, 0]}
      />
    </>
  );
}
