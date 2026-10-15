import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/training/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/contact/", priority: 0.9, changeFrequency: "yearly" },
  { path: "/staff/", priority: 0.8, changeFrequency: "yearly" },
  { path: "/velocity365/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/alumni/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/facility/", priority: 0.7, changeFrequency: "yearly" },
  { path: "/about/", priority: 0.7, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: new URL(r.path, site.url).toString(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
