import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "About Pinnacle Baseball Academy";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ title: "Every player has", accent: "something to gain.", detail: "Founded in 2013. 200+ players coached into college baseball." });
}
