"use client";

import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

// The very first page load gets no curtain, so nothing ever covers the hero while it paints.
let firstLoad = true;

/** Route transition: a navy curtain lifts off the incoming page on client-side navigation. */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const [animate] = useState(() => {
    const isFirst = firstLoad;
    firstLoad = false;
    return !isFirst;
  });

  return (
    <>
      {animate && !reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-50 origin-top bg-night"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
      {children}
    </>
  );
}
