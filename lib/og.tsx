import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// Static assets, read once at module scope. The background has its left-side scrim baked in.
const display = readFile(join(process.cwd(), "assets/fonts/BigShoulders-ExtraBold.ttf"));
const body = readFile(join(process.cwd(), "assets/fonts/Geist-Regular.ttf"));
const background = readFile(join(process.cwd(), "assets/og-tunnel.jpg")).then(
  (b) => `data:image/jpeg;base64,${b.toString("base64")}`,
);
const mark = readFile(join(process.cwd(), "public/brand/mark-on-dark.svg")).then(
  (b) => `data:image/svg+xml;base64,${b.toString("base64")}`,
);

/** Branded share card: the tunnel photo, the mark, a headline and a line of detail. */
export async function ogImage({ title, accent, detail }: { title: string; accent?: string; detail: string }) {
  const [displayFont, bodyFont, bg, logo] = await Promise.all([display, body, background, mark]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#060a1a" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={bg} alt="" width={1200} height={630} style={{ position: "absolute", inset: 0, objectFit: "cover" }} />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} alt="" width={64} height={64} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontFamily: "Display", fontSize: 40, color: "#f3f5f9", letterSpacing: 1, lineHeight: 1 }}>PINNACLE</span>
              <span style={{ fontFamily: "Body", fontSize: 15, color: "#91b3e0", letterSpacing: 5, marginTop: 4 }}>BASEBALL ACADEMY</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "column", fontFamily: "Display", fontSize: 128, lineHeight: 0.88, color: "#f3f5f9", textTransform: "uppercase" }}>
              <span>{title}</span>
              {accent && <span style={{ color: "#91b3e0" }}>{accent}</span>}
            </div>
            <span style={{ fontFamily: "Body", fontSize: 28, color: "#c7cfe2", marginTop: 28, maxWidth: 760 }}>{detail}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Body", fontSize: 22, color: "#aab4cf" }}>
            <span>pinnacle-baseball.com</span>
            <span>Spotsylvania, VA &middot; (540) 841-9284</span>
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Display", data: displayFont, weight: 800, style: "normal" },
        { name: "Body", data: bodyFont, weight: 400, style: "normal" },
      ],
    },
  );
}
