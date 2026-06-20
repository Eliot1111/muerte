import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { centerAndScale, enhanceMeshMaterials } from './enhanceMaterials';

interface LoadedModelProps {
  path: string;
  profile?: 'skull' | 'product' | 'food' | 'default';
  targetHeight?: number;
  visible?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  interactive?: boolean;
  floatIntensity?: number;
  rotateSpeed?: number;
}

export function LoadedModel({
  path,
  profile = 'default',
  targetHeight = 2.2,
  visible = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  interactive = false,
  floatIntensity = 0,
  rotateSpeed = 0.05,
}: LoadedModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(path);

  const model = useMemo(() => {
    const clone = scene.clone(true);
    centerAndScale(clone, targetHeight);
    enhanceMeshMaterials(clone, profile);
    return clone;
  }, [scene, profile, targetHeight]);

  useFrame((state) => {
    if (!groupRef.current || visible < 0.01) return;
    const t = state.clock.elapsedTime;

    if (interactive) {
      groupRef.current.rotation.y =
        rotation[1] + t * 0.08 + state.pointer.x * 0.35;
      groupRef.current.rotation.x =
        rotation[0] + state.pointer.y * 0.12 + Math.sin(t * 0.2) * 0.03;
      groupRef.current.rotation.z = rotation[2];
    } else {
      groupRef.current.rotation.set(
        rotation[0],
        rotation[1] + t * rotateSpeed,
        rotation[2]
      );
    }

    if (floatIntensity > 0) {
      groupRef.current.position.y =
        position[1] + Math.sin(t * 0.6) * floatIntensity;
    } else {
      groupRef.current.position.set(position[0], position[1], position[2]);
    }

    groupRef.current.scale.setScalar(visible);
  });

  if (visible < 0.01) return null;

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <primitive object={model} />
    </group>
  );
}
