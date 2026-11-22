// Functional, link and accessibility checks against the running production build.
import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";

const BASE = process.env.BASE ?? "http://localhost:3200";
const AXE = readFileSync(process.env.AXE_JS ?? "node_modules/axe-core/axe.min.js", "utf8");
const PAGES = ["/", "/informax-cloud", "/solutions", "/hospitality", "/restaurants", "/how-it-works", "/pricing", "/signup", "/enquire", "/contact", "/about", "/digital-experiences", "/privacy-policy"];
let failures = 0;
const ok = (cond, msg) => { console.log(`${cond ? "PASS" : "FAIL"}  ${msg}`); if (!cond) failures++; };

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

// 1. Accessibility (axe, WCAG 2 A/AA) and internal links on every page.
const links = new Set();
for (const p of PAGES) {
  await page.goto(BASE + p, { waitUntil: "networkidle" });
  await page.waitForTimeout(2200); // let the entrance animations finish, so contrast is measured on the settled page
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
for (const [from, to] of [["/hotels", "/hospitality"], ["/touch-points", "/how-it-works"], ["/services", "/informax-cloud"], ["/request-a-demo", "/enquire"], ["/demo", "/enquire"]]) {
  const res = await page.request.get(BASE + from, { maxRedirects: 0 });
  ok(res.status() === 308 && res.headers().location?.endsWith(to), `redirect ${from} -> ${res.headers().location} (${res.status()})`);
}

// 2. "Done Right" redesign (21 Nov 2026): the hero, the navigation and the two actions.
await page.goto(BASE + "/", { waitUntil: "networkidle" });
ok((await page.locator("h1").innerText()).replace(/\s+/g, " ").trim() === "Digital experiences. Done right.", "home h1 is exactly \"Digital experiences. Done right.\" (owner, 21 Nov 2026)");
const hero = page.locator("section").first();
ok((await hero.getByRole("link", { name: "Explore Informax Cloud" }).getAttribute("href")) === "/informax-cloud", "hero primary action: Explore Informax Cloud");
ok((await hero.getByRole("link", { name: "Request a Demo" }).getAttribute("href")) === "/enquire", "hero secondary action: Request a Demo");
const primary = page.getByRole("navigation", { name: "Primary", exact: true });
for (const [name, href] of [["Informax Cloud", "/informax-cloud"], ["How it works", "/how-it-works"], ["Pricing", "/pricing"], ["About", "/about"]]) {
  ok((await primary.getByRole("link", { name, exact: true }).getAttribute("href")) === href, `primary navigation: ${name} -> ${href}`);
}
const sol = primary.getByRole("button", { name: "Solutions" });
await sol.click();
ok((await sol.getAttribute("aria-expanded")) === "true", "Solutions opens on click");
for (const [name, href] of [["Hospitality", "/hospitality"], ["Restaurants", "/restaurants"]]) {
  ok((await page.locator("#solutions-menu").getByRole("link", { name: new RegExp(`^${name}`) }).getAttribute("href")) === href, `Solutions menu: ${name} -> ${href}`);
}
await page.keyboard.press("Escape");
await page.waitForTimeout(400);
ok((await sol.getAttribute("aria-expanded")) === "false", "Escape closes the Solutions menu");

// 3. Interactive stories: tabs work with the mouse and the keyboard; the hero demonstration can be driven by hand.
const beats = page.locator("ol button[aria-pressed]");
ok((await beats.count()) === 3, "hero demonstration has three beats");
await beats.nth(2).click();
ok((await beats.nth(2).getAttribute("aria-pressed")) === "true", "choosing a beat selects it");
ok(await page.getByRole("button", { name: "Play the demonstration", exact: true }).isVisible(), "choosing a beat pauses: a Play control is offered");
await page.getByRole("button", { name: "Replay the demonstration from the start" }).click();
ok((await beats.nth(0).getAttribute("aria-pressed")) === "true", "Replay returns to the first beat");
ok(await page.getByRole("button", { name: "Pause the demonstration", exact: true }).isVisible(), "after Replay the demonstration plays (Pause offered)");

// 3a. The homepage stays short (owner, 22 Nov 2026): at most 6 screens on an iPhone-sized viewport, and the product in the first screen.
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
  const mp = await ctx.newPage();
  await mp.goto(BASE + "/", { waitUntil: "networkidle" });
  const h = await mp.evaluate(() => document.documentElement.scrollHeight);
  ok(h <= 844 * 6, `homepage on a 390x844 phone is ${(h / 844).toFixed(1)} screens (at most 6)`);
  const demoTop = await mp.getByRole("heading", { name: "Informax Cloud", exact: true }).evaluate((e) => e.getBoundingClientRect().top);
  ok(demoTop < 844 * 1.2, `phone: the Informax Cloud demonstration starts within the first screen and a bit (${Math.round(demoTop)}px)`);
  await ctx.close();
}

