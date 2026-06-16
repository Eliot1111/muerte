import { useRef, useState, useCallback, type MouseEvent } from 'react';

interface MagneticOptions {
  strength?: number;
}

export function useMagnetic({ strength = 0.35 }: MagneticOptions = {}) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setTransform({ x: x * strength, y: y * strength });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    setTransform({ x: 0, y: 0 });
  }, []);

  return { ref, transform, handleMouseMove, handleMouseLeave };
}
