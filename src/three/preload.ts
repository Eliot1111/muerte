import { useGLTF } from '@react-three/drei';
import { MODELS } from './config';

export function preloadModels() {
  useGLTF.preload(MODELS.skull);
  useGLTF.preload(MODELS.candles);
}

preloadModels();
