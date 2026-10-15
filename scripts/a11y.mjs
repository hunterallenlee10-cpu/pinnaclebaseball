// axe-core accessibility scan of every page at mobile and desktop widths.
// Usage: node scripts/a11y.mjs [baseUrl]
import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";

const base = process.argv[2] ?? "http://localhost:3000";
const routes = ["/", "/training/", "/about/", "/staff/", "/alumni/", "/facility/", "/velocity365/", "/contact/", "/missing-page/"];
const browser = await chromium.launch({ executablePath: process.env.CHROME ?? "/opt/pw-browsers/chromium" });
let total = 0;
for (const width of [375, 1440]) {
  // Reduced motion so scroll reveals are settled and contrast is measured on final colors.
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  for (const r of routes) {
    await page.goto(base + r, { waitUntil: "networkidle" });
    await page.waitForTimeout(400);
    const res = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"]).analyze();
    total += res.violations.length;
    const summary = res.violations.map((v) => `${v.id}(${v.impact}) x${v.nodes.length}: ${v.nodes.slice(0, 2).map((n) => n.target.join(" ")).join(" | ")}`);
    console.log(`${width} ${r.padEnd(14)} ${res.violations.length ? summary.join("\n" + " ".repeat(20)) : "clean"}`);
  }
  await ctx.close();
}
await browser.close();
process.exitCode = total ? 1 : 0;
