/**
 * Business facts. Everything here comes from the original pinnacle-baseball.com.
 * Values set to `null` are waiting on the owner (see docs/OWNER_INPUTS.md);
 * components hide anything that is null instead of showing placeholder text.
 */
export const site = {
  name: "Pinnacle Baseball Academy",
  shortName: "Pinnacle Baseball",
  url: "https://pinnacle-baseball.com",
  tagline: "Find your peak.",
  description:
    "Private baseball lessons, small group and team training in Spotsylvania, Virginia. Pitching, hitting and fielding instruction for players 8 to 18+ from a former first-round MLB draft pick.",
  founded: 2013,
  phone: { display: "(540) 841-9284", href: "tel:+15408419284", e164: "+15408419284" },
  /** [NEEDS INPUT] Public contact email. Lesson requests are delivered by the server, so this is display-only. */
  email: null as string | null,
  address: {
    street: "6862 Old Courthouse Road",
    city: "Spotsylvania",
    region: "VA",
    regionName: "Virginia",
    postalCode: "22551",
    country: "US",
    area: "Fredericksburg area",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=6862+Old+Courthouse+Road+Spotsylvania+VA+22551",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=6862+Old+Courthouse+Road,+Spotsylvania,+VA+22551&output=embed",
  /** [NEEDS INPUT] Business hours. The old site only said weekday evenings and weekend mornings. */
  hours: null as { days: string; time: string }[] | null,
  scheduleSummary: [
    { label: "Weekdays", detail: "Monday to Friday evenings, with occasional daytime openings." },
    { label: "Weekends", detail: "Saturday and Sunday morning workouts." },
  ],
  /** [NEEDS INPUT] Realistic response time for lesson requests. */
  responseTime: null as string | null,
  /** [NEEDS INPUT] Google Business Profile link. */
  googleBusinessUrl: null as string | null,
  social: [
    { label: "Instagram", href: "https://instagram.com/pinnaclebaseballacademyllc" },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100083244616765" },
    { label: "X", href: "https://x.com/pinnaclepride" },
  ],
} as const;

export const nav = [
  { label: "Training", href: "/training/" },
  { label: "Velocity365", href: "/velocity365/" },
  { label: "Staff", href: "/staff/" },
  { label: "Alumni", href: "/alumni/" },
  { label: "Facility", href: "/facility/" },
  { label: "About", href: "/about/" },
] as const;

export const bookHref = "/contact/#book";
export const bookLabel = "Book a Lesson";

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;
