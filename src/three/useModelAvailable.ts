import { useEffect, useState } from 'react';

const cache = new Map<string, boolean>();

export function useModelAvailable(path: string): boolean | null {
  const [available, setAvailable] = useState<boolean | null>(() =>
    cache.has(path) ? cache.get(path)! : null
  );

  useEffect(() => {
    if (cache.has(path)) {
      setAvailable(cache.get(path)!);
      return;
    }

    let cancelled = false;

    fetch(path, { method: 'HEAD' })
      .then((res) => {
        if (cancelled) return;
        const ok = res.ok;
        cache.set(path, ok);
        setAvailable(ok);
      })
      .catch(() => {
        if (cancelled) return;
        cache.set(path, false);
        setAvailable(false);
      });

    return () => {
      cancelled = true;
    };
  }, [path]);

  return available;
}
