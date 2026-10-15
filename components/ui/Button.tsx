import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost" | "fire";

const base =
  "group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden whitespace-nowrap px-6 h-12 sm:h-13 font-display text-[1.05rem] font-bold uppercase tracking-[0.06em] [font-variation-settings:'opsz'_40] transition-[transform,color,border-color] duration-300 ease-out-expo active:scale-[0.98] focus-visible:outline-offset-4";

const variants: Record<Variant, string> = {
  primary: "bg-sky text-night hover:text-night",
  ghost: "border border-chalk/30 text-chalk hover:border-chalk hover:text-night",
  fire: "bg-fire text-white hover:text-night",
};

/** The fill that wipes in from the left on hover. */
const wipe: Record<Variant, string> = {
  primary: "bg-chalk",
  ghost: "bg-chalk",
  fire: "bg-chalk",
};

function Inner({ variant, children }: { variant: Variant; children: ReactNode }) {
  return (
    <>
      <span
        aria-hidden
        className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-out-expo group-hover/btn:scale-x-100 ${wipe[variant]}`}
      />
      <span className="relative flex items-center gap-3">{children}</span>
    </>
  );
}

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...props}>
      <Inner variant={variant}>{children}</Inner>
    </Link>
  );
}

export function ButtonA({
  variant = "primary",
  className = "",
  children,
  ...props
}: ComponentProps<"a"> & { variant?: Variant }) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...props}>
      <Inner variant={variant}>{children}</Inner>
    </a>
  );
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <button
      className={`${base} ${variants[variant]} disabled:pointer-events-none disabled:opacity-50 ${className}`}
      {...props}
    >
      <Inner variant={variant}>{children}</Inner>
    </button>
  );
}
