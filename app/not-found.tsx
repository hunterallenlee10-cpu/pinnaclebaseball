import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { bookHref, bookLabel, nav } from "@/content/site";

export const metadata: Metadata = {
  title: "Foul ball",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden pt-(--header-h)">
      <Image
        src="/images/facility/tunnel-long.jpg"
        alt=""
        fill
        quality={70}
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/40" />
      <Container className="relative py-24">
        <p className="stat text-sm text-sky">404</p>
        <h1 className="display mt-4 text-[clamp(5rem,16vw,13rem)] text-chalk">
          Foul
          <br />
          <span className="text-sky">ball.</span>
        </h1>
        <p className="mt-6 max-w-md text-lg text-mist">
          That page went out of play. It may have moved when we rebuilt the site.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/">
            Back to home <ArrowRight size={18} weight="bold" aria-hidden />
          </ButtonLink>
          <ButtonLink href={bookHref} variant="ghost">
            {bookLabel}
          </ButtonLink>
        </div>
        <nav aria-label="Popular pages" className="mt-14">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-mist underline-offset-4 hover:text-chalk hover:underline">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
