# Informax — Project Handover

**Read this before doing anything else in this repo.** It exists so a fresh
Claude Code session (no memory of prior conversations) can pick this project
up safely and correctly. It is kept up to date as the source of truth for
current state — if something here conflicts with what you observe in the
code or in production, trust what you observe and update this file.

Last updated: 17 September 2026.

## 1. What this project is

Informax used to be a hospitality-only company on WordPress. It has been
completely rebuilt as an independent **Next.js 16 / React 19 / TypeScript**
application and repositioned as a broader digital design and development
studio: custom websites, digital brochures, digital pamphlets, digital
directories, and bespoke digital projects — with hospitality kept as one
specialist practice among several rather than the whole business.

There is no CMS. All copy lives directly in the page and component files.

The retired WordPress-era static site is archived at
`legacy-wordpress-site/` for reference only — it is not part of the live
site and has no build dependency on it.

**17 September 2026 — homepage and visual identity redesign, then a
second pass extending it site-wide.** The homepage was rebuilt from
scratch as a hospitality-led, editorial-premium experience (cinematic
video hero, large serif typography, no rounded cards/shadows/gradients,
thin-rule dividers instead of borders). The homepage now leads with
hospitality/guest-directory positioning specifically, even though §1
above still describes Informax as a broader multi-service studio — that
broader positioning is preserved on `/services`, `/websites`,
`/digital-information`. This is a deliberate split: the homepage is the
flagship hospitality story, the inner pages still explain the full
studio. If asked to reconcile these, check with the user rather than
picking a direction unilaterally — it's a business-positioning question,
not a styling one.

A second pass the same day extended the same visual system to
`/services`, `/digital-information`, `/websites`, `/about`, `/enquire`
and the top of `/hospitality` (each restructured with its own editorial
composition, not a copy of the homepage layout), plus the shared
primitives every page inherits from:
- `src/components/ui.tsx` — `BtnPrimary`/`BtnGhost` are now underlined
  text links (no more gradient pill buttons anywhere on the site).
- `src/components/sections/FinalCta.tsx` — rebuilt as one large statement
  + a link, no more dark box with a 3-card meta row.
- `src/components/EnquireForm.tsx` — underline inputs instead of boxed
  rounded fields, rectangular toggle tags instead of checkbox pills, a
  solid rectangular submit button instead of a gradient pill.
- `src/components/Header.tsx` — only transparent-over-hero on `/`
  (`TRANSPARENT_AT_TOP_ROUTES`); every other route gets a solid header
  from load, because their heroes are on light backgrounds and a
  transparent header there made the white logo unreadable. **If you add
  a new route with a full-bleed dark hero, add it to
  `TRANSPARENT_AT_TOP_ROUTES`, otherwise leave new routes out of that
  set.**

**17 September 2026 — final consistency pass, closed out the redesign.**
The remaining `/hospitality` sections (`Customise`, `Verticals`,
`Locations`, `NoApp`, `GuestJourney`) were rebuilt to drop rounded
feature-card/pill/icon-grid treatments in favour of the same thin-rule,
numbered-list, inline-tag language used everywhere else. `Touchpoints`
and `Showcase` were left as-is (thin-border grid and distinct
per-property cards respectively — judged intentional, not generic, not
touched). The shared `Eyebrow` component in `ui.tsx` was simplified to
drop its leading dash-rule, matching the plain small-caps label pattern
already established across every new section — this was a real,
easy-to-miss inconsistency since `Eyebrow` was still used by
`Touchpoints`, `Showcase`, and `LegalPage`, so fixing the one shared
component fixed all three call sites. `EnquireForm.tsx` gained
`focus-visible` outlines on the text inputs and the interest toggle
labels — the previous `focus:outline-none` had no visible replacement,
which was a genuine keyboard-accessibility gap, especially on the
interest toggles where the real `<input>` is visually hidden inside a
styled `<label>`.

**Known remaining legacy component:** `LegalPage.tsx`'s `rounded-3xl`
card wrapper around the legal-page body text. Judged intentional (a
readable content container for long-form legal text, not a feature
card) and left alone — flag it if that judgment call should be
revisited.

