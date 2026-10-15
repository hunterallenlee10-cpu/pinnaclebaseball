"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "@/components/hooks/useReducedMotion";
import { ArrowRight } from "@phosphor-icons/react";
import { ButtonLink } from "@/components/ui/Button";
import { bookHref, bookLabel } from "@/content/site";

/*
  Scroll-linked transforms always span the full 0 to 1 range. Motion accelerates them with the
  browser's ScrollTimeline, and a partial range gets an implicit keyframe back to the element's
  base value at the end, which would fade the copy back in.
*/

/**
 * "Down the Tunnel." The facility photo looks straight down a batting tunnel at the
 * Pinnacle logo. Scrolling pushes the camera toward that logo, the hero copy falls away,
 * and the academy's founding idea takes its place.
 */
export function TunnelHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.9]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.22, 1], [1, 0, 0]);
  const copyY = useTransform(scrollYProgress, [0, 0.22, 1], [0, -60, -60]);
  const shade = useTransform(scrollYProgress, [0, 0.2, 0.65, 1], [0, 0, 0.72, 0.72]);
  const line1 = useTransform(scrollYProgress, [0, 0.36, 0.5, 1], [0, 0, 1, 1]);
  const line2 = useTransform(scrollYProgress, [0, 0.5, 0.64, 1], [0, 0, 1, 1]);
  const line3 = useTransform(scrollYProgress, [0, 0.64, 0.78, 1], [0, 0, 1, 1]);
  const line1Y = useTransform(line1, [0, 1], [40, 0]);
  const line2Y = useTransform(line2, [0, 1], [40, 0]);
  const line3Y = useTransform(line3, [0, 1], [24, 0]);
  // Hidden (not just transparent) until the scroll reaches it, so a font swap cannot register as a layout shift.
  const statementVisibility = useTransform(scrollYProgress, (v) => (v > 0.3 ? "visible" : "hidden"));

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className={reduce ? "relative" : "relative h-[260dvh]"}
    >
      <div className="sticky top-0 h-dvh min-h-[560px] overflow-hidden bg-night">
        <motion.div
          className="absolute inset-0 origin-[50%_28%] will-change-transform"
          style={reduce ? undefined : { scale }}
        >
          <Image
            src="/images/tunnel.jpg"
            alt="Looking down a Pinnacle batting tunnel toward the academy logo, with a pitching mound in the foreground"
            fill
            preload
            fetchPriority="high"
            quality={80}
            sizes="100vw"
            className="object-cover object-[50%_35%]"
          />
        </motion.div>

        {/* Legibility scrims */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night via-night/45 to-night/30" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-night/80 via-night/20 to-transparent" />
        <motion.div aria-hidden className="absolute inset-0 bg-night" style={{ opacity: reduce ? 0 : shade }} />

        <motion.div
          className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-end px-4 pb-24 pt-(--header-h) sm:px-6 sm:pb-16 lg:px-10 lg:pb-20"
          style={reduce ? undefined : { opacity: copyOpacity, y: copyY }}
        >
          <h1 id="hero-title" className="display text-[clamp(4.5rem,15vw,12.5rem)] leading-[0.82] text-chalk">
            <span className="block overflow-hidden">
              <span className="block animate-rise [animation-delay:80ms]">Find your</span>
            </span>
            <span className="block overflow-hidden pb-[0.04em]">
              <span className="block animate-rise text-sky [animation-delay:180ms]">peak.</span>
            </span>
          </h1>
          <div className="mt-6 flex max-w-xl animate-lift flex-col gap-7 [animation-delay:350ms] sm:mt-8">
            <p className="text-lg leading-relaxed text-chalk/85 sm:text-xl">
              Private pitching, hitting and fielding lessons in Spotsylvania, Virginia, from a former first-round MLB
              draft pick.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={bookHref}>
                {bookLabel} <ArrowRight size={18} weight="bold" aria-hidden />
              </ButtonLink>
              <ButtonLink href="/training/" variant="ghost">
                See Programs
              </ButtonLink>
            </div>
          </div>
        </motion.div>

        {!reduce && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 grid place-items-center px-6 text-center"
            style={{ visibility: statementVisibility }}
          >
            <div className="flex flex-col items-center gap-2">
              <motion.p
                className="display text-[clamp(2.75rem,8vw,7rem)] text-chalk"
                style={{ opacity: line1, y: line1Y }}
              >
                Every player has a peak.
              </motion.p>
              <motion.p
                className="display text-[clamp(2.75rem,8vw,7rem)] text-sky"
                style={{ opacity: line2, y: line2Y }}
              >
                Most never find it.
              </motion.p>
              <motion.p
                className="mt-6 max-w-md text-lg text-chalk/80 sm:text-xl"
                style={{ opacity: line3, y: line3Y }}
              >
                Pinnacle exists to put players on the path to theirs.
              </motion.p>
            </div>
          </motion.div>
        )}
      </div>

      {/* The same statement for screen readers and reduced-motion visitors. */}
      <div className={reduce ? "bg-night px-6 py-24 text-center" : "sr-only"}>
        <p className="display text-[clamp(2.75rem,8vw,7rem)] text-chalk">Every player has a peak.</p>
        <p className="display text-[clamp(2.75rem,8vw,7rem)] text-sky">Most never find it.</p>
        <p className="mx-auto mt-6 max-w-md text-lg text-chalk/80">
          Pinnacle exists to put players on the path to theirs.
        </p>
      </div>
    </section>
  );
}
