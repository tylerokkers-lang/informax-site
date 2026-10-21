# Informax — Project Handover

**Read this before doing anything else in this repo.** It exists so a fresh
Claude Code session (no memory of prior conversations) can pick this project
up safely and correctly. It is kept up to date as the source of truth for
current state — if something here conflicts with what you observe in the
code or in production, trust what you observe and update this file.

Last updated: 21 October 2026. **Read §0c first**: a complete restaurant-first
redesign is on branch `redesign/restaurant-first`, NOT live. Production still
serves `main` (the 28 September Access Point site, §0b). Once §0c is merged,
§0b, §0a and §0 are historical wherever they conflict with it.

## 0c. Restaurant-first redesign (20 to 21 October 2026): branch, NOT live

**Status: not ready for production.** Built, tested and pushed on branch
`redesign/restaurant-first`. `main`, informax.co.uk, DNS, environment
variables and Informax Cloud were not touched. **Do not merge to `main`
without the owner's explicit approval**: merging deploys to production (§4).

### Launch blockers (all need the owner)
1. **Photography (hard blocker).** Nine slots in `src/lib/photography.ts`,
   specified exactly in `docs/photography-brief.md` (subject, shape, minimum
   size, safe area, licence rules). Still placeholders: the build environment's
   network policy blocks Unsplash, Pexels and Wikimedia, and no AI imagery is
   allowed. **A production build now refuses to run** while any slot lacks a
   photograph, `licence` and `source` (guard in `next.config.ts`, only when
   `VERCEL_ENV=production`; previews are unaffected), so an accidental merge
   cannot publish placeholders: Vercel keeps the current site.
2. **V2 timing.** Every Informax Cloud screen on the site is from V2
   (`informax-cloud-v2`, PR #30 `feature/access-points` at `3ae4141`, still
   open, unmerged, and V2 has no production environment). informax.cloud still
   runs V1. See the dependency table below; decide whether to launch the site
   with V2 or wait for it.
3. **Owner review** of the preview on a real phone and desktop, and approval
   of the copy.
4. **Enquiry delivery** must be confirmed on production after go-live (Preview
   has no `RESEND_API_KEY`; the form and API code are unchanged apart from
   labels, and production delivery was last verified on 8 September 2026).

### What the site claims, and what it depends on
Checked against the V2 code at `3ae4141` (the captures' commit; no newer UI
commits exist) and the V1 code (`informax-analytics`, live at informax.cloud).

| Claim or demonstration on the site | Where | Live in V1 today? | V2 (not in production) |
|---|---|---|---|
| A permanent Code opens a PDF or website; no app or account for guests | everywhere | Yes (V1 calls it a Space, Touch Points) | Yes |
| Replace the PDF and every copy of the Code shows it | Home, Restaurants, Hotels | Yes, for hotels | Yes |
| Temporary content with an end time, then back by itself | Home, Hotels (spa 18:00), Restaurants (temporary menus) | Yes, for hotel rooms and areas | Yes |
| Version history and restore | Restaurants, Informax Cloud | Yes | Yes |
| Restaurant accounts: "Replace menu", temporary menu 1, 2 or 3 hours, Chef / Manager / Waiter sign-ins | Home hero, Restaurants, See It in Action | **No: V1 is hotel-only** | Yes |
| Access Points (Coffee Table, Bathroom, Restaurant Menu) and their pages | screens throughout | **No** (V1: Spaces and Touch Points) | Yes |
| Update many at once by type of Access Point, with undo | Hotels, Informax Cloud | **No** (V1 has a hotel-wide reset only) | Yes |
| The exact screens shown | everywhere | **No, V1 looks different** | Yes, real V2 views |

Honesty rules baked into the copy (keep them): menus are PDFs or a website
(no dish editor, and the site says so); an open page updates on refresh;
Informax shows offers but does not check availability, take bookings or
payments, or apply discounts (Hotels has an explicit "What it does not do"
box); demos say "real screens, fictional business"; the headline times on
Restaurants ("seven", "ten past") are labelled as an example.

### Informax Cloud application issues (not changed: separate repo)
Found while capturing; for the Cloud team, in `informax-cloud-v2`:
1. **Confirmed bug: Overview "Quick access".** An area holding exactly one
   Access Point shows "Nothing set up yet" even when that Access Point shows
   content. `Tile` in `src/ui/views/overview-view.tsx` shows the area's own
   content (`a.live`) when `a.units <= 1`, and in the Access Point model areas
   never hold content. Fix: use the single Access Point's live content.
