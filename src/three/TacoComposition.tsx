import { MODELS } from './config';
import { LoadedModel } from './ModelLoader';
import { useModelAvailable } from './useModelAvailable';
import { FoodAmbience } from './PremiumFallback';

interface TacoCompositionProps {
  visible?: number;
}

export function TacoComposition({ visible = 1 }: TacoCompositionProps) {
  const tacoAvailable = useModelAvailable(MODELS.taco);
  const limeAvailable = useModelAvailable(MODELS.lime);
  const chiliAvailable = useModelAvailable(MODELS.chili);

  const stillLoading =
    tacoAvailable === null ||
    limeAvailable === null ||
    chiliAvailable === null;

  const hasFoodModel =
    tacoAvailable === true ||
    limeAvailable === true ||
    chiliAvailable === true;

  if (stillLoading) return null;

  if (!hasFoodModel) {
    return <FoodAmbience visible={visible} />;
  }

  return (
    <group>
      {tacoAvailable && (
        <LoadedModel
          path={MODELS.taco}
          profile="food"
          targetHeight={1.4}
          visible={visible}
          position={[0, -0.3, 0]}
          rotation={[0.2, 0.5, 0]}
        />
      )}
      {limeAvailable && (
        <LoadedModel
          path={MODELS.lime}
          profile="food"
          targetHeight={0.5}
          visible={visible}
          position={[0.9, -0.5, 0.3]}
          rotation={[0, 0, 0.6]}
        />
      )}
      {chiliAvailable && (
        <LoadedModel
          path={MODELS.chili}
          profile="food"
          targetHeight={0.6}
          visible={visible}
          position={[-0.8, -0.4, 0.2]}
          rotation={[0.5, 0, 0.8]}
        />
      )}
      {!tacoAvailable && !limeAvailable && !chiliAvailable && (
        <FoodAmbience visible={visible} />
      )}
    </group>
  );
}
