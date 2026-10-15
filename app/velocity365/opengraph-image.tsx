import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Velocity365 arm strength program";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ title: "Velocity", accent: "365.", detail: "Build. Maintain. Develop. A year-round, whole-body approach to arm strength." });
}
