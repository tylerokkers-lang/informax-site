// Video QA: playback, loading strategy, reduced motion and phone files. Run against a production build:
//   BASE=http://localhost:3200 node docs/qa/video-checks.mjs
// Pages with no built videos are reported and skipped (the site then shows its labelled placeholders).
import { chromium } from "playwright-core";

const BASE = process.env.BASE ?? "http://localhost:3200";
const PAGES = ["/", "/restaurants", "/hotels"];
let failures = 0;
const ok = (cond, msg) => { console.log(`${cond ? "PASS" : "FAIL"}  ${msg}`); if (!cond) failures++; };
const isVideo = (u) => /\/video\/stock\/.+\.(mp4|webm)(\?|$)/.test(u);

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });

async function scrollThrough(page, onStep) {
  const h = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y <= h; y += 400) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(250);
    if (onStep) await onStep(y);
  }
}

for (const path of PAGES) {
  // Desktop, motion allowed.
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const requested = [];
  page.on("request", (r) => isVideo(r.url()) && requested.push(r.url()));
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(BASE + path, { waitUntil: "networkidle" });
  const films = await page.locator("[data-film]").count();
  if (!films) {
    console.log(`SKIP  ${path}: no built videos on this page (placeholders shown)`);
    await ctx.close();
    continue;
  }
  const onLoad = new Set(requested.map((u) => u.split("/").slice(-2)[0]));
  const filmTops = await page.$$eval("[data-film]", (els) => els.map((e) => ({ slot: e.getAttribute("data-film"), top: e.getBoundingClientRect().top + window.scrollY })));
  const far = filmTops.filter((f) => f.top > 900 * 3).map((f) => f.slot);
  ok(far.every((s) => !onLoad.has(s)), `${path}: films far below the fold are not requested on load (loaded: ${[...onLoad].join(", ") || "none"})`);

  // Posters present for every film.
  const posters = await page.$$eval("[data-film] img", (imgs) => imgs.map((i) => ({ src: i.currentSrc, ok: i.complete && i.naturalWidth > 0 })));
  await scrollThrough(page);
  const postersAfter = await page.$$eval("[data-film] img", (imgs) => imgs.map((i) => ({ src: i.currentSrc, ok: i.complete && i.naturalWidth > 0 })));
  ok(postersAfter.length === films && postersAfter.every((p) => p.ok), `${path}: every film has a loaded poster (${postersAfter.length}/${films})`);
  void posters;

  // Every source a film references exists and is a video.
  const srcs = await page.$$eval("[data-film] video source", (s) => s.map((x) => x.getAttribute("src")));
  for (const s of new Set(srcs)) {
    const r = await page.request.head(BASE + s);
    ok(r.status() === 200 && /video\//.test(r.headers()["content-type"] ?? ""), `${path}: ${s} -> ${r.status()} ${r.headers()["content-type"]}`);
  }

  // Plays when visible; never more than one playing at a time.
  let maxPlaying = 0;
  let sawPlay = false;
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await scrollThrough(page, async () => {
    const n = await page.$$eval("[data-film] video", (vs) => vs.filter((v) => !v.paused && v.readyState >= 2).length);
    maxPlaying = Math.max(maxPlaying, n);
    if (n) sawPlay = true;
  });
  ok(sawPlay, `${path}: a film plays when it is on screen`);
  ok(maxPlaying <= 1, `${path}: at most one film plays at a time (max seen ${maxPlaying})`);
  // A film that is on screen actually advances.
  const first = page.locator("[data-film] video").first();
  if (await first.count()) {
    await first.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1200);
    const t1 = await first.evaluate((v) => v.currentTime);
    await page.waitForTimeout(1200);
    const t2 = await first.evaluate((v) => v.currentTime);
    ok(t2 > t1 || t2 < t1 /* looped */, `${path}: the on-screen film advances (${t1.toFixed(2)} -> ${t2.toFixed(2)})`);
  }
  ok(errors.length === 0, `${path}: no console errors${errors.length ? " (" + errors.slice(0, 2).join(" | ") + ")" : ""}`);
  await ctx.close();

  // Reduced motion: posters only, no film element, no video requests.
  const rctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const rp = await rctx.newPage();
  const rreq = [];
  rp.on("request", (r) => isVideo(r.url()) && rreq.push(r.url()));
  await rp.goto(BASE + path, { waitUntil: "networkidle" });
  await scrollThrough(rp);
  ok((await rp.locator("[data-film] video").count()) === 0 && rreq.length === 0, `${path}: reduced motion shows posters only (videos requested: ${rreq.length})`);
  await rctx.close();

  // Phone: the 720x960 phone files, not the desktop ones.
  const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 });
  const mp = await mctx.newPage();
  const mreq = [];
  mp.on("request", (r) => isVideo(r.url()) && mreq.push(r.url()));
  await mp.goto(BASE + path, { waitUntil: "networkidle" });
  await scrollThrough(mp);
  ok(mreq.length > 0 && mreq.every((u) => /-m720\.(mp4|webm)/.test(u)), `${path}: phones load only phone-sized films (${mreq.length} request(s))`);
  await mctx.close();
}

await browser.close();
console.log(failures ? `\n${failures} FAILED` : "\nALL PASSED");
process.exit(failures ? 1 : 0);
