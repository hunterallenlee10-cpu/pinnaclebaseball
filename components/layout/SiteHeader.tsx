"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useReducedMotion } from "@/components/hooks/useReducedMotion";
import { List, X, Phone, ArrowUpRight } from "@phosphor-icons/react";
import { LogoLockup } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { bookHref, bookLabel, nav, site } from "@/content/site";

export function SiteHeader() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  // Hide on scroll down, show on scroll up. State only flips at thresholds, not every frame.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const nextSolid = y > 24;
    if (nextSolid !== solid) setSolid(nextSolid);
    const nextHidden = y > 240 && y > prev + 4 ? true : y < prev - 4 ? false : hidden;
    if (nextHidden !== hidden) setHidden(nextHidden);
  });

  // Close the menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    // Move focus into the menu once it starts opening.
    const t = window.setTimeout(() => document.querySelector<HTMLAnchorElement>("#mobile-menu a")?.focus(), 50);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href);

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          solid || open ? "border-b border-chalk/8 bg-navy/85 backdrop-blur-md" : "border-b border-transparent"
        }`}
        animate={{ y: hidden && !open && !reduce ? "-100%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto flex h-(--header-h) max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-10">
          <LogoLockup />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="group relative px-3 py-2 text-[0.95rem] font-medium text-mist transition-colors hover:text-chalk aria-[current=page]:text-chalk"
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-sky transition-transform duration-500 ease-out-expo group-hover:scale-x-100 group-aria-[current=page]:scale-x-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.phone.href}
              className="hidden items-center gap-2 px-3 py-2 font-mono text-sm text-mist transition-colors hover:text-chalk xl:flex"
            >
              <Phone size={16} weight="bold" aria-hidden />
              {site.phone.display}
            </a>
            <div className="hidden sm:block">
              <ButtonLink href={bookHref} className="h-11!">
                {bookLabel}
              </ButtonLink>
            </div>
            <button
              ref={menuButton}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 place-items-center border border-chalk/20 text-chalk transition-colors hover:border-chalk lg:hidden"
            >
              {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-30 flex flex-col bg-night pt-(--header-h) lg:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 pt-8 sm:px-6">
              <ul>
                {[{ label: "Home", href: "/" }, ...nav, { label: "Contact", href: "/contact/" }].map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 + i * 0.045, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-chalk/8"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={(item.href === "/" ? pathname === "/" : isActive(item.href)) ? "page" : undefined}
                      className="display flex items-center justify-between py-3 text-[2.6rem] text-chalk/90 transition-colors hover:text-sky aria-[current=page]:text-sky"
                    >
                      {item.label}
                      <ArrowUpRight size={26} weight="bold" aria-hidden className="text-chalk/30" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            {/* Phones already have the pinned call/book bar; this row serves tablets. */}
            <div className="hidden grid-cols-2 gap-px border-t border-chalk/10 bg-chalk/10 sm:grid">
              <a href={site.phone.href} className="flex h-16 items-center justify-center gap-2 bg-night font-mono text-sm text-chalk">
                <Phone size={18} weight="bold" aria-hidden /> Call us
              </a>
              <Link href={bookHref} onClick={() => setOpen(false)} className="display flex h-16 items-center justify-center bg-sky text-xl text-night">
                {bookLabel}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
