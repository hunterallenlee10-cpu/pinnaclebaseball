"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";
import { useReducedMotion } from "@/components/hooks/useReducedMotion";

/**
 * Counts up to `value` once when scrolled into view. Writes to the DOM directly, no re-renders.
 * Assistive tech and crawlers always read the real value from the visually hidden copy.
 */
export function Counter({ value, duration = 1.8, className }: { value: number; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      el.textContent = String(value);
      return;
    }
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = Math.round(v).toString();
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value, duration]);

  return (
    <span className={className}>
      <span className="sr-only">{value}</span>
      <span ref={ref} aria-hidden>
        0
      </span>
    </span>
  );
}
