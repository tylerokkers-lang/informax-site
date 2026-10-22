// Text over film: WCAG contrast of every hero text element against the brightest pixels behind it,
// measured on real frames of the film (the text itself hidden), at desktop, tablet and phone width.
//   BASE=http://localhost:3200 node docs/qa/film-contrast.mjs
// Uses the 98th-percentile brightest background pixel in each text box, over three moments of the film.
// Pages without a built film are skipped.
import { chromium } from "playwright-core";

const BASE = process.env.BASE ?? "http://localhost:3200";
const PAGES = ["/", "/restaurants", "/hotels"];
// Film sections below the hero that carry text (measured after scrolling them to the middle of the screen).
const BANDS = { "/restaurants": ["#kitchen-h"] };
const VIEWS = { desktop: { width: 1440, height: 900 }, tablet: { width: 834, height: 1112 }, phone: { width: 390, height: 844 } };
let failures = 0;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const lab = await (await browser.newContext()).newPage(); // decodes screenshots and colours in a canvas

for (const [view, viewport] of Object.entries(VIEWS)) {
  const ctx = await browser.newContext({ viewport, isMobile: view !== "desktop", deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  for (const [path, band] of PAGES.flatMap((p) => [[p, null], ...(BANDS[p] ?? []).map((b) => [p, b])])) {
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    if (band) {
      await page.evaluate((sel) => document.querySelector(sel)?.scrollIntoView({ block: "center" }), band);
      await page.waitForTimeout(600);
    }
    // Measure the settled page: wait for entrance animations (finite ones) to finish first, or the text would be half
    // faded in and its boxes recorded mid-slide.
    await page.evaluate(() =>
      Promise.race([
        Promise.all(document.getAnimations().filter((a) => a.effect?.getComputedTiming().iterations !== Infinity).map((a) => a.finished.catch(() => undefined))),
        new Promise((r) => setTimeout(r, 4000)),
      ]),
    );
    // Hide the text by selector, not per element: story captions remount as they change.
    // The text over the film: the hero's eyebrow, heading, paragraphs and pill labels, measured on the line boxes of
    // each element's own text (so a badge or chip inside a paragraph is judged on its own background). Text inside the
    // hero's cards (the phones and the story stage) is not over the film and is left out.
    const items = await page.evaluate((band) => {
      const hero = band ? document.querySelector(band)?.closest("section") : document.querySelector("[data-film]")?.closest("header,section");
      if (!hero || (!band && hero.getBoundingClientRect().top > innerHeight)) return null;
      hero.setAttribute("data-contrast", "");
      const out = [];
      for (const e of hero.querySelectorAll("h1, h1 *, p, p *")) {
        if (e.closest('[class*="rounded-[28px]"],[class*="rounded-[24px]"]')) continue;
        const cs = getComputedStyle(e);
        const px = parseFloat(cs.fontSize);
        const large = px >= 24 || (px >= 18.66 && Number(cs.fontWeight) >= 700);
        for (const n of e.childNodes) {
          if (n.nodeType !== Node.TEXT_NODE || !n.textContent.trim()) continue;
          const range = document.createRange();
          range.selectNodeContents(n);
          for (const r of range.getClientRects()) {
            if (r.width < 4 || r.top < 0 || r.bottom > innerHeight) continue; // lines fully on screen only
            out.push({ text: n.textContent.trim().slice(0, 36), color: cs.color, large, box: [r.left, r.top, r.width, r.height].map(Math.round) });
          }
        }
      }
      return out;
    }, band);
    if (!items) {
      console.log(`SKIP  ${view} ${path}${band ? " " + band : ""}: no film here`);
      continue;
    }
    await page.addStyleTag({ content: "[data-contrast] :is(h1, h1 *, p, p *) { color: transparent !important; text-shadow: none !important; }" });
    const worst = new Map();
    for (const wait of [800, 2500, 2500]) {
      await page.waitForTimeout(wait);
      const shot = (await page.screenshot()).toString("base64");
      const ratios = await lab.evaluate(
        async ({ shot, items }) => {
          const img = new Image();
          img.src = `data:image/png;base64,${shot}`;
          await img.decode();
          const c = document.createElement("canvas");
          c.width = img.width;
          c.height = img.height;
          const g = c.getContext("2d", { willReadFrequently: true });
          const lin = (v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
          const lum = (r, gg, b) => 0.2126 * lin(r) + 0.7152 * lin(gg) + 0.0722 * lin(b);
          const rgba = (css) => {
            g.clearRect(0, 0, 1, 1);
            g.fillStyle = css;
            g.fillRect(0, 0, 1, 1);
            const d = g.getImageData(0, 0, 1, 1).data;
            return [d[0], d[1], d[2], d[3] / 255];
          };
          const fgs = items.map((it) => rgba(it.color));
          g.drawImage(img, 0, 0);
          return items.map((it, i) => {
            // A line box: inset a little vertically so only what sits behind the glyphs counts.
            const [bx, by, bw, bh] = it.box;
            const [x, y, w, h] = [bx, by + bh * 0.1, bw, bh * 0.8].map(Math.round);
            const x0 = Math.max(0, x), y0 = Math.max(0, y), x1 = Math.min(c.width, x + w), y1 = Math.min(c.height, y + h);
            if (x1 <= x0 || y1 <= y0) return null;
            const d = g.getImageData(x0, y0, x1 - x0, y1 - y0).data;
            const px = [];
            for (let k = 0; k < d.length; k += 4) px.push([d[k], d[k + 1], d[k + 2]]);
            px.sort((a, b) => lum(...a) - lum(...b));
            const bg = px[Math.max(0, Math.floor(px.length * 0.98) - 1)];
            const [r, gg, b, a] = fgs[i];
            const fg = [r * a + bg[0] * (1 - a), gg * a + bg[1] * (1 - a), b * a + bg[2] * (1 - a)];
            const [l1, l2] = [lum(...fg), lum(...bg)].sort((p, q) => q - p);
            return (l1 + 0.05) / (l2 + 0.05);
          });
        },
        { shot, items },
      );
      ratios.forEach((r, i) => {
        const k = items[i].text;
        if (r !== null && (!worst.has(k) || r < worst.get(k).r)) worst.set(k, { r, large: items[i].large });
      });
    }
    for (const [text, { r, large }] of worst) {
      const need = large ? 3 : 4.5;
      const pass = r >= need;
      if (!pass) failures++;
      console.log(`${pass ? "PASS" : "FAIL"}  ${view} ${path}${band ? " " + band : ""}: ${r.toFixed(2)}:1 (needs ${need}) "${text}"`);
    }
  }
  await ctx.close();
}
await browser.close();
console.log(failures ? `\n${failures} FAILED` : "\nALL PASSED");
process.exit(failures ? 1 : 0);
