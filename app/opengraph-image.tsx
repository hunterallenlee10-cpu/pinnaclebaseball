import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Pinnacle Baseball Academy";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ title: "Find your", accent: "peak.", detail: "Private pitching, hitting and fielding lessons from a former first-round MLB draft pick." });
}
