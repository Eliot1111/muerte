import { MODELS } from './config';
import { LoadedModel } from './ModelLoader';

interface SantaMuerteSkullProps {
  visible?: number;
  interactive?: boolean;
  rotateSpeed?: number;
  position?: [number, number, number];
}

export function SantaMuerteSkull({
  visible = 1,
  interactive = true,
  rotateSpeed = 0.08,
  position = [0, -0.2, 0],
}: SantaMuerteSkullProps) {
  return (
    <LoadedModel
      path={MODELS.skull}
      profile="skull"
      targetHeight={2.4}
      visible={visible}
      interactive={interactive}
      floatIntensity={interactive ? 0.04 : 0.02}
      rotateSpeed={rotateSpeed}
      position={position}
    />
  );
}
