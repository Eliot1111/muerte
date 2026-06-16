import {
  EffectComposer,
  Bloom,
  Vignette,
} from '@react-three/postprocessing';

interface PostProcessingProps {
  enabled?: boolean;
}

/**
 * DepthOfField removed — it was blurring the entire framebuffer to black.
 * Bloom + vignette only, with autoClear disabled for transparent canvas.
 */
export function PostProcessing({ enabled = true }: PostProcessingProps) {
  if (!enabled) return null;

  return (
    <EffectComposer multisampling={0} autoClear={false}>
      <Bloom
        intensity={0.18}
        luminanceThreshold={0.55}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <Vignette eskil={false} offset={0.25} darkness={0.45} />
    </EffectComposer>
  );
}
