import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { BookCTA } from "@/components/booking/BookCTA";
import { staff, stowe } from "@/content/coach";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, personSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Coaches & Staff",
  description:
    "Meet Chris Stowe, founder and head instructor of Pinnacle Baseball Academy: Montreal Expos first-round pick, former MLB associate scout, and coach of 200+ college baseball players.",
  alternates: { canonical: "/staff/" },
};

export default function StaffPage() {
  const extraStaff = staff.filter((s) => s.ready);
  const { cardFront, cardBack } = stowe.images;

  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Staff", path: "/staff/" }]), personSchema()]} />
      <PageHero
        eyebrow={stowe.role}
        title={["Chris", <span key="b" className="text-sky">Stowe.</span>]}
        lead="Montreal Expos first-round pick. Associate scout for two MLB organizations. The coach behind more than 200 college baseball players."
        image={{ src: stowe.images.portrait.src, alt: stowe.images.portrait.alt, position: "50% 25%" }}
      />

      {/* Stat line */}
      <section aria-labelledby="statline-title" className="border-b border-chalk/8 bg-night py-16 sm:py-20">
        <Container>
          <h2 id="statline-title" className="font-mono text-xs uppercase tracking-[0.24em] text-sky">
            {stowe.position}, stats when drafted, {stowe.draft.team} {stowe.draft.round} {stowe.draft.pick}
          </h2>
          <dl className="mt-8 grid grid-cols-2 gap-px bg-chalk/10 sm:grid-cols-3 lg:grid-cols-6">
            {stowe.draftStats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05} className="bg-night p-5 sm:p-6">
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-haze">{s.label}</dt>
                <dd className="display mt-3 whitespace-nowrap text-[clamp(2.5rem,3.4vw,3.25rem)] leading-none text-chalk">{s.value}</dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* Bio and the real card */}
      <section aria-labelledby="bio-title" className="py-24 sm:py-32">
        <Container className="grid gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
          <div>
            <h2 id="bio-title" className="display text-[clamp(3rem,6vw,5.25rem)] text-chalk">
              The story
            </h2>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-mist">
              {stowe.bio.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            <figure className="mt-12 border-l-2 border-sky pl-6">
              <blockquote className="text-xl leading-relaxed text-chalk sm:text-2xl">
                &ldquo;{stowe.scoutQuote.text}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm text-mist">
                {stowe.scoutQuote.author}, {stowe.scoutQuote.role}
              </figcaption>
            </figure>
          </div>

          <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <Reveal className="mx-auto w-full max-w-[300px] -rotate-2">
              <Image
                src={cardFront.src}
                alt={cardFront.alt}
                width={cardFront.width}
                height={cardFront.height}
                quality={80}
                sizes="300px"
                className="w-full rounded-[10px] shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)] ring-1 ring-chalk/15"
              />
            </Reveal>
            <Reveal delay={0.1} className="mx-auto w-full max-w-[440px] rotate-1">
              <Image
                src={cardBack.src}
                alt={cardBack.alt}
                width={cardBack.width}
                height={cardBack.height}
                quality={80}
                sizes="440px"
                className="w-full rounded-[10px] shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)] ring-1 ring-chalk/15"
              />
            </Reveal>
            <p className="text-center text-sm text-haze">His 1997 Bowman rookie card, front and back.</p>
          </div>
        </Container>
      </section>

      {/* Honors and career, as two grouped columns */}
      <section aria-labelledby="honors-title" className="bg-navy-2 py-24 sm:py-32">
        <Container className="grid gap-16 lg:grid-cols-2">
          <div>
            <h2 id="honors-title" className="display text-[clamp(2.75rem,5vw,4.5rem)] text-chalk">
              On the mound
            </h2>
            <ul className="mt-8 flex flex-wrap gap-2">
              {stowe.honors.map((h) => (
                <li key={h} className="border border-chalk/15 px-4 py-2.5 text-chalk/90">
                  {h}
                </li>
              ))}
            </ul>
            <ul className="mt-8 space-y-3">
              {stowe.feats.map((f) => (
                <li key={f} className="flex gap-3 text-mist">
                  <span aria-hidden className="mt-2.5 h-px w-5 shrink-0 bg-sky" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="display text-[clamp(2.75rem,5vw,4.5rem)] text-chalk">Off the mound</h2>
            <dl className="mt-8 grid gap-px bg-chalk/10">
              {stowe.career.map((c) => (
                <div key={c.label} className="bg-navy-2 py-5">
                  <dt className="display text-3xl text-sky">{c.label}</dt>
                  <dd className="mt-1 text-mist">{c.detail}</dd>
                </div>
              ))}
            </dl>
            <blockquote className="mt-10 text-lg leading-relaxed text-chalk/90">
              &ldquo;{stowe.passionQuote}&rdquo;
            </blockquote>
          </div>
        </Container>
      </section>

      {extraStaff.length > 0 && (
        <section aria-labelledby="team-title" className="py-24 sm:py-32">
          <Container>
            <h2 id="team-title" className="display text-[clamp(3rem,6vw,5.25rem)] text-chalk">
              The staff
            </h2>
            <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {extraStaff.map((c) => (
                <li key={c.slug}>
                  {c.portrait && (
                    <div className="relative aspect-[4/5] overflow-hidden bg-navy-2">
                      <Image src={c.portrait.src} alt={c.portrait.alt} fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
                    </div>
                  )}
                  <h3 className="display mt-5 text-4xl text-chalk">{c.name}</h3>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-sky">{c.role}</p>
                  {c.bio.map((p) => (
                    <p key={p.slice(0, 24)} className="mt-3 text-mist">
                      {p}
                    </p>
                  ))}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <BookCTA source="staff" title="Train with Coach Stowe." image={{ src: "/images/lesson-mound.jpg", alt: "An instructor working with a young pitcher on the mound" }} />
    </>
  );
}
