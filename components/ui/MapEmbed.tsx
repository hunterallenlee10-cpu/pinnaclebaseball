"use client";

import { useState } from "react";
import { MapPin } from "@phosphor-icons/react";
import { fullAddress, site } from "@/content/site";

/** Click-to-load Google map, so the heavy iframe never costs anything until someone wants it. */
export function MapEmbed({ className = "" }: { className?: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-navy-2 ${className}`}>
      {loaded ? (
        <iframe
          title={`Map to ${site.name}`}
          src={site.mapsEmbedUrl}
          className="absolute inset-0 h-full w-full border-0 [filter:invert(0.9)_hue-rotate(180deg)_saturate(0.6)]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="group absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[linear-gradient(rgb(145_179_224/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(145_179_224/0.06)_1px,transparent_1px)] bg-[size:40px_40px] p-6 text-center"
        >
          <span className="grid h-16 w-16 place-items-center rounded-full bg-sky text-night transition-transform duration-500 ease-out-expo group-hover:-translate-y-1">
            <MapPin size={30} weight="fill" aria-hidden />
          </span>
          <span className="display text-3xl text-chalk">Show the map</span>
          <span className="text-sm text-mist">{fullAddress}</span>
        </button>
      )}
    </div>
  );
}