## 2. Current status — read this first

- **Live in production** at `https://informax.co.uk` and
  `https://www.informax.co.uk`, both serving the new Next.js site over
  valid HTTPS. Confirmed via direct HTTP checks and browser testing, not
  assumed.
- **WordPress is still running** at its original hosting, but no longer
  receives traffic from the domain. It has **not** been cancelled or
  deleted — that decision belongs to the user (Tyler), not to any agent
  working in this repo. Do not touch WordPress hosting/domain settings
  without being explicitly asked to.
- **Enquiry email delivery is fully working.** `informax.co.uk` is verified
  as a sending domain in Resend (DKIM + SPF CNAMEs added at WordPress.com,
  confirmed `Verified` in the Resend dashboard), `ENQUIRY_FROM_EMAIL` is
  set in Vercel Production to `Informax Enquiries
  <enquiries@informax.co.uk>`, and a real test enquiry sent through the
  live `/enquire` form on `informax.co.uk` was confirmed **Delivered** to
  `info@informax.co.uk` in the Resend Emails dashboard. See §7 for the
  full history (kept for context, since sandbox-mode issues like this tend
  to recur if the domain or key ever changes).

## 3. Stack & repository

- Next.js 16.3.1 (App Router), React 19.2.8, TypeScript, Tailwind CSS v4
  (CSS-first theme in `src/app/globals.css`), framer-motion, lucide-react.
- Repo: `https://github.com/tylerokkers-lang/informax-site` (public, `main`
  branch, connected to Vercel for auto-deploy on push).
- Local setup:
  ```bash
  npm install
  npm run dev          # http://localhost:3000
  ```
- Before pushing any change, always run:
  ```bash
  npx tsc --noEmit
  npm run lint
  npm run build
  ```
  All three must be clean. This has been the standard for every change so
  far — don't relax it.

## 4. Deployment

- Vercel team: `informax`. Project: `informax-site`.
- The GitHub repo is linked to this Vercel project. **Every push to `main`
  auto-deploys to production.** There is no separate staging step in this
  setup — be confident in changes before pushing, or use a branch/preview
  deployment if you want to check first (`git push` a branch triggers a
  Vercel preview deployment automatically; only `main` promotes to
  production).
- Manual deploy from the CLI if ever needed (rarely necessary given
  auto-deploy): `npx vercel deploy --prod --yes`. Use `npx`, not a global
  install — a global `npm install -g vercel` will fail in this environment
  due to permissions, and was deliberately avoided to keep `vercel` out of
  the project's own `package.json`.
  **Important:** this command deploys whatever is on local disk, committed
  or not — it does not deploy the last git commit. Only run it when the
  local working tree is either clean (matches the last commit) or when
  shipping the uncommitted state is explicitly intended, e.g. to pick up a
  newly-added environment variable without unrelated pending edits going
  live prematurely. If uncommitted work ships this way, commit it
  afterwards so git and production stay in sync.
- Production aliases: `informax.co.uk`, `www.informax.co.uk`,
  `informax-site.vercel.app`.

## 5. Pricing — deliberately not published

