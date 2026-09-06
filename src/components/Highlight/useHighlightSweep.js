import { useEffect, useRef, useState } from 'react';

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

/**
 * Drives the highlighter sweep on a single `.mark`.
 *
 * Starts at `idle` (highlight clipped to zero width), flips to `in` the first
 * time the phrase scrolls into view, then stops observing — the sweep runs
 * once and the highlight stays painted afterwards.
 *
 * Falls straight to `done` when the visitor prefers reduced motion or the
 * browser has no IntersectionObserver, so the highlight is simply there.
 * The reduced-motion case is also enforced in CSS, which is what actually
 * guarantees no animation.
 */
export function useHighlightSweep() {
  const ref = useRef(null);
  const [sweep, setSweep] = useState('idle');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia?.(REDUCED_MOTION).matches;
    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      setSweep('done');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setSweep('in');
            observer.disconnect();
            break;
          }
        }
      },
      // Fire a little after the phrase clears the bottom edge, so the sweep
      // is visible rather than already finished by the time it is read.
      { threshold: 0, rootMargin: '0px 0px -12% 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, sweep];
}
