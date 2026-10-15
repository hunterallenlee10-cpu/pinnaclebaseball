import Link from "next/link";
import { Phone, CalendarCheck } from "@phosphor-icons/react/ssr";
import { bookHref, bookLabel, site } from "@/content/site";

/** Thumb-reach call and book actions, pinned to the bottom of small screens. */
export function MobileBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[auto_1fr] border-t border-chalk/10 bg-night/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md sm:hidden"
    >
      <a
        href={site.phone.href}
        className="flex h-14 items-center gap-2 border-r border-chalk/10 px-5 font-mono text-sm text-chalk"
      >
        <Phone size={20} weight="bold" aria-hidden />
        Call<span className="sr-only"> {site.phone.display}</span>
      </a>
      <Link href={bookHref} className="display flex h-14 items-center justify-center gap-2 bg-sky text-xl text-night">
        <CalendarCheck size={20} weight="bold" aria-hidden />
        {bookLabel}
      </Link>
    </nav>
  );
}
