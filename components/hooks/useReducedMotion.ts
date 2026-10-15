"use client";

import { useMediaQuery } from "@/components/hooks/useMediaQuery";

/**
 * Hydration-safe reduced-motion preference. Motion's own hook reads the media query during the
 * first client render, which can disagree with the server HTML. This one starts as `false` on
 * both, then updates right after hydration.
 */
export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
