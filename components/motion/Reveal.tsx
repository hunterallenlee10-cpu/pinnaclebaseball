"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/components/hooks/useReducedMotion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section" | "figure" | "p";
};

/** Fades and lifts content into place the first time it enters the viewport. */
export function Reveal({ children, className, delay = 0, y = 28, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}

/**
 * Reveals a headline line by line, each line rising out of a mask. The heading itself is
 * observed (the masked lines start out of view, so they cannot trigger themselves).
 */
export function LineReveal({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  as = "h2",
  id,
}: {
  id?: string;
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3";
}) {
  const reduce = useReducedMotion();

  // Page titles sit above the fold: animate them with CSS so they start at first paint.
  if (as === "h1") {
    return (
      <h1 id={id} className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-[0.06em]">
            <span
              className={`block animate-rise ${lineClassName}`}
              style={{ animationDelay: `${Math.round((delay + i * 0.09) * 1000) + 60}ms` }}
            >
              {line}
            </span>
          </span>
        ))}
      </h1>
    );
  }

  const Tag = motion[as];
  return (
    <Tag
      id={id}
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: 0.09, delayChildren: delay }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className={`block ${lineClassName}`}
            variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
