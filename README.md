# Informax

Informax's marketing website — a digital design and development studio
offering custom websites, digital brochures/pamphlets, digital directories,
bespoke digital projects, and a specialist hospitality practice (digital
guest directories, hospitality websites). Built as an independent Next.js
application; no WordPress dependency. The retired WordPress-era static site
is kept for reference in `legacy-wordpress-site/`.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (CSS-first theme in `src/app/globals.css`)
- framer-motion for scroll reveals and the mobile nav
- No CMS — all copy lives directly in the page/section components

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
src/app/                 Routes (App Router)
  page.tsx                 Homepage — hero, problem, services overview, etc.
  services/                Services hub — all six service lines in depth
  websites/                Website design & development service page
  digital-information/     Digital brochures/pamphlets + directories (#brochures, #directories)
  hospitality/             Hospitality practice (assembles the hospitality-specific sections)
  pricing/                 £1,200 starting price + modular add-ons
  about/                   Founder story / company page
  enquire/                 Dedicated enquiry page
  privacy-policy/
  terms-and-conditions/
  cookie-policy/
  api/enquire/route.ts     Enquiry form submission handler
  sitemap.ts, robots.ts    Generated SEO files
src/components/
  Header.tsx, Footer.tsx   Site chrome (Header includes a Services dropdown)
  EnquireForm.tsx          Client-side form: validation + submit states
  Reveal.tsx               Scroll-reveal wrappers (framer-motion)
  ui.tsx                   Shared buttons/eyebrow/heading primitives
  sections/                Section components — homepage ones, plus the
                            hospitality-specific set (MeetInformax,
                            DigitalDirectory, Customise, Verticals,
                            Touchpoints, GuestJourney, Locations, NoApp,
                            Showcase) reused on /hospitality
src/lib/constants.ts       Nav links (incl. NAV_SERVICES dropdown), footer
                            links, enquiry interest/budget options
```

## Enquiry form email delivery

The `/enquire` form validates client- and server-side and POSTs to
`/api/enquire`. Sending the email itself goes through
[Resend](https://resend.com)'s HTTP API. Until it's configured, submissions
are validated and logged server-side but **not delivered** — the form
correctly shows a "something went wrong, email us directly" error rather
than a false success.

To go live, set these environment variables (in `.env.local` for dev, or in
your hosting provider's dashboard for production):

```bash
RESEND_API_KEY=your_resend_api_key       # required to send at all
ENQUIRY_TO_EMAIL=info@informax.co.uk     # optional, defaults to this
ENQUIRY_FROM_EMAIL="Informax Enquiries <enquiries@informax.co.uk>"  # optional; the from-domain must be verified in Resend
```

No `RESEND_API_KEY` is committed anywhere in this repo — add it as a secret
in your hosting provider, never in source control.

## Deployment

This is a standard Next.js app — deploy it on [Vercel](https://vercel.com/new)
(recommended, zero config) or any Node hosting that supports Next.js.
Set the environment variables above in the hosting provider's dashboard
before going live.

## Content notes

- The `/about` founder story, and the Privacy/Terms/Cookie legal copy, were
  migrated from the previous WordPress site and reworded where they
  referenced WordPress/Automattic/Jetpack specifically, since this site no
  longer runs on that stack.
- The only logo asset available is a white/transparent mark
  (`public/informax-logo-white.png`), which is why the header and footer are
  kept dark — it isn't legible on the light content sections. Swap in a
  dark-on-light variant if one becomes available and it can be used more
  broadly.
- No analytics are wired in. The Cookie Policy reflects that honestly; update
  it if/when an analytics provider is added.
- The visual identity is white/near-black neutrals with an indigo + coral
  accent pair (tokens `--brass*` and `--coral*` in `globals.css` — the
  `brass` name is legacy from an earlier palette iteration and now holds
  indigo values; kept to avoid a site-wide class rename).
- The homepage "concept" examples (Aldergate & Marsh, Selwyn Property Group,
  The Exchange) are clearly-labelled illustrative concepts, not real client
  work — swap them for actual portfolio pieces once available.
