"use client";

import { useEffect } from "react";
import { Phone } from "@phosphor-icons/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[80dvh] items-center pt-(--header-h)">
      <Container className="py-24">
        <h1 className="display text-[clamp(4rem,12vw,9rem)] text-chalk">
          Rain <span className="text-sky">delay.</span>
        </h1>
        <p className="mt-6 max-w-md text-lg text-mist">
          Something went wrong loading this page. Try again, or give us a call and we&apos;ll help directly.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Button type="button" onClick={reset}>
            Try again
          </Button>
          <a href={site.phone.href} className="stat inline-flex items-center gap-2 text-chalk hover:text-sky">
            <Phone size={18} weight="bold" aria-hidden /> {site.phone.display}
          </a>
        </div>
      </Container>
    </section>
  );
}
