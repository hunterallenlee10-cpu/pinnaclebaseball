import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { LineReveal, Reveal } from "@/components/motion/Reveal";
import { ProofBar } from "@/components/home/ProofBar";
import { BookCTA } from "@/components/booking/BookCTA";
import { stowe } from "@/content/coach";
import { site } from "@/content/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About the Academy",
  description:
    "Founded in 2013 by former Montreal Expos first-round pick Chris Stowe, Pinnacle Baseball Academy believes every player, at any age or skill level, has something to gain.",
  alternates: { canonical: "/about/" },
};

const timeline = [
  {
    year: "1997",
    title: "Drafted in the first round",
    body: "Chris Stowe goes 33-4 with a 0.94 ERA at Chancellor High School and is selected in the first round by the Montreal Expos.",
  },
  {
    year: "Then",
    title: "From the mound to the scouting seat",
    body: "Injury ends his playing career. Chris comes home, starts coaching, and works as an Associate Scout for two MLB organizations and Scouting Director for Dynamic Baseball.",
  },
  {
    year: String(site.founded),
    title: "Pinnacle is founded",
    body: "Pinnacle Baseball opens to help players of all ages and skill levels develop, whatever team or league they play for.",
  },
  {
    year: "2017",
    title: "Every player, a college opportunity",
    body: "From 2017 on, every player under Chris's instruction has had the opportunity to play at the collegiate level.",
  },
  {
    year: "2022",
    title: "The Action in 3 wall goes up",
    body: "The facility starts a wall of framed cards honoring Pinnacle players and where they committed.",
  },
  {
    year: "Today",
    title: "200+ college players and counting",
    body: "Three State Players of the Year and countless All-District and All-Area players later, the focus is still one player at a time.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "About", path: "/about/" }])} />
      <PageHero
        title={["Every player", "has something", <span key="c" className="text-sky">to gain.</span>]}
        lead={`Pinnacle Baseball was founded in ${site.founded} to make a positive difference in the development of players of all ages and skill levels, whatever teams they play on or leagues they play in.`}
      />

      {/* Philosophy: a manifesto block */}
      <section aria-labelledby="philosophy-title" className="py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-20">
          <LineReveal
            id="philosophy-title"
            className="display text-[clamp(3rem,7vw,6.25rem)] text-chalk"
            lines={["Success is", "not an accident.", <span key="c" className="text-sky">It&apos;s the result</span>, <span key="d" className="text-sky">of hard work.</span>]}
          />
          <Reveal delay={0.15} className="flex flex-col justify-end gap-6 text-lg leading-relaxed text-mist">
            <p>
              From day one, players learn the value of earning their place through hard work, dedication and desire.
            </p>
            <p>
              We cultivate the belief that every player has something to gain, something to offer, and should never be
              satisfied with where they are right now in their development.
            </p>
          </Reveal>
        </Container>
      </section>

      <ProofBar />

      {/* Approach: image plus copy */}
      <section aria-labelledby="approach-title" className="py-24 sm:py-32">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative aspect-[4/5] overflow-hidden bg-navy-2">
            <Image
              src="/images/facility/bullpen.jpg"
              alt="A coach watching a pitcher throw a bullpen session in the training tunnel"
              fill
              quality={75}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <div>
            <h2 id="approach-title" className="display text-[clamp(3rem,6vw,5.25rem)] text-chalk">
              No two players
              <br />
              <span className="text-sky">in the same mold.</span>
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-mist">
              <p>
                We draw on each player&apos;s individual strengths and help address their individual weaknesses. Having
                played professional baseball, Chris knows what it takes to play at higher levels.
              </p>
              <p>
                After running a highly successful travel program for 11 years, his experience taught him that
                individualized training accelerates development. That is why Pinnacle now specializes in individual,
                small group and team training.
              </p>
              <p>
                Over the years Chris has built strong relationships with college programs, so he can keep guiding the
                players he works with through the recruiting process.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section aria-labelledby="timeline-title" className="border-t border-chalk/8 bg-night py-24 sm:py-32">
        <Container>
          <h2 id="timeline-title" className="display text-[clamp(3rem,7vw,6rem)] text-chalk">
            The climb <span className="text-sky">so far.</span>
          </h2>
          <ol className="relative mt-16 grid gap-px bg-chalk/8 sm:grid-cols-2 lg:grid-cols-3">
            {timeline.map((t, i) => (
              <Reveal as="li" key={t.year} delay={(i % 3) * 0.08} className="flex flex-col gap-4 bg-night p-6 sm:p-8">
                <p className="display text-[4.5rem] leading-none text-transparent [-webkit-text-stroke:1.5px_var(--color-sky)]">
                  {t.year}
                </p>
                <h3 className="display text-3xl text-chalk">{t.title}</h3>
                <p className="leading-relaxed text-mist">{t.body}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Chris's own words */}
      <section aria-label="In Chris's words" className="relative overflow-hidden py-24 sm:py-32">
        <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
          <Reveal className="relative mx-auto aspect-[947/1718] w-full max-w-[300px] overflow-hidden bg-navy-2 lg:max-w-none">
            <Image
              src={stowe.images.portrait.src}
              alt={stowe.images.portrait.alt}
              fill
              quality={75}
              sizes="(min-width: 1024px) 30vw, 300px"
              className="object-cover"
            />
          </Reveal>
          <figure>
            <blockquote className="display text-[clamp(2.25rem,4.5vw,4rem)] leading-[0.95] text-chalk">
              &ldquo;{stowe.peakQuote}&rdquo;
            </blockquote>
            <figcaption className="mt-8 text-mist">
              {stowe.name}, {stowe.role}
            </figcaption>
          </figure>
        </Container>
      </section>

      <BookCTA source="about" title="Building your future, one lesson at a time." />
    </>
  );
}
