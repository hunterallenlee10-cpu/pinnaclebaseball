"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { X } from "@phosphor-icons/react";
import type { Alum } from "@/content/alumni";

/** Full testimonial in a native modal dialog (focus trapping and Escape come for free). */
export function QuoteDialog({ alum, onClose }: { alum: Alum | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (alum && !d.open) d.showModal();
    if (!alum && d.open) d.close();
  }, [alum]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      aria-labelledby="quote-dialog-title"
      className="m-auto max-h-[90dvh] w-[min(920px,calc(100vw-2rem))] overflow-hidden bg-navy-2 p-0 text-chalk shadow-2xl ring-1 ring-chalk/10 backdrop:bg-night/80 backdrop:backdrop-blur-sm open:animate-[dialog-in_0.5s_var(--ease-out-expo)]"
    >
      {alum && (
        <div className="grid max-h-[90dvh] overflow-y-auto md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[520px]">
            <Image
              src={alum.image.src}
              alt={alum.image.alt}
              fill
              quality={80}
              sizes="(min-width: 768px) 420px, 100vw"
              className="object-cover"
              style={{ objectPosition: alum.image.position }}
            />
          </div>
          <div className="flex flex-col gap-6 p-6 sm:p-10">
            <div className="flex items-start justify-between gap-4">
              <h2 id="quote-dialog-title" className="display text-5xl sm:text-6xl">
                {alum.first}
                <br />
                <span className="text-sky">{alum.last}</span>
              </h2>
              <form method="dialog">
                <button
                  type="submit"
                  aria-label="Close"
                  className="grid h-11 w-11 place-items-center border border-chalk/20 transition-colors hover:border-chalk"
                >
                  <X size={20} weight="bold" />
                </button>
              </form>
            </div>
            {alum.destination && <p className="font-mono text-sm uppercase tracking-[0.18em] text-sky">{alum.destination}</p>}
            <blockquote className="text-lg leading-relaxed text-chalk/90">
              <p>&ldquo;{alum.quote}&rdquo;</p>
            </blockquote>
            <p className="mt-auto text-sm text-haze">
              {alum.first} {alum.last}, Pinnacle Baseball alum
            </p>
          </div>
        </div>
      )}
    </dialog>
  );
}
