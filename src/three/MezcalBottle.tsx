import { MODELS } from './config';
import { LoadedModel } from './ModelLoader';
import { useModelAvailable } from './useModelAvailable';
import { BarAmbience } from './PremiumFallback';

interface MezcalBottleProps {
  visible?: number;
}

export function MezcalBottle({ visible = 1 }: MezcalBottleProps) {
  const available = useModelAvailable(MODELS.mezcal);

  if (available === false) {
    return <BarAmbience visible={visible} />;
  }

  if (available === null) return null;

  return (
    <LoadedModel
      path={MODELS.mezcal}
      profile="product"
      targetHeight={2.2}
      visible={visible}
      position={[0, -0.5, 0]}
      rotation={[0, -0.3, 0]}
      floatIntensity={0.03}
    />
  );
}
