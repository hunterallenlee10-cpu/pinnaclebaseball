import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Pinnacle Baseball alumni";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ title: "The", accent: "Pipeline.", detail: "More than 200 players coached into college baseball." });
}
