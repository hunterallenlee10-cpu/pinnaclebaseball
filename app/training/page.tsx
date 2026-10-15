import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarBlank } from "@phosphor-icons/react/ssr";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { BookCTA } from "@/components/booking/BookCTA";
import { programs, upcomingEvents, type Program } from "@/content/programs";
import { bookLabel } from "@/content/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, servicesSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Baseball Lessons & Training Programs",
  description:
    "Individual pitching, hitting and fielding lessons, small group lessons for 2 to 8 players, team training at our Spotsylvania facility or your field, plus camps and clinics.",
  alternates: { canonical: "/training/" },
};

const [individual, smallGroup, team, camps] = programs;

function requestHref(p: Program) {
  return `/contact/?format=${p.format}#book`;
}

function Facts({ program }: { program: Program }) {
  return (
    <dl className="grid gap-px bg-chalk/10 sm:grid-cols-2 sm:[&>*:last-child:nth-child(odd)]:col-span-2">
      {program.facts.map((f) => (
        <div key={f.label} className="bg-navy p-5">
          <dt className="font-mono text-xs uppercase tracking-[0.2em] text-sky">{f.label}</dt>
          <dd className="mt-2 text-chalk/90">{f.detail}</dd>
        </div>
      ))}
      {program.price && (
        <div className="bg-navy p-5">
          <dt className="font-mono text-xs uppercase tracking-[0.2em] text-sky">Pricing</dt>
          <dd className="mt-2 text-chalk/90">{program.price}</dd>
        </div>
      )}
    </dl>
  );
}

function Gallery({ program }: { program: Program }) {
  if (!program.gallery.length) return null;
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {program.gallery.map((g) => (
        <div key={g.src} className="relative aspect-[3/4] overflow-hidden bg-navy-2">
          <Image src={g.src} alt={g.alt} fill quality={70} sizes="(min-width: 1024px) 15vw, 33vw" className="object-cover" />
        </div>
      ))}
    </div>
  );
}

