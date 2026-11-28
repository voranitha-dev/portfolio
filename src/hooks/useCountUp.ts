import { useEffect, useState } from 'react';

/** Animates from 0 → target once `start` becomes true (easeOutCubic). */
export function useCountUp(target: number, start: boolean, durationMs = 1600): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setValue(target);
      return;
    }
    let frame = 0;
    const startedAt = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, start, durationMs]);

  return value;
}
