// Functional, link and accessibility checks against the running production build.
import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";

const BASE = process.env.BASE ?? "http://localhost:3200";
const AXE = readFileSync(process.env.AXE_JS ?? "node_modules/axe-core/axe.min.js", "utf8");
const PAGES = ["/", "/restaurants", "/hotels", "/how-it-works", "/informax-cloud", "/pricing", "/signup", "/enquire", "/about", "/digital-experiences", "/privacy-policy"];
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

// 2. Owner update (29 Oct): a balanced introduction; Hotels and Restaurants are dedicated routes.
await page.goto(BASE + "/", { waitUntil: "networkidle" });
for (const [name, href] of [["Home", "/"], ["Informax Cloud", "/informax-cloud"], ["Hotels", "/hotels"], ["Restaurants", "/restaurants"], ["Pricing", "/pricing"]]) {
  ok(await page.getByRole("navigation", { name: "Primary", exact: true }).getByRole("link", { name, exact: true }).getAttribute("href") === href, `primary navigation: ${name} -> ${href}`);
}
ok(await page.getByRole("link", { name: "For hotels", exact: false }).first().getAttribute("href") === "/hotels", "home gives hotels a direct route");
ok(await page.getByRole("link", { name: "For restaurants", exact: false }).first().getAttribute("href") === "/restaurants", "home gives restaurants a direct route");
ok(await page.getByText("Informax sample designs, shown with fictional businesses.").isVisible(), "home labels sample designs honestly");
await page.goto(BASE + "/restaurants", { waitUntil: "networkidle" });

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
for (const t of ["Digital hotel directory", "Spa Scan Points", "Restaurant information", "Room upgrade opportunities", "Check room or treatment availability", "Take bookings or payments"]) {
  ok(await page.getByText(t, { exact: true }).first().isVisible(), `hotels shows "${t}"`);
}
// 8b. Cloud explains the workflow and distinguishes the development demo from the launch setup.
await page.goto(BASE + "/informax-cloud", { waitUntil: "networkidle" });
ok(await page.getByRole("heading", { name: /Open. Update. Publish/ }).isVisible(), "Cloud leads with the simple workflow");
ok((await page.locator("#cloud-workflow ol li").count()) === 4, "Cloud has four setup steps");
ok(await page.getByText("Self-service account setup, billing and the simplified team model", { exact: false }).isVisible(), "launch-only features are labelled");
ok(await page.getByRole("link", { name: "Find your plan" }).getAttribute("href") === "/pricing", "Cloud routes to pricing");
for (const path of ["/", "/restaurants", "/hotels", "/informax-cloud"]) {
  await page.goto(BASE + path, { waitUntil: "networkidle" });
  ok((await page.getByText(/preview of (Informax Cloud|upcoming functionality)/i).count()) >= 1, `${path} labels product screens as a preview`);
  ok(await page.getByText("Bespoke design is an optional, separately quoted service.", { exact: false }).isVisible(), `${path}: design is separate from the subscription`);
}
// 8c. Explicit prices and plan continuity, superseding the old no-pricing/no-QR copy rule.
await page.goto(BASE + "/pricing", { waitUntil: "networkidle" });
ok(await page.getByText("£1,788 billed upfront per year", { exact: true }).isVisible(), "annual amount and upfront billing are explicit");
ok(await page.getByText("First 6 months, then £249/month", { exact: true }).isVisible(), "monthly increase is explicit");
ok(await page.getByText("Save £900 in your first year", { exact: false }).isVisible(), "annual saving uses the introductory first year comparator");
for (const plan of ["annual", "monthly"]) {
  const label = `Choose ${plan}`;
  const href = await page.getByRole("link", { name: label }).getAttribute("href");
  ok(href === `/signup?plan=${plan}`, `${label} carries its plan to signup`);
}
await page.goto(BASE + "/signup?plan=annual", { waitUntil: "networkidle" });
ok(await page.getByText("Annual: £1,788 upfront per year (£149/month equivalent)", { exact: true }).isVisible(), "signup retains the annual plan");
const requestForm = page.getByRole("heading", { name: "Request your setup link" });
if (await requestForm.count()) {
  ok(await page.getByText("it does not create an account or take a payment", { exact: false }).isVisible(), "unconfigured signup explains what actually happens");
  ok((await page.locator("textarea").inputValue()).includes("£1,788"), "setup request carries annual billing into the message");
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
