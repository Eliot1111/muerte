import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/** Camera focus points — upper-center of viewport (text sits bottom-left) */
const FOCUS = [
  new THREE.Vector3(0, 0.2, 0),       // 0 Mask
  new THREE.Vector3(0.25, 0.22, 0),   // 1 Ritual — candles
  new THREE.Vector3(0, 0.15, 0),      // 2 Agave
  new THREE.Vector3(0.3, 0.1, 0),     // 3 Bar
  new THREE.Vector3(0, 0.12, 0),      // 4 Menu
];

const DESKTOP_STAGES = [
  { pos: new THREE.Vector3(0, 0.25, 5), fov: 35 },
  { pos: new THREE.Vector3(0.4, 0.3, 4.2), fov: 34 },
  { pos: new THREE.Vector3(-0.2, 0.25, 4.8), fov: 36 },
  { pos: new THREE.Vector3(0.5, 0.28, 4), fov: 35 },
  { pos: new THREE.Vector3(0.1, 0.3, 4.5), fov: 34 },
];

const MOBILE_STAGES = [
  { pos: new THREE.Vector3(0, 0.2, 7), fov: 45 },
  { pos: new THREE.Vector3(0.2, 0.25, 6.5), fov: 44 },
  { pos: new THREE.Vector3(0, 0.2, 7), fov: 45 },
  { pos: new THREE.Vector3(0.15, 0.22, 6.5), fov: 44 },
  { pos: new THREE.Vector3(0, 0.25, 7), fov: 45 },
];

interface SceneControllerProps {
  progress: number;
  isMobile?: boolean;
}

export function SceneController({ progress, isMobile = false }: SceneControllerProps) {
  const { camera } = useThree();
  const currentLook = useRef(new THREE.Vector3());
  const targetPos = useRef(new THREE.Vector3());
  const targetLook = useRef(new THREE.Vector3());
  const stages = isMobile ? MOBILE_STAGES : DESKTOP_STAGES;

  useFrame(() => {
    const stageFloat = progress * (stages.length - 1);
    const stageIndex = Math.min(Math.floor(stageFloat), stages.length - 2);
    const t = stageFloat - stageIndex;

    const from = stages[stageIndex];
    const to = stages[stageIndex + 1];
    const fromFocus = FOCUS[stageIndex];
    const toFocus = FOCUS[Math.min(stageIndex + 1, FOCUS.length - 1)];

    targetPos.current.lerpVectors(from.pos, to.pos, t);
    targetLook.current.lerpVectors(fromFocus, toFocus, t);

    camera.position.lerp(targetPos.current, 0.06);
    currentLook.current.lerp(targetLook.current, 0.06);

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(from.fov, to.fov, t);
      camera.updateProjectionMatrix();
    }

    camera.lookAt(currentLook.current);
  });

  return null;
}
