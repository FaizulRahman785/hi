import { useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';

export function useScrollReveal(options?: { once?: boolean; margin?: string }) {
  const ref = useRef(null);
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Pass margin as a properly-typed cast to satisfy framer-motion's MarginType
  const inViewOptions = {
    once: options?.once ?? true,
    ...(options?.margin ? { margin: options.margin as `${number}px` } : {}),
  };

  const isInView = useInView(ref, inViewOptions);

  // When motion is reduced, both hidden and visible are the same (no movement)
  const variants: Record<string, Variants> = {
    fadeUp: prefersReduced
      ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
      : { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
    fadeLeft: prefersReduced
      ? { hidden: { opacity: 1, x: 0 }, visible: { opacity: 1, x: 0 } }
      : { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
    fadeRight: prefersReduced
      ? { hidden: { opacity: 1, x: 0 }, visible: { opacity: 1, x: 0 } }
      : { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
    scaleIn: prefersReduced
      ? { hidden: { opacity: 1, scale: 1 }, visible: { opacity: 1, scale: 1 } }
      : { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1 } },
    blurIn: prefersReduced
      ? { hidden: { opacity: 1, filter: 'blur(0px)' }, visible: { opacity: 1, filter: 'blur(0px)' } }
      : { hidden: { opacity: 0, filter: 'blur(10px)' }, visible: { opacity: 1, filter: 'blur(0px)' } },
  };

  return { ref, isInView, variants };
}
