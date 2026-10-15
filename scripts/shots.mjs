// Screenshot pages at mobile, tablet and desktop widths for visual review.
// Usage: node scripts/shots.mjs <outDir> [baseUrl] [paths...]
import { chromium } from "playwright";
import fs from "node:fs";

const [, , outDir = "shots", base = "http://localhost:3000", ...paths] = process.argv;
const routes = paths.length ? paths : ["/"];
const widths = (process.env.WIDTHS ?? "375,768,1440").split(",").map(Number);
const full = process.env.FULL !== "0";
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ executablePath: process.env.CHROME ?? "/opt/pw-browsers/chromium" });
for (const w of widths) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: w < 600 ? 812 : w < 1000 ? 1024 : 900 },
    deviceScaleFactor: 1,
    reducedMotion: process.env.REDUCED ? "reduce" : "no-preference",
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(e.message));
  for (const r of routes) {
    await page.goto(base + r, { waitUntil: "networkidle" });
    if (full) {
      // Scroll through so whileInView reveals and lazy images fire, then return to top.
      const h = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < h; y += 500) {
        await page.evaluate((yy) => window.scrollTo(0, yy), y);
        await page.waitForTimeout(120);
      }
      await page.waitForTimeout(800);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(600);
    }
    const name = `${(r === "/" ? "home" : r.replace(/\//g, "_").replace(/^_|_$/g, ""))}-${w}.png`;
    await page.screenshot({ path: `${outDir}/${name}`, fullPage: full });
    console.log(name, errors.length ? `ERRORS: ${errors.join(" | ")}` : "ok");
    errors.length = 0;
  }
  await ctx.close();
}
await browser.close();
