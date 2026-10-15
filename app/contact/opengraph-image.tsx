import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Book a lesson at Pinnacle Baseball Academy";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ title: "Book a", accent: "lesson.", detail: "Call (540) 841-9284 or send a request online." });
}
