"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { useMediaQuery } from "@/components/hooks/useMediaQuery";
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { ButtonLink } from "@/components/ui/Button";
import { velocity } from "@/content/velocity";

const Embers = dynamic(() => import("./Embers").then((m) => m.Embers), { ssr: false });

const SEGMENTS = 26;
const START = -125;
const SWEEP = 250;
const CX = 200;
const CY = 200;

function polar(angle: number, r: number) {
  const a = ((angle - 90) * Math.PI) / 180;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)] as const;
}

function segmentPath(i: number) {
  const gap = 2.2;
  const a0 = START + (SWEEP / SEGMENTS) * i + gap / 2;
  const a1 = START + (SWEEP / SEGMENTS) * (i + 1) - gap / 2;
  const [x0, y0] = polar(a0, 176);
  const [x1, y1] = polar(a1, 176);
  const [x2, y2] = polar(a1, 140);
  const [x3, y3] = polar(a0, 140);
  return `M${x0} ${y0} A176 176 0 0 1 ${x1} ${y1} L${x2} ${y2} A140 140 0 0 0 ${x3} ${y3}Z`;
}

function segmentColor(i: number) {
  const t = i / (SEGMENTS - 1);
  if (t < 0.62) return "var(--color-chalk)";
  if (t < 0.86) return "var(--color-sky)";
  return "var(--color-fire)";
}

function Segment({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const at = i / SEGMENTS;
  const from = Math.max(0.001, at - 0.02);
  const to = Math.min(0.999, at + 0.04);
  const opacity = useTransform(progress, [0, from, to, 1], [0.12, 0.12, 1, 1]);
  return <motion.path d={segmentPath(i)} fill={segmentColor(i)} style={{ opacity }} />;
}

function Pillar({ word, detail, at, progress }: { word: string; detail: string; at: number; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, at - 0.12, at, 1], [0.3, 0.3, 1, 1]);
  const x = useTransform(progress, [0, at - 0.12, at, 1], [-12, -12, 0, 0]);
  return (
    <motion.li style={{ opacity, x }} className="border-l-2 border-fire/70 pl-4">
      <p className="display text-4xl text-chalk">{word}.</p>
      <p className="mt-1 max-w-sm text-sm leading-snug text-mist">{detail}</p>
    </motion.li>
  );
}

/**
 * Velocity365's speedometer, rebuilt from its logo. Scrolling sweeps the needle and fills the
 * dial; the readout climbs to 365, one for every day of the year-round program.
 */
export function VelocityGauge() {
  const ref = useRef<HTMLElement>(null);
  const dial = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  // Desktop pins the section and scrubs through it. Phones scroll normally and the dial
  // fills as it travels up the screen.
  const pinned = isDesktop && !reduce;
  const { scrollYProgress: pinnedProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const { scrollYProgress: flowProgress } = useScroll({ target: dial, offset: ["start end", "end 0.3"] });
  const scrollYProgress = pinned ? pinnedProgress : flowProgress;
  const progress = useTransform(scrollYProgress, [0, 0.05, 0.85, 1], [0, 0, 1, 1]);
  const full = useMotionValue(1);
  const live = reduce ? full : progress;
  const needle = useTransform(live, [0, 1], [START, START + SWEEP]);
  const readout = useTransform(live, (v) => String(Math.round(v * 365)).padStart(3, "0"));

  return (
    <section
      ref={ref}
      aria-labelledby="velocity-title"
      className={`relative bg-night ${pinned ? "h-[220dvh]" : ""}`}
    >
      <div className={`${pinned ? "sticky top-0 min-h-dvh" : ""} flex items-center overflow-hidden py-20 lg:py-16`}>
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_at_50%_100%,rgb(226_69_47/0.28),transparent_65%)]"
        />
        <Embers className="absolute inset-0 h-full w-full" />

        <div className="relative mx-auto grid w-full max-w-[1400px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-3">
              <Image
                src={velocity.logo.src}
                alt=""
                width={80}
                height={80}
                className="-ml-2 h-16 w-16 mix-blend-screen sm:h-20 sm:w-20"
              />
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-ember">{velocity.tagline}</p>
            </div>
            <h2 id="velocity-title" className="display mt-2 text-[clamp(3.5rem,8vw,6.5rem)] text-chalk">
              Velocity<span className="text-fire">365</span>
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-chalk/85">{velocity.description}</p>
            <ul className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-5">
              {velocity.pillars.map((p, i) => (
                <Pillar key={p.word} word={p.word} detail={p.detail} at={0.3 + i * 0.3} progress={live} />
              ))}
            </ul>
            <div className="mt-9">
              <ButtonLink href="/velocity365/" variant="fire">
                Explore Velocity365 <ArrowRight size={18} weight="bold" aria-hidden />
              </ButtonLink>
            </div>
          </div>

          <div ref={dial} className="order-1 mx-auto w-full max-w-[420px] lg:order-2 lg:max-w-[520px]">
            <svg viewBox="0 0 400 360" className="w-full" role="img" aria-label="Velocity365 gauge">
              {Array.from({ length: SEGMENTS }, (_, i) => (
                <Segment key={i} i={i} progress={live} />
              ))}
              <motion.g style={{ rotate: needle, originX: "200px", originY: "200px" }}>
                <path d="M196 200 L200 52 L204 200Z" fill="var(--color-chalk)" />
              </motion.g>
              <circle cx={CX} cy={CY} r="16" fill="var(--color-night)" stroke="var(--color-chalk)" strokeWidth="3" />
              <text
                x={CX}
                y="290"
                textAnchor="middle"
                className="fill-chalk font-mono text-[64px] font-semibold tabular-nums"
              >
                <motion.tspan>{readout}</motion.tspan>
              </text>
              <text
                x={CX}
                y="322"
                textAnchor="middle"
                className="fill-haze font-mono text-[13px] uppercase tracking-[0.3em]"
              >
                Days a year
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
