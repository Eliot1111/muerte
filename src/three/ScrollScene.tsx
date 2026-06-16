import { stageVisibility } from './enhanceMaterials';
import { SantaMuerteSkull } from './SantaMuerteSkull';
import { Candles } from './Candles';
import { MexicanOrnament } from './MexicanOrnament';
import { Agave } from './Agave';
import { MezcalBottle } from './MezcalBottle';
import { TacoComposition } from './TacoComposition';
import { ContactAmbience } from './PremiumFallback';
import { Lighting } from './Lighting';
import { SceneController } from './SceneController';
import { useIsMobile } from '../hooks/useMediaQuery';

interface ScrollSceneProps {
  progress: number;
}

export function ScrollScene({ progress }: ScrollSceneProps) {
  const isMobile = useIsMobile();

  const skullVis =
    stageVisibility(progress, 0, 0.3, 0.1) +
    stageVisibility(progress, 0.85, 1, 0.08) * 0.25;

  const ritualVis = stageVisibility(progress, 0.12, 0.42, 0.1);
  const agaveVis = stageVisibility(progress, 0.32, 0.55, 0.1);
  const barVis = stageVisibility(progress, 0.45, 0.68, 0.1);
  const menuVis = stageVisibility(progress, 0.58, 0.82, 0.1);
  const contactVis = stageVisibility(progress, 0.75, 1, 0.12);

  const candlesVis = ritualVis;
  const ornamentVis = ritualVis * 0.9;

  const ritualLight = ritualVis * 2.5;

  return (
    <>
      <Lighting
        progress={progress}
        redIntensity={1 + progress * 0.8 + ritualLight * 0.5}
        keyIntensity={2.4 + ritualLight}
        ambient={0.14 + ritualVis * 0.08}
      />

      {/* Spotlight on ritual stage — candles */}
      {ritualVis > 0.05 && (
        <spotLight
          position={[0.8, 2.5, 3.5]}
          angle={0.45}
          penumbra={1}
          intensity={ritualLight * 1.8}
          color="#ffecd0"
        />
      )}

      <SceneController progress={progress} isMobile={isMobile} />

      <SantaMuerteSkull
        visible={Math.min(skullVis, 1)}
        interactive={false}
        rotateSpeed={0.12}
        position={[0, 0, 0]}
      />

      <Candles visible={candlesVis} />
      <MexicanOrnament visible={ornamentVis} />

      <group position={[0, 0.1, 0]}>
        <Agave visible={agaveVis} />
      </group>

      <group position={[0.3, 0.05, 0]}>
        <MezcalBottle visible={barVis} />
      </group>

      <group position={[0, 0.1, 0]}>
        <TacoComposition visible={menuVis} />
      </group>

      <ContactAmbience visible={contactVis} />
    </>
  );
}
