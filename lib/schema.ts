import { site } from "@/content/site";
import { stowe } from "@/content/coach";
import { programs } from "@/content/programs";

const url = (path = "/") => new URL(path, site.url).toString();

export const businessId = url("/#business");

/** The academy as a local sports business. Rendered once, in the root layout. */
export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["SportsActivityLocation", "LocalBusiness"],
    "@id": businessId,
    name: site.name,
    alternateName: site.shortName,
    url: url(),
    logo: url("/brand/wordmark.svg"),
    image: [url("/images/tunnel.jpg"), url("/images/card-wall.jpg")],
    description: site.description,
    telephone: site.phone.e164,
    ...(site.email ? { email: site.email } : {}),
    foundingDate: String(site.founded),
    founder: { "@id": url("/staff/#chris-stowe") },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: ["Spotsylvania, VA", "Fredericksburg, VA"],
    hasMap: site.mapsUrl,
    sameAs: site.social.map((s) => s.href),
    ...(site.hours ? { openingHours: site.hours.map((h) => `${h.days} ${h.time}`) } : {}),
    sport: "Baseball",
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": url("/#website"),
    url: url(),
    name: site.name,
    publisher: { "@id": businessId },
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": url("/staff/#chris-stowe"),
    name: stowe.name,
    jobTitle: stowe.role,
    image: url(stowe.images.portrait.src),
    worksFor: { "@id": businessId },
    birthPlace: stowe.hometown,
    alumniOf: { "@type": "HighSchool", name: stowe.highSchool },
    award: stowe.honors,
    description:
      "Former Montreal Expos first-round draft pick (1997), Associate Scout for two MLB organizations and Scouting Director for Dynamic Baseball. Founder of Pinnacle Baseball Academy.",
    url: url("/staff/"),
  };
}

export function servicesSchema() {
  return programs.map((p) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": url(`/training/#${p.id}`),
    name: p.name,
    serviceType: "Baseball instruction",
    description: `${p.summary} ${p.body}`,
    provider: { "@id": businessId },
    areaServed: "Fredericksburg, VA area",
    url: url(`/training/#${p.id}`),
  }));
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: url(item.path),
    })),
  };
}