// 3c. Founder profile (owner, 22 Nov 2026): Founder of Informax; no CEO wording anywhere; structured data agrees.
await page.goto(BASE + "/tyler-okkers", { waitUntil: "networkidle" });
ok(await page.getByText("Founder of Informax", { exact: true }).isVisible(), "founder page: Founder of Informax");
ok(await page.getByText("Tyler Okkers founded Informax with a vision to simplify how businesses manage and deliver digital information.", { exact: true }).isVisible(), "founder page: approved biography");
const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
ok(ld.some((t) => t.includes('"jobTitle":"Founder"')), "founder structured data: jobTitle Founder");
for (const pth of PAGES.concat(["/tyler-okkers"])) {
  await page.goto(BASE + pth, { waitUntil: "domcontentloaded" });
  const html = await page.content();
  ok(!/\bCEO\b|Chief Executive/i.test(html), `${pth}: no CEO or Chief Executive wording, including metadata`);
}
await page.goto(BASE + "/", { waitUntil: "networkidle" });
// The placements and Cloud levels moved from the homepage to How it works and Informax Cloud (22 Nov 2026).
await page.goto(BASE + "/how-it-works", { waitUntil: "networkidle" });
const placeTabs = page.getByRole("tablist", { name: "Where Scan Points go" });
await placeTabs.getByRole("tab", { name: "Galleries" }).click();
ok(await page.getByRole("img", { name: /Room 3 of a gallery/ }).isVisible(), "placements: Galleries shows the gallery guide");
await placeTabs.getByRole("tab", { name: "Galleries" }).focus();
await page.keyboard.press("ArrowRight");
ok((await placeTabs.getByRole("tab", { name: "Events" }).getAttribute("aria-selected")) === "true", "placements: ArrowRight moves to Events");
await page.goto(BASE + "/informax-cloud", { waitUntil: "networkidle" });
const levels = page.getByRole("tablist", { name: "The levels of Informax Cloud" });
await levels.getByRole("tab", { name: /Scan Point/ }).click();
await page.waitForTimeout(900);
ok(await page.locator('#journey-panel img[alt*="Scan Points in Bedrooms"]').evaluate((e) => getComputedStyle(e).opacity === "1"), "Cloud levels: Scan Point shows the Bedrooms screen");
await page.keyboard.press("ArrowRight");
ok((await levels.getByRole("tab", { name: /Content/ }).getAttribute("aria-selected")) === "true", "Cloud levels: ArrowRight moves to Content");

