import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { VelocityGauge } from "@/components/home/VelocityGauge";
import { BookCTA } from "@/components/booking/BookCTA";
import { Reveal } from "@/components/motion/Reveal";
import { velocity } from "@/content/velocity";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Velocity365 Arm Strength Program",
  description:
    "Velocity365 builds arm strength while maintaining and increasing arm health, with a year-round, whole-body approach. Build. Maintain. Develop.",
  alternates: { canonical: "/velocity365/" },
};

export default function VelocityPage() {
  const details = [
    { label: "Sessions", value: velocity.sessionFormat },
    { label: "Ages", value: velocity.ages },
    { label: "Schedule", value: velocity.schedule },
    { label: "Pricing", value: velocity.price },
  ].filter((d): d is { label: string; value: string } => Boolean(d.value));

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Velocity365", path: "/velocity365/" }])} />
      <VelocityGauge headingLevel="h1" cta={{ href: "/contact/?focus=velocity365#book", label: "Ask about Velocity365" }} />

      <section aria-labelledby="year-round-title" className="bg-night py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <h2 id="year-round-title" className="display text-[clamp(3rem,7vw,6rem)] text-chalk">
            Not a preseason
            <br />
            <span className="text-fire">crash course.</span>
          </h2>
          <Reveal className="space-y-6 text-lg leading-relaxed text-mist">
            <p>
              Velocity365 is a year-round plan that builds arm strength while maintaining and increasing the health of
              the arm.
            </p>
            <p>It develops that strength with a whole-body approach, not by working the arm alone.</p>
          </Reveal>
        </Container>

        {details.length > 0 && (
          <Container className="mt-16">
            <dl className="grid gap-px bg-chalk/10 sm:grid-cols-2 lg:grid-cols-4">
              {details.map((d) => (
                <div key={d.label} className="bg-night p-6">
                  <dt className="font-mono text-xs uppercase tracking-[0.2em] text-ember">{d.label}</dt>
                  <dd className="mt-2 text-chalk">{d.value}</dd>
                </div>
              ))}
            </dl>
          </Container>
        )}
      </section>

      <BookCTA
        source="velocity365"
        title="Start building."
        defaultFocus="velocity365"
        image={{ src: "/images/alumni/seneca-gregory.jpg", alt: "Seneca Gregory pitching from the stretch" }}
      />
    </>
  );
}
