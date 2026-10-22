// Screenshots the site at desktop and phone widths and reports horizontal overflow.
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE ?? "http://localhost:3200";
const OUT = process.argv[2];
const pages = (process.argv[3] ?? "/,/restaurants,/hotels,/how-it-works,/informax-cloud,/enquire").split(",");
const sizes = (process.argv[4] ?? "desktop,phone").split(",");
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args: ["--lang=en-GB"] });
const VIEW = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  tablet: { viewport: { width: 834, height: 1112 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true },
  phone: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true },
  small: { viewport: { width: 320, height: 640 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true },
};
for (const size of sizes) {
  const ctx = await browser.newContext({ ...VIEW[size], reducedMotion: "reduce", locale: "en-GB" });
  for (const path of pages) {
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    // Scroll through so lazy images load.
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } window.scrollTo(0, 0); });
    await page.waitForTimeout(500);
    const overflow = await page.evaluate(() => {
      const w = document.documentElement.clientWidth;
      return [...document.querySelectorAll("body *")].filter((e) => { const r = e.getBoundingClientRect(); return r.right > w + 1 && getComputedStyle(e).position !== "fixed"; }).slice(0, 5).map((e) => `${e.tagName}.${String(e.className).slice(0, 60)} right=${Math.round(e.getBoundingClientRect().right)}`);
    });
    const name = `${size}${path.replace(/\//g, "_") || "_home"}`;
    await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
    console.log(name, "scrollW", await page.evaluate(() => document.documentElement.scrollWidth), overflow.length ? "OVERFLOW " + overflow.join(" | ") : "", errors.length ? "ERRORS " + errors.join(" | ") : "");
    await page.close();
  }
  await ctx.close();
}
await browser.close();
