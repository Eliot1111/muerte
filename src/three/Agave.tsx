import { MODELS } from './config';
import { LoadedModel } from './ModelLoader';
import { useModelAvailable } from './useModelAvailable';
import { AgaveAmbience } from './PremiumFallback';

interface AgaveProps {
  visible?: number;
}

export function Agave({ visible = 1 }: AgaveProps) {
  const available = useModelAvailable(MODELS.agave);

  if (available === false) {
    return <AgaveAmbience visible={visible} />;
  }

  if (available === null) return null;

  return (
    <LoadedModel
      path={MODELS.agave}
      profile="default"
      targetHeight={2.8}
      visible={visible}
      position={[0, -1, 0]}
      rotation={[0, 0.2, 0]}
    />
  );
}
