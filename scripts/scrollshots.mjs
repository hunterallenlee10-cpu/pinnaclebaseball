// Viewport screenshots at successive scroll positions, to review scroll-driven scenes.
// Usage: node scripts/scrollshots.mjs <outDir> <url> <width> [stepPx] [maxShots]
import { chromium } from "playwright";
import fs from "node:fs";

const [, , outDir, url, width = "1440", step = "900", max = "40"] = process.argv;
const w = Number(width);
fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME ?? "/opt/pw-browsers/chromium" });
const page = await browser.newPage({
  viewport: { width: w, height: w < 600 ? 812 : 900 },
  reducedMotion: process.env.REDUCED ? "reduce" : "no-preference",
});
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(e.message));
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
const h = await page.evaluate(() => document.documentElement.scrollHeight);
let i = 0;
for (let y = 0; y < h && i < Number(max); y += Number(step), i++) {
  await page.mouse.wheel(0, 0);
  await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: "instant" }), y);
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${outDir}/${String(i).padStart(2, "0")}-${w}-${y}.png` });
}
console.log(`height ${h}, ${i} shots`, errors.length ? `ERRORS: ${[...new Set(errors)].join(" | ")}` : "no errors");
await browser.close();
