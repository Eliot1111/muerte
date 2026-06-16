import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { METAL, COLORS } from './config';

interface MexicanOrnamentProps {
  visible?: number;
}

export function MexicanOrnament({ visible = 1 }: MexicanOrnamentProps) {
  const groupRef = useRef<THREE.Group>(null);

  const [colorMap, normalMap, roughnessMap, metalnessMap] = useTexture([
    METAL.color,
    METAL.normal,
    METAL.roughness,
    METAL.metalness,
  ]);

  const material = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      map: colorMap,
      normalMap,
      roughnessMap,
      metalnessMap,
      metalness: 1,
      roughness: 0.35,
      color: new THREE.Color(COLORS.gold),
      emissive: new THREE.Color('#2a0808'),
      emissiveIntensity: 0.12,
    });
    colorMap.colorSpace = THREE.SRGBColorSpace;
    return mat;
  }, [colorMap, normalMap, roughnessMap, metalnessMap]);

  useFrame((state) => {
    if (!groupRef.current || visible < 0.01) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = 0.25 + t * 0.12;
    groupRef.current.scale.setScalar(visible);
    material.emissiveIntensity = 0.12 + Math.sin(t * 0.5) * 0.05;
  });

  if (visible < 0.01) return null;

  return (
    <group ref={groupRef} position={[-0.6, 0.35, -0.8]} rotation={[0, 0.25, 0]}>
      <mesh material={material} castShadow receiveShadow>
        <planeGeometry args={[2.4, 3.2, 1, 1]} />
      </mesh>
      <pointLight position={[0, 0, 1.5]} color={COLORS.redGlow} intensity={0.5 * visible} distance={5} />
    </group>
  );
}