export default function TrainingPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Training", path: "/training/" }]), ...servicesSchema()]} />
      <PageHero
        title={["Training", <span key="b" className="text-sky">for all.</span>]}
        lead="Professional instruction for players of every age and skill level, whatever team or league they play in. Come to us, or we will come to you."
        image={{ src: "/images/facility/tunnel-long.jpg", alt: "The long Pinnacle training tunnel with turf and netting", position: "50% 40%" }}
      >
        <nav aria-label="Programs on this page">
          <ul className="flex flex-wrap gap-2">
            {programs.map((p) => (
              <li key={p.id}>
                <Link
                  href={`#${p.id}`}
                  className="inline-flex h-11 items-center border border-chalk/20 px-4 text-sm text-chalk transition-colors hover:border-sky hover:text-sky"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {/* Individual: image left, copy right */}
      <section id={individual.id} aria-labelledby={`${individual.id}-title`} className="py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <Reveal className="relative aspect-[4/5] overflow-hidden bg-navy-2 lg:sticky lg:top-28 lg:self-start">
            <Image
              src={individual.image.src}
              alt={individual.image.alt}
              fill
              quality={80}
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <div className="flex flex-col gap-8">
            <p className="stat text-sm text-sky">{individual.short}</p>
            <h2 id={`${individual.id}-title`} className="display -mt-4 text-[clamp(3rem,7vw,6rem)] text-chalk">
              {individual.name}
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-chalk/85">{individual.summary}</p>
            <p className="max-w-xl leading-relaxed text-mist">{individual.body}</p>
            <Facts program={individual} />
            <Gallery program={individual} />
            <div>
              <ButtonLink href={requestHref(individual)}>
                {bookLabel} <ArrowRight size={18} weight="bold" aria-hidden />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Small group: copy left, stacked imagery right, on a raised band */}
      <section id={smallGroup.id} aria-labelledby={`${smallGroup.id}-title`} className="bg-navy-2 py-24 sm:py-32">
        <Container className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-8">
            <p className="stat text-sm text-sky">{smallGroup.short}</p>
            <h2 id={`${smallGroup.id}-title`} className="display -mt-4 text-[clamp(3rem,7vw,6rem)] text-chalk">
              {smallGroup.name}
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-chalk/85">{smallGroup.summary}</p>
            <p className="max-w-xl leading-relaxed text-mist">{smallGroup.body}</p>
            <Facts program={smallGroup} />
            <div>
              <ButtonLink href={requestHref(smallGroup)}>
                Request a group <ArrowRight size={18} weight="bold" aria-hidden />
              </ButtonLink>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Reveal className="relative col-span-2 aspect-[16/11] overflow-hidden bg-navy">
              <Image
                src={smallGroup.gallery[1].src}
                alt={smallGroup.gallery[1].alt}
                fill
                quality={75}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-[50%_60%]"
              />
            </Reveal>
            {[smallGroup.gallery[0], smallGroup.gallery[2]].map((g, i) => (
              <Reveal key={g.src} delay={0.08 * (i + 1)} className="relative aspect-[3/4] overflow-hidden bg-navy">
                <Image src={g.src} alt={g.alt} fill quality={70} sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover" />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Team: full-bleed photo band with the copy laid over it */}
      <section id={team.id} aria-labelledby={`${team.id}-title`} className="relative overflow-hidden">
        <div className="relative min-h-[88dvh]">
          <Image
            src={team.image.src}
            alt={team.image.alt}
            fill
            quality={80}
            sizes="100vw"
            className="object-cover object-[50%_45%]"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night via-night/70 to-night/10 lg:bg-gradient-to-r lg:from-night lg:via-night/75 lg:to-transparent" />
          <Container className="relative flex min-h-[88dvh] flex-col justify-end py-20 lg:justify-center">
            <div className="max-w-xl">
              <p className="stat text-sm text-sky">{team.short}</p>
              <h2 id={`${team.id}-title`} className="display mt-3 text-[clamp(3rem,7vw,6rem)] text-chalk">
                {team.name}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-chalk/85">{team.body}</p>
              <dl className="mt-8 space-y-5">
                {team.facts.map((f) => (
                  <div key={f.label} className="border-l-2 border-sky pl-4">
                    <dt className="font-mono text-xs uppercase tracking-[0.2em] text-sky">{f.label}</dt>
                    <dd className="mt-1 text-chalk/90">{f.detail}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-10">
                <ButtonLink href={requestHref(team)}>
                  Book team training <ArrowRight size={18} weight="bold" aria-hidden />
                </ButtonLink>
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* Camps: wide image, then events list or an empty state */}
      <section id={camps.id} aria-labelledby={`${camps.id}-title`} className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <p className="stat text-sm text-sky">{camps.short}</p>
              <h2 id={`${camps.id}-title`} className="display mt-3 text-[clamp(3rem,7vw,6rem)] text-chalk">
                {camps.name}
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-relaxed text-mist">{camps.body}</p>
          </div>
          <Reveal className="relative mt-12 aspect-[16/9] overflow-hidden bg-navy-2 sm:aspect-[21/9]">
            <Image src={camps.image.src} alt={camps.image.alt} fill quality={75} sizes="100vw" className="object-cover" />
          </Reveal>
          <div className="mt-10">
            {upcomingEvents.length ? (
              <ul className="divide-y divide-chalk/10 border-y border-chalk/10">
                {upcomingEvents.map((e) => (
                  <li key={e.name} className="grid gap-2 py-6 sm:grid-cols-[180px_1fr_auto] sm:items-center">
                    <p className="stat text-sky">{e.date}</p>
                    <div>
                      <p className="display text-3xl text-chalk">{e.name}</p>
                      <p className="text-mist">{e.location}</p>
                    </div>
                    {e.href && (
                      <Link href={e.href} className="text-sky underline-offset-4 hover:underline">
                        Details
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col gap-6 border border-dashed border-chalk/20 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
                <div className="flex items-start gap-4">
                  <CalendarBlank size={28} weight="regular" aria-hidden className="mt-1 shrink-0 text-sky" />
                  <div>
                    <p className="display text-3xl text-chalk">No camps on the calendar right now.</p>
                    <p className="mt-2 max-w-lg text-mist">
                      Want one for your team, group or league? Tell us what you have in mind and we will build it with you.
                    </p>
                  </div>
                </div>
                <ButtonLink href={requestHref(camps)} variant="ghost">
                  Host a clinic
                </ButtonLink>
              </div>
            )}
          </div>
        </Container>
      </section>

      <BookCTA source="training" title="Find the right fit." image={{ src: "/images/lesson-mound.jpg", alt: "An instructor working with a young pitcher on the mound" }} />
    </>
  );
}
