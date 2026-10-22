# Photography brief: informax.co.uk redesign

Nine photographs are needed before the redesign can go to production. Until
then each one is a labelled placeholder ("Photograph to come"), and a
production build refuses to run (`next.config.ts`). The slots, alt text and
licence records live in `src/lib/photography.ts`.

Why they are missing: the build environment's network policy blocks the stock
libraries (Unsplash, Pexels, Wikimedia), so nothing could be downloaded or
checked. No AI-generated imagery is to be used, and photographs never stand in
for Informax Cloud screens (those are real captures, `public/cloud/`).

## Rules for every photograph

- **Licence:** commercial use on a company website, without attribution
  conditions you cannot meet. Acceptable: a commissioned shoot (best: it can
  show real Informax Access Points), Adobe Stock or Getty standard licence,
  or the Unsplash / Pexels licences. Record the licence and the source page
  or photographer in the slot's `licence` and `source` fields.
- **People:** avoid recognisable faces unless the licence includes a model
  release (Unsplash and Pexels do not guarantee one). Hands, backs, soft
  focus and over-the-shoulder shots work well and suit the brand.
- **No visible brands:** no hotel or restaurant names, logos, menus with a
  real venue's name, or competitor products. No other QR codes or table
  tents in shot.
- **Look:** natural light, calm, uncluttered, warm evening light for
  restaurants, soft daylight for hotels and spa. No heavy filters, no text.
- **Files:** JPEG or WebP, sRGB, at least the minimum size below, sharp at
  100%. Put them in `public/photos/` with the slot name
  (`public/photos/chef-pass.jpg`). The site resizes and compresses them.
- **Real Access Points:** if a photograph shows a printed Informax Code card,
  set `showsAccessPoint: true` on its slot; the site then stops drawing its
  own card on top. It must be a real Informax card, never a mock-up.

## The nine slots

Sizes are the minimum supplied size. "Safe area" is where the subject must
sit, because parts of the photograph are covered by phones or cropped.

| Slot | Subject | Shape and minimum size | Where it appears and what covers it |
|---|---|---|---|
| `chefPass` | A chef at the pass in a calm professional kitchen, finishing or checking a dish. Steel, warm light. | Landscape 3:2, 2400×1600 | Homepage hero step 1 (cropped square, and 4:5 on phones; two phones cover the lower 70%): **keep the chef's head and hands in the top third, centred**. |
| `hospitalityTeam` | A manager or head waiter at front of house glancing at a phone before service. Face turned away or out of focus. | Landscape 3:2, 2400×1600 | Homepage hero step 2 (square / 4:5; phones cover the lower 70%): **subject in the top third**. |
| `restaurantTable` | A laid table for two at dusk: linen, glassware, a candle. Ideally a real Informax Code card on the table. | Portrait 4:5, 2000×2500 | Homepage hero step 3 (square / 4:5) and the walkthrough step 4, cropped to a tall phone shape (about 1:2) with a Code card drawn in the centre: **keep the middle third clear of busy detail**. |
| `signatureDish` | Editorial photograph of the hero dish: roast hake, mussels, saffron broth, on a dark plate, from above or at 45°. | Landscape 16:10, 2800×1800 | Restaurants page hero, full screen (left 45% is darkened for text): **dish in the right half**. Also "More possibilities" card, 4:3. |
| `restaurantRoom` | A contemporary restaurant dining room in the evening, tables laid, no guests or guests out of focus. | Landscape 3:2, 2400×1600 | Restaurants page "One Code for each menu" panel, with three Code cards drawn across the centre: **calm, darker middle**. |
| `hotelLounge` | Luxury suite sitting area with a low coffee table. Ideally a real Informax Code card on the table. | Landscape 16:9 or wider, 2800×1600 | Hotels hero and homepage hotel section (21:10 desktop, 4:5 phone; a phone covers the right third and a Code card is drawn at the left): **coffee table in the centre-left**. Hotels page directory section, 4:3, with two phones over the lower half. "More possibilities" card, 4:3. |
| `hotelBathroom` | Marble bathroom vanity with folded towels. Ideally a small real Informax Code card by the basin. | Square, 2400×2400 | Hotel section (21:10 / 4:5, phone on the right third) and the walkthrough step 1, cropped to a tall phone shape with a Code card drawn in the centre: **vanity centred, top and bottom thirds plain**. |
| `hotelSuite` | Premium suite bedroom with a view at dusk, bed made, warm lamps. | Landscape 16:9, 2800×1600 | Hotel section (21:10 / 4:5) and Hotels page upgrades section, 4:3 with a phone bottom-right: **bed and view in the left two thirds**. |
| `spaTreatment` | Spa treatment room: soft daylight, folded towels, stones, plants. No people needed. | Landscape 4:3, 2000×1500 | "More possibilities" card, 4:3. |

Search starting points (check each photograph's licence page before use):
unsplash.com/s/photos/chef-plating, /fine-dining-table, /restaurant-interior,
/plated-fish, /hotel-suite-living-room, /marble-bathroom, /spa-treatment-room,
/hotel-bedroom-view, /restaurant-manager. Pexels has equivalent searches.

## Adding one

1. Save the file as `public/photos/<slot>.jpg`.
2. In `src/lib/photography.ts` set `src: "/photos/<slot>.jpg"`, the real
   `width` and `height`, `licence`, `source`, and update `alt` if it no longer
   describes the photograph.
3. `npm run build`, then check the page at phone and desktop width: the
   subject must sit in the safe area above.
4. When all nine are done, the production guard passes on its own.
