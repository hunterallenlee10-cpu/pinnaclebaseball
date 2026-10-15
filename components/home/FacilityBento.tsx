import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { fullAddress } from "@/content/site";

const tiles = [
  {
    src: "/images/card-wall.jpg",
    alt: "The Action in 3 wall inside the facility, lined with framed cards of Pinnacle players and their college commitments",
    caption: "The Action in 3 wall, lined with Pinnacle players and their college commitments.",
    className: "lg:col-span-2 lg:row-span-2 aspect-[4/3] lg:aspect-auto",
    sizes: "(min-width: 1024px) 50vw, 100vw",
  },
  {
    src: "/images/facility/bullpen.jpg",
    alt: "A pitcher throwing a bullpen session in the training tunnel",
    caption: "Bullpen work in the tunnel.",
    className: "lg:row-span-2 aspect-[3/4] lg:aspect-auto",
    sizes: "(min-width: 1024px) 25vw, 100vw",
  },
  {
    src: "/images/facility/cage-hitter.jpg",
    alt: "A hitter taking swings in the batting cage",
    caption: "Cage work, all year.",
    className: "aspect-square",
    sizes: "(min-width: 1024px) 25vw, 50vw",
  },
  {
    src: "/images/welcome-bear.jpg",
    alt: "A carved wooden bear in a Pinnacle jersey holding a Welcome sign at the facility entrance",
    caption: "The welcome committee.",
    className: "aspect-square",
    sizes: "(min-width: 1024px) 25vw, 50vw",
  },
];

export function FacilityBento() {
  return (
    <section aria-labelledby="facility-title" className="bg-navy py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="facility-title" className="display text-[clamp(3rem,7vw,6rem)] text-chalk">
            Built for
            <br />
            the work.
          </h2>
          <Link
            href="/facility/"
            className="inline-flex w-fit items-center gap-2 border-b border-sky pb-1 font-medium text-sky transition-colors hover:text-chalk"
          >
            Tour the facility <ArrowRight size={16} weight="bold" aria-hidden />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:h-[min(78vh,760px)] lg:grid-cols-4 lg:grid-rows-2">
          {tiles.map((t, i) => (
            <Reveal
              key={t.src}
              as="figure"
              delay={i * 0.06}
              className={`group relative overflow-hidden bg-navy-2 ${i < 2 ? "col-span-2" : ""} sm:col-span-1 ${
                i === 0 ? "sm:col-span-2" : ""
              } ${t.className}`}
            >
              <Image
                src={t.src}
                alt={t.alt}
                fill
                quality={70}
                sizes={t.sizes}
                className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/90 to-transparent p-4 pt-16 text-sm text-chalk/90 sm:p-5 sm:pt-20">
                {t.caption}
              </figcaption>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-sm text-haze">{fullAddress}</p>
      </Container>
    </section>
  );
}
