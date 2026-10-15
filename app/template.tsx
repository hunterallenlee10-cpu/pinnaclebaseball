"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/components/hooks/useReducedMotion";

// Set after the first mount in the browser. The server never renders the curtain, so it can
// never sit over a page while it waits to hydrate.
let hasMounted = false;

/** Route transition: a navy curtain lifts off the incoming page on client-side navigation. */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  // False on the server and on the first client render (so hydration matches); true for every
  // later navigation, where the new template mounts on the client with the curtain already in place.
  const [animate] = useState(() => typeof window !== "undefined" && hasMounted);

  useEffect(() => {
    hasMounted = true;
  }, []);

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
