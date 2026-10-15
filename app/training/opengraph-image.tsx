import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Baseball lessons and training programs";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ title: "Training", accent: "for all.", detail: "Individual lessons, small groups of 2 to 8, team training and clinics." });
}
