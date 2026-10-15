import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowUpRight, Phone, MapPin, Envelope } from "@phosphor-icons/react/ssr";
import { Container } from "@/components/ui/Container";
import { LineReveal } from "@/components/motion/Reveal";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { LessonRequest, LessonRequestSkeleton } from "@/components/booking/LessonRequest";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Book a Lesson",
  description:
    "Request a baseball lesson at Pinnacle Baseball Academy in Spotsylvania, VA. Individual, small group and team training. Call (540) 841-9284 or send a request online.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <>
      <section id="book" aria-labelledby="contact-title" className="relative overflow-hidden pt-(--header-h)">
        <div
          aria-hidden
          className="absolute -left-40 top-0 h-[680px] w-[680px] rounded-full bg-[radial-gradient(circle,rgb(145_179_224/0.12),transparent_65%)]"
        />
        <Container className="relative grid gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:py-24">
          <div className="flex flex-col gap-8">
            <LineReveal
              as="h1"
              id="contact-title"
              className="display text-[clamp(3.75rem,9vw,8rem)] text-chalk"
              lines={["Book a", <span key="b" className="text-sky">lesson.</span>]}
            />
            <p className="max-w-md text-lg leading-relaxed text-mist">
              Whatever your question, get in touch. Send a request and Coach Stowe will reach out to find a time that
              works.
            </p>

            <ul className="space-y-px bg-chalk/10">
              <li className="bg-navy">
                <a href={site.phone.href} className="group flex items-center gap-4 py-5 pr-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center bg-sky text-night">
                    <Phone size={22} weight="bold" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-sm text-haze">Call or text</span>
                    <span className="stat block text-xl text-chalk group-hover:text-sky">{site.phone.display}</span>
                  </span>
                </a>
              </li>
              {site.email && (
                <li className="bg-navy">
                  <a href={`mailto:${site.email}`} className="group flex items-center gap-4 py-5 pr-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center border border-chalk/20 text-chalk">
                      <Envelope size={22} weight="bold" aria-hidden />
                    </span>
                    <span>
                      <span className="block text-sm text-haze">Email</span>
                      <span className="block text-lg text-chalk group-hover:text-sky">{site.email}</span>
                    </span>
                  </a>
                </li>
              )}
              <li className="bg-navy">
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 py-5 pr-4"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center border border-chalk/20 text-chalk">
                    <MapPin size={22} weight="bold" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-sm text-haze">Facility</span>
                    <span className="block text-lg text-chalk group-hover:text-sky">
                      {site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode}
                    </span>
                  </span>
                  <ArrowUpRight size={18} weight="bold" aria-hidden className="ml-auto shrink-0 text-haze" />
                </a>
              </li>
            </ul>

            <dl className="grid gap-4 sm:grid-cols-2">
              {site.scheduleSummary.map((s) => (
                <div key={s.label} className="border-l-2 border-sky pl-4">
                  <dt className="font-mono text-xs uppercase tracking-[0.2em] text-sky">{s.label}</dt>
                  <dd className="mt-1 text-sm text-chalk/90">{s.detail}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="sr-only">Lesson request form</h2>
            <Suspense fallback={<LessonRequestSkeleton />}>
              <LessonRequest />
            </Suspense>
          </div>
        </Container>
      </section>

      <section aria-label="Map" className="border-t border-chalk/8">
        <MapEmbed className="h-[420px] sm:h-[480px]" />
      </section>
    </>
  );
}
