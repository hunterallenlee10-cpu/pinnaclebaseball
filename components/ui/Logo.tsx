import Image from "next/image";
import Link from "next/link";

/** Horizontal lockup for the header: the "P" home-plate mark plus the name set in display type. */
export function LogoLockup({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group flex items-center gap-3 ${className}`}>
      <Image
        src="/brand/mark-on-dark.svg"
        alt=""
        width={44}
        height={44}
        className="h-10 w-10 transition-transform duration-500 ease-out-expo group-hover:-rotate-6"
        preload
      />
      <span className="flex flex-col leading-none">
        <span className="display text-[1.6rem] tracking-[0.02em] text-chalk">Pinnacle</span>{" "}
        <span className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-sky">Baseball Academy</span>
      </span>
    </Link>
  );
}

/** The full stacked wordmark from the academy's logo. */
export function Wordmark({ className = "", onDark = true }: { className?: string; onDark?: boolean }) {
  return (
    <Image
      src={onDark ? "/brand/wordmark-on-dark.svg" : "/brand/wordmark.svg"}
      alt="Pinnacle Baseball Academy"
      width={1409}
      height={1019}
      className={className}
    />
  );
}
