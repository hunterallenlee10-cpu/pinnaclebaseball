import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { ProofBar } from "@/components/home/ProofBar";
import { BookCTA } from "@/components/booking/BookCTA";
import { alumni, statePlayersOfTheYear } from "@/content/alumni";

export const metadata: Metadata = {
  title: "Alumni & Results",
  description:
    "More than 200 players coached by Chris Stowe have gone on to play college baseball, including three State Players of the Year. Hear from Pinnacle alumni in their own words.",
  alternates: { canonical: "/alumni/" },
};

export default function AlumniPage() {
  return (
    <>
      <PageHero
        title={["The", <span key="b" className="text-sky">Pipeline.</span>]}
        lead="More than 200 players Chris Stowe has coached have gone on to play college baseball. Since 2017, every player under his instruction has had the opportunity to play at the collegiate level."
        image={{
          src: "/images/card-wall-wide.jpg",
          alt: "The Action in 3 wall: rows of framed cards of Pinnacle players and their college commitments",
          position: "50% 50%",
        }}
      />
      <ProofBar />

      <section aria-labelledby="words-title" className="py-24 sm:py-32">
        <Container>
          <h2 id="words-title" className="display text-[clamp(3rem,7vw,6rem)] text-chalk">
            In their <span className="text-sky">own words.</span>
          </h2>
          <div className="mt-16 gap-8 sm:columns-2 lg:gap-10">
            {alumni.map((a, i) => (
              <Reveal
                as="figure"
                key={a.slug}
                delay={(i % 2) * 0.08}
                className="mb-8 break-inside-avoid border border-chalk/10 bg-navy-2 lg:mb-10"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={a.image.src}
                    alt={a.image.alt}
                    fill
                    quality={70}
                    sizes="(min-width: 640px) 45vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: a.image.position }}
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <blockquote className="leading-relaxed text-chalk/90">
                    <p>&ldquo;{a.quote}&rdquo;</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-baseline justify-between gap-4 border-t border-chalk/10 pt-5">
                    <span className="display text-3xl text-chalk">
                      {a.first} <span className="text-sky">{a.last}</span>
                    </span>
                    {a.destination && <span className="text-sm text-mist">{a.destination}</span>}
                  </figcaption>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {statePlayersOfTheYear.length > 0 && (
        <section aria-labelledby="poy-title" className="border-t border-chalk/8 bg-night py-24">
          <Container>
            <h2 id="poy-title" className="display text-[clamp(2.75rem,6vw,5rem)] text-chalk">
              State Players of the Year
            </h2>
            <ul className="mt-10 grid gap-px bg-chalk/10 sm:grid-cols-3">
              {statePlayersOfTheYear.map((p) => (
                <li key={p.name} className="bg-night p-6">
                  <p className="stat text-sky">{p.year}</p>
                  <p className="display mt-2 text-3xl text-chalk">{p.name}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <section aria-labelledby="wall-title" className="relative overflow-hidden bg-night">
        <div className="relative min-h-[70dvh]">
          <Image
            src="/images/card-wall.jpg"
            alt="Close view of the Action in 3 wall with its wooden sign and framed player cards"
            fill
            quality={80}
            sizes="100vw"
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night via-night/60 to-night/20" />
          <Container className="relative flex min-h-[70dvh] flex-col justify-end py-16">
            <h2 id="wall-title" className="display max-w-3xl text-[clamp(3rem,7vw,6rem)] text-chalk">
              Action in 3. <span className="text-sky">Est. 2022.</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg text-chalk/85">
              Walk into the facility and the first thing you see is the wall: Pinnacle players and the programs they
              committed to.
            </p>
          </Container>
        </div>
      </section>

      <BookCTA source="alumni" title="Earn your spot on the wall." />
    </>
  );
}
