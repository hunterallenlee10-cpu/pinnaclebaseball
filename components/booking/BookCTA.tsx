import Image from "next/image";
import { Phone } from "@phosphor-icons/react/ssr";
import { Container } from "@/components/ui/Container";
import { QuickStart } from "@/components/booking/QuickStart";
import { site } from "@/content/site";

/** Closing call to action, used at the bottom of most pages. */
export function BookCTA({
  source,
  title = "Start the climb.",
  defaultFocus,
  image = { src: "/images/group-logo-wall.jpg", alt: "Pinnacle players and family in front of the academy logo inside the facility" },
}: {
  source: string;
  title?: string;
  defaultFocus?: string;
  image?: { src: string; alt: string };
}) {
  return (
    <section aria-labelledby={`book-${source}`} className="relative overflow-hidden border-t border-chalk/8 bg-navy-2">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[320px] lg:min-h-[720px]">
          <Image src={image.src} alt={image.alt} fill quality={70} sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-2 via-navy-2/10 to-transparent lg:bg-gradient-to-l" />
        </div>
        <Container className="flex flex-col justify-center py-16 sm:py-20 lg:max-w-none lg:px-16 xl:px-24">
          <h2 id={`book-${source}`} className="display text-[clamp(3.25rem,7vw,6rem)] text-chalk">
            {title}
          </h2>
          <p className="mt-5 max-w-md text-lg text-mist">
            Tell us a little about your player and we will reach out to set up the first session.
          </p>
          <div className="mt-10">
            <QuickStart source={source} defaultFocus={defaultFocus} />
          </div>
          <p className="mt-10 flex items-center gap-2 text-mist">
            <Phone size={18} weight="bold" aria-hidden className="text-sky" />
            Rather talk now?{" "}
            <a href={site.phone.href} className="stat text-chalk underline-offset-4 hover:underline">
              {site.phone.display}
            </a>
          </p>
        </Container>
      </div>
    </section>
  );
}
