"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import type { Program } from "@/content/programs";

/**
 * A big typographic index of programs. On desktop, hovering or focusing a row swaps the
 * photo in the sticky preview. On mobile each row carries its own photo.
 */
export function ProgramIndex({ programs }: { programs: Program[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = programs[active];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-16">
      <ol className="border-t border-chalk/10">
        {programs.map((p, i) => (
          <li key={p.id} className="border-b border-chalk/10">
            <Link
              href={`/training/#${p.id}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 gap-y-2 py-6 sm:gap-x-8 lg:py-8"
            >
              <span className="stat text-sm text-haze transition-colors group-hover:text-sky">
                0{i + 1}
              </span>
              <span>
                <span
                  className={`display block text-[clamp(2.5rem,6vw,4.75rem)] transition-colors duration-300 ${
                    active === i ? "text-chalk" : "text-chalk/45 lg:text-chalk/35"
                  } group-hover:text-chalk`}
                >
                  {p.name}
                </span>
                <span className="mt-2 block max-w-md text-mist">{p.summary}</span>
              </span>
              <ArrowUpRight
                size={28}
                weight="bold"
                aria-hidden
                className="self-center text-chalk/30 transition-all duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-sky"
              />
              <span className="relative col-span-3 mt-4 block aspect-[4/3] overflow-hidden lg:hidden">
                <Image
                  src={p.image.src}
                  alt={p.image.alt}
                  fill
                  quality={70}
                  sizes="(max-width: 1024px) 100vw, 0px"
                  className="object-cover"
                />
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <div className="relative hidden lg:block">
        <div className="sticky top-28 aspect-[4/5] w-full overflow-hidden bg-navy-2">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={current.id}
              className="absolute inset-0"
              initial={reduce ? { opacity: 0 } : { clipPath: "inset(100% 0 0 0)", scale: 1.08 }}
              animate={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0 0 0)", scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0.6 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={current.image.src}
                alt={current.image.alt}
                fill
                quality={70}
                sizes="(min-width: 1024px) 40vw, 0px"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
