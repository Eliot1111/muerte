import { Suspense, lazy, Component, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { useIsMobile, usePrefersReducedMotion } from '../hooks/useMediaQuery';
import { PostProcessing } from './PostProcessing';
import './preload';
import './Canvas3D.css';

const HeroScene = lazy(() =>
  import('./HeroScene').then((m) => ({ default: m.HeroScene }))
);

const ScrollScene = lazy(() =>
  import('./ScrollScene').then((m) => ({ default: m.ScrollScene }))
);

const glConfig = {
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance' as const,
  toneMapping: THREE.ACESFilmicToneMapping,
  toneMappingExposure: 1.05,
};

interface CanvasErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface CanvasErrorBoundaryState {
  hasError: boolean;
}

class CanvasErrorBoundary extends Component<
  CanvasErrorBoundaryProps,
  CanvasErrorBoundaryState
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

interface Canvas3DProps {
  className?: string;
}

export function HeroCanvas({ className = '' }: Canvas3DProps) {
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return <div className={`canvas-fallback ${className}`} aria-hidden="true" />;
  }

  return (
    <CanvasErrorBoundary
      fallback={<div className={`canvas-fallback ${className}`} aria-hidden="true" />}
    >
      <div className={`canvas-wrap ${className}`}>
        <Canvas
          shadows
          dpr={isMobile ? [1, 1.4] : [1, 2]}
          camera={{
            position: isMobile ? [0, 0.15, 7.5] : [0, 0.25, 5],
            fov: isMobile ? 45 : 35,
          }}
          gl={glConfig}
          onCreated={({ gl, scene }) => {
            gl.setClearColor(0x000000, 0);
            scene.background = null;
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
          }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <HeroScene />
            <PostProcessing enabled={!isMobile} />
          </Suspense>
        </Canvas>
      </div>
    </CanvasErrorBoundary>
  );
}

interface ScrollCanvasProps {
  progress: number;
  className?: string;
}

export function ScrollCanvas({ progress, className = '' }: ScrollCanvasProps) {
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return (
      <div className={`canvas-fallback canvas-fallback--scroll ${className}`} aria-hidden="true" />
    );
  }

  return (
    <CanvasErrorBoundary
      fallback={<div className={`canvas-fallback canvas-fallback--scroll ${className}`} />}
    >
      <div className={`canvas-wrap canvas-wrap--scroll ${className}`}>
        <Canvas
          shadows
          dpr={isMobile ? [1, 1.4] : [1, 2]}
          camera={{
            position: isMobile ? [0, 0.2, 7.5] : [0, 0.3, 5],
            fov: isMobile ? 45 : 35,
          }}
          gl={glConfig}
          onCreated={({ gl, scene }) => {
            gl.setClearColor(0x000000, 0);
            scene.background = null;
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
          }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <ScrollScene progress={progress} />
            <PostProcessing enabled={!isMobile} />
          </Suspense>
        </Canvas>
      </div>
    </CanvasErrorBoundary>
  );
}
