"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useReducedMotion } from "@/components/hooks/useReducedMotion";
import { ArrowsClockwise } from "@phosphor-icons/react";
import { stowe } from "@/content/coach";

/**
 * Chris Stowe's real 1997 Bowman rookie card. Tap, click or press Enter to flip it
 * and read the stat line on the back. On desktop it tilts toward the pointer.
 */
export function BaseballCard({ className = "" }: { className?: string }) {
  const [flipped, setFlipped] = useState(false);
  const reduce = useReducedMotion();

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const tiltX = useSpring(useTransform(py, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 18 });
  const tiltY = useSpring(useTransform(px, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 18 });
  const glare = useTransform(
    px,
    [-0.5, 0.5],
    [
      "radial-gradient(circle at 0% 20%, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0) 55%)",
      "radial-gradient(circle at 100% 20%, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0) 55%)",
    ],
  );

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  const { cardFront } = stowe.images;

  return (
    <div className={`flex flex-col items-center gap-5 ${className}`}>
      {/* Clicking the card is a pointer convenience; the button below is the accessible control. */}
      <motion.div
        onClick={() => setFlipped((f) => !f)}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="relative aspect-[374/500] w-full max-w-[340px] cursor-pointer [perspective:1400px]"
        style={reduce ? undefined : { rotateX: tiltX, rotateY: tiltY, transformPerspective: 1400 }}
      >
        <motion.span
          className="absolute inset-0 block [transform-style:preserve-3d]"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 70, damping: 14 }}
        >
          {/* Front */}
          <span
            aria-hidden={flipped}
            className="absolute inset-0 block overflow-hidden rounded-[10px] shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)] ring-1 ring-chalk/15 [backface-visibility:hidden]"
          >
            <Image
              src={cardFront.src}
              alt={cardFront.alt}
              fill
              quality={80}
              sizes="340px"
              className="object-cover"
            />
            {!reduce && (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                style={{ background: glare }}
              />
            )}
          </span>

          {/* Back */}
          <span
            aria-hidden={!flipped}
            className="absolute inset-0 flex flex-col overflow-hidden rounded-[10px] bg-[#e9e4d6] p-4 text-left text-night shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)] [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-5"
          >
            <span className="flex items-start justify-between border-b-2 border-indigo pb-2">
              <span>
                <span className="display block text-3xl text-indigo">{stowe.name}</span>
                <span className="stat block text-[0.68rem] uppercase tracking-wider">
                  {stowe.draft.team} &middot; {stowe.position}
                </span>
              </span>
              <span className="stat bg-indigo px-2 py-1 text-[0.68rem] font-bold text-chalk">{stowe.draft.year}</span>
            </span>
            <span className="stat mt-3 block bg-indigo px-2 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-chalk">
              Stats when drafted
            </span>
            <span className="mt-2 grid grid-cols-3 gap-px bg-indigo/25">
              {stowe.draftStats.map((s) => (
                <span key={s.label} className="flex flex-col bg-[#e9e4d6] px-1.5 py-2">
                  <span className="stat text-[0.6rem] uppercase tracking-wide text-indigo/80">{s.label}</span>
                  <span className="stat text-base font-bold leading-tight">{s.value}</span>
                </span>
              ))}
            </span>
            <span className="stat mt-3 block bg-indigo px-2 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-chalk">
              Scouting report
            </span>
            <span className="mt-2 block space-y-1 text-[0.72rem] leading-snug">
              {stowe.feats.map((f) => (
                <span key={f} className="block">
                  {f}.
                </span>
              ))}
            </span>
            <span className="stat mt-auto flex items-end justify-between pt-2 text-[0.6rem] uppercase tracking-wider text-indigo/80">
              <span>
                {stowe.draft.round} {stowe.draft.pick}
              </span>
              <span>Pinnacle Baseball Academy</span>
            </span>
          </span>
        </motion.span>
      </motion.div>
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        className="flex min-h-11 items-center gap-2 px-3 font-mono text-xs uppercase tracking-[0.18em] text-mist transition-colors hover:text-chalk"
      >
        <ArrowsClockwise size={14} weight="bold" aria-hidden />
        {flipped ? "Flip back" : "Flip the card"}
        <span className="sr-only">: Chris Stowe&apos;s 1997 rookie card and stats</span>
      </button>
    </div>
  );
}
