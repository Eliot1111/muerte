import { MODELS } from './config';
import { LoadedModel } from './ModelLoader';

interface CandlesProps {
  visible?: number;
}

/** Candelabra de calavera — hero of the Ritual scroll stage */
export function Candles({ visible = 1 }: CandlesProps) {
  return (
    <LoadedModel
      path={MODELS.candles}
      profile="candles"
      targetHeight={3.2}
      visible={visible}
      position={[0.25, 0.2, 0]}
      rotation={[0, 0, 0]}
      rotateSpeed={0.35}
      floatIntensity={0.03}
    />
  );
}
