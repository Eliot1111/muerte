export const MODELS = {
  skull: '/models/santa-muerte-skull.glb',
  candles: '/models/candles.glb',
  mezcal: '/models/mezcal-bottle.glb',
  agave: '/models/agave.glb',
  taco: '/models/taco.glb',
  lime: '/models/lime.glb',
  chili: '/models/chili.glb',
  ornament: '/models/mexican-ornament.glb',
} as const;

// HDR available at public/hdr/studio-dark.exr (optional, not loaded by default)
export const HDR = '/hdr/studio-dark.exr';

export const METAL = {
  color: '/textures/metal/Metal042B_1K-JPG_Color.jpg',
  normal: '/textures/metal/Metal042B_1K-JPG_NormalGL.jpg',
  roughness: '/textures/metal/Metal042B_1K-JPG_Roughness.jpg',
  metalness: '/textures/metal/Metal042B_1K-JPG_Metalness.jpg',
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
