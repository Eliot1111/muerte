import { Sparkles, Cloud } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { COLORS } from './config';

interface FallbackProps {
  visible?: number;
}

/** Premium atmospheric fallback — no low-poly primitives */
export function BarAmbience({ visible = 1 }: FallbackProps) {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!lightRef.current || visible < 0.01) return;
    const t = state.clock.elapsedTime;
    lightRef.current.intensity = 1.2 * visible + Math.sin(t * 0.8) * 0.15;
  });

  if (visible < 0.01) return null;

  return (
    <group>
      <pointLight
        ref={lightRef}
        position={[0, 0.5, 1]}
        color={COLORS.amber}
        intensity={1.2}
        distance={6}
      />
      <spotLight
        position={[2, 3, 4]}
        angle={0.25}
        penumbra={1}
        intensity={2 * visible}
        color="#ffecd0"
        castShadow
      />
      <Sparkles
        count={visible > 0.5 ? 40 : 20}
        scale={[2.5, 2, 2]}
        size={2}
        speed={0.2}
        color={COLORS.amber}
        opacity={0.55 * visible}
      />
      <Cloud
        opacity={0.08 * visible}
        speed={0.1}
        bounds={[4, 1, 2]}
        segments={12}
        color="#888"
        position={[0, -0.5, 0]}
      />
      {/* Put high-quality GLB here: public/models/mezcal-bottle.glb */}
    </group>
  );
}

export function AgaveAmbience({ visible = 1 }: FallbackProps) {
  if (visible < 0.01) return null;

  return (
    <group position={[0, -0.5, 0]}>
      <pointLight
        position={[0, 1, 2]}
        color={COLORS.agave}
        intensity={0.8 * visible}
        distance={5}
      />
      <Sparkles
        count={50}
        scale={[3, 4, 2]}
        size={1.8}
        speed={0.15}
        color="#2d5a45"
        opacity={0.45 * visible}
      />
      <Sparkles
        count={20}
        scale={[2, 3, 1.5]}
        size={1.2}
        speed={0.1}
        color={COLORS.amber}
        opacity={0.2 * visible}
      />
      {/* Put high-quality GLB here: public/models/agave.glb */}
    </group>
  );
}

export function FoodAmbience({ visible = 1 }: FallbackProps) {
  if (visible < 0.01) return null;

  return (
    <group>
      <spotLight
        position={[1, 3, 3]}
        angle={0.3}
        penumbra={1}
        intensity={2.2 * visible}
        color="#fff5e6"
        castShadow
      />
      <pointLight position={[-1, 0, 2]} color="#c41e3a" intensity={0.6 * visible} />
      <Sparkles
        count={35}
        scale={[2, 1.5, 2]}
        size={1.5}
        speed={0.12}
        color="#d4af37"
        opacity={0.35 * visible}
      />
      <Sparkles
        count={15}
        scale={[1.5, 1, 1.5]}
        size={1}
        speed={0.08}
        color="#4a7c3f"
        opacity={0.25 * visible}
      />
      {/* Put high-quality GLB here: public/models/taco.glb */}
    </group>
  );
}

export function ContactAmbience({ visible = 1 }: FallbackProps) {
  if (visible < 0.01) return null;

  return (
    <group>
      <pointLight position={[0, 1, 2]} color={COLORS.gold} intensity={0.5 * visible} />
      <Sparkles
        count={25}
        scale={[4, 2, 3]}
        size={1}
        speed={0.05}
        color={COLORS.bone}
        opacity={0.2 * visible}
      />
    </group>
  );
}
