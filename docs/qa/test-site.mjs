// Functional, link and accessibility checks against the running production build.
import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";

const BASE = process.env.BASE ?? "http://localhost:3200";
const AXE = readFileSync(process.env.AXE_JS ?? "node_modules/axe-core/axe.min.js", "utf8");
const PAGES = ["/", "/restaurants", "/hotels", "/how-it-works", "/informax-cloud", "/enquire", "/about", "/digital-experiences", "/privacy-policy"];
let failures = 0;
const ok = (cond, msg) => { console.log(`${cond ? "PASS" : "FAIL"}  ${msg}`); if (!cond) failures++; };

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

// 1. Accessibility (axe, WCAG 2 A/AA) and internal links on every page.
const links = new Set();
for (const p of PAGES) {
  await page.goto(BASE + p, { waitUntil: "networkidle" });
  await page.addScriptTag({ content: AXE });
  const r = await page.evaluate(async () => (await window.axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21aa"] })).violations.map((v) => `${v.id} (${v.impact}) x${v.nodes.length}: ${v.nodes.slice(0, 2).map((n) => n.target.join(" ")).join(" ; ")}`));
  ok(r.length === 0, `axe ${p}${r.length ? "\n      " + r.join("\n      ") : ""}`);
  const h1 = await page.locator("h1").count();
  ok(h1 === 1, `${p} has exactly one h1 (${h1})`);
  for (const href of await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")))) {
    if (href.startsWith("/") && !href.startsWith("//")) links.add(href.split("#")[0] || "/");
  }
}
for (const l of links) {
  const res = await page.request.get(BASE + l, { maxRedirects: 0 });
  ok(res.status() === 200, `link ${l} -> ${res.status()}`);
}
for (const [from, to] of [["/hospitality", "/hotels"], ["/touch-points", "/how-it-works"], ["/services", "/informax-cloud"]]) {
  const res = await page.request.get(BASE + from, { maxRedirects: 0 });
  ok(res.status() === 308 && res.headers().location?.endsWith(to), `redirect ${from} -> ${res.headers().location} (${res.status()})`);
}

// 2. Homepage hero: steps change what the phones show.
await page.goto(BASE + "/", { waitUntil: "networkidle" });
const stepBtn = page.getByRole("list", { name: "How the menu update works" }).getByRole("button");
await stepBtn.nth(2).click();
await page.waitForTimeout(900);
ok((await stepBtn.nth(2).getAttribute("aria-current")) === "step", "hero step 3 becomes current on click");
const guestAlt = await page.locator('img[alt*="roast Cornish hake"]').first().evaluate((e) => getComputedStyle(e).opacity);
ok(guestAlt === "1", "hero step 3 shows the updated menu on the guest phone");
await page.waitForTimeout(6500);
ok((await stepBtn.nth(2).getAttribute("aria-current")) === "step", "hero does not auto-advance after the visitor chooses a step");

// 3. See It in Action: tabs (mouse and keyboard) and Next.
const tabs = page.getByRole("tablist", { name: "Choose an industry" }).first();
await page.locator("#see-it-in-action").scrollIntoViewIfNeeded();
await page.getByRole("button", { name: "Next" }).first().click();
await page.getByRole("button", { name: "Next" }).first().click();
ok(await page.getByText("Step 3 of 5").first().isVisible(), "walkthrough Next advances to step 3");
ok(await page.locator('img[alt*="Replace the default menu"]').first().isVisible(), "restaurant step 3 shows the Replace menu screen in Informax Cloud");
const restaurantSteps = await page.locator("#see-it-in-action ol li button > span:last-child > span:first-child").allTextContents();
ok(
  JSON.stringify(restaurantSteps) ===
    JSON.stringify(["The kitchen runs out", "The chef chooses an alternative", "A manager updates the menu in Informax Cloud", "Every table has the new menu", "No new Codes to print"]),
  `restaurant walkthrough tells the five steps in order (${restaurantSteps.join(" / ")})`,
);
await tabs.getByRole("tab", { name: "Restaurant" }).focus();
await page.keyboard.press("ArrowRight");
ok((await tabs.getByRole("tab", { name: "Hotel" }).getAttribute("aria-selected")) === "true", "ArrowRight switches to the Hotel tab");
ok(await page.getByText("Step 1 of 5").first().isVisible(), "switching industry restarts at step 1");
for (let i = 0; i < 4; i++) await page.getByRole("button", { name: "Next" }).first().click();
ok(await page.locator('img[alt*="ends 18:00 today"]').first().isVisible(), "hotel step 5 shows the temporary content ending at 18:00");
ok(await page.getByRole("button", { name: "Start again" }).first().isVisible(), "last step offers Start again");

// 3b. Auto-advancing stories never move the headline beside them (no layout shift while a visitor reads).
for (const [w, h] of [[1440, 900], [834, 1112], [390, 844]]) {
  const sctx = await browser.newContext({ viewport: { width: w, height: h } });
  const sp = await sctx.newPage();
  for (const path of ["/", "/hotels"]) {
    await sp.goto(BASE + path, { waitUntil: "networkidle" });
    await sp.waitForTimeout(1500);
    const tops = [];
    for (let i = 0; i < 8; i++) {
      tops.push(await sp.locator("h1").first().evaluate((e) => Math.round(e.getBoundingClientRect().top + scrollY)));
      await sp.waitForTimeout(1750);
    }
    ok(new Set(tops).size === 1, `${path} at ${w}px: the h1 stays put while the story advances (${[...new Set(tops)].join(", ")})`);
  }
  await sctx.close();
}

// 4. Keyboard: skip link and visible focus on the demo button.
await page.goto(BASE + "/", { waitUntil: "networkidle" });
await page.keyboard.press("Tab");
ok((await page.evaluate(() => document.activeElement?.textContent?.trim())) === "Skip to content", "first Tab reaches the skip link");

// 5. Mobile navigation.
const m = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const mp = await m.newPage();
await mp.goto(BASE + "/", { waitUntil: "networkidle" });
await mp.getByRole("button", { name: "Open menu" }).click();
const mobileNav = mp.getByRole("navigation", { name: "Mobile" });
ok(await mobileNav.getByRole("link", { name: "Hotels" }).isVisible(), "mobile menu opens with the nav links");
ok(await mobileNav.getByRole("link", { name: "Request a Demo" }).isVisible(), "mobile menu has Request a Demo");
await mp.keyboard.press("Escape");
await mp.waitForTimeout(600);
ok(!(await mobileNav.isVisible().catch(() => false)), "Escape closes the mobile menu");
await m.close();

// 6. Enquiry API (unchanged code): validation, honeypot, and the not-configured path locally.
const bad = await page.request.post(BASE + "/api/enquire", { data: { name: "", email: "x" } });
ok(bad.status() === 422, `enquiry validation -> ${bad.status()}`);
const pot = await page.request.post(BASE + "/api/enquire", { data: { website: "spam" } });
ok(pot.status() === 200, `enquiry honeypot is accepted silently -> ${pot.status()}`);
const full = await page.request.post(BASE + "/api/enquire", { data: { name: "Test", company: "Test", email: "test@example.com", message: "Hello" } });
ok(full.status() === 503, `valid enquiry without RESEND_API_KEY locally -> ${full.status()} (expected 503; production has the key)`);

// 7. The enquiry form shows field errors in the page.
await page.goto(BASE + "/enquire", { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Send enquiry" }).click();
await page.waitForTimeout(400);
ok(await page.getByText("Please enter your restaurant, hotel or company name.").isVisible(), "enquiry form shows its own validation");

// 8. New story sections and honesty statements.
await page.goto(BASE + "/restaurants", { waitUntil: "networkidle" });
ok(await page.getByText("Same Code. Not reprinted.").isVisible(), "restaurants before/after shows the unchanged Code");
ok(await page.getByText("Editing individual dishes inside Informax Cloud is not available today", { exact: false }).isVisible(), "restaurants page says dish editing is not available");
await page.goto(BASE + "/hotels", { waitUntil: "networkidle" });
for (const t of ["Digital hotel directory", "Spa Access Points", "Restaurant information", "Room upgrade opportunities", "Check room or treatment availability", "Take bookings or payments"]) {
  ok(await page.getByText(t, { exact: true }).first().isVisible(), `hotels shows "${t}"`);
}
// 8b. Informax Cloud page: Coming Soon, the in-development message and the informax.cloud link.
await page.goto(BASE + "/informax-cloud", { waitUntil: "networkidle" });
ok((await page.locator("h1").innerText()).trim() === "Meet Informax Cloud.", "Informax Cloud h1 is 'Meet Informax Cloud.'");
ok(await page.locator("header").getByText("Coming Soon", { exact: true }).first().isVisible(), "Coming Soon badge visible in the hero");
ok(await page.getByText("Informax Cloud is currently in development.", { exact: false }).first().isVisible(), "in-development message visible");
// Owner decision (22 Oct 2026): no Coming Soon call to action may go to informax.cloud while it redirects to the V1 sign-in.
const cloudLinks = await page.$$eval("main a[href*='informax.cloud']", (as) => as.map((a) => ({ href: a.getAttribute("href"), text: a.textContent.trim() })));
ok(cloudLinks.every((l) => l.href === "https://informax.cloud/login" && /Customer log in/.test(l.text)), `only the customer log-in links to informax.cloud on the Cloud page (${JSON.stringify(cloudLinks)})`);
ok(await page.getByRole("link", { name: "See How It Works" }).first().isVisible(), "hero offers an on-page 'See How It Works'");
ok((await page.locator("#how-it-works").count()) === 1, "'See How It Works' has an on-page target");
ok((await page.getByRole("link", { name: "Ask about Informax Cloud" }).first().getAttribute("href")) === "/enquire?interest=informax-cloud", "closing CTA asks about Informax Cloud on this site");
ok(await page.getByText("Already an Informax customer?", { exact: false }).isVisible(), "existing customers are told their account keeps working");
for (const t of ["How it will work", "What it will offer"]) ok((await page.getByText(t, { exact: true }).count()) >= 1, `Cloud page has "${t}"`);
ok(!(await page.getByText(/sign up|register|free trial|countdown|launch date/i).count()), "no sign-up, registration, trial, countdown or launch-date wording");
for (const t of ["Your property", "Your spaces", "Your Access Points", "Your content"]) ok(await page.getByRole("heading", { name: t, exact: true }).isVisible(), `structure shows "${t}"`);
ok((await page.getByText("Built, still in testing").count()) >= 1 && (await page.getByText("Working in the development build").count()) >= 1, "feature status labels shown");
ok(!(await page.getByText(/\bBlock\b/).count()), "no Block layer mentioned");
for (const p of ["/", "/restaurants", "/hotels"]) {
  await page.goto(BASE + p, { waitUntil: "networkidle" });
  ok((await page.getByText(/preview of (Informax Cloud|upcoming functionality)/i).count()) >= 1, `${p} labels product screens as a preview`);
}
// 8c. No public "QR" wording and no pricing anywhere.
for (const p of PAGES) {
  await page.goto(BASE + p, { waitUntil: "networkidle" });
  const text = await page.locator("body").innerText();
  ok(!/\bQR\b/i.test(text), `${p} has no "QR" wording`);
  ok(!/£\s?\d/.test(text), `${p} shows no prices in its text`);
}

// 8d. Site-wide: no Coming Soon or call-to-action link to informax.cloud other than the customer log-in; the log-in is secondary.
for (const p of PAGES) {
  await page.goto(BASE + p, { waitUntil: "networkidle" });
  const links = await page.$$eval("a[href*='informax.cloud']", (as) => as.map((a) => a.getAttribute("href")));
  ok(links.every((h) => h === "https://informax.cloud/login"), `${p}: every informax.cloud link is the customer log-in (${[...new Set(links)].join(", ")})`);
}
await page.goto(BASE + "/", { waitUntil: "networkidle" });
const login = page.locator("header a", { hasText: "Customer log in" }).first();
const demo = page.locator("header a", { hasText: "Request a Demo" }).first();
const [lf, df] = await Promise.all([login.evaluate((e) => parseFloat(getComputedStyle(e).fontSize)), demo.evaluate((e) => parseFloat(getComputedStyle(e).fontSize))]);
const lbg = await login.evaluate((e) => getComputedStyle(e).backgroundColor);
ok(lf < df && (lbg === "rgba(0, 0, 0, 0)" || lbg === "transparent"), `header "Customer log in" is secondary (font ${lf}px vs ${df}px, no fill)`);
// 8e. Enquiry prefill from "Ask about Informax Cloud", and nothing for unknown values.
await page.goto(BASE + "/enquire?interest=informax-cloud", { waitUntil: "networkidle" });
ok(await page.getByRole("group", { name: "What would you like to explore?" }).getByLabel("Informax Cloud").isChecked(), "?interest=informax-cloud ticks Informax Cloud");
await page.goto(BASE + "/enquire?interest=<script>", { waitUntil: "networkidle" });
ok((await page.locator("input[type=checkbox]:checked").count()) === 0, "unknown ?interest values preselect nothing");

// 9. Share images exist for the three entry pages.
for (const p of ["/opengraph-image.jpg", "/hotels/opengraph-image.jpg", "/informax-cloud/opengraph-image.jpg"]) {
  const r = await page.request.get(BASE + p);
  ok(r.status() === 200 && r.headers()["content-type"]?.includes("image"), `share image ${p} -> ${r.status()}`);
}

await browser.close();
console.log(failures ? `\n${failures} FAILED` : "\nALL PASSED");
process.exit(failures ? 1 : 0);
