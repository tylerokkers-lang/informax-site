# Informax — Project Handover

**Read this before doing anything else in this repo.** It exists so a fresh
Claude Code session (no memory of prior conversations) can pick this project
up safely and correctly. It is kept up to date as the source of truth for
current state — if something here conflicts with what you observe in the
code or in production, trust what you observe and update this file.

Last updated: 20 August 2026.

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
- **One functional gap:** the enquiry form (`/enquire`) validates and
  handles errors correctly, but cannot actually send email yet because
  `RESEND_API_KEY` is not set in Vercel. See §7.

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
- Production aliases: `informax.co.uk`, `www.informax.co.uk`,
  `informax-site.vercel.app`.

## 5. Pricing currently published

This is the single source of truth for what's live — if you change a
price, update it here too, and in `src/app/pricing/page.tsx`.

| Service | Starting price | Appears on |
|---|---|---|
| Custom Websites | £1,200 | Home, /services, /websites, /pricing |
| Digital Brochures | £400 | Home, /services, /digital-information, /pricing |
| Digital Pamphlets | £200 | Home, /services, /digital-information, /pricing |
| Digital Directories | £900 | Home, /services, /digital-information, /pricing |
| Hospitality | Quoted individually | /hospitality, /pricing |
| Bespoke Projects | Quoted individually | Home, /services, /pricing |

Website add-ons (all on `/pricing`): Additional Page £100, Advanced Enquiry
System £150, Reviews System £150, Blog £200, Advanced Animations £200,
Third-Party Integrations £200 (complexity-dependent), Booking System £250,
Online Payments £250, CMS & Content Management £300, Membership/Login Area
£400, E-Commerce £500 (larger stores quoted individually), Ongoing
Maintenance £75/mo (explicitly does not include new pages/features/major
design work).

## 6. Domain & DNS — read before touching anything here

This is the most sensitive part of the project. **Do not modify DNS
records without explicit instruction, and even then, follow the process
below exactly.**

- DNS for `informax.co.uk` is managed at **WordPress.com's nameservers**
  (`ns1/ns2/ns3.wordpress.com`) — it was deliberately **not** migrated to
  Vercel's nameservers, specifically to avoid having to recreate every
  email-related record by hand.
- Only two records were ever changed, both by the user directly in the
  WordPress.com DNS panel (no agent has DNS write access):
  - `A @ 76.76.21.21` (root domain → Vercel)
  - `www` remains a `CNAME → informax.co.uk`; it resolves correctly through
    the updated root A record and needs no separate change.
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
| `RESEND_API_KEY` | **Not set** | Required for `/enquire` to actually send email via Resend. Without it, the form still validates correctly and shows an honest "email us directly" error rather than a false success — this is intentional, working-as-designed behaviour, not a bug to silently paper over. |
| `ENQUIRY_TO_EMAIL` | Not set (optional) | Defaults to `info@informax.co.uk` in code if unset. |
| `ENQUIRY_FROM_EMAIL` | Not set (optional) | Defaults to Resend's shared `onboarding@resend.dev` sender, which works with zero extra setup. A branded `@informax.co.uk` sender is possible later but requires verifying that domain in Resend, which adds its own DNS TXT/CNAME records — coordinate with §6 if that's ever done. |

**If asked to fix the enquiry form's email delivery:** do not attempt to
generate or guess a `RESEND_API_KEY`. Ask the user to add it directly in
the Vercel dashboard
(`https://vercel.com/informax/informax-site/settings/environment-variables`)
so it never passes through chat, then redeploy and verify with a real test
submission.

## 8. Outstanding items

1. **Add `RESEND_API_KEY` in Vercel** — owner: user. Once done, redeploy
   and verify a real enquiry send end-to-end on the live domain.
2. **Decide when to retire WordPress** — owner: user. Nothing gets
   cancelled automatically.
3. Optional: branded Resend sending domain (see §7).
4. Optional: redundant Vercel A records (see §6).

## 9. Every route

| Path | Purpose |
|---|---|
| `/` | Homepage — hero, problem story, services overview, hospitality teaser, concept examples |
| `/services` | All six service lines in depth |
| `/websites` | Website service detail, capability list, links to pricing |
| `/pricing` | Full pricing breakdown (§5) |
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
| `src/app/pricing/page.tsx` | All pricing figures — keep in sync with §5 above |
| `src/components/EnquireForm.tsx` | Client-side form logic, validation, states |
| `src/app/api/enquire/route.ts` | Server-side validation and the Resend email send |
| `src/components/Header.tsx` / `Footer.tsx` | Site chrome, including the Services dropdown |

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
