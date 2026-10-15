"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "@/components/hooks/useReducedMotion";
import { ArrowRight, Quotes } from "@phosphor-icons/react";
import type { Alum } from "@/content/alumni";
import { QuoteDialog } from "@/components/alumni/QuoteDialog";
import { useMediaQuery } from "@/components/hooks/useMediaQuery";

function AlumCard({ alum, onOpen }: { alum: Alum; onOpen: () => void }) {
  return (
    <article className="group relative flex w-[78vw] shrink-0 snap-start flex-col sm:w-[46vw] lg:w-[min(30vw,420px)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-navy-2">
        <Image
          src={alum.image.src}
          alt={alum.image.alt}
          fill
          quality={70}
          sizes="(min-width: 1024px) 420px, (min-width: 640px) 46vw, 78vw"
          className="object-cover grayscale-[0.35] transition-[transform,filter] duration-700 ease-out-expo group-hover:scale-105 group-hover:grayscale-0"
          style={{ objectPosition: alum.image.position }}
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night via-night/10 to-transparent" />
        <h3 className="display absolute inset-x-5 bottom-4 text-[3.25rem] leading-[0.85] text-chalk">
          {alum.first}
          <br />
          <span className="text-sky">{alum.last}</span>
        </h3>
      </div>
      <blockquote className="mt-5 flex gap-3">
        <Quotes size={22} weight="fill" aria-hidden className="mt-1 shrink-0 text-sky" />
        <p className="text-chalk/85">{alum.excerpt}</p>
      </blockquote>
      <button
        type="button"
        onClick={onOpen}
        className="mt-4 inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-sky underline-offset-4 hover:underline after:absolute after:inset-0 after:content-['']"
      >
        Read the full story
        <span className="sr-only">
          {" "}
          from {alum.first} {alum.last}
        </span>
        <ArrowRight size={14} weight="bold" aria-hidden />
      </button>
    </article>
  );
}

/**
 * "The Pipeline." Alumni in their own words. On desktop the vertical scroll pans the row
 * sideways; on smaller screens it is a native swipe row with snap points.
 */
export function Pipeline({ alumni }: { alumni: Alum[] }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const pan = isDesktop && !reduce;
  const [distance, setDistance] = useState(0);
  const [open, setOpen] = useState<Alum | null>(null);

  useLayoutEffect(() => {
    const el = track.current;
    if (!el || !pan) return;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pan]);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={section}
      aria-labelledby="pipeline-title"
      className="relative bg-navy"
      style={pan ? { height: `calc(100dvh + ${distance}px)` } : undefined}
    >
      <div className={pan ? "sticky top-0 flex h-dvh flex-col justify-center overflow-hidden" : "py-24 sm:py-32"}>
        <motion.div
          ref={track}
          style={pan ? { x } : undefined}
          className={`flex gap-5 px-4 sm:gap-8 sm:px-6 lg:px-10 ${
            pan ? "w-max items-end" : "snap-x snap-mandatory overflow-x-auto pb-6 [scrollbar-width:none]"
          }`}
        >
          <div className="flex w-[84vw] shrink-0 snap-start flex-col justify-end sm:w-[56vw] lg:w-[min(36vw,520px)] lg:pb-24">
            <h2 id="pipeline-title" className="display text-[clamp(3.5rem,8vw,7.5rem)] text-chalk">
              The
              <br />
              Pipeline
            </h2>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-mist">
              More than 200 players Chris has coached went on to play college baseball. A few of them, in their own
              words.
            </p>
            <Link
              href="/alumni/"
              className="mt-8 inline-flex w-fit items-center gap-2 border-b border-sky pb-1 font-medium text-sky transition-colors hover:text-chalk"
            >
              Meet our alumni <ArrowRight size={16} weight="bold" aria-hidden />
            </Link>
          </div>
          {alumni.map((a) => (
            <AlumCard key={a.slug} alum={a} onOpen={() => setOpen(a)} />
          ))}
          <div aria-hidden className="w-1 shrink-0 lg:w-[4vw]" />
        </motion.div>

        {pan && (
          <div aria-hidden className="mx-10 mt-12 h-px bg-chalk/10">
            <motion.div className="h-px bg-sky" style={{ width: bar }} />
          </div>
        )}
      </div>
      <QuoteDialog alum={open} onClose={() => setOpen(null)} />
    </section>
  );
}
