import Link from "next/link";
import { InstagramLogo, FacebookLogo, XLogo, ArrowUpRight } from "@phosphor-icons/react/ssr";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Logo";
import { Year } from "@/components/layout/Year";
import { programs } from "@/content/programs";
import { fullAddress, nav, site } from "@/content/site";

const socialIcon = { Instagram: InstagramLogo, Facebook: FacebookLogo, X: XLogo } as const;

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-chalk/8 bg-night pb-24 sm:pb-10">
      <div className="stitch-rule opacity-60" aria-hidden />
      <Container className="grid gap-14 pt-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)] lg:gap-10 lg:pt-20">
        <div className="flex flex-col items-start gap-8">
          <Wordmark className="h-auto w-44 sm:w-52" />
          <p className="max-w-xs text-mist">Building your future one lesson at a time.</p>
          <ul className="flex gap-2">
            {site.social.map((s) => {
              const Icon = socialIcon[s.label];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Pinnacle Baseball on ${s.label}`}
                    className="grid h-11 w-11 place-items-center border border-chalk/15 text-mist transition-colors hover:border-sky hover:text-sky"
                  >
                    <Icon size={20} weight="regular" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-haze">Visit</h2>
            <address className="mt-4 not-italic leading-relaxed text-chalk">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.region} {site.address.postalCode}
            </address>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-sm text-sky underline-offset-4 hover:underline"
              aria-label={`Get directions to ${fullAddress}`}
            >
              Directions <ArrowUpRight size={14} weight="bold" aria-hidden />
            </a>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-haze">Call</h2>
            <a href={site.phone.href} className="stat mt-4 block text-lg text-chalk hover:text-sky">
              {site.phone.display}
            </a>
            {site.email && (
              <a href={`mailto:${site.email}`} className="mt-2 block text-chalk hover:text-sky">
                {site.email}
              </a>
            )}
          </div>
          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-haze">Training</h2>
            <ul className="mt-4 space-y-2.5">
              {programs.map((p) => (
                <li key={p.id}>
                  <Link href={`/training/#${p.id}`} className="text-mist transition-colors hover:text-chalk">
                    {p.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/velocity365/" className="text-mist transition-colors hover:text-chalk">
                  Velocity365
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-haze">Explore</h2>
            <ul className="mt-4 space-y-2.5">
              {nav
                .filter((n) => n.href !== "/training/" && n.href !== "/velocity365/")
                .map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="text-mist transition-colors hover:text-chalk">
                      {n.label}
                    </Link>
                  </li>
                ))}
              <li>
                <Link href="/contact/" className="text-mist transition-colors hover:text-chalk">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <Container className="mt-16">
        <p
          aria-hidden
          className="display select-none text-center text-[22vw] leading-[0.8] text-transparent [-webkit-text-stroke:1px_rgb(145_179_224/0.22)] lg:text-[17rem]"
        >
          Pinnacle
        </p>
        <div className="mt-8 flex flex-col gap-3 border-t border-chalk/8 pt-6 text-sm text-haze sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; <Year /> {site.name}. All rights reserved.
          </p>
          <p>
            Est. {site.founded}, {site.address.area}, {site.address.regionName}
          </p>
        </div>
      </Container>
    </footer>
  );
}
