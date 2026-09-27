# Informax Cloud — v5 visual prototype

A static, single-file HTML/CSS/JS click-through of a possible next-generation
Informax Cloud. **Prototype only** — no build step, no data, no auth, nothing
imported from the real app or the marketing site. Open `index.html` directly
in a browser, or serve the folder (`python3 -m http.server`) and visit it.

There was no `scratchpad/v4/` (or any earlier scratch prototype) in this
repository to continue, so this is the first round, numbered v5 to match the
brief's own example.

## What it covers

Screens (desktop + mobile, toggle role bottom-left):

- **Overview** — hero summary, week trend, "needs attention", busiest rooms.
- **Rooms & Areas** — the room/area list, filters, and a room detail page
  showing **shared content vs. an individual room override**: each content
  block has a Shared/This room toggle; switching it live-updates the guest
  phone preview on the right.
- **Codes** — the physical Codes placed around the hotel (never "QR code" or
  "scan code" in copy), a filterable list, and a detail drawer explaining a
  Code never owns content — it opens whatever its room currently shows.
- **Shared content** — the "write once, every room follows" library.
- **Branding** — hotel logo/accent/background/type, with a live guest-phone
  preview reacting to each choice.
- **Analytics** — trend chart with a real hover crosshair/tooltip, most-opened
  content, busiest rooms — totals only, never individual guests.
- **Super Admin** — a separate navy-banner "Overview" and a "Hotels" list
  (Casa Solaz shown mid-onboarding), reached via the role switch; "Manage
  hotels" / a hotel row simulates entering that hotel's own Cloud.

Data is fictional (Maison Aurelia, Lake Como) and terminology follows the
brief: **Codes**, never "QR Code"/"Scan Code"; Spaces-era wording from the
live app (Rooms & Areas, Touch Points→Codes, Activity→Analytics, shared
content→room overrides) adapted to the brief's new information architecture.

## Design system used

Read from the website repo at the approved baseline (commit `bb6184d`,
`src/app/globals.css` and `src/components/cloud/*`), **not** guessed from
screenshots:

- Informax navy `#0b1524` / near-black `#060a12`, Cloud blue `#0693e3`
  (+ hover `#1aa0ec`, deep `#0470b0`, light `#8ed1fc`), coral `#ff6b4e`
  restrained to attention states, green `#1f9d6b` for healthy/live.
- SF Pro / Segoe UI Variable system font stack, no web fonts.
- `.ix-btn`-style buttons: 48px primary height, 12px radius, same easing
  (`cubic-bezier(.16,1,.3,1)`), same hover/active behaviour.
- Small Cloud-blue eyebrows, two-tone headings (second phrase in a quieter
  grey, never italic), hairline dividers, white cards, ~12/20px radii.
- Blue arrow-on-hover link/button pattern from `Section.tsx` / `type.tsx`.
- Earth-horizon image and both Informax Cloud logo marks copied byte-for-byte
  from `public/` at `bb6184d` into `assets/` here (read-only source, not
  regenerated).

**Deliberate departure (per the brief):** the operational canvas is
`#f6f5f2`, a warm neutral, not the marketing site's cooler `#fbfbfd`/`#f5f6f9`.
Overview is allowed to be expressive (full-bleed navy/earth hero); Rooms,
Codes and other operational screens stay calm — white cards on the warm
canvas, minimal motion.

## Where things live

- `index.html` — everything: styles, icons (inline SVG, matching the real
  app's 24px/1.6-stroke set), fictional data, and the small hash-router that
  renders each screen. No dependencies, nothing to build.
- `assets/` — logos and the earth-horizon image copied read-only from the
  website repo's baseline commit.
- `shots/` — desktop + mobile screenshots of every screen, and
  `compare-v5.png`, a single comparison board.

## Boundaries respected

Nothing outside `scratchpad/v5/` was touched. The live website, its
`WorkspaceShowcase.tsx`, the `website/no-addresses-touchpoint-colour` branch,
the local `357bb57` handover commit, and the `informax-analytics` app
(cloned read-only for terminology/architecture reference only, into a
sibling directory outside this repo) were all left exactly as found. No
merge, push beyond this scratch commit, deploy, or config change was made.
