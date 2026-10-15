import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Phone } from "@phosphor-icons/react/ssr";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ButtonA } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { BookCTA } from "@/components/booking/BookCTA";
import { site } from "@/content/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "The Facility",
  description:
    "Tour Pinnacle Baseball Academy's indoor training facility at 6862 Old Courthouse Road, Spotsylvania, VA: turf tunnels, mounds and batting cages near Fredericksburg.",
  alternates: { canonical: "/facility/" },
};

const photos = [
  { src: "/images/tunnel.jpg", alt: "Looking down a batting tunnel toward the Pinnacle logo", w: 2048, h: 1365, caption: "The main tunnel." },
  { src: "/images/facility/agility.jpg", alt: "Players running drills on the turf", w: 1800, h: 2400, caption: "Drills on the turf." },
  { src: "/images/facility/bullpen.jpg", alt: "A pitcher throwing in the bullpen lane", w: 1800, h: 2400, caption: "Bullpen sessions." },
  { src: "/images/facility/tee-work.jpg", alt: "Players doing tee work", w: 1800, h: 2400, caption: "Tee work." },
  { src: "/images/card-wall-wide.jpg", alt: "The Action in 3 wall of player cards", w: 2048, h: 1024, caption: "The Action in 3 wall." },
  { src: "/images/facility/cage-hitter.jpg", alt: "A hitter in the batting cage", w: 1162, h: 1715, caption: "Cage work." },
  { src: "/images/facility/receiving.jpg", alt: "A catcher receiving a pitch", w: 585, h: 874, caption: "Catching and receiving." },
  { src: "/images/welcome-bear.jpg", alt: "A carved bear in a Pinnacle jersey holding a Welcome sign", w: 1365, h: 2048, caption: "Out front." },
  { src: "/images/facility/catch-play.jpg", alt: "A player playing catch inside the facility", w: 584, h: 880, caption: "Playing catch." },
];

export default function FacilityPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Facility", path: "/facility/" }])} />
      <PageHero
        title={["Inside the", <span key="b" className="text-sky">tunnel.</span>]}
        lead="Our indoor facility in Spotsylvania is where the work happens: turf tunnels, mounds and cages, open weekday evenings and weekend mornings."
        image={{ src: "/images/facility/tunnel-long.jpg", alt: "The long Pinnacle training tunnel with turf and netting", position: "50% 45%" }}
      />

      <section aria-label="Photo tour" className="py-24 sm:py-32">
        <Container>
          <div className="columns-1 gap-3 sm:columns-2 sm:gap-4 lg:columns-3">
            {photos.map((p, i) => (
              <Reveal as="figure" key={p.src} delay={(i % 3) * 0.06} className="group mb-3 break-inside-avoid sm:mb-4">
                <div className="overflow-hidden bg-navy-2">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={p.w}
                    height={p.h}
                    quality={70}
                    sizes="(min-width: 1024px) 31vw, (min-width: 640px) 47vw, 100vw"
                    className="h-auto w-full transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="mt-2 text-sm text-haze">{p.caption}</figcaption>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="visit-title" className="border-t border-chalk/8 bg-night py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="flex flex-col gap-8">
            <h2 id="visit-title" className="display text-[clamp(3rem,7vw,6rem)] text-chalk">
              Come see it.
            </h2>
            <address className="not-italic">
              <p className="text-xl text-chalk">{site.address.street}</p>
              <p className="text-xl text-chalk">
                {site.address.city}, {site.address.regionName} {site.address.postalCode}
              </p>
              <p className="mt-2 text-mist">{site.address.area}</p>
            </address>
            <dl className="space-y-4">
              {site.scheduleSummary.map((s) => (
                <div key={s.label} className="border-l-2 border-sky pl-4">
                  <dt className="font-mono text-xs uppercase tracking-[0.2em] text-sky">{s.label}</dt>
                  <dd className="mt-1 text-chalk/90">{s.detail}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap gap-3">
              <ButtonA href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
                Directions <ArrowUpRight size={18} weight="bold" aria-hidden />
              </ButtonA>
              <ButtonA href={site.phone.href} variant="ghost">
                <Phone size={18} weight="bold" aria-hidden /> {site.phone.display}
              </ButtonA>
            </div>
            <p className="text-mist">
              Can&apos;t make it out? For team training, our coaches can come to your practice field.
            </p>
          </div>
          <MapEmbed className="min-h-[380px] lg:min-h-[560px]" />
        </Container>
      </section>

      <BookCTA source="facility" />
    </>
  );
}
