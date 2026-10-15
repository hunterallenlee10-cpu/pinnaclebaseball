import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Chris Stowe, Founder and Head Instructor";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ title: "Chris", accent: "Stowe.", detail: "Montreal Expos first-round pick. Associate scout for two MLB organizations." });
}