2. **Hotel temporary preset defaults to "1 day"** (`defaultIndex: 1` in
   `src/industries/hotel/profile.ts`), while same-day offers (spa this
   afternoon) are common. A product decision, not a defect.
3. **Date and time field follows the browser language** (`datetime-local`):
   a US-English browser shows 10/21/2026, 06:00 PM in a UK hotel. Standard
   browser behaviour; worth a UK-formatted control or a hint.
4. **Withdrawn:** "the sidebar ends part-way down long pages" was an artefact
   of full-page screenshots. The sidebar is `position: fixed` and always
   visible to users. Not a bug.

### Structure and content
Nav: Home, Restaurants, Hotels, How It Works, Informax Cloud, Contact
(`/enquire`), **Request a Demo** (`DEMO_CTA`) and the Cloud "Log in" pill.
`/how-it-works` is a page again; `/hospitality` 308s to `/hotels`,
`/touch-points` to `/how-it-works`.
- `/` restaurant hero (`MenuHero`: three steps, the kitchen runs out of sea
  bass → a manager replaces the menu PDF → same Code, new menu; a caption under
  the stage explains each step, and a ring marks the changed dish on the
  guest's menu) → what Informax is → hotel experience (`HotelShowcase`) → the
  real product → See It in Action (Restaurant | Hotel, five steps each) → How
  it works → More possibilities → Request a demo.
- `/restaurants`: hero; **before and after** (`MenuBeforeAfter`: the two
  guest menus either side of the unchanged Table 12 Code, and printed menus
  versus Informax); replace from your phone (with the "no dish editor" note);
  temporary menus; one Code per menu; walkthrough; CTA.
- `/hotels`: hero; **at a glance** (directory, restaurant hours, spa offer
  with an end time, upgrade invitation, plus "what Informax does / does not
  do"); directory before and after; spa offer; upgrades; many at once;
  structure; walkthrough; CTA.
- `/how-it-works` (three steps, guests vs team, FAQ), `/informax-cloud`
  (product tour from real desktop screens).
- Share images regenerated (were hotel-only): `src/app/opengraph-image.jpg`
  (restaurant), `src/app/hotels/…` (hotel), `src/app/informax-cloud/…`, from
  the trimmed official logo and real guest or Cloud screens.
- Terminology: Code, Access Point, scan. Never "QR"; no Spaces or
  architecture words in marketing copy.

### Informax Cloud screenshots (`public/cloud/*.webp`, `src/lib/screens.ts`)
Captured from the real V2 views (AppShell, Access Point page, Content panel,
Bulk, Overview, guest PDF viewer) at `3ae4141`, with the product's own
fictional businesses (The Copper Table, Marlowe Grand Hotel) and fictional
PDFs; Playwright clicked the real controls. Nothing redrawn; crops leave out
the Code address and printable Code. The app's `/dev/preview` fixtures use a
real hotel brand, so they were not used. Marketing layers outside the app
(chips, captions, the ring around the changed dish) are always outside or
clearly over the captured screen. **Re-capture when the V2 UI changes**:
copy `docs/cloud-captures/capture-page.tsx.txt` to
`src/app/dev/marketing/[shot]/page.tsx` and `capture-pdf-route.ts.txt` to
`src/app/dev/marketing-pdf/[name]/route.ts` in a Cloud checkout, copy
`docs/cloud-captures/pdfs/*` to its `public/mkt/` (lower-case hyphenated
names, see the route), run `next dev -p 3100` with a local `.env.local`
(`INFORMAX_ENV=local`, a local Supabase URL and a well-formed placeholder
anon key; no database is needed), then `node docs/cloud-captures/shoot.mjs
<out>` and convert to WebP (780 px phones, 1800 px desktop). Delete the
capture files from the Cloud checkout afterwards. If the menu PDF changes,
re-measure the dish position used for the highlight (`DISH` in `MenuHero`,
`MenuBeforeAfter`, `SeeItInAction`).

### Accessibility and brand fixes (site-wide)
Primary button `#0475bb` (white text 4.9:1; `#0693e3` was 3.3:1); small blue
text on light backgrounds uses `brass-deep`; `--ink-mute` is `#5a6577`; the
inactive LinkedIn icon is an image with a label, not a link with no address;
heading levels are sequential. The logo was rendered stretched (a 1024×559
file declared as 420×140): header, footer and Code cards now use a lossless
trimmed copy, `public/brand/informax-logo-white-trim.png`.

Removed (still in git history): old `story/*`, most of `access/*`
(AccessPoint stays), `cloud/*` story parts, and the V1 app recreations in
`product/*`. Unused media in `public/video` and `public/images` was left.

### Verification (21 October 2026, local production build of the branch)
- `npx tsc --noEmit`, `npm run lint`, `npm run build`: clean. With
  `VERCEL_ENV=production` the build stops on the photography guard, as
  intended.
- Playwright, 62 checks, all pass: axe-core WCAG 2.1 A/AA with **zero
  violations on 9 pages**; one h1 per page; every internal link 200; the
  three redirects; hero step selection, the updated menu shown and no
  auto-advance after a choice; walkthrough Next, Restaurant/Hotel tabs with
  arrow keys, Start again; skip link; mobile menu incl. Escape; enquiry API
  422 / honeypot 200 / 503 without a key; form validation; the before/after
  and the hotel "does / does not" statements; share images served.
- No horizontal scrolling and no console errors on 8 pages at 1440, 834, 390
  and 320 px.
- Lighthouse (mobile, simulated slow 4G, local server; two runs each):
  performance Home 95–96, Restaurants 96, Hotels 95–96, How It Works 95–96,
  Informax Cloud 98–99; accessibility 100 everywhere (How It Works after the
  heading fix); best practices 100; SEO 100; CLS 0; LCP 2.1–2.9 s.
- **Vercel preview:** GitHub reports the Vercel deployment for each pushed
  commit as successful (commit status "Vercel", deployment environment
  Preview). The preview could **not** be opened from the build environment
  (its network blocks `*.vercel.app`), so nothing on the live preview has
  been checked by eye or by script. The branch alias is
  `informax-site-git-redesign-restaurant-first-informax.vercel.app` (always the
  newest commit); exact per-commit URLs are in Vercel or behind the tick on
  the commit in GitHub. Vercel may require the owner's Vercel sign-in.
  Commit `4d69da0` built successfully at
  https://informax-site-rh6q24716-informax.vercel.app (GitHub deployment
  7237607094, 21 October 2026), which also shows the production photo guard
  does not block preview builds.
- Not verified: real devices and Safari; real enquiry delivery; the preview.

### Production deployment (only after the owner's explicit approval)
1. Supply the nine photographs (`docs/photography-brief.md`), with licence and
   source recorded; check each page at phone and desktop width.
2. Decide the V2 question (blocker 2) and review the preview.
3. On the branch: `npx tsc --noEmit && npm run lint && npm run build`, and
   `VERCEL_ENV=production npx next build` must now pass the photo guard.
4. Record the rollback target first: the current production deployment
   (`npx vercel ls informax-site --prod`, or Vercel → Deployments → the one
   marked Production; on 21 October 2026 production was `main` at `97c0899`).
5. Merge `redesign/restaurant-first` into `main` (pull request or
   fast-forward). Vercel builds and promotes it automatically.
6. Check informax.co.uk and www on phone and desktop, then send one real
   enquiry from /enquire and confirm Delivered in resend.com/emails.

### Rollback
- Fastest: Vercel → Deployments → the previous production deployment →
  Promote to Production (or `npx vercel promote <that deployment's url>`).
  Instant, no rebuild.
- Then make git match: `git revert -m 1 <merge commit>` on `main` (or revert
  the fast-forwarded commits) and push, so the next push does not redeploy
  the redesign.
- Nothing else needs undoing: no DNS, environment variable or Informax Cloud
  change is part of this release.

### Needs the owner's decision
- Approve the redesign and copy; supply or license photography (or allow
  `images.unsplash.com` / `images.pexels.com` in the build environment's
  network settings so they can be sourced and checked there).
- Launch with V2 screens before V2 is in production, or wait (table above).
- LinkedIn address (still empty). Pricing stays unpublished (§5).

## 0b. Access Point positioning (28 September 2026)

- **Terminology (public site):** the physical object is the **Access Point**;
  the machine-readable identity inside it is its **Code** (connected to a
  Room, Area or Space). Never QR Code, Scan Code, NFC, Touch Point, Informax
  Touch or Informax Scan in marketing copy. Cloud management demos say
  **Codes** (list, "New Code", tabs, "Codes vs Direct"). Touch is kept in the
  code (`kind: "touch" | "scan"`, `TouchPoint` renders an Access Point) for a
  future Touch-enabled Access Point. Legal pages still say "NFC-enabled"
  on purpose, pending legal review.
- **Model:** Hotel → Spaces (shared: Spa, Restaurants, Gym, Meetings &
  Events, Guest Information) → Rooms & Areas (precise control) → Access
  Points / Codes → guest content. Every hotel has a **Default Landing Page**
  that rooms return to after temporary content ends.
- **Homepage (12 sections):** hero, one platform, the Access Point + Code,
  Spaces, Rooms & Areas, temporary content, Access Point design, hotel-wide
  control, analytics, audit, fits around your hotel, closing CTA. Components
  in `src/components/access/`.
- **Product maturity:** the site presents product direction (Rooms & Areas,
  temporary content, bulk updates, Code colourways, audit) ahead of the live
  app; unreleased workflows use "designed for / built for" wording. Keep it
  that way until they ship. Drawn Codes are illustrative and captioned as
  such; the centre mark is always Informax's.
- **Sharing:** `src/app/opengraph-image.jpg` / `twitter-image.jpg` (and the
  same under `informax-cloud/`), generated from the hero stills and official
  logos. No site-wide `og:url`.
- **Social links:** `SOCIAL_LINKS` in `src/lib/constants.ts`. Instagram is
  live (instagram.com/informax_cloud, supplied by the owner 29 September
  2026). LinkedIn is still empty and shows as an inactive icon until the
  owner supplies it. Never guess it.

## 0a. Design system and homepage story (27 September 2026) — live

- **Live:** commit `bb6184d` (fast-forward from `1c4438b`), production
  deployment `dpl_AJNmCMCaZgsyE6nyBX55247oLq2K`. Rollback target:
  `dpl_FVZcRd6pd2Gmov1sD1eJZYHSjQGL` (informax-site-9rkjv1guz-informax.vercel.app).

- **The website now uses Informax Cloud's visual language.** Informax Cloud
  (informax-analytics) is the reference and was not changed. Tokens in
  `globals.css`: the Cloud's system faces (SF Pro / Segoe UI Variable — no
  web fonts; Fraunces and Inter were removed), Cloud navy for dark sections
  (`--charcoal-*` now hold navy), Cloud blue as the accent (`--brass*` now
  hold #0693e3 / #0470b0 / #8ed1fc), 1180px container, Cloud easing.
  `.font-serif-display` is the display face at semibold, tight tracking,
  upright. Buttons: `.ix-btn ix-btn-primary` / `ix-btn-secondary(-dark)` /
  `.ix-link`, matching the app. Headline accents are a quieter grey
  (`Soft`), never italics or gold; eyebrows are sentence case in Cloud blue.
  The warm `--glow` colour is kept only inside hotel/Touch Point drawings.
- **No web addresses anywhere (27 September 2026, owner's request):** the
  site never shows a URL, web address, "Space link" or "Copy link". Demos
  show websites by page name ("Spa booking page"); the old "Your permanent
  Space" card is now `SpaceConnection` ("Connected Touch Points · Unchanged");
  the product point is "one permanent connection", not an address.
- **Touch Point accent is platinum** (`--glow` #dfe3ea / `--glow-deep`
  #9aa3b2) — deliberately not blue (Cloud) or gold. One token to change.
- **Nav order:** Home, Informax Cloud, Digital Experiences, About, Talk to
  Informax (footer follows the same order). The How It Works page was
  removed on 28 September 2026 and `/how-it-works` 308-redirects to
  `/informax-cloud`.
- **Homepage story (no product demos):** hero → why information matters →
  the problem → how Informax works → throughout the Hotel (environments) →
  benefits → our approach → **Meet Informax Cloud** (final section, existing
  meet-cloud film, "Discover Informax Cloud" → `/informax-cloud`).
- **`/informax-cloud` holds every product demonstration:** Spaces, Current
  Content, Change Content film, PDF or website, Previous Versions, Touch
  Points list (`TouchPointsShowcase`), Informax Touch/Scan, Activity, Hotel
  workspace + People & access (`WorkspaceShowcase`), remote update, Guest
  Directory. Demo wording follows the real app; data is fictional
  (Maison Aurelia).

## 0. Current positioning (25 September 2026 redesign) — read this first

**Live on informax.co.uk since 25 September 2026** (pushed at commit
`4a38359`, deployed automatically by Vercel).

Informax is now positioned as a **hospitality technology platform**, and
**Informax Cloud** is the hero product. The old "digital guest directory
company" framing is demoted: a Guest Directory is one Space among many.

The product model (never misrepresent it in copy):
- A hotel creates **Spaces** (Spa, Gym, Restaurants, Meetings & Events,
  Bedrooms, Guest Directory, ...). Each Space has one **permanent Informax
  address** that does not change when content is replaced, a website is
  connected, the Space is renamed or content is rolled back.
- A Space serves a **PDF or a website** and the hotel can switch at any time.
- **Touch Points** are the physical products placed around the hotel. They
  connect to a Space and **never own content**. Change the Space and every
  connected Touch Point follows. The core benefit is that the hotel changes
  what a physical Touch Point does without touching the Touch Point.
- Customer-facing language: **Informax Touch / Informax Scan / Touch Point**.
  Never "NFC", "QR code", "tag" or "sticker" in marketing copy. (The legal
  pages still say "NFC-enabled tags"; that is contract wording and was left
  for legal review, not changed.) Do not expose database terms such as
  `public_code`, and do not invent a Space URL format.
- Guests need no app. Activity is presented as aggregate insight only.

Sitemap: `/` (home), `/informax-cloud` (product page), `/how-it-works`,
`/hospitality` (problem-led), `/touch-points`, `/about`, `/enquire`, legal
pages. `/services` was removed and 308-redirects to `/informax-cloud` in
`next.config.ts`. `/websites` and `/digital-information` are **kept live but
demoted**: out of the main nav, linked from the footer ("Also from
Informax"), sitemap priority 0.5. They still carry their own video heroes and
older copy; whether to keep, rewrite or retire them is a business decision
for the user. Primary CTA everywhere is `PRIMARY_CTA` in `src/lib/constants.ts`
("Talk to Informax"). Nav includes Home because the user explicitly asked
for it earlier.

Where things live:
- `src/components/cloud/*` — the page-level story: `HomeHero` + `HotelScene`
  (SVG hotel cross-section, warm rooms = physical, indigo arc = Cloud, risers
  = connections), `TouchPointStays`, `ContentFormats`, `SpacesGrid`,
  `HowSteps`, `PageHero`, `CloudCta`, `TouchPoint` (the physical product drawn
  in CSS), plus small helpers.
- `src/components/product/*` — **animated recreations of the real Informax
  Cloud app** (see "Product films" below).
- `src/lib/spaces.ts` — Space data and Touch Point placements. Edit copy here.
- Motion: `Reveal` gained a `blur` prop. Every animated component honours
  `prefers-reduced-motion` (Framer via `useReducedMotion`, CSS via the media
  query in `globals.css`). Demos only run while on screen. No new
  dependencies were added.
- Design tokens: new warm `--glow` / `--glow-deep` (physical hotel light) sit
  beside the existing indigo `--brass*` family (digital / Cloud).


### Product films (25 September 2026)

The marketing site shows **recreations of the real Informax Cloud app**, not
generic dashboards. The real app lives in `../informax-analytics` (Next 15,
Supabase, deployed at informax.cloud) and is the source of truth for wording,
layout and behaviour. The film components are recreated presentational code:
**nothing is imported from the app and no auth, data or business logic is
shared.** If the app's UI changes, update the films to match.

Where the app was read from (read-only): `tailwind.config.ts` + `globals.css`
(tokens), `components/ui/*` (icons, sheet, motion), `components/content/*`
(Current Content, Change Content, versions), `components/admin/*` (Space
detail, Spaces cards, Touch Points, Space URL), `components/dashboard/*`
(Hotel Admin shell), `lib/product-language.ts` and
`docs/design/terminology-map.md` (wording).

- Tokens are copied under a `.ixp` wrapper in `globals.css` (navy `#0b1524`,
  brand blue `#0693e3`, system UI fonts, 12/20/28px radii, borderless soft
  surfaces, four button styles). Marketing keeps its own identity outside it.
- `AppFilm` — the ~19 s main film (Hotel workspace, Spaces, Spa, Change
  Content, Use a website, Publish, unchanged URL and Touch Points, Activity,
  Previous Versions). At `min-[1120px]` it is the desktop app frame (scaled to
  fit, never below ~95%); below that it is `PhoneFilm` (unscaled, real-size
  text).
- `PhoneFilm` — the real Hotel Admin dashboard on a phone; `variant="main"`
  starts at Your Spaces, `variant="update"` starts inside the Space.
- `MicroFilms` — `PermanentUrlFilm`, `ChangeContentFilm`,
  `ManyTouchPointsFilm`, `TouchScanFilm`, `ActivityFilm`, `VersionsFilm`.
  `HeroSpaceChip` is the static card in the home hero. `ContentFormats`
  (`components/cloud`) uses the app's real Change Content tiles.
- Engine (`film.tsx`): timed marks drive React state, CSS does the movement;
  no animation library. Films run only while in view (IntersectionObserver via
  framer's `useInView`), clear all timers when off screen, and restart when
  they return. Reduced motion shows a static final frame with no pointer.
- **Rules:** every label, button and message must exist in the real app.
  Do not invent features. Known deliberate exceptions, both outside the app
  frame: the "Changed / Unchanged" caption strip and the "12 Touch Points
  updated" annotation are marketing layers (the app itself confirms with
  "Guests now see <address>"). Figures are illustrative.
- The main film uses the Informax-administrator Hotel workspace (Overview /
  Spaces / Touch Points / Activity / People). A hotel's own dashboard is
  Overview / Spaces / Activity / Account and its Space page has no Touch
  Points list. Both are real; do not present the admin-only Touch Points list
  as something a hotel user sees without checking.
- All demo data is fictional: the hotel is **Maison Aurelia** (Lake Como),
  links use `maisonaurelia.com/...` and match their Space (spa/book,
  dining/menu, wellness/classes, events/floorplans), and Space codes are
  made up. Never use real customers (Fairmont, test hotels, staff names).
  Everything lives in `src/components/product/data.ts`.

### Cloud entrance logo + hero playback (26 September 2026, live — complete)

- **Live:** commit `0b00b6a` (fast-forward of `main` from `b478bb8`),
  production deployment `dpl_5VHSJskhAEnqPMenhAUCiFSfqVqQ`
  (informax-site-qq0qd3xeh-informax.vercel.app), verified on
  informax.co.uk 26 September 2026.
- **Rollback target:** previous production deployment
  `dpl_5r2bRPzD7YACSGTb3oSXHQwBCgEY`
  (informax-site-qo0gm6xjw-informax.vercel.app, commit `b478bb8`) —
  promote it with `npx vercel promote <url>` or revert `0b00b6a` on `main`.
- This work is finished. Smaller mobile film variants and any further
  media optimisation are separate future work, not part of it.

- Hand-off screen shows the official INFORMAX CLOUD logo (Informax Cloud's
  own `public/brand/informax-logo.png`, copied unchanged to
  `public/brand/informax-cloud-logo.png`; displayed as a lossless WebP
  resize, `informax-cloud-logo-800.webp`). No text, no drawn icon. Fade in
  140 ms, logo 0.97 → 1 over 420 ms, faint Cloud-blue glow. Logo is
  preloaded after page load (idle) and on hover/focus/touch.
- Header entrance: quiet outlined pill, white Informax mark cropped
  exactly from the official Cloud logo (`informax-cloud-mark-72.png`).
  Mobile menu: "INFORMAX CLOUD / Log in" block, fits 320px.
- Hero (`VideoHero.tsx`): posters are now the films' exact first frames;
  playback is detected from the element's state after hydration (the old
  `onCanPlay` often fired before React attached it, leaving the still
  poster on top of a playing film for a whole loop); poster and film share
  the same 1.02 scale; hero copy animates with CSS so it paints before
  JavaScript. `/video/*` and `/brand/*` cache for a day +
  stale-while-revalidate (next.config.ts) — **rename a media file when
  replacing it.**

### Informax Cloud entrance (26 September 2026, live)

- The header's "Log in to Informax Cloud" is a Cloud-blue pill with the
  Cloud mark (`src/components/CloudEntrance.tsx`), on desktop and in the
  mobile drawer (below 360px it drops the arrow so it stays on one line).
- Hover, focus or touch preconnects to informax.cloud; the root layout has
  `<link rel="dns-prefetch" href="https://informax.cloud">`.
- A click is a plain link: the browser navigates immediately and is never
  delayed. A full-screen Informax Cloud hand-off (Cloud background
  #0b1524, portalled to `<body>` so the blurred header can't trap it)
  covers the gap, and is cleared on Back / bfcache restore. Reduced motion
  removes its fade.
- Product films and copy say "Space link" / "Copy link", never "Space URL"
  / "Copy URL" — the same wording Informax Cloud itself now uses.
- Informax Cloud (separate repo, informax-analytics) now runs in Vercel
  London (`lhr1`) next to its Supabase database; deployed separately.

### Changes, 25 September 2026 (fourth pass)

- **Header:** nav is Home, Informax Cloud, How It Works, Digital Experiences,
  About, Talk to Informax (`/enquire`). The button on the right is **Log in to
  Informax Cloud** (`CLOUD_LOGIN_URL` = https://informax.cloud/login in
  `constants.ts`). The mobile drawer lists the same links, plus the login.
- **Removed:** the "Every Touch Point, in one place" list and both "Update
  once. Change everywhere." sections (`ManyTouchPointsFilm` deleted).
- **How It Works hero** uses a still image (`public/images/earth-horizon.jpg`,
  only 768 px wide; replace it with a larger version for sharper results) via
  `PageHero`'s new `image` prop.
- **Hero films, three different files:** `home-hero.*` (Earth, homepage),
  `cloud-hero.*` (clouds from above, Informax Cloud hero), `meet-cloud.*`
  (blue and pink clouds, homepage "Meet Informax Cloud" band). All are 1920 px
  wide, Lanczos-upscaled with light sharpening, two-pass encoded (WebM
  2.4–3.6 MB). The sources are only 1104 px (Earth, clouds) and 736 px
  (blue/pink), so true HD needs higher-resolution originals.
- **Closing CTA** is just the headline and "Talk to Informax". The logo was
  tried and removed at the user's request.
- **Phone films** scroll to real anchors (`panel`, `entry`, `current`), so
  choosing a file or typing an address, Publish, and the updated content are
  always on screen.

### Changes, 25 September 2026 (third pass)

- **Hospitality is now Digital Experiences** at `/digital-experiences`
  (`/hospitality` 308-redirects there). It promotes Informax-designed digital
  guest directories and guest information and the benefits of "ease of
  information". The guest-facing directory mockup is
  `src/components/story/DirectoryShowcase.tsx`.
- **The Touch Points page is gone.** `/touch-points` 308-redirects to
  `/informax-cloud`, and it is out of the nav, footer and sitemap. Touch Points
  are still explained on the homepage and product page.
- **Primary nav:** Informax Cloud, How It Works, Digital Experiences, About,
  plus "Talk to Informax".
- **Touch Point object** (`cloud/TouchPoint.tsx`) has two modes: `touch`
  reads "Touch your phone here"; `scan` shows only a real QR code
  (`cloud/qr-path.ts`, which points to https://informax.co.uk).
- **Demo Space addresses are readable** (`go.informax.cloud/maisonaurelia/spa`)
  at the user's request. The real app uses `/s/<10-character code>`, so this
  is a deliberate marketing simplification.
- The blue and pink clouds film moved to `meet-cloud.*` (see fourth pass).
- The enquiry page is redesigned as a dark two-column page with a grouped
  form. `EnquireForm` logic, API fields and the honeypot are unchanged.

### Homepage story and hero films (25 September 2026, second pass)

The homepage now establishes why controlled information matters before it
sells software: hero ("Control what guests see.") > information is part of
the experience > information changes, physical spaces do not > one
permanent connection > **Meet Informax Cloud** (product reveal, clouds film
band + main app film) > Spaces > change it from anywhere > Touch Points >
one Space, many Touch Points > PDF or website > Activity > Guest Directory >
"Take control of what your guests see."

Hero films, supplied by the user and re-encoded in `public/video/`:
- `home-hero.*` (Earth with light trails, 8.5 s crossfade loop, ~0.9 MB):
  homepage hero.
- `cloud-hero.*` (clouds from above, 12 s forward/back loop, ~1.7 MB):
  Informax Cloud hero (with `dim={0.42}` because the footage is bright) and
  the homepage "Meet Informax Cloud" band, which only fetches the video when
  it nears the viewport. Replace either by dropping new files with the same
  names. Reduced motion shows the poster only.

Assets and decisions to know about:
- **No photography or footage exists for the new hero.** The homepage hero
  is an illustrative SVG scene, deliberately, so it ships with no video.
  Replacing or layering real hotel footage is a design task for later.
- The old **Earth hero** (`hero-video.*`, `hero-poster.jpg`) and the
  **hospitality cartoon hero** (`hospitality-hero-*`) are no longer used by
  any page but the files remain in `public/`. The hospitality video's second
  half has a ghosted crossfade and a floating-documents swirl, and it was
  judged wrong for a luxury-hotel brand. Their wrapper components (`Hero.tsx`,
  `HospitalityHero.tsx`) were deleted; restore from git history
  (`git show cb8b77b:src/components/sections/Hero.tsx`) if needed. The Earth
  hero was earlier described as "permanent"; the redesign brief superseded that
  for the homepage, so confirm with the user before treating it as gone forever.
- `VideoHero.tsx`, `DigitalInformationHero.tsx`, `WebsitesHero.tsx` and their
  assets are unchanged and still power the two demoted pages.
- An uncommitted, partial `informax-cloud` draft (a document-only
  `CloudStory.tsx`) that pre-dated this redesign was superseded. It was saved
  to the Claude session scratchpad only, not the repo.

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
- `src/components/Header.tsx` — transparent-over-hero only on routes with
  a full-bleed dark video hero (`TRANSPARENT_AT_TOP_ROUTES`, currently
  `/`, `/hospitality`, `/digital-information`, `/websites`); every other
  route gets a solid header from load, because their heroes are on light
  backgrounds and a transparent header there made the white logo
  unreadable. **If you add a new route with a full-bleed dark hero, add
  it to `TRANSPARENT_AT_TOP_ROUTES`, otherwise leave new routes out of
  that set.** **18 September 2026: the old "Services" dropdown containing
  Websites/Digital Brochures/Directories/Hospitality was removed.**
  Hospitality, Digital Information and Websites are now first-class,
  directly-visible top-level nav links (desktop and mobile) — see the
  dated entry at the end of §10 for the full rationale and current
  structure.

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
| `/` | Home: Informax Cloud narrative (hero, what it is, Spaces, how it works, Touch Point stays, live Cloud demo, Touch Points, 400-room update, PDF or website, Activity, Guest Directory, CTA) |
| `/informax-cloud` | Product page: Spaces, permanent address, content, demo, scale, the three-rule model, Activity, version history, remote management |
| `/how-it-works` | **Removed 28 September 2026**; 308 → `/informax-cloud` |
| `/hospitality` | Hotel problems mapped to Informax answers, per-department Spaces, founder credibility |
| `/touch-points` | The physical product, Touch and Scan, placements, one Space many Touch Points |
| `/about` | Founder story (copy supplied by the user, keep as is) |
| `/enquire` | Enquiry form (interests updated for Cloud / Touch Points / demonstration) |
| `/websites`, `/digital-information` | Legacy service pages, live but demoted (footer only) |
| `/privacy-policy`, `/terms-and-conditions`, `/cookie-policy` | Legal |
| `/services` | Removed. 308 redirect to `/informax-cloud` |
| `/api/enquire` | POST handler for the enquiry form |
| `/sitemap.xml`, `/robots.txt` | Generated |

## 10. Key files for making changes

| File | What's there |
|---|---|
| `src/lib/constants.ts` | Nav, footer, `PRIMARY_CTA`, enquiry interests, contact email, site URL |
| `src/lib/spaces.ts` | Space and placement data used across the product pages |
| `src/components/cloud/*` | Page-level story components (see §0) |
| `src/components/product/*` | Recreated Informax Cloud app films (see "Product films" in §0) |
| `src/app/globals.css` | Design tokens and motion primitives (`tp-pulse`, `riser-travel`, `dot-in`) |
| `src/app/layout.tsx` | Default metadata, Organization JSON-LD |
| `src/app/informax-cloud/page.tsx` | SoftwareApplication JSON-LD (no price or offers published) |
| `next.config.ts` | `/services` redirect |
| `src/components/Header.tsx` / `Footer.tsx` | Chrome. Nav breakpoint is `xl` (1280px); below that it is the hamburger drawer. `TRANSPARENT_AT_TOP_ROUTES` lists routes that open with a dark hero; add new dark-hero routes there |
| `src/components/EnquireForm.tsx`, `src/app/api/enquire/route.ts` | Enquiry form and Resend email (unchanged) |
| `src/components/sections/VideoHero.tsx` + `DigitalInformationHero.tsx` + `WebsitesHero.tsx` | Video heroes for the two legacy pages |

**Verification note for agents:** the browser preview tool throttles
animation when the tab is not in the foreground, so Framer entrances can look
blank for several seconds in `next dev`. Use `npm run build && npx next start`
and front the tab before judging animation. Wide (>1280px) emulated viewports
are cropped by the pane, so check them with geometry (`getBoundingClientRect`)
as well as screenshots.

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
