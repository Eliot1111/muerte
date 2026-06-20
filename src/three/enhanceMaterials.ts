import * as THREE from 'three';
import { COLORS } from './config';

export function centerAndScale(
  object: THREE.Object3D,
  targetHeight = 2.2
): THREE.Object3D {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  object.position.sub(center);
  const maxDim = Math.max(size.x, size.y, size.z);
  if (maxDim > 0) {
    const scale = targetHeight / maxDim;
    object.scale.setScalar(scale);
  }

  return object;
}

export function enhanceMeshMaterials(
  root: THREE.Object3D,
  profile: 'skull' | 'product' | 'food' | 'default' = 'default'
) {
  root.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;

    child.castShadow = true;
    child.receiveShadow = true;

    const mats = Array.isArray(child.material) ? child.material : [child.material];

    mats.forEach((mat) => {
      if (
        mat instanceof THREE.MeshStandardMaterial ||
        mat instanceof THREE.MeshPhysicalMaterial
      ) {
        applyProfile(mat, child.name, profile);
        mat.needsUpdate = true;
      }
    });
  });
}

function applyProfile(
  mat: THREE.MeshStandardMaterial | THREE.MeshPhysicalMaterial,
  meshName: string,
  profile: string
) {
  const name = meshName.toLowerCase();

  if (name.includes('eye') || name.includes('socket') || name.includes('pupil')) {
        mat.emissive = new THREE.Color(COLORS.redGlow);
        mat.emissiveIntensity = 1.2;
    mat.color = new THREE.Color('#1a0000');
    return;
  }

  if (name.includes('gold') || name.includes('metal') || name.includes('ornament')) {
    mat.metalness = 1;
    mat.roughness = 0.25;
    mat.color = new THREE.Color(COLORS.gold);
    return;
  }

  if (
    name.includes('flame') ||
    name.includes('fire') ||
    name.includes('candle') ||
    name.includes('wick') ||
    name.includes('light')
  ) {
    mat.emissive = new THREE.Color('#ff6a2a');
    mat.emissiveIntensity = 2.2;
    mat.toneMapped = false;
    return;
  }

  switch (profile) {
    case 'skull':
      mat.roughness = Math.min(mat.roughness ?? 0.55, 0.65);
      mat.metalness = mat.metalness ?? 0.05;
      {
        const hsl = { h: 0, s: 0, l: 0 };
        mat.color.getHSL(hsl);
        if (hsl.l < 0.15) {
          mat.emissive = new THREE.Color(COLORS.redGlow);
          mat.emissiveIntensity = 0.4;
        } else {
          mat.color.lerp(new THREE.Color(COLORS.bone), 0.15);
        }
      }
      break;
    case 'product':
      mat.roughness = Math.min(mat.roughness ?? 0.2, 0.35);
      mat.metalness = mat.metalness ?? 0.1;
      break;
    case 'food':
      mat.roughness = Math.max(mat.roughness ?? 0.65, 0.55);
      break;
    default:
      mat.roughness = Math.min(mat.roughness ?? 0.6, 0.85);
      mat.metalness = mat.metalness ?? 0.1;
  }
}
