import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileBar } from "@/components/layout/MobileBar";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { site } from "@/content/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { businessSchema, websiteSchema } from "@/lib/schema";
import "./globals.css";

const display = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
  adjustFontFallback: false,
  fallback: ["Display Fallback", "Arial", "sans-serif"],
});

const sans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Pinnacle Baseball Academy | Baseball Lessons in Spotsylvania & Fredericksburg, VA",
    template: "%s | Pinnacle Baseball Academy",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: "/",
  },
  twitter: { card: "summary_large_image", site: "@pinnaclepride" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0b1130",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable} antialiased`}>
      <body className="grain flex min-h-dvh flex-col">
        <a
          href="#main"
          className="fixed left-4 top-3 z-70 -translate-y-24 bg-sky px-4 py-3 font-medium text-night transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <MobileBar />
        </MotionProvider>
        <JsonLd data={[businessSchema(), websiteSchema()]} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
