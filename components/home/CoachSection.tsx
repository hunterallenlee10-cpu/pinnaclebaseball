import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { Container } from "@/components/ui/Container";
import { LineReveal, Reveal } from "@/components/motion/Reveal";
import { BaseballCard } from "@/components/home/BaseballCard";
import { stowe } from "@/content/coach";
import { site } from "@/content/site";

export function CoachSection() {
  return (
    <section aria-labelledby="coach-title" className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
      <div
        aria-hidden
        className="absolute -left-40 top-20 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgb(145_179_224/0.13),transparent_65%)]"
      />
      <Container className="relative grid items-center gap-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-24">
        <Reveal className="order-2 lg:order-1">
          <BaseballCard />
        </Reveal>

        <div className="order-1 lg:order-2">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-sky">Head Instructor</p>
          <LineReveal
            as="h2"
            id="coach-title"
            className="display mt-5 text-[clamp(3.25rem,7.5vw,6.5rem)] text-chalk"
            lines={["Coached by a", <span key="b" className="text-sky">first-round arm.</span>]}
          />

          <Reveal delay={0.1}>
            <figure className="mt-10 border-l-2 border-sky pl-6">
              <blockquote className="text-xl leading-relaxed text-chalk sm:text-2xl">
                &ldquo;{stowe.scoutQuote.text}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm text-mist">
                {stowe.scoutQuote.author}, {stowe.scoutQuote.role}
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-10 max-w-xl leading-relaxed text-mist">
              Chris Stowe went 33-4 with a 0.94 ERA at Chancellor High School and was taken in the first round by the
              Montreal Expos in 1997. After injury ended his playing career he turned to coaching and scouting, and
              founded Pinnacle in {site.founded}.
            </p>
            <Link
              href="/staff/"
              className="mt-8 inline-flex items-center gap-2 border-b border-sky pb-1 font-medium text-sky transition-colors hover:text-chalk"
            >
              Meet Coach Stowe <ArrowRight size={16} weight="bold" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
