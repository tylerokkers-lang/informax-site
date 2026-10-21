// Captures the real Informax Cloud views (local dev server, fictional demo data) for the marketing site.
// Usage: with the capture page running in an informax-cloud-v2 dev server on port 3100 (see HANDOVER.md),
//   node shoot.mjs <output dir> [comma-separated shot names]
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const BASE = "http://localhost:3100/dev/marketing";
const OUT = process.argv[2];
const PDFS = process.env.PDFS_DIR ?? new URL("./pdfs", import.meta.url).pathname;
const CHROMIUM = process.env.CHROMIUM ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: CHROMIUM, args: ["--lang=en-GB"], env: { ...process.env, LANG: "en_GB.UTF-8", LANGUAGE: "en_GB" } });

async function ctx(kind) {
  return kind === "phone"
    ? browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, colorScheme: "light", locale: "en-GB", timezoneId: "Europe/London" })
    : browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light", locale: "en-GB", timezoneId: "Europe/London" });
}

async function open(page, shot) {
  await page.goto(`${BASE}/${shot}`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(600);
}

/** Opens one of the content actions ("Replace menu", "Publish temporary content"...) the way a person would. */
async function action(page, label, file) {
  await page.getByRole("button", { name: label }).click();
  await page.waitForTimeout(500);
  if (file) await page.locator('input[type=file][name=file]').first().setInputFiles(`${PDFS}/${file}`);
  await page.waitForTimeout(300);
}

async function spaWindow(p) {
  await action(p, "Publish temporary content", "Spa this afternoon.pdf");
  const panel = p.locator('[id^=action-]'); await panel.getByLabel("Choose an end time").check();
  await panel.locator('input[name=custom]').fill("2026-10-21T18:00"); await p.locator('body').click({ position: { x: 5, y: 300 } }); await p.evaluate(() => (document.activeElement)?.blur?.());
  await p.waitForTimeout(200);
}
async function menuWindow(p) {
  // Only the file name shows in the picker; the file itself is a copy of the dinner menu.
  await action(p, "Publish temporary menu", "Sunday lunch.pdf");
}

const jobs = [
  // [name, shot, device, setup, element]
  ["r-menu-before", "r-menu-before", "desktop", null, "full"],
  ["r-menu-replace", "r-menu-before", "desktop", (p) => action(p, "Replace menu", "Dinner menu (hake tonight).pdf"), "#content"],
  ["r-menu-after", "r-menu-after", "desktop", null, "full"],
  ["r-menu-before-phone", "r-menu-before", "phone", null, "at:#content"],
  ["r-menu-replace-phone", "r-menu-before", "phone", (p) => action(p, "Replace menu", "Dinner menu (hake tonight).pdf"), "at:[id^=action-]"],
  ["r-menu-after-phone", "r-menu-after", "phone", null, "at:[role=status], .ix-notice, #content"],
  ["r-temporary-phone", "r-menu-before", "phone", menuWindow, "at:[id^=action-]"],
  ["r-menu-before-desk", "r-menu-before", "desktop", null, "at:#content"],
  ["r-menu-replace-desk", "r-menu-before", "desktop", (p) => action(p, "Replace menu", "Dinner menu (hake tonight).pdf"), "at:#content"],
  ["r-menu-after-desk", "r-menu-after", "desktop", null, "at:[role=status]"],
  ["h-directory-after-desk", "h-directory-after", "desktop", null, "at:[role=status]"],
  ["h-spa-compose-desk", "h-spa-default", "desktop", spaWindow, "at:[id^=action-]"],
  ["h-spa-temporary-desk", "h-spa-temporary", "desktop", null, "at:[role=status]"],
  ["r-overview", "r-overview", "desktop", null, "viewport"],
  ["h-directory-before", "h-directory-before", "desktop", null, "full"],
  ["h-directory-after", "h-directory-after", "desktop", null, "full"],
  ["h-directory-replace-phone", "h-directory-before", "phone", (p) => action(p, "Replace content", "Guest Directory (new dinner hours).pdf"), "at:[id^=action-]"],
  ["h-directory-after-phone", "h-directory-after", "phone", null, "at:#content"],
  ["h-spa-default", "h-spa-default", "desktop", null, "full"],
  ["h-spa-compose", "h-spa-default", "desktop", spaWindow, "#content"],
  ["h-spa-compose-phone", "h-spa-default", "phone", spaWindow, "at:[id^=action-]"],
  ["h-spa-temporary", "h-spa-temporary", "desktop", null, "full"],
  ["h-spa-temporary-phone", "h-spa-temporary", "phone", null, "at:#content"],
  ["h-overview", "h-overview", "desktop", null, "viewport"],
  ["h-overview-phone", "h-overview", "phone", null, "viewport"],
  ["h-bedrooms", "h-bedrooms", "desktop", null, "viewport"],
  ["h-bulk", "h-bulk", "desktop", null, "viewport"],
  ["h-spaces", "h-spaces", "desktop", null, "viewport"],
  ["h-spaces-phone", "h-spaces", "phone", null, "viewport"],
  ["g-menu-before", "g-menu-before", "phone", null, "viewport"],
  ["g-menu-after", "g-menu-after", "phone", null, "viewport"],
  ["g-directory-before", "g-directory-before", "phone", null, "viewport"],
  ["g-directory-after", "g-directory-after", "phone", null, "viewport"],
  ["g-spa-default", "g-spa-default", "phone", null, "viewport"],
  ["g-spa-offer", "g-spa-offer", "phone", null, "viewport"],
];

const only = process.argv[3]?.split(",");
for (const [name, shot, device, setup, el] of jobs) {
  if (only && !only.includes(name)) continue;
  const c = await ctx(device);
  const page = await c.newPage();
  await open(page, shot);
  if (setup) await setup(page);
  if (name.startsWith("g-")) await page.waitForSelector("canvas[data-rendered]", { timeout: 20000 }).then(() => page.waitForTimeout(500));
  const path = `${OUT}/${name}.png`;
  if (el === "full") await page.screenshot({ path, fullPage: true });
  else if (el === "viewport") await page.screenshot({ path });
  else if (el.startsWith("at:")) {
    // Phone: scroll so the given element sits just under the sticky app bar, then take the screen as a person sees it.
    await page.evaluate((sel) => { const e = document.querySelector(sel); window.scrollTo(0, window.scrollY + e.getBoundingClientRect().top - 76); }, el.slice(3));
    await page.waitForTimeout(400);
    await page.screenshot({ path });
  } else await page.locator(el).first().screenshot({ path });
  console.log("shot", name);
  await c.close();
}
await browser.close();
