import { assetUrl } from '../utils/assetUrl';

export const MODELS = {
  skull: assetUrl('models/santa-muerte-skull.glb'),
  candles: assetUrl('models/candles.glb'),
  mezcal: assetUrl('models/mezcal-bottle.glb'),
  agave: assetUrl('models/agave.glb'),
  taco: assetUrl('models/taco.glb'),
  lime: assetUrl('models/lime.glb'),
  chili: assetUrl('models/chili.glb'),
  ornament: assetUrl('models/mexican-ornament.glb'),
} as const;

// HDR available at public/hdr/studio-dark.exr (optional, not loaded by default)
export const HDR = assetUrl('hdr/studio-dark.exr');

export const METAL = {
  color: assetUrl('textures/metal/Metal042B_1K-JPG_Color.jpg'),
  normal: assetUrl('textures/metal/Metal042B_1K-JPG_NormalGL.jpg'),
  roughness: assetUrl('textures/metal/Metal042B_1K-JPG_Roughness.jpg'),
  metalness: assetUrl('textures/metal/Metal042B_1K-JPG_Metalness.jpg'),
} as const;

export const COLORS = {
  bone: '#e7dfcf',
  ivory: '#f0e8dc',
  gold: '#d6a84f',
  red: '#8b0000',
  redGlow: '#7a0000',
  amber: '#c8872a',
  agave: '#1a3d2e',
  bg: '#050404',
} as const;