As of 8 September 2026, the site carries **no customer-facing pricing at
all**, by explicit instruction. The dedicated `/pricing` page was removed
entirely (route deleted, no longer in the sitemap, no longer linked from
nav or footer), and every price figure and "from £X" mention was removed
from: the homepage, `/services`, `/websites`, `/digital-information`,
`/hospitality`, `/enquire`, the shared `ServicesOverview` and `FinalCta`
components, and site-wide metadata in `layout.tsx`. Pages that used to link
to `/pricing` ("See Pricing" etc.) now point at `/services` or `/enquire`
instead. Generic pricing-*philosophy* copy with no figure (e.g. "priced
honestly", "a clear, honest proposal") was left in place — only concrete
prices and the pricing page/links were removed.

If pricing is ever reinstated, there is no single source of truth to
restore from; the last published figures (for reference only, not
necessarily still accurate) were: Websites from £1,200, Digital Brochures
from £400, Digital Pamphlets from £200, Digital Directories from £900, plus
a set of website add-ons (Additional Page £100, Advanced Enquiry System
£150, Reviews System £150, Blog £200, Advanced Animations £200, Third-Party
Integrations £200, Booking System £250, Online Payments £250, CMS &
Content Management £300, Membership/Login Area £400, E-Commerce £500,
Ongoing Maintenance £75/mo). Get current figures from the user before
reintroducing any of this — do not assume these are still right.

## 6. Domain & DNS — read before touching anything here

This is the most sensitive part of the project. **Do not modify DNS
records without explicit instruction, and even then, follow the process
below exactly.**

- DNS for `informax.co.uk` is managed at **WordPress.com's nameservers**
  (`ns1/ns2/ns3.wordpress.com`) — it was deliberately **not** migrated to
  Vercel's nameservers, specifically to avoid having to recreate every
  email-related record by hand.
- Records changed since launch, all added directly in the WordPress.com
  DNS panel (an authenticated Chrome session with DNS write access was
  available when these were added; the values came verbatim from the
  Vercel/Resend dashboards, never invented):
  - `A @ 76.76.21.21` (root domain → Vercel), by the user.
  - `www` remains a `CNAME → informax.co.uk`; it resolves correctly through
    the updated root A record and needs no separate change.
  - `TXT resend._domainkey` → DKIM public key for Resend (added 8 September
    2026, to verify `informax.co.uk` as a Resend sending domain — see §7).
  - `CNAME rsend` → `rsend-euw1.forge.rmta.net` (Resend SPF/return-path,
    added same day).
  - `CNAME send` → `send.forge.rmta.net` (Resend SPF/return-path, added
    same day).
  - Resend's "Enable Receiving" option was left **off** when the domain was
    added, specifically so no Resend MX record was created — the existing
    Microsoft 365 MX record (below) stays the only mail-receiving path.
- **Every one of these must remain untouched.** Confirmed present via
  direct public DNS lookup (`dig`), both before and after the cutover:
  - `MX @` → `informax-co-uk.mail.protection.outlook.com` (Microsoft 365
    email)
  - `TXT @` → SPF record including `secureserver.net` and
    `_spf.wpcloud.com`
  - `TXT @` → Google site verification
  - `TXT @` → Microsoft 365 tenant verification (`*.onmicrosoft.com`)
  - `CNAME wpcloud1._domainkey` / `wpcloud2._domainkey` → `*.wpcloud.com`
    (DKIM)
  - `CNAME autodiscover` → `autodiscover.outlook.com` (Outlook client
    config)
  - `CNAME email` → `email.secureserver.net` (GoDaddy)
- SSL: a Let's Encrypt certificate for `informax.co.uk` was issued
  automatically once the A record propagated (verified with `openssl
  s_client`). Both root and `www` serve HTTPS with HSTS.
- Optional, not required: Vercel suggests an additional redundant A-record
  pair (`216.198.79.1` / `64.29.17.1`) for resilience. The site is fully
  functional without it — treat this as a nice-to-have, not a task.
- No agent working in this repo has credentials to WordPress.com's DNS
  panel or any registrar. If a DNS change is ever genuinely needed, the
  correct process is: get the exact required record from Vercel
  (`npx vercel domains inspect <domain>`), present it to the user in a
  table, and let them make the change themselves. Never invent DNS values.

## 7. Environment variables

| Variable | Status | Notes |
|---|---|---|
| `RESEND_API_KEY` | **Set in Production** (added by user, confirmed via `npx vercel env ls production`) | Required for `/enquire` to send email via Resend. |
| `ENQUIRY_TO_EMAIL` | Not set (optional) | Defaults to `info@informax.co.uk` in code if unset. |
| `ENQUIRY_FROM_EMAIL` | **Set in Production**: `Informax Enquiries <enquiries@informax.co.uk>` | Sends from the verified `informax.co.uk` domain in Resend. Without this set, the code falls back to Resend's shared `onboarding@resend.dev` sandbox sender, which can only deliver to the Resend account's own registered email, never to arbitrary recipients — this was the original bug, see below. |

**History (8 September 2026):** the enquiry form initially failed in
production with `403 validation_error: You can only send testing emails to
your own email address (tylerokkers@gmail.com). To send emails to other
recipients, please verify a domain at resend.com/domains, and change the
from address to an email using this domain.` This was a Resend sandbox-mode
restriction, not a code bug. Resolved by:
1. Adding `informax.co.uk` as a sending domain in Resend
   (resend.com/domains), with "Enable Receiving" left off.
2. Adding the DKIM TXT record and two SPF CNAME records Resend generated
   to WordPress.com's DNS panel (see §6) — copied verbatim from Resend, and
   double-checked byte-for-byte against public DNS after a first attempt
   at typing the ~220-character DKIM key silently dropped four characters
   (a known risk with long values and simulated keystrokes — prefer
   copy/paste over typing for anything over a few dozen characters, and
   verify the published record's length/content matches before trusting
   it).
3. Once Resend showed the domain `Verified`, setting `ENQUIRY_FROM_EMAIL`
   in Vercel Production and redeploying.
4. Submitting a real enquiry through the live `/enquire` form and
   confirming `Delivered` status for `info@informax.co.uk` in
   resend.com/emails, not just a 200 response from the API.

**If this ever regresses:** do not attempt to generate or guess a
`RESEND_API_KEY`, a verified domain, or a `from` address on an unverified
domain. `npx vercel logs <deployment-url>` (CLI is already authenticated as
`tylerokkers-8214`, project already linked in `.vercel/`) is the correct
way to see the real Resend error without ever touching the key value
itself. Check resend.com/domains for the domain's verification status and
resend.com/emails for individual send/delivery status.

## 8. Outstanding items

1. **Decide when to retire WordPress** — owner: user. Nothing gets
   cancelled automatically.
2. Optional: redundant Vercel A records (see §6).

## 9. Every route

| Path | Purpose |
|---|---|
| `/` | Homepage — hero, problem story, services overview, hospitality teaser, concept examples |
| `/services` | All six service lines in depth |
| `/websites` | Website service detail, capability list |
| `/digital-information` | Brochures & pamphlets, plus directories |
| `/hospitality` | The specialist hospitality practice |
| `/about` | Founder story, company values |
| `/enquire` | Enquiry form |
| `/privacy-policy`, `/terms-and-conditions`, `/cookie-policy` | Legal |
| `/api/enquire` | POST handler for the enquiry form |
| `/sitemap.xml`, `/robots.txt` | Generated, cover all routes above |

All confirmed returning HTTP 200 on `informax.co.uk` as of the last update
to this file.

## 10. Key files for making changes

| File | What's there |
|---|---|
| `src/lib/constants.ts` | Nav links, footer links, enquiry form options, contact email, site URL |
| `src/app/globals.css` | All design tokens: colours, fonts, animation keyframes |
| `src/app/[route]/page.tsx` | One file per page; copy lives directly in the JSX |
| `src/components/EnquireForm.tsx` | Client-side form logic, validation, states |
| `src/app/api/enquire/route.ts` | Server-side validation and the Resend email send |
| `src/components/Header.tsx` / `Footer.tsx` | Site chrome, including the Services dropdown |
| `src/components/sections/VideoHero.tsx` | Shared cinematic video-hero engine (film + scrim + headline + CTAs). Takes video/poster/copy as props — holds no video path of its own. |
| `src/components/sections/Hero.tsx` | Homepage hero. Passes the Earth/global-network film to `VideoHero`. |
| `src/components/sections/HospitalityHero.tsx` | `/hospitality` hero. Passes the hospitality film to `VideoHero`. Entirely independent of `Hero.tsx` — different constants, different files, cannot overwrite each other. |
| `src/components/Header.tsx` / `Footer.tsx` | Site chrome, including the Services dropdown |

**Two permanent, independent hero films — confirmed by the user, not
placeholders:**

1. **Homepage (`/`)** — `public/hero-video.mp4` / `.webm` / `hero-poster.jpg`,
   used by `Hero.tsx`. An animated Earth/global-network globe with light
   trails. The user has explicitly confirmed (17 September 2026) that this
   is the **permanent** homepage identity, representing Informax as a
   technology platform connecting information and experiences — not
   hospitality footage, and not to be swapped for any. Earlier notes in
   this file calling it a placeholder are superseded.
2. **Hospitality (`/hospitality`)** — `public/hospitality-hero-video.mp4` /
   `.webm` / `hospitality-hero-poster.jpg`, used by `HospitalityHero.tsx`.
   An illustrated/cartoon-style hotel arrival and check-in sequence,
   supplied by the user specifically for this page.
   - **The source file the user supplied was 15s long and included a
     second, mismatched "Informax" wordmark and a marketing tagline
     ("ONE TAP. A WORLD OF INFORMATION.") baked directly into the video
     pixels, plus a few seconds of garbled/nonsense AI-generated signage
     text.** That mismatched logo does not match the site's actual
     wordmark and would have visually collided with the real headline
     text and the real header logo. This was a genuine defect, not a
     style judgment call, so it was trimmed out rather than shipped:
     the current files keep only the two clean sub-scenes (hotel arrival
     → check-in desk, and the room/phone scene), concatenated into a
     6.5s loop, before the broken segment. Re-derive from the original
     source (kept nowhere in this repo — it was only in the user's
     Downloads folder) if a different cut is wanted; do not re-introduce
     the untrimmed file.
   - A small "Informax"-branded desk-card prop still appears in-frame in
     the room scene, in a different logo style to the real site wordmark.
     Lower-severity than the wordmark/tagline issue (small, low visual
     weight) and was left as a disclosed minor inconsistency rather than
     attempting per-frame masking.
   - Source resolution is only 560×560, upscaled by nothing (re-encoded
     at native resolution) — it will look soft on large desktop displays.
     A higher-resolution replacement would be a straightforward
     same-filename swap.

Both heroes follow the same technical pattern: MP4 (H.264) + WebM (VP9)
sources, a JPEG poster, `prefers-reduced-motion` fallback to the poster,
and pause-on-tab-hidden. `Header.tsx`'s `TRANSPARENT_AT_TOP_ROUTES` set
includes both `/` and `/hospitality` since both open with a full-bleed
dark video hero — add any future full-bleed-video route here, and only
here.

## 11. House style for copy

- British English throughout.
- No em dashes, en dashes as sentence separators, or dash-based
  constructions in user-facing copy. Rewrite the sentence naturally
  (full stop, comma, colon, semicolon) rather than mechanically swapping
  the dash for punctuation. This was a deliberate, explicit instruction
  from the user and a full sweep was already done across every page —
  don't reintroduce the habit in new copy.
- Avoid generic AI-marketing language (seamless, elevate, unlock,
  leverage, cutting-edge, game-changer, etc.) and clichéd constructions
  like "it's not just X, it's Y."
- Visual identity: white/near-black neutrals with an indigo (`#5643e0`
  family) and coral (`#ff6b4e` family) accent pair, Fraunces for display
  headings, Inter for body text. This was chosen deliberately to read as a
  creative studio rather than an executive consultancy, and to sit clearly
  apart from the related "Your Executive Support" property in the same
  Vercel account. Do not revert to the earlier cream/brass hospitality
  palette or introduce a new one without being asked.

## 12. Safety notes for any agent working here

- Never attempt DNS or domain-registrar changes directly — no agent has
  that access, and even if it did, §6 explains why this needs to go
  through the user.
- Never fabricate or guess a secret (API keys, tokens). Ask the user to
  provide it via a secure channel (their own dashboard, not pasted in
  chat) when genuinely needed.
- Never cancel or delete the WordPress installation, hosting, or domain
  services without an explicit, current instruction to do so.
- This file may be stale by the time you read it. Cross-check anything
  safety-critical (DNS records, env var status, deployment status) against
  live state before acting on it.