// 3b. Auto-advancing stories never move the headline (no layout shift while a visitor reads).
for (const [w, h] of [[1440, 900], [834, 1112], [390, 844]]) {
  const sctx = await browser.newContext({ viewport: { width: w, height: h } });
  const sp = await sctx.newPage();
  await sp.goto(BASE + "/", { waitUntil: "networkidle" });
  await sp.waitForTimeout(1500);
  const tops = [];
  for (let i = 0; i < 6; i++) {
    tops.push(await sp.locator("h1").first().evaluate((e) => Math.round(e.getBoundingClientRect().top + scrollY)));
    await sp.waitForTimeout(1800);
  }
  ok(new Set(tops).size === 1, `/ at ${w}px: the h1 stays put while the demonstration plays (${[...new Set(tops)].join(", ")})`);
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
ok(await mobileNav.getByRole("link", { name: "Hospitality" }).isVisible(), "mobile menu opens with the nav links");
ok(await mobileNav.getByRole("link", { name: "Request a Demo" }).isVisible(), "mobile menu has Request a Demo");
await mp.keyboard.press("Escape");
await mp.waitForTimeout(600);
ok(!(await mobileNav.isVisible().catch(() => false)), "Escape closes the mobile menu");
await m.close();

// 6. Enquiry API: validation, spam handling and the hardening added on 21 Nov 2026.
// Each check uses its own client address so the per-client rate limit does not interfere (Vercel overwrites this header in production).
let ip = 10;
const post = (data, extra = {}) =>
  page.request.post(BASE + "/api/enquire", { data, headers: { "x-forwarded-for": `203.0.113.${ip++}`, ...extra.headers }, ...extra.opts });
const valid = { name: "QA Test", company: "QA Venue", email: "qa@example.com", message: "Hello", startedAt: Date.now() - 10_000 };
ok((await post({ name: "", email: "x", startedAt: Date.now() - 10_000 })).status() === 422, "enquiry: missing fields -> 422");
ok((await post({ ...valid, message: undefined })).status() === 503, "enquiry: message is optional (503 locally means it reached delivery)");
ok((await post({ ...valid, website: "spam" })).status() === 200, "enquiry: honeypot is answered like success");
ok((await post({ ...valid, startedAt: Date.now() })).status() === 200, "enquiry: an instant submission is answered like success (discarded)");
ok((await post(valid)).status() === 503, "enquiry: valid enquiry without RESEND_API_KEY locally -> 503 (production has the key)");
ok((await post({ ...valid, name: "QA\r\nBcc: x@example.com" })).status() === 422, "enquiry: line breaks in single-line fields -> 422");
ok((await post({ ...valid, admin: true })).status() === 400, "enquiry: unknown fields -> 400");
ok((await post({ ...valid, interests: ["Free money"] })).status() === 422, "enquiry: interests outside the list -> 422");
ok((await post({ ...valid, message: "x".repeat(4001) })).status() === 422, "enquiry: overlong message -> 422");
ok((await post({ ...valid, message: "x".repeat(20000) })).status() === 413, "enquiry: oversized body -> 413");
ok((await post(valid, { headers: { origin: "https://evil.example" } })).status() === 403, "enquiry: cross-origin POST -> 403");
const wrongType = await page.request.post(BASE + "/api/enquire", { headers: { "content-type": "text/plain", "x-forwarded-for": "203.0.113.200" }, data: "name=x" });
ok(wrongType.status() === 415, `enquiry: non-JSON content type -> ${wrongType.status()}`);
const statuses = [];
for (let i = 0; i < 6; i++) statuses.push((await page.request.post(BASE + "/api/enquire", { data: { name: "" }, headers: { "x-forwarded-for": "203.0.113.250" } })).status());
ok(statuses[5] === 429, `enquiry: sixth request in ten minutes from one client -> 429 (${statuses.join(", ")})`);

// 7. The enquiry form shows field errors in the page.
await page.goto(BASE + "/enquire", { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Send enquiry" }).click();
await page.waitForTimeout(400);
ok(await page.getByText("Please enter your restaurant, hotel or company name.").isVisible(), "enquiry form shows its own validation");

// 8. Honesty statements the redesign keeps.
await page.goto(BASE + "/restaurants", { waitUntil: "networkidle" });
await page.getByText("Can I change a single dish inside Informax Cloud?").click();
ok(await page.getByText("Not today. You upload the updated menu as a PDF", { exact: false }).isVisible(), "restaurants says dish editing is not available");
await page.goto(BASE + "/hospitality", { waitUntil: "networkidle" });
for (const t of ["Checking room or treatment availability", "Taking bookings or payments"]) {
  ok(await page.getByText(t, { exact: true }).first().isVisible(), `hospitality says Informax leaves "${t}" to the team`);
}
await page.goto(BASE + "/informax-cloud", { waitUntil: "networkidle" });
await page.getByText("Is Informax Cloud available today?").click();
ok(await page.getByText("Self-service setup and billing are being prepared for launch", { exact: false }).isVisible(), "Cloud labels launch-only work");
for (const path of ["/", "/informax-cloud", "/hospitality", "/restaurants", "/how-it-works"]) {
  await page.goto(BASE + path, { waitUntil: "networkidle" });
  ok((await page.getByText(/development build/i).count()) >= 1, `${path} labels product screens as the development build`);
  ok((await page.getByText(/fictional/i).count()) >= 1, `${path} says the businesses shown are fictional`);
}
// 8c. Explicit prices and plan continuity, superseding the old no-pricing/no-QR copy rule.
await page.goto(BASE + "/pricing", { waitUntil: "networkidle" });
// Owner-confirmed prices (21 Nov 2026): annual £1,188 upfront (£99/month equivalent); monthly £99 for 3 months, then £149; first year £1,638; saving £450.
ok(await page.getByText("£1,188 billed upfront per year", { exact: true }).isVisible(), "annual amount and upfront billing are explicit");
ok(await page.getByText("First 3 months, then £149/month", { exact: true }).isVisible(), "monthly increase is explicit");
ok(await page.getByText("Save £450 in your first year", { exact: false }).isVisible(), "annual saving uses the introductory first year comparator");
ok(await page.getByText("£1,638 over the first 12 months", { exact: false }).isVisible(), "monthly first-year total is £1,638");
ok(await page.getByText("Informax is not currently VAT registered", { exact: false }).first().isVisible(), "pricing says no VAT is added");
const body = await page.locator("main").innerText();
for (const old of ["£1,788", "£199", "£249", "£2,688", "£900", "six months"]) ok(!body.includes(old), `pricing no longer mentions ${old}`);
for (const plan of ["annual", "monthly"]) {
  const label = `Choose ${plan}`;
  const href = await page.getByRole("link", { name: label }).getAttribute("href");
  ok(href === `/signup?plan=${plan}`, `${label} carries its plan to signup`);
}
await page.goto(BASE + "/signup?plan=annual", { waitUntil: "networkidle" });
ok(await page.getByText("Annual: £1,188 upfront per year (£99/month equivalent)", { exact: true }).isVisible(), "signup retains the annual plan");
const requestForm = page.getByRole("heading", { name: "Request your setup link" });
if (await requestForm.count()) {
  ok(await page.getByText("it does not create an account or take a payment", { exact: false }).isVisible(), "unconfigured signup explains what actually happens");
  ok((await page.locator("textarea").inputValue()).includes("£1,188"), "setup request carries annual billing into the message");
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
for (const p of ["/opengraph-image.jpg", "/hospitality/opengraph-image.jpg", "/informax-cloud/opengraph-image.jpg"]) {
  const r = await page.request.get(BASE + p);
  ok(r.status() === 200 && r.headers()["content-type"]?.includes("image"), `share image ${p} -> ${r.status()}`);
}

await browser.close();
console.log(failures ? `\n${failures} FAILED` : "\nALL PASSED");
process.exit(failures ? 1 : 0);
