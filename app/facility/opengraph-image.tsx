import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "The Pinnacle Baseball facility";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ title: "Inside the", accent: "tunnel.", detail: "6862 Old Courthouse Road, Spotsylvania, Virginia." });
}
