import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { LineReveal } from "@/components/motion/Reveal";

type Props = {
  title: ReactNode[];
  lead?: ReactNode;
  eyebrow?: string;
  image?: { src: string; alt: string; position?: string };
  children?: ReactNode;
};

/** Top of every inner page. With an image it splits; without one it is pure type. */
export function PageHero({ title, lead, eyebrow, image, children }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-chalk/8 pt-(--header-h)">
      <div
        aria-hidden
        className="absolute -right-40 -top-40 h-[680px] w-[680px] rounded-full bg-[radial-gradient(circle,rgb(145_179_224/0.12),transparent_65%)]"
      />
      <div className={image ? "grid lg:min-h-[78dvh] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]" : ""}>
        <Container
          className={`relative flex flex-col justify-end py-16 sm:py-20 ${
            image ? "lg:max-w-none lg:py-24 lg:pl-10 lg:pr-12 xl:pl-[max(2.5rem,calc((100vw-1400px)/2+2.5rem))]" : "lg:py-28"
          }`}
        >
          {eyebrow && <p className="font-mono text-xs uppercase tracking-[0.24em] text-sky">{eyebrow}</p>}
          <LineReveal
            as="h1"
            className={`display ${eyebrow ? "mt-5" : ""} text-[clamp(3.75rem,10vw,9rem)] text-chalk`}
            lines={title}
          />
          {lead && (
            <p className="mt-7 max-w-2xl animate-lift text-lg leading-relaxed text-mist [animation-delay:250ms] sm:text-xl">
              {lead}
            </p>
          )}
          {children && <div className="mt-9 animate-lift [animation-delay:350ms]">{children}</div>}
        </Container>
        {image && (
          <div className="relative aspect-[4/3] lg:aspect-auto">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              preload
              fetchPriority="high"
              quality={80}
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover"
              style={{ objectPosition: image.position }}
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent lg:bg-gradient-to-r lg:from-navy lg:via-navy/10" />
          </div>
        )}
      </div>
    </section>
  );
}
