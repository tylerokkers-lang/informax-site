# Informax Cloud — "Every Detail"

**45-second YouTube advertisement · Production bible**
Version 1.1 · 27 September 2026 · **Direction approved.** This version is final for production planning. Filming of Informax Cloud screens may begin only once every ⚠ item in §0A is cleared.
Fictional property: **The Aurelia London**

Locked brand assets for this film are in [`brand-assets/`](brand-assets/):

| File | What it is | Where it may appear |
|---|---|---|
| `informax-cloud-logo-white.png` (1498 × 460, white on transparent) | **Informax Cloud** logo, supplied by the client | End card. Inside genuine app recordings wherever the app itself displays it. Nowhere else. |
| `informax-logo-white.png` (640 × 349, white on transparent) | **Informax** logo, supplied by the client | Composited onto the face of physical Informax Touch Points only. |

Both logos are white. The end card must use a dark background (Informax Cloud navy, `#0b1524`), never a light one.

---

## Where each required output lives

| # | Required output | Section |
|---|---|---|
| 1 | Final 45-second creative concept | §1 |
| 2 | Voice-over script with timestamps | §2 |
| — | Feature audit: LIVE / PLANNED / INTERNAL, and what to verify before filming | **§0A** |
| 3 | Second-by-second storyboard | §3 |
| 4 | Every individual shot | §4 |
| 5 | Camera direction for every shot | §4 ("Camera" column), §11 |
| 6 | Exact on-screen text | §4 ("On-screen text" column, Act 5 labels, end card) |
| 7 | Music direction | §7 |
| 8 | Sound-design cues | §8 |
| 9 | Transition instructions | §4 ("Transition out" column), §13 step 9 |
| 10 | Voice-over delivery instructions | §10 |
| 11 | AI video-generation prompts | §11 |
| 12 | Placeholders for real screen recordings and screenshots | §12 (P1–P12) |
| 13 | Editing and assembly instructions | §13 |
| 14 | Aspect ratio, resolution, frame rate, export settings | §14 |
| 15 | 30-second cut-down | §15 |
| 16 | 15-second cut-down | §16 |
| 17 | Three alternative opening hooks | §17 |
| 18 | Three alternative closing lines | §18 |

---

## 0. Critical review of the brief, and what changed

The brief is strong. Seven changes make it a film rather than a feature list:

1. **One day, one guest, one manager.** The film follows two people and cross-cuts between them. **Eleanor**, a guest, has the experience. **James**, the hotel's Guest Experience Manager, has the control. The two threads meet at the moment he presses Publish and her phone changes. The audience never has to be told that the guest side and the Cloud side are connected, because they watch it happen.

2. **The season drives the story.** The film is set on one late-autumn afternoon. In Act 1, a beautiful printed card at spa reception still reads *Summer Treatments* while leaves fall past the window behind it. Nobody made a mistake. The season turned and the print couldn't follow. That shows the problem without making the hotel look incompetent, and it gives Act 4 a reason to exist: James publishes *Autumn Spa Treatments.pdf*.

3. **A locked hero frame.** The spa Touch Point is filmed once as a locked-off composition in Act 2 (shot S08). The **identical plate** comes back in Act 4 (S20). Nothing in the frame has changed, but the phone that meets it now opens different information. This is the visual form of *change the information, not the infrastructure*, and it needs no explanation.

4. **A statement instead of a question.** "What if…?" is the language of a pitch. Established brands state things. Act 2's line becomes *"Now, every detail can be exactly where your guests need it."*

5. **A bookend.** The film opens on *"the smallest details shape the experience"* and closes on ***"Every detail. Always current."*** The closing line pays off the opening, so the idea stays with the viewer.

6. **Proof an executive will believe, shown rather than claimed.** *No app required*, *Previous Versions* and *Activity* are real operational answers to questions a General Manager will actually ask. Each gets one second of genuine interface, with no adjectives attached.

7. **Silence is part of the score.** The touch moment (0:16–0:18) and the scale montage (0:37–0:40) have no narration. Picture, music and sound carry them.

### Flags you need to decide on before the shoot

| # | Issue | Recommendation |
|---|---|---|
| F1 | **YouTube skippable ads can be skipped after 5 seconds.** The 45-second film is deliberately quiet and doesn't name the brand until 0:22. | Run the 45s as a skippable in-stream ad against **tightly targeted** hospitality audiences, and use it on the website, LinkedIn and in sales meetings. Use the **15s cut** (§16) for broad pre-roll. If the 45s will run to broad audiences, test **Hook B** (§17), which puts the payoff first. |
| F2 | **Space reordering.** 🟡 **PLANNED / REQUIRED.** A confirmed product requirement: hotel and client admins must be able to reorder their Spaces, and the chosen order must persist. It is **not in the current build**: no Space ordering exists in the app source (see §0A). | **Confirmed product requirement: awaiting implementation, verify before filming.** The reorder is not shown until it is live on production. S13 works without it. Once it is live, record **P3-R** and cut in **S13-R** (§4, §12). |
| F3 | **Touch Points list.** 🔒 **INTERNAL / SUPER ADMIN.** The list lives only in the Informax administration area (`/admin/hotels/[id]/touch-points`). The Hotel Admin dashboard (Overview · Spaces · Activity · Account) has no Touch Points screen. | **Not shown.** James is the hotel's manager and never appears in an Informax administration screen. *Physical* Touch Points appear throughout the film. The hotel-side proof that Touch Points are unaffected is the real confirmation on screen in S19: "Your Space link and connected Touch Points stay the same." |
| F4 | **Hotel name.** The brief says *The Aurelia London*. The website's product demos use *Maison Aurelia* (Lake Como). | This bible uses **The Aurelia London**, as briefed. A demo workspace with this name must be created in Informax Cloud for the screen recordings (§12). |
| F5 | **Physical Touch Point design.** I don't have product photography or dimensions for the real Informax Touch Point. | AI plates generate a **blank, provisional** plaque. The real face artwork is composited in post. **Please supply product photos and the face artwork** (see §12, A3–A5). Until then, the provisional form follows the website's drawing: a dark graphite rounded square. |
| F6 | **End-card typeface.** Informax Cloud uses system fonts (SF Pro / Segoe UI Variable). Apple's SF Pro licence is restricted to mock-ups of Apple-platform UI, so it may not cover advertising. | Confirm the licensed brand typeface for supers. If none is confirmed, Inter (open licence) is the closest safe substitute. |
| F7 | **The Informax logo is only 640 px wide.** That is too small for 4K macro shots of the Touch Point face. | **Please supply vector masters (SVG/PDF/EPS) of both logos** (A1, A2). The Informax Cloud PNG, at 1498 px, is fine for the end card at 4K. |

---

## 0A. Feature audit: LIVE / PLANNED / INTERNAL

**Rule: the advert never invents Informax Cloud functionality.** Every feature the film shows or implies falls into one of three categories:

| Status | Meaning | What the advert may do |
|---|---|---|
| ✅ **LIVE** | Verified in the current application and safe to demonstrate | Show it, **only** through genuine recordings of the Hotel Admin dashboard |
| 🟡 **PLANNED / REQUIRED** | Part of the confirmed product specification, but not verified as live | Never show it working, and never imply it in the VO or supers, until it is live on production and recorded |
| 🔒 **INTERNAL / SUPER ADMIN** | For Informax administrators, not hotel users | Never show it on James's screen, and never imply hotel administrators have access |

**How this was verified:** I read the Informax Cloud source (`informax-analytics`, `main`, commit `e3f3c92`, 26 September 2026), without changing it. Source code is strong evidence, but it isn't the production application. **Each ✅ item is fully confirmed only when it is captured on production.** The screen recordings in §12 are that confirmation. If a capture doesn't match what's described here, the shot comes out; the UI is never recreated.

### Audit

| Feature | Status | Evidence in the app | In the advert |
|---|---|---|---|
| **Your Spaces** list (Hotel Admin) | ✅ LIVE | `/dashboard/content`, page title "Your Spaces" | S12, S13 (P2, P3) |
| Open a Space → **Current Content** | ✅ LIVE | `/dashboard/content/[id]`, "Current Content" | S14 (P4) |
| **Change Content → Upload a PDF → Drag your PDF here → Publish** | ✅ LIVE | `pdf-publish-form.tsx`, `change-content.tsx` | S17, S18 (P7, P8) |
| Confirmation **"Guests now see your new PDF"** plus **"Your Space link and connected Touch Points stay the same."** | ✅ LIVE | `pdf-publish-form.tsx` | S19 (P9). The app's own words carry the film's thesis. |
| **Use a website** instead of a PDF | ✅ LIVE | `web-link-form.tsx` | Not shown (not needed at 45s) |
| **Previous Versions**, with Restore | ✅ LIVE | `hotel-version-history`, `version-list.tsx` | S15 (P5). Shown as a list only; Restore isn't demonstrated. |
| **Activity**: Interactions (last 30 days), Touch and Scan counts, chart, **"Where guests use Informax Touch"** | ✅ LIVE, aggregate only | `/dashboard/tracking` | S16 (P6). VO8 corrected to match (see below). |
| **Guest experience**: Touch Point → Space opens in the phone's browser in Informax's PDF viewer, with no app | ✅ LIVE | `/go/[code]` → `/guest/content/[id]` (`GuestPdfViewer`) | S10, S21 (P1, P10), VO5 "No app required." |
| The Space's link and Touch Points are unchanged when content changes | ✅ LIVE | Publish confirmation copy, permanent Space link | VO11, hero-frame device (S08 = S20) |
| **Space reordering with a persisted order** | 🟡 **PLANNED / REQUIRED** | **Not in the build.** Spaces have no order field. The only `sort_order` in the schema belongs to analytics `page_sections`. | **Not shown.** S13-R and P3-R are prepared for when it's live. |
| **Touch Points list** / management | 🔒 INTERNAL / SUPER ADMIN | `/admin/hotels/[id]/touch-points` only | **Not shown.** S19-alt from v1.0 has been removed. |
| **Creating / allocating Spaces** | 🔒 INTERNAL / SUPER ADMIN | Hotel Spaces page: "A Space is allocated by Informax, not created here" | Not shown. **Copy never says hotels create Spaces.** Informax sets up the demo hotel's Spaces before filming, off camera. |
| Archive / restore a whole Space, People, Clients, Subscriptions, Audit | 🔒 INTERNAL / SUPER ADMIN | `/admin/*` | Not shown |
| **Scan** section on the Space page (downloadable Scan images) | ✅ LIVE, but **kept out of frame** | `SpaceScanSection` | Frame or crop P4 so no Scan code is visible. The brand rule is to never market Informax as QR codes. The word "Scan" in Activity is genuine product language and may stay. |
| Website product films (`AppFilm`, `PhoneFilm`, `MicroFilms`) | ⛔ Recreations, not the app | `informax-site/src/components/product/*` | **Never used as advert footage**, not even as a stand-in |
| Marketing overlays such as "12 Touch Points updated" (from the website) | ⛔ Not in the app | Website only | **Never** placed in the advert |

### VO and super audit

| Line | Claim | Status |
|---|---|---|
| VO5 "One touch. It opens on their phone. No app required." | The guest opens content in the browser | ✅ LIVE |
| VO6 "Behind every Touch Point: Informax Cloud." | Touch Points connect to Spaces managed in Cloud | ✅ LIVE |
| VO7 "Your Spaces. Your content. Always under your control." | Hotel manages content and versions | ✅ LIVE ("Your Spaces" is the app's own page title) |
| **VO8 (corrected)** "And see exactly **where guests use it.**" | Activity › "Where guests use Informax Touch" | ✅ LIVE. v1.0 said "what guests use most", which implied a ranking the app doesn't show. The word count is unchanged at 7. |
| VO9 "Replace a document. Press publish." | Change Content → Publish | ✅ LIVE |
| VO10 "Instantly, it's everywhere." | New content is served straight after publishing | ⚠ **Verify (V3).** Fallback line: "Moments later, it's everywhere." |
| VO11 "The Touch Points stay. The information moves." | Touch Points unchanged | ✅ LIVE (it matches the app's confirmation copy) |
| "Informax Touch" super | Product name used in the app ("Where guests use Informax Touch") | ✅ LIVE |

### ⚠ Verify before filming

| # | Check | Owner | If it fails |
|---|---|---|---|
| **V1** | **Space reordering** is implemented and the order persists after a reload and a new sign-in, on production | Product | S13-R stays out. The film is complete without it. |
| **V2** | Every ✅ item above behaves as described **on production**, signed in as a **Hotel Admin** user of the demo hotel at `/dashboard`. Never record from `/admin`. | Production | Drop the shot. Never recreate it. |
| **V3** | **"Instantly"**: publish, then touch the real Touch Point with a phone that has already opened the old PDF. The new PDF must appear straight away, not an old copy from the browser cache. Test on iPhone and Android. | Product | Use the fallback VO10, "Moments later, it's everywhere." |
| **V4** | The demo hotel user can **Change Content** and **Publish**. The source doesn't restrict this by hotel role, but confirm the account on production. | Production | Use an account that can |
| **V5** | Activity shows **"Where guests use Informax Touch"**. It only appears when more than one location has taps, so seed at least 3 fictional locations. | Informax admin | S16 holds on the Interactions figure only |
| **V6** | The demo hotel **"The Aurelia London"** with its Spaces (Spa, Gym, Meetings & Events, Dining, Guest Directory), connected Touch Points, 2–3 prior Spa versions, and fictional Activity data | Informax admin (off camera) | — |
| **V7** | The guest PDF viewer's appearance, so the phone-screen plates match it (see §1, Phone) | Production | — |
| **V8** | Physical Touch Point design and face artwork (F5, A3–A5) | Client | Touch Point shots can't be finalised |

---

## 1. Final creative concept

**Title:** *Every Detail*
**Line:** *Every detail. Always current.*

On a quiet autumn afternoon at The Aurelia London, everything a guest might need is beautifully printed: spa treatments, class times, floor plans, menus. But the season has turned, and the print hasn't.

Eleanor, a guest, walks to the spa and touches her phone to a small, elegant Informax Touch Point. The spa's treatments open instantly on her phone, with no app. Behind that Touch Point is Informax Cloud, where James, the hotel's Guest Experience Manager, looks after every Space: current content, previous versions, and a clear view of where guests use it.

James replaces *Spa Treatments.pdf* with *Autumn Spa Treatments.pdf* and presses **Publish**. In one elegant rush of cuts, the same Touch Point in the same frame now opens the autumn menu, and so do the Touch Points by the pool, at reception and throughout the hotel: spa, gym, meetings, dining. Nothing physical moved. Only the information did.

The film settles into deep navy and the Informax Cloud logo appears: *Every detail. Always current.*

**How the film should feel:** a luxury hotel film that happens to contain a product, not a product film that happens to contain a hotel.

### Continuity bible (applies to every shot)

| Element | Locked specification |
|---|---|
| **Property** | *The Aurelia London*, a refined Georgian townhouse hotel. Honed pale marble, smoked oak panelling, fluted plaster, brushed warm brass, bottle-green and ivory upholstery, ribbed glass, tall sash windows. |
| **Time** | A single late-October afternoon, about 4 pm, with low, warm, raking sun. The only departure is the final dining shot (S27), where the sun is setting, which motivates the dissolve to navy. |
| **Grade** | Warm neutral. Creamy highlights with soft roll-off, gently lifted blacks, natural skin, restrained saturation, fine grain. The **only** blue in the film is Informax Cloud's interface (`#0693e3`) and the end card's navy (`#0b1524`). |
| **Eleanor (guest)** | Woman, late thirties. Shoulder-length dark brown hair tucked behind her left ear, warm olive complexion, minimal make-up. Cream ribbed roll-neck, camel wide-leg trousers, slim gold watch on her left wrist. No visible logos. Phone in her right hand. |
| **James (Guest Experience Manager)** | Man, mid-forties. Short salt-and-pepper hair, clean-shaven. Navy tailored suit, white open-collar shirt, small plain brass lapel pin with no text. |
| **Spa therapist** | Woman, thirties, hair in a low bun, oatmeal wrap tunic, no text on the uniform. |
| **Front-of-house staff** | Navy suits matching James. |
| **Second guest (S22)** | Man, sixties, silver hair, white waffle hotel robe. |
| **Phone** | Slim modern smartphone, matte graphite frame, thin even bezels, no visible logos. **In generated footage the screen is always blank and content-free**, lit to the tone of the real guest PDF viewer (record P1 first, V7), with clear screen edges for planar tracking. The genuine recording is composited in post. **AI never draws any interface.** |
| **Laptop** | Slim silver-grey laptop, no logo. The screen is a **plain, evenly lit deep-navy field** (Informax Cloud is a dark, navy interface), with clear screen edges for tracking. The genuine recording is composited in post. |
| **Touch Point (provisional, see F5)** | A flat square tile of roughly 9 cm with generously rounded corners, a dark graphite body with a subtle vertical gradient, a fine light edge highlight and a matte finish. **The face is completely blank in generated footage.** Face artwork is composited in post: the Informax logo, the Informax Touch mark, the Space name and "Touch your phone here". |
| **Camera language** | Slow, controlled moves: dolly, slider or gimbal, never handheld shake. Full-frame look, 35–100 mm. Shallow depth of field on details. No whip-pans, speed ramps on people, drones or lens-flare streaks. |

---

## 2. Voice-over script with timestamps

**80 spoken words.** `[beat]` = 0.3–0.5 s. `[pause]` = 0.6 s or longer. Times are the start and end of speech.

| # | In | Out | Line | Words |
|---|---|---|---|---|
| — | 0:00.0 | 0:01.5 | *(room tone only)* | — |
| VO1 | 0:01.5 | 0:05.0 | In hospitality, [beat] the smallest details shape the experience. | 8 |
| VO2 | 0:05.8 | 0:08.8 | Treatments. [beat] Classes. [beat] Floor plans. [beat] Menus. | 5 |
| VO3 | 0:09.2 | 0:11.0 | Details change. [beat] Print doesn't. | 4 |
| — | 0:11.0 | 0:12.0 | *[pause]* | — |
| VO4 | 0:12.0 | 0:16.0 | Now, every detail can be exactly where your guests need it. | 11 |
| — | 0:16.0 | 0:17.9 | *[pause: touch, phone blooms, music lifts]* | — |
| VO5 | 0:17.9 | 0:21.7 | One touch. [beat] It opens on their phone. [beat] No app required. | 10 |
| VO6 | 0:22.3 | 0:24.3 | Behind every Touch Point: [beat] Informax Cloud. | 6 |
| VO7 | 0:24.6 | 0:27.9 | Your Spaces. [beat] Your content. [beat] Always under your control. | 8 |
| VO8 | 0:28.1 | 0:30.4 | And see exactly where guests use it. | 7 |
| VO9 | 0:30.8 | 0:32.7 | Replace a document. [beat] Press publish. | 5 |
| — | 0:32.8 | — | *(Publish click: music high point)* | — |
| VO10 | 0:33.4 | 0:34.9 | Instantly, [beat] it's everywhere. | 3 |
| VO11 | 0:35.2 | 0:37.6 | The Touch Points stay. [beat] The information moves. | 7 |
| — | 0:37.6 | 0:41.2 | *[pause: scale montage, music peak, dissolve]* | — |
| VO12 | 0:41.2 | 0:44.0 | Informax Cloud. [pause] Every detail. [beat] Always current. | 6 |
| — | 0:44.0 | 0:45.0 | *(silence, end card holds)* | — |

**Total: 80 words.** Delivery averages about 2.5 words per second. There are about 13 seconds without narration.

---

## 3. Second-by-second storyboard (output 3)

| Sec | Shot | Picture | VO | Text | Music / SFX |
|---|---|---|---|---|---|
| 0 | S01 | Lobby, sunlight, dust motes | — | — | Room tone, a distant clock. The felt-piano "detail" motif begins (3 notes). |
| 1 | S01 | Staff set autumn branches | "In hospitality…" | — | Soft fabric and vase sounds |
| 2 | S01→S02 | Macro of the spa card | "…the smallest details…" | — | Low sustained strings enter |
| 3 | S02 | The rack reveals *Summer Treatments* | "…shape the experience." | — | — |
| 4 | S02 | The card holds | — | — | Piano motif, second phrase |
| 5 | S02 | The card holds | "Treatments." | — | — |
| 6 | S02→S03 | Gym timetable | "Classes." | — | Paper slide |
| 7 | S03→S04 | Floor plan on easel | "Floor plans." | — | Footsteps passing |
| 8 | S04→S05 | Dining menu | "Menus." | — | Linen and paper |
| 9 | S06 | Leaves outside, *Summer* card inside | "Details change." | — | Faint wind beyond the glass |
| 10 | S06 | The same | "Print doesn't." | — | A single held piano note |
| 11 | S06→S07 | Eleanor in the corridor | — | — | A pulse enters, very quiet |
| 12 | S07 | She walks through sun stripes | "Now, every detail…" | — | Footsteps on stone |
| 13 | S07→S08 | Hero frame: the Touch Point | "…can be exactly…" | — | — |
| 14 | S08 | Her hand enters | "…where your guests…" | — | Sleeve fabric |
| 15 | S08→S09 | Macro contact | "…need it." | — | Pulse builds |
| 16 | S09 | Phone meets the Touch Point | — | — | **Touch SFX.** The music swells. |
| 17 | S10 | Spa Space opens on the phone | — | *Informax Touch* | Soft digital bloom; the first chord resolves |
| 18 | S10 | The PDF is legible | "One touch." | *Informax Touch* | — |
| 19 | S10→S11 | Eleanor's smile | "It opens on their phone." | — | — |
| 20 | S11 | She looks up at the therapist | — | — | — |
| 21 | S11 | The same | "No app required." | — | — |
| 22 | S12 | James at the laptop | "Behind every Touch Point…" | — | Room tone changes to quiet office and courtyard birdsong |
| 23 | S12 | The screen is revealed | "…Informax Cloud." | — | The pulse becomes clear |
| 24 | S13 | Your Spaces | — | — | Soft trackpad clicks |
| 25 | S13→S14 | Spa opens | "Your Spaces. Your content." | — | UI tick |
| 26 | S14 | Current Content | — | — | — |
| 27 | S15 | Previous Versions | "Always under your control." | — | UI tick |
| 28 | S16 | Activity | "And see exactly…" | — | Strings rise |
| 29 | S16 | Activity: "Where guests use Informax Touch" | "…where guests use it." | — | — |
| 30 | S16→S17 | Change Content | — | — | Build begins |
| 31 | S17 | *Autumn Spa Treatments.pdf* lands | "Replace a document." | — | File-drop whoosh, very soft |
| 32 | S18 | Cursor on Publish, fingertip | "Press publish." | — | A 3-frame silence, then **CLICK plus a low impact at 0:32.8** |
| 33 | S19→S20 | "Guests now see…", then the hero frame | "Instantly…" | — | **Music high point** |
| 34 | S20→S21 | The same Touch Point; Autumn on the phone | "…it's everywhere." | — | Cuts on the beat |
| 35 | S22 | Pool Touch Point, second guest | "The Touch Points stay." | — | — |
| 36 | S23 | Wide spa reception | "The information moves." | — | — |
| 37 | S24 | Spa | — | **SPA** / Treatments | The peak sustains |
| 38 | S25 | Gym | — | **GYM** / Classes | — |
| 39 | S26 | Meetings | — | **MEETINGS & EVENTS** / Floor plans | — |
| 40 | S27→S28 | Dining at sunset, dissolving to navy | — | **DINING** / Menus | The music pulls away and the pulse stops |
| 41 | S28 | The logo fades in | "Informax Cloud." | *(logo)* | A single sustained chord |
| 42 | S28 | The logo settles | — | Closing line appears | The piano motif returns |
| 43 | S28 | End card | "Every detail. Always current." | CTA appears | The motif resolves on the tonic |
| 44 | S28 | Hold | — | — | Reverb tail |
| 45 | — | End | — | — | Clean out, with an 8-frame fade on the tail only |

---

## 4. Master shot list (covers outputs 4, 5, 6 and 9)

Each entry gives the shot, its timecode, the camera direction, the action, the on-screen text and the transition out.
**Source key:** **AI** = generated plate · **UI** = genuine Informax Cloud recording (placeholder) · **COMP** = AI plate with a real asset composited in.

### ACT 1 — INFORMATION (0:00.0–0:11.2)

| Shot | TC | Source | Picture | Camera | On-screen text | Transition out |
|---|---|---|---|---|---|---|
| **S01** | 0:00.0–0:02.5 | AI | The Aurelia lobby. Low sun rakes through tall sash windows and dust motes drift. In soft focus, a front-of-house staff member sets a vase of autumn branches on a marble centre table. | 35 mm, wide, eye height. Slow dolly-in of 0.5 m. Locked horizon. | — | Straight cut |
| **S02** | 0:02.5–0:06.4 | COMP | Spa reception ledge. Macro of a printed treatment-menu card in a slim brass stand; the card's typography (*Summer Treatments*) is composited. Background: a fluted corridor in warm bokeh. | 100 mm macro. Slow 20 cm slide left with a rack from the card edge to the card face. | — | Cut on "Classes" |
| **S03** | 0:06.4–0:07.2 | COMP | Gym entrance. A framed printed weekly class timetable (text composited). A staff hand slides a freshly printed sheet into the frame. | 50 mm, static, a gentle 3% push. | — | Cut on "Floor plans" |
| **S04** | 0:07.2–0:08.1 | COMP | Outside a meeting room, a framed floor plan on a brass easel (plan artwork composited). An events coordinator walks past with a small stack of printed plans. | 50 mm, slow lateral track following the coordinator. | — | Cut on "Menus" |
| **S05** | 0:08.1–0:09.0 | COMP | Restaurant. A linen-bound printed menu on a table set for dinner. A waiter's hand places a small printed "Today's specials" insert (text composited). | 85 mm, top-down tilt easing to 45°. | — | Straight cut |
| **S06** | 0:09.0–0:11.2 | COMP | **The season turns.** A wider view of the S02 spa ledge with a tall window behind. Outside, golden leaves drift down. Inside, the *Summer Treatments* card stands in perfect light. | 65 mm, locked off, with a very slow 2% push. | — | Straight cut |

### ACT 2 — THE MOMENT (0:11.2–0:22.0)

| Shot | TC | Source | Picture | Camera | On-screen text | Transition out |
|---|---|---|---|---|---|---|
| **S07** | 0:11.2–0:13.6 | AI | Eleanor walks along an oak-panelled corridor towards the spa. Sun and shadow stripe across her. Soft footsteps on stone. | 40 mm, gimbal leading her at three-quarter front, slow backward track. | — | Cut on her step |
| **S08** | 0:13.6–0:15.6 | COMP | **HERO FRAME.** Spa reception ledge with the Touch Point on the marble. The blank face is composited with face artwork showing Space name *Spa*. Eleanor's hand and phone enter frame right. | 85 mm, **locked off and recorded for reuse in S20.** The Touch Point sits on the lower-third line. | — | Cut on contact |
| **S09** | 0:15.6–0:17.2 | COMP | Extreme macro: the phone's edge meets the Touch Point face. There is no light effect on the Touch Point. The only change is the phone screen beginning to brighten. | 100 mm macro, 2% push, focus on the contact line. | — | **Match cut:** the screen brightening becomes the screen in S10 |
| **S10** | 0:17.2–0:19.6 | UI | Over Eleanor's shoulder: her phone shows the **Spa** Space opening in the browser, *Spa Treatments* (PDF). **Placeholder P1.** | 65 mm over-shoulder, slow 5% push to the phone. The phone screen is composited. | **"Informax Touch"** (small, lower-left, 0:17.6–0:19.6) | Straight cut |
| **S11** | 0:19.6–0:22.0 | AI | Eleanor's face, a small easy smile. She glances up as the spa therapist approaches to greet her. | 85 mm, slow push-in, eyes on the upper third. | — | **Graphic match:** her phone-lit face becomes James's laptop-lit face |

### ACT 3 — INFORMAX CLOUD (0:22.0–0:30.6)

Every interface shot in Acts 3 and 4 is a **genuine recording of a ✅ LIVE feature from the Hotel Admin dashboard** (§0A). AI provides only the room, the devices and the hands.

| Shot | TC | Source | Picture | Camera | On-screen text | Transition out |
|---|---|---|---|---|---|---|
| **S12** | 0:22.0–0:24.0 | COMP | James at a writing desk in a quiet panelled office overlooking a courtyard. The laptop is open. The screen is composited with **Your Spaces** (P2), recorded from the **Hotel Admin dashboard**. | 50 mm over-the-shoulder, a slow 10° arc to reveal the screen. | — | Cut to screen |
| **S13** | 0:24.0–0:25.6 | UI | Screen fill: **Your Spaces** showing *Spa, Gym, Meetings & Events, Dining, Guest Directory*. The cursor moves to Spa and clicks. No reordering (🟡 F2). **P3.** | Device comp: UI at about 85% of the frame, 4° perspective, the laptop bezel at frame left, faint warm room reflection. Virtual 3% drift. | — | Cut on click |
| **S14** | 0:25.6–0:26.9 | UI | The Spa Space opens. **Current Content** shows *Spa Treatments.pdf*. **P4.** | Same device comp, gentle punch-in toward Current Content. | — | Cut |
| **S15** | 0:26.9–0:28.0 | UI | **Previous Versions** panel for Spa. **P5.** | Same device comp. | — | Cut |
| **S16** | 0:28.0–0:30.6 | UI | **Activity**: the Interactions figure (last 30 days), then a drift down to **"Where guests use Informax Touch"**. **P6.** Aggregate only: no individual guest data, ever. | Same device comp, slow 4% drift. | — | Cut |

### ACT 4 — THE POWER OF ONE UPDATE (0:30.6–0:37.0)

| Shot | TC | Source | Picture | Camera | On-screen text | Transition out |
|---|---|---|---|---|---|---|
| **S17** | 0:30.6–0:31.8 | UI | Spa → **Change Content** → *Drag your PDF here*. *Autumn Spa Treatments.pdf* replaces *Spa Treatments.pdf*. **P7.** | Device comp, tighter (about 120%) on the file names. | — | Cut |
| **S18** | 0:31.8–0:32.8 | UI + AI | The cursor settles on **Publish** (P8). Cut 6 frames before the click to an AI macro of James's fingertip pressing the trackpad (S18b), then back to the button press. | UI comp, then 100 mm macro, then UI. | — | **Hard cut on the click (0:32.8), on the music hit** |
| **S19** | 0:32.8–0:33.4 | UI | The app confirms: **"Guests now see your new PDF"** and **"Your Space link and connected Touch Points stay the same."** **P9.** | UI comp, static. | — | Cut on beat |
| **S20** | 0:33.4–0:34.1 | COMP | **HERO FRAME, reused from S08.** Identical composition and identical Touch Point. Eleanor's hand and phone enter again. | Identical plate. Do not reframe. | — | Cut on beat |
| **S21** | 0:34.1–0:34.8 | UI | Eleanor's phone, over the shoulder: *Autumn Spa Treatments* opens. **P10.** | Same framing as S10, to show the before and after. | — | Cut on beat |
| **S22** | 0:34.8–0:35.7 | COMP | The relaxation-pool doorway, with a second Touch Point on a stone pillar. The second guest in a white robe touches his phone to it. His screen brightens but is not readable. | 50 mm, locked off. | — | Cut on beat |
| **S23** | 0:35.7–0:37.0 | AI | Wide view of spa reception. Eleanor reads calmly; the therapist is beside her. The S08 Touch Point sits exactly where it was. | 35 mm, locked off, symmetrical. | — | Cut |
| **S13-R** *(🟡 PLANNED, only once V1 passes)* | replaces the second half of S13 | UI | **Your Spaces**: James moves **Dining** above **Gym** and the new order holds. **P3-R.** | Same device comp as S13 | — | Cut on release |

### ACT 5 — SCALE (0:37.0–0:40.4)

Silent montage. Each shot uses the same rhythm: a Touch Point in its setting, a guest's hand entering, and the label super.

| Shot | TC | Source | Picture | Camera | On-screen text |
|---|---|---|---|---|---|
| **S24** | 0:37.0–0:37.8 | COMP | A spa treatment-room door with a Touch Point on a stone ledge and warm candlelight. | 65 mm, 3% slide right | **SPA** / Treatments |
| **S25** | 0:37.8–0:38.6 | COMP | The gym entrance, with a Touch Point on an oak panel beside the glass doors and equipment soft in the background. | 50 mm, 3% slide right | **GYM** / Classes |
| **S26** | 0:38.6–0:39.4 | COMP | A meeting-room doorway, with a Touch Point beside double oak doors and the room set for a board meeting behind. | 50 mm, 3% slide right | **MEETINGS & EVENTS** / Floor plans |
| **S27** | 0:39.4–0:40.4 | COMP | The restaurant at sunset, with a Touch Point on the host stand and couples at candlelit tables beyond. The window glows amber into dusk. | 40 mm, slow 3% push | **DINING** / Menus |

Label treatment: the primary word is set in capitals with 0.16 em tracking, white at 92%; the secondary word sits beneath in sentence case, white at 70%. Place labels **lower-left inside title-safe**. Labels fade in over 4 frames and cut out with the picture.

### ACT 6 — BRAND REVEAL (0:40.4–0:45.0)

| Shot | TC | Source | Picture | On-screen text |
|---|---|---|---|---|
| **S28** | 0:40.4–0:45.0 | Graphics | 0:40.4–0:41.0: S27's dusk window dissolves (16 frames, luminance-weighted) into a **deep navy field** (`#0b1524`) with a very soft radial lift behind centre (+4% luminance) and fine grain. 0:41.0: the **supplied Informax Cloud logo** fades in over 20 frames with a scale of 0.97 → 1.00 (Cloud easing). There is no other logo motion, glow, shine or 3D. | **0:42.5** closing line below the logo: *Every detail. Always current.*  ·  **0:43.2** CTA: *Discover Informax Cloud* then *informax.co.uk* (in `#8ed1fc`). Hold to 0:45.0. |

**End-card layout (3840 × 2160):**
- The logo is centred horizontally, with its optical centre at 44% of frame height. Width is **1000 px**, 26% of frame width. That is below the PNG's native 1498 px, so it only ever scales **down**. Proportions are locked, with no crop and no effects.
- The closing line sits 120 px below the logo, with cap height of about 46 px, white at 88%.
- The CTA block is centred at 78% of frame height. *Discover Informax Cloud* is medium weight, white at 88%. *informax.co.uk* sits beneath in `#8ed1fc`.
- **Do not typeset "INFORMAX CLOUD" as text.** The supplied logo *is* the wordmark, and retyping it would approximate the brand.
- Keep every element inside the centre 80% of the frame. YouTube places "Skip Ad" at bottom-right and ad info at top-left.

---

## 7. Music direction

**Brief to the composer:** *"A hotel at 4 pm in late autumn. Nothing is rushing. Then one small action ripples through the whole building."*

- **Instrumentation:** felt piano, a small string section (cellos and violas, sul tasto), bowed vibraphone, a warm analogue synth pulse and pad, and a soft sub. No drum kit, claps, whistles, ukulele or motivational piano runs.
- **Key and tempo:** D♭ major, which is warm but not saccharine. 84 BPM, with the grid set so the **Publish click lands on a downbeat at 0:32.8**.
- **The "detail" motif:** a three-note felt-piano figure at 0:00. It returns in full at the end card and resolves at 0:43.5. This is the film's sonic signature, and it can become the brand's audio logo.
- **Shape:**
  - **0:00–0:11, Stillness.** Piano motif, low sustained strings, room tone breathing through.
  - **0:11–0:16, Approach.** A barely audible filtered synth pulse enters (16ths, low-passed around 800 Hz).
  - **0:16.3, Touch.** The first lift: a suspended chord resolves as the phone blooms. Bowed vibraphone shimmer.
  - **0:22–0:30.6, Control.** The pulse is now clear and the filter opens slowly. UI sounds sit inside the rhythm.
  - **0:30.6–0:32.8, Build.** A suspended harmony with rising strings, then **3 frames of near-silence**.
  - **0:32.8, the high point.** The full chord lands with a soft low impact. Piano plays the melody in octaves, strings open, the pulse doubles. Act 4 cuts fall on beats.
  - **0:37–0:40.4, Peak sustain.** It stays confident and legato, and does not escalate further.
  - **0:40.4, Release.** Everything drops away except one sustained chord and its reverb.
  - **0:41–0:45, Signature.** The piano motif resolves on the tonic. Ring out, and cut clean at 0:45.
- **References (in spirit only, do not imitate):** Ólafur Arnalds, Nils Frahm, Jóhann Jóhannsson, and the restraint of Apple product films.
- **Deliverables:** a full mix plus stems (piano, strings, pulse/synth, low end), and **bespoke edits for the 30s and 15s cuts**, not fades.
- **Library fallback search terms:** *"minimal felt piano pulse cinematic warm build"*, *"luxury ambient neo-classical rising"*. Avoid anything tagged "corporate", "uplifting" or "inspiring".

---

## 8. Sound-design cue sheet

Mix the sound design under the music, except at the touch and the click. The most expensive-sounding thing in the film is quiet, detailed room tone.

| TC | Cue | Notes |
|---|---|---|
| 0:00–0:11 | Lobby room tone, a distant clock tick, a faint street murmur behind glass | A real London townhouse tone, not a generic "hotel lobby" loop |
| 0:01.2 | Vase set on marble, stems rustling | Close-miked, soft |
| 0:06.5 | A paper sheet sliding into a frame | — |
| 0:07.4 | Footsteps on carpet passing, paper stack | — |
| 0:08.3 | Linen menu opened, a card placed | — |
| 0:09.0–0:11.2 | Faint wind and leaves beyond the window, muffled | This establishes the season |
| 0:11.2–0:14 | Eleanor's footsteps: low heels on stone, then on oak | Keep to one footstep sound source |
| 0:14.5 | Sleeve fabric as her arm lifts | — |
| **0:16.3** | **Touch.** A soft, warm "tock" (felt on wood, pitched to the key), with a tiny air shimmer | **The signature sound. Never a beep or a chime.** |
| 0:17.2 | Digital bloom: a breathy rising tone of about 0.4 s as the page opens | Sits under the music swell |
| 0:22–0:30 | Office tone, courtyard birdsong through glass, the laptop's faint hum | — |
| 0:24.9, 0:26.8, 0:28.0 | Trackpad clicks | Realistic, low, placed on the pulse |
| 0:31.2 | File drop: a soft paper "settle" | Physical, not digital |
| 0:32.5–0:32.8 | Everything holds its breath (3 frames) | — |
| **0:32.8** | **Publish click plus a low cinematic impact** (a soft sub thump, not a trailer boom) | Sync to the music downbeat |
| 0:33.4 | A repeat of the touch "tock" at the hero frame | The same sound as 0:16.3, a deliberate callback |
| 0:34.8 | Water ambience at the pool doorway, bare feet, the "tock" again at lower level | — |
| 0:37–0:40 | A textural whoosh on each cut (8 frames, −20 dB), plus each room's tone briefly | Spa: water. Gym: a distant weight rack. Meetings: murmur. Dining: glassware. |
| 0:40.4 | Room tone fades out with the picture | — |
| 0:41–0:45 | Silence under the music; a faint low air tone only | — |

---

## 10. Voice-over delivery instructions

- **Casting:** a female British voice aged 40–55, RP-adjacent but contemporary and not plummy. Warm, low-to-mid register, with a smile you can hear but not see. She should sound like a trusted hotelier speaking to peers, not an announcer. *(Alternative: a male voice aged 45–60 of the same quality. Pick one and never mix.)*
- **Register:** conversational and close-miked. She is talking to **one person**, a General Manager, from about half a metre away.
- **Pace:** unhurried, about 150 words per minute within lines. The pauses are part of the script. **Endings fall, and there is never an upward inflection.**
- **Avoid:** trailer gravitas, "sales" energy, over-enunciation, breathy ASMR.
- **Pronunciation:** "Informax" is *IN-for-max*, with the stress on the first syllable (**confirm with the client**). Say "Touch Point" as two words, both stressed equally.
- **Line notes:**
  - VO1: settled and knowing, as if stating a truth the listener already agrees with.
  - VO2: each word is its own small picture, with space between them.
  - VO3: dry and gentle, with a hint of a smile on "Print doesn't." It is not a complaint.
  - VO4: a slight lift in warmth. This is the turn.
  - VO5: "One touch." is almost private. "No app required." is a matter-of-fact reassurance.
  - VO6: confident, and "Informax Cloud" is said plainly, not sold.
  - VO9: practical and simple, as if it really is that easy.
  - VO10: quiet. The music is doing the shouting.
  - VO11: the thesis, with an equal weight on "stay" and "moves".
  - VO12: slowest of all. Let "Informax Cloud." land, pause, then "Every detail. Always current." should feel like a promise.
- **Recording:** a dead booth, a large-diaphragm condenser (U87-class), 48 kHz / 24-bit WAV. Record 3 takes of each line, plus the **30s and 15s scripts** in the same session, plus wild alternates of the closing lines (§18).
- **If you use a synthetic voice** (ElevenLabs or similar): pick a mature British female voice, set stability to around 60 and style low. Generate line by line and assemble the pauses in the edit. Never let the tool read the whole script in one pass.

---

## 11. AI video-generation prompts

### Workflow (this is what keeps it one film)

1. **Lock references first.** Using an image model (Midjourney v7, Imagen 4, Flux or similar), generate and approve:
   - **REF-ELEANOR**: a character sheet (front, three-quarter and profile) of Eleanor in her wardrobe
   - **REF-JAMES**: a character sheet of James
   - **REF-LOBBY**, **REF-SPA**, **REF-CORRIDOR**, **REF-OFFICE**, **REF-POOL**, **REF-GYM**, **REF-MEETING**, **REF-DINING**: location stills in the continuity-bible light
   - **REF-TOUCHPOINT**: the blank provisional plaque (replace it with real product photos as soon as they're supplied)
2. **Generate video image-to-video** from approved keyframes, with the character and location references attached (Veo 3, Runway Gen-4 References, Kling 2.x or Sora 2). Generate each shot at **5–8 s** so you have handles, at 24 fps and the highest resolution available, then upscale to UHD with a temporal upscaler (Topaz or similar).
3. **Put no text, logos or interface in any generation.** Screens are blank and trackable: the laptop is a deep-navy field and the phone is matched to the guest viewer (V7). Touch Point faces are blank. Printed cards are blank. Everything readable is composited in post. **AI must never generate, imitate or "approximate" an Informax Cloud screen or either logo.** If a model draws UI or a logo into a plate, reject the plate.
4. **Append the STYLE BLOCK and NEGATIVE BLOCK below to every prompt.**

**STYLE BLOCK (append to every prompt):**
> Cinematic luxury hospitality film. Shot on ARRI Alexa 35 with Cooke S7/i full-frame lenses, 24 fps, 180-degree shutter, natural motion blur. Location: The Aurelia, a refined London Georgian townhouse hotel with honed pale marble, smoked oak panelling, fluted plaster walls, brushed warm brass details, bottle-green and ivory upholstery, ribbed glass and tall sash windows. Late-afternoon autumn light, low warm sun raking through windows, soft practical lamps, faint atmospheric haze. Colour grade: warm neutral, creamy highlights with gentle roll-off, softly lifted blacks, natural skin tones, restrained saturation, fine film grain. Calm, quiet, unhurried, photorealistic, 16:9.

**NEGATIVE BLOCK (append to every prompt):**
> No text, no letters, no numbers, no logos, no brand names, no signage lettering, no watermarks. No holograms, floating interfaces, neon, blue technology glow or lens-flare streaks. No fast camera movement or handheld shake. No warped hands, extra fingers, distorted faces, plastic skin, stock-photo smiles, or people looking into the lens. No CGI or cartoon look.

**CHARACTER TOKENS (paste in wherever the character appears):**
- **[ELEANOR]**: *a woman in her late thirties with shoulder-length dark brown hair tucked behind her left ear, warm olive complexion and minimal make-up, wearing a cream ribbed roll-neck jumper, camel wide-leg trousers and a slim gold watch on her left wrist*
- **[JAMES]**: *a man in his mid-forties with short salt-and-pepper hair, clean-shaven, wearing a navy tailored suit, white open-collar shirt and a small plain brass lapel pin*
- **[PHONE]**: *a slim modern smartphone with a matte graphite frame and thin even bezels, no visible logos, its screen blank and evenly lit, with no content, icons or text*
- **[TOUCHPOINT]**: *a small flat square tile about 9 cm across with generously rounded corners, dark graphite body with a subtle vertical gradient and a fine light edge highlight, matte finish, its face completely blank and smooth*

### Per-shot prompts

**S01 — Lobby establishing** (generate 6 s · refs: REF-LOBBY)
> Wide establishing shot inside the lobby of a luxury London townhouse hotel. Tall Georgian sash windows on the left throw long diagonal beams of low autumn sunlight across a honed pale marble floor; dust motes drift slowly through the light. At the centre stands a round marble table; a front-of-house staff member in a navy suit, soft focus in the mid-ground, gently sets down a tall vase of copper autumn branches, then steps away. Smoked oak panelling, brushed brass wall lights glowing softly, a bottle-green velvet sofa. The camera dollies slowly forward half a metre at eye height, horizon perfectly level. Quiet, still, expensive. [STYLE BLOCK] [NEGATIVE BLOCK]

**S02 — Spa card macro** (5 s · refs: REF-SPA · COMP: card typography)
> Macro close-up at a spa reception ledge of honed pale marble. A slim brushed-brass card stand holds a single thick ivory card, its face completely blank. Beyond, a softly lit corridor of fluted plaster walls falls into warm creamy bokeh. The camera slides slowly left about 20 cm while focus racks from the card's edge to its face. A shaft of low autumn sunlight grazes the card. Quiet, tactile, luxurious. [STYLE BLOCK] [NEGATIVE BLOCK]
> *Post: composite the card face in the brand-neutral hotel typography: "THE AURELIA SPA / Summer Treatments".*

**S03 — Gym timetable** (5 s · refs: REF-GYM · COMP: timetable content)
> Medium close-up at the entrance of a luxury hotel gym. A slim brass picture frame on a smoked-oak panel holds a blank ivory sheet. A staff member's hand in a navy suit sleeve slides a fresh blank sheet into the frame. Glass doors beside it, with softly blurred premium gym equipment behind. The camera is static with a very slow 3% push-in. [STYLE BLOCK] [NEGATIVE BLOCK]

**S04 — Floor plan and coordinator** (5 s · refs: REF-MEETING · COMP: plan artwork)
> Corridor outside a hotel meeting room with tall double oak doors. A brushed-brass easel holds a large framed blank ivory board. An events coordinator in a navy suit walks through frame from left to right carrying a small neat stack of blank printed sheets; the camera tracks laterally with her at a slow walking pace. Warm sconce light, oak panelling, soft carpet. [STYLE BLOCK] [NEGATIVE BLOCK]

**S05 — Dining menu** (5 s · refs: REF-DINING · COMP: menu insert)
> Overhead view tilting slowly to a 45-degree angle over a restaurant table laid for dinner: crisp white linen, heavy silver cutlery, a single candle, a linen-bound menu lying open with blank ivory pages. A waiter's hand in a white shirt cuff and navy jacket places a small blank ivory card inside the menu. Warm late-afternoon light through tall windows. [STYLE BLOCK] [NEGATIVE BLOCK]

**S06 — The season turns** (6 s · refs: REF-SPA · COMP: card typography, matched to S02)
> Medium shot of the same spa reception ledge of pale honed marble, with the slim brass card stand and blank ivory card in the foreground on the right third. Behind it, a tall Georgian sash window looks onto a London garden square where golden and copper autumn leaves drift slowly down past the glass. Low warm sun backlights the leaves. The camera is locked off with an almost imperceptible 2% push-in. Serene, poignant. [STYLE BLOCK] [NEGATIVE BLOCK]

**S07 — Eleanor's walk** (6 s · refs: REF-ELEANOR, REF-CORRIDOR)
> [ELEANOR] walks unhurriedly along a long smoked-oak-panelled hotel corridor towards the camera, holding [PHONE] loosely in her right hand at her side. Low autumn sunlight from tall windows on the right lays warm stripes of light and shadow across her as she passes through them. The camera leads her on a gimbal at a three-quarter-front angle, retreating slowly at walking pace. She looks ahead, calm and relaxed. Soft focus on the corridor behind her. [STYLE BLOCK] [NEGATIVE BLOCK]

**S08 / S20 — HERO FRAME** (8 s · refs: REF-SPA, REF-TOUCHPOINT, REF-ELEANOR · COMP: Touch Point face and phone screen)
> Locked-off medium close-up at a spa reception ledge of pale honed marble. [TOUCHPOINT] lies flat on the marble in the lower third of the frame, slightly left of centre, with a small sprig of dried lavender in a stone dish beside it and a fluted plaster wall in soft focus behind. After two seconds, [ELEANOR]'s right hand enters from frame right holding [PHONE] and gently brings the phone's upper edge to rest on the tile's face, then holds still. The camera does not move at all. [STYLE BLOCK] [NEGATIVE BLOCK]
> *Generate **two** passes from the same seed and keyframe: one clean plate with no hand (for S23 continuity and the S20 reuse), and one with the hand. **The camera must not move**: S20 must match S08 frame for frame.*

**S09 — Touch macro** (5 s · refs: REF-TOUCHPOINT · COMP: face artwork and screen)
> Extreme macro close-up, focus plane exactly on the point where the edge of [PHONE] rests against the blank face of [TOUCHPOINT] on pale marble. Very shallow depth of field. The phone's screen at the top of frame gradually brightens from dim to an evenly lit, blank, content-free field. Warm rim light from low sun. A very slow 2% push-in. No light effect on the tile itself. [STYLE BLOCK] [NEGATIVE BLOCK]

**S10 / S21 — Over-shoulder phone** (5 s · refs: REF-ELEANOR · COMP: P1 / P10)
> Over-the-shoulder shot from behind [ELEANOR]'s right shoulder, looking down at [PHONE] held comfortably in her right hand at chest height. The screen is blank, evenly lit and content-free, and fills the frame's centre-right, slightly angled toward camera. Soft background of the spa reception with warm bokeh. The camera pushes in very slowly by about 5%. Her thumb rests at the side of the phone and does not cover the screen. [STYLE BLOCK] [NEGATIVE BLOCK]

**S11 — Eleanor's smile** (5 s · refs: REF-ELEANOR)
> Close-up of [ELEANOR]'s face, three-quarter angle, soft light from her phone below mixing with warm window light. She reads for a moment, then a small, genuine, easy smile appears, and she looks up and off-camera left as someone approaches to greet her. The camera pushes in slowly. Natural, understated, not posed. [STYLE BLOCK] [NEGATIVE BLOCK]

**S12 — James at the laptop** (6 s · refs: REF-JAMES, REF-OFFICE · COMP: P2)
> Over-the-shoulder shot behind [JAMES] seated at an antique walnut writing desk in a quiet oak-panelled office. A slim silver laptop with no logo is open in front of him, its screen a plain, evenly lit, deep-navy field with no content, icons or text. Through a tall sash window beyond, a courtyard with autumn trees glows in low sun. A brass desk lamp, a leather notebook and a cup of tea on a saucer. The camera arcs slowly about 10 degrees from behind his shoulder to reveal more of the screen. He sits calmly, one hand resting near the trackpad. [STYLE BLOCK] [NEGATIVE BLOCK]

**S18b — Fingertip on trackpad** (4 s · refs: REF-JAMES)
> Macro close-up of [JAMES]'s index finger, white shirt cuff and navy suit sleeve visible, pressing down gently and decisively on a laptop trackpad. Warm side light, shallow depth of field, the laptop's brushed aluminium surface catching the light. [STYLE BLOCK] [NEGATIVE BLOCK]

**S22 — Pool doorway** (5 s · refs: REF-POOL, REF-TOUCHPOINT · COMP: face artwork)
> Medium shot at the doorway to a serene hotel relaxation pool with pale stone walls, still turquoise-grey water and soft steam. [TOUCHPOINT] is mounted on a pale stone pillar at chest height beside the doorway. A man in his sixties with silver hair, wearing a white waffle hotel robe, raises [PHONE] and touches it to the tile, then glances at the screen. The camera is locked off. Warm diffused light. [STYLE BLOCK] [NEGATIVE BLOCK]

**S23 — Wide spa reception** (6 s · refs: REF-SPA, REF-ELEANOR, REF-TOUCHPOINT)
> Symmetrical wide shot of an elegant spa reception: a pale marble desk, fluted plaster walls, soft practical lighting and the tall window with autumn trees beyond. [TOUCHPOINT] lies on the ledge in exactly the position from the hero frame. [ELEANOR] stands at the ledge reading [PHONE] calmly while a spa therapist (a woman in her thirties with her hair in a low bun, wearing an oatmeal wrap tunic) stands beside her, smiling and gesturing gently toward the treatment corridor. The camera is locked off. [STYLE BLOCK] [NEGATIVE BLOCK]

**S24 — Spa treatment room** (5 s · refs: REF-SPA, REF-TOUCHPOINT)
> Beside a treatment-room door of pale oak in a hotel spa, [TOUCHPOINT] rests on a honed stone ledge next to a lit candle in a stone holder. A hand in a cream roll-neck sleeve enters and touches [PHONE] to it. Candlelight, soft steam haze, calm. The camera slides slowly right by about 3%. [STYLE BLOCK] [NEGATIVE BLOCK]

**S25 — Gym entrance** (5 s · refs: REF-GYM, REF-TOUCHPOINT)
> At a luxury hotel gym entrance, [TOUCHPOINT] is mounted on a smoked-oak panel at chest height beside tall glass doors. Premium gym equipment is softly blurred beyond the glass, with warm light. A hand in a dark athletic sleeve touches [PHONE] to it. The camera slides slowly right by about 3%. [STYLE BLOCK] [NEGATIVE BLOCK]

**S26 — Meeting room** (5 s · refs: REF-MEETING, REF-TOUCHPOINT)
> Beside tall double oak doors to a hotel boardroom, [TOUCHPOINT] is mounted on the panelling. Through the open doors, a long walnut table is set with notepads and water glasses in warm light. A hand in a charcoal suit sleeve touches [PHONE] to the tile. The camera slides slowly right by about 3%. [STYLE BLOCK] [NEGATIVE BLOCK]

**S27 — Dining at sunset** (6 s · refs: REF-DINING, REF-TOUCHPOINT)
> Hotel restaurant at sunset. [TOUCHPOINT] sits on a walnut host stand in the foreground. Beyond, couples dine at candlelit tables with white linen, and tall windows glow deep amber fading into early dusk blue. A hand touches [PHONE] to the tile. The camera pushes in slowly by about 3%. The light warms and deepens through the shot. [STYLE BLOCK] [NEGATIVE BLOCK]

---

## 12. Placeholders: real assets I need from you

### Brand assets

| ID | Asset | Status |
|---|---|---|
| **A1** | Informax Cloud logo | ✅ Supplied as a white PNG, 1498 × 460 (`brand-assets/informax-cloud-logo-white.png`). **Please also supply the vector master (SVG/PDF/EPS).** |
| **A2** | Informax logo | ✅ Supplied as a white PNG, 640 × 349 (`brand-assets/informax-logo-white.png`). **Resolution is too low for 4K macro shots. The vector master is required.** |
| **A3** | Photographs of the real Informax Touch Point, front and at 45°, in neutral light, with dimensions and material/finish | ❌ **Required** (see F5) |
| **A4** | Print-ready artwork of the Touch Point **face** (layout, the Informax logo on it, the Informax Touch mark, the Space-name typography, "Touch your phone here") | ❌ **Required.** I won't recreate this artwork. |
| **A5** | The official **Informax Touch mark** (the proximity icon) as a vector | ❌ Required if it appears on the face |
| **A6** | The licensed brand typeface for supers (see F6) | ❌ Please confirm |
| **A7** | Pronunciation of "Informax" | ❌ Please confirm |

### Screen recordings

Record in a **demo hotel named "The Aurelia London"** in Informax Cloud, containing the Spaces *Spa, Gym, Meetings & Events, Dining, Guest Directory*. Use fictional content only, with no real customers or staff names.

- **An Informax Super Admin sets up the demo hotel off camera** (V6): allocating the Spaces, connecting the Touch Points, publishing 2–3 earlier Spa versions and seeding Activity. None of that setup is filmed.
- **Record everything signed in as a Hotel Admin user at `/dashboard`.** Never record the `/admin` area (🔒).
- **Record only ✅ LIVE features** (§0A). The website's product films are recreations and are **never** a source.
- Informax Cloud is a dark, navy interface, so no appearance setting needs changing.

**Capture spec (all desktop recordings):** a 1920 × 1080 browser window at 2× (3840 × 2160 output), 60 fps, lossless or ProRes. Chrome with no extensions, no bookmarks bar and the chrome hidden. Clean, slow, deliberate cursor moves with a 1-second hold before every click. Record each action **three times**.
**Phone recordings:** a real phone at native resolution, 60 fps, Do Not Disturb on, and a clean status bar (full battery, 9:41).

| ID | Shot | What to record |
|---|---|---|
| **P1** | S10 | **Guest side, phone:** touch a real Touch Point connected to the *Spa* Space, and record the *Spa Treatments* PDF opening in the phone browser, from the first frame until the page is legible. Scroll gently for 2 s. |
| **P2** | S12 | Desktop: the hotel dashboard landing on **Your Spaces**. Hold for 4 s. |
| **P3** | S13 | **Your Spaces** with the five Spaces visible. The cursor glides to **Spa** and clicks. |
| **P3-R** | S13-R | 🟡 **Only once V1 passes:** in **Your Spaces**, drag **Dining** above **Gym**, then reload to show the order persists. Use the reload take only as proof; it isn't cut into the film. |
| **P4** | S14 | The Spa Space opens, showing **Current Content**: *Spa Treatments.pdf*. Hold for 3 s. **Keep the Scan section out of frame.** |
| **P5** | S15 | Spa → **Previous Versions** with 2–3 prior versions listed. Hold for 3 s. |
| **P6** | S16 | **Activity**, seeded with fictional figures and at least 3 Touch locations, so that **"Where guests use Informax Touch"** appears (V5). Hold on Interactions, then scroll slowly to the locations list. |
| **P7** | S17 | Spa → **Change Content** → **Upload a PDF** → drag *Autumn Spa Treatments.pdf* onto *Drag your PDF here*. **Name the files exactly:** `Spa Treatments.pdf` (current) and `Autumn Spa Treatments.pdf` (new). |
| **P8** | S18 | The cursor moves to **Publish**, holds for 1 s, then clicks. |
| **P9** | S19 | The confirmation **"Guests now see your new PDF"** / **"Your Space link and connected Touch Points stay the same."** Hold for 3 s. |
| **P10** | S21 | **Guest side, phone:** after publishing, touch the **same** Touch Point and record *Autumn Spa Treatments* opening. Match P1's framing and scroll. |
| **P12** | — | Designed PDFs for **Spa Treatments** (Summer) and **Autumn Spa Treatments**, fictional but beautiful, because they will be seen on screen. They also provide the typography for the printed card in S02/S06. |

---

## 13. Editing and assembly instructions

**Software:** DaVinci Resolve Studio for the edit, grade and Fairlight mix. After Effects with Mocha Pro for screen replacement, Touch Point face compositing and device compositions.

1. **Project settings:** 3840 × 2160, **24.000 fps**, Rec.709 gamma 2.4 timeline, colour-managed (DaVinci YRGB Color Managed, Rec.709 output).
2. **Conform:** upscale every AI plate to UHD before editing, conform everything to 24 fps (no frame blending), and name the clips by shot ID (`S08_A_v03`).
3. **Radio edit first:** lay the approved VO on A1 at the §2 timestamps, then lay the music. Cut the picture to the VO and the music grid. The Publish click must sit on the downbeat at **0:32.8**.
4. **Track layout:** V1 plates · V2 UI comps · V3 Touch Point face comps · V4 supers · V5 end card. A1 VO · A2–A3 music stems · A4–A7 SFX · A8 room tones.
5. **Screen replacement (S10, S12, S21, and the phone in S22):** Mocha planar track the screen. Corner-pin the real recording, add a 2–4% screen-glass reflection taken from the plate, match the black level and white point to the plate, add a subtle bloom of 3–5 px, **apply 180° motion blur** to match the camera, and put grain over the whole composite. Fingers stay on top via a roto matte.
6. **Touch Point faces (S08, S09, S20, S22–S27):** track the blank face and composite the supplied face artwork (A4) with the **Informax logo (A2) at its original proportions**. Match lighting with a gradient and edge-highlight pass, not a glow. The artwork must stay perfectly legible, undistorted and never cropped.
7. **Interface integrity:** every Informax Cloud screen comes from a genuine recording (§12) of a ✅ LIVE feature. Do not recreate, redraw, mock up, AI-generate or re-typeset any UI element. Don't add any overlay inside the UI frame (no counters, callouts or "12 Touch Points updated"). Don't use the website's product films. You may crop, punch in, trim pauses and smooth the cursor; nothing else.
8. **UI device compositions (S13–S17, S19):** place the recording inside a laptop-screen composition built from the S12 plate's screen (the bezel edge visible on one side, a 4° perspective, and the warm office bokeh reflected at about 5%). You may **crop and punch in up to 125%** on the 2× captures. **Never retime or alter the UI itself**, except for trimming dead time between actions. The cursor may be smoothed.
9. **Printed-material composites (S02–S06):** typeset the fictional hotel print (card, timetable, plan, menu). Hotel typography only. No Informax branding on hotel print.
10. **Cut style:** cut on motion and on the VO words (2–4 frames ahead of each word in the S02–S05 list). Use straight cuts everywhere except the S09→S10 match cut, the S11→S12 graphic match, and the S27→S28 dissolve. **No whip-pans, glitches, light leaks, zoom transitions or speed ramps.**
11. **The hero-frame rule:** S08 and S20 must come from **the same plate at the same position and scale**. Check with a difference-blend. Only the hand and the phone screen may differ.
12. **Grade:** create one show LUT from the approved REF stills and apply it to everything. Do a shot-match pass so that skin, brass and marble match across shots. UI shots keep the app's true colour; do not warm the interface.
13. **Supers:** the brand typeface (A6), with fades of 4 frames in and out, all inside title-safe (90%), and nothing in the bottom-right 20% × 20% of the frame (YouTube's skip button).
14. **End card:** build it at 3840 × 2160 in After Effects using the end-card layout in §4 (Act 6). **Import the logo PNG or vector unaltered and set its scale proportionally only.** No effects other than opacity and uniform scale.
15. **Mix:** VO is the anchor. Dip the music by 3–4 dB under the VO and bring it back up in the gaps. Integrated loudness **−14 LUFS**, true peak **−1 dBTP**.
16. **QC:** check the logos at 100% on the end card, check every UI word against the real app, confirm no hands are malformed, run a difference-check on the hero frame, confirm the lip sync on the Publish click, and check the captions.

---

## 14. Technical specification and export

| Item | Spec |
|---|---|
| Aspect ratio | **16:9** |
| Master resolution | **3840 × 2160 (UHD)**. Upload 4K even if most people watch in 1080p, because YouTube gives 4K uploads a higher-bitrate encode. |
| Frame rate | **24 fps**, progressive |
| Colour | Rec.709, gamma 2.4, tagged 1-1-1 (BT.709 primaries, transfer and matrix) |
| Mezzanine master | ProRes 422 HQ, UHD, 24p, 48 kHz / 24-bit PCM stereo |
| **YouTube upload** | H.264 High Profile, UHD, 24p, **2-pass VBR at a 45 Mbps target**, closed GOP of 12 frames, 2 B-frames, CABAC, 4:2:0, progressive, `moov` atom at the front (fast start) |
| Audio | AAC-LC, 48 kHz, stereo, 384 kbps. **−14 LUFS integrated, −1 dBTP.** |
| Also export | 1920 × 1080 H.264 at 16 Mbps (Google Ads and backup). Stems. A textless version. |
| Captions | British English `.srt` uploaded as closed captions, not burned in |
| Optional vertical cut | 1080 × 1920 reframe for YouTube Shorts. Keep the Touch Points and supers inside the centre 1080 × 1420. |
| Organic upload | If it's also posted as a normal video, make a **50s version** with a 5 s extended end card, so there's room for a YouTube end screen. |

---

## 15. 30-second cut-down

**VO, 60 words:**

| In | Out | Line |
|---|---|---|
| 0:00.6 | 0:03.8 | In hospitality, the smallest details shape the experience. |
| 0:04.2 | 0:06.0 | Details change. Print doesn't. |
| 0:06.3 | 0:10.0 | Now, every detail can be exactly where your guests need it. |
| 0:10.8 | 0:12.6 | One touch. No app required. |
| 0:12.8 | 0:14.8 | Behind every Touch Point: Informax Cloud. |
| 0:15.0 | 0:17.8 | Your Spaces. Your content. Always under your control. |
| 0:18.0 | 0:19.8 | Replace a document. Press publish. |
| 0:21.0 | 0:23.4 | The Touch Points stay. The information moves. |
| 0:25.6 | 0:28.4 | Informax Cloud. Every detail. Always current. |

**Picture:**

| TC | Shot |
|---|---|
| 0:00.0–0:02.0 | S01 |
| 0:02.0–0:04.0 | S02 |
| 0:04.0–0:06.0 | S06 |
| 0:06.0–0:07.6 | S07 |
| 0:07.6–0:09.2 | S08 |
| 0:09.2–0:10.4 | S09 (touch SFX) |
| 0:10.4–0:12.4 | S10 + *Informax Touch* super |
| 0:12.4–0:14.6 | S12 |
| 0:14.6–0:16.2 | S13 |
| 0:16.2–0:17.4 | S14 |
| 0:17.4–0:18.6 | S17 |
| 0:18.6–0:19.8 | S18, **click and music hit at 0:19.8** |
| 0:19.8–0:20.4 | S19 |
| 0:20.4–0:21.1 | S20 (hero frame) |
| 0:21.1–0:21.8 | S21 |
| 0:21.8–0:22.6 | S22 |
| 0:22.6–0:23.3 | S25 (no labels in this cut) |
| 0:23.3–0:24.0 | S26 |
| 0:24.0–0:25.2 | S27, dissolving from 0:24.8 |
| 0:25.2–0:30.0 | End card: logo 0:25.4, line 0:26.6, CTA 0:27.4, hold to 0:30.0 |

**Music:** the composer's 30s edit. The motif opens it, the build runs 0:17–0:19.8, the hit lands at 0:19.8, and it releases at 0:24.8.

---

## 16. 15-second cut-down (pre-roll, non-skippable)

This cut leads with the payoff. There's no time to set up the problem, so the before and after carry it.

**VO, 29 words:**

| In | Out | Line |
|---|---|---|
| 0:00.3 | 0:03.4 | One touch, and your guests have exactly what they need. |
| 0:03.8 | 0:05.9 | Change it once, in Informax Cloud. |
| 0:07.6 | 0:10.0 | The Touch Points stay. The information moves. |
| 0:10.6 | 0:13.4 | Informax Cloud. Every detail. Always current. |

**Picture:**

| TC | Shot |
|---|---|
| 0:00.0–0:01.2 | S08 (hand enters the hero frame) |
| 0:01.2–0:02.2 | S09 (touch) |
| 0:02.2–0:03.6 | S10 (Spa opens) + *Informax Touch* super |
| 0:03.6–0:05.0 | S12 |
| 0:05.0–0:06.2 | S17 |
| 0:06.2–0:07.0 | S18, **click at 0:07.0** |
| 0:07.0–0:07.6 | S20 (the same frame) |
| 0:07.6–0:08.3 | S21 (Autumn) |
| 0:08.3–0:09.0 | S22 |
| 0:09.0–0:10.2 | S27, dissolving |
| 0:10.2–0:15.0 | End card: logo 0:10.4, line 0:11.4, CTA 0:12.0, hold to 0:15.0 (over 3 s of CTA on screen) |

**Music:** the pulse starts immediately, the hit lands at 0:07.0, and the motif resolves at 0:13.

*(A 6-second bumper is also possible: S09 → S21 → the end card with "Every detail. Always current." and no VO except the line.)*

---

## 17. Three alternative opening hooks (0:00–0:05)

**Hook A: "The Season Turns"** *(strongest brand fit)*
Picture: a single copper leaf falls past a tall sash window (S06), then a slow rack to the *Summer Treatments* card inside.
VO: *"Outside, the season has changed. [pause] Has everything inside?"*
This leads straight into VO3 / Act 2. It puts the story's engine up front and poses a question every hotelier recognises.

**Hook B: "Payoff First"** *(for skippable in-stream, see F1)*
Picture: 0:00 hero frame (S08), 0:01.2 touch macro (S09), 0:02 the phone blooms (S10), 0:04 cut back to the lobby (S01).
VO: *"Everything your guests need to know. [beat] One touch away."* Then VO1 continues as written.
Super: *Informax Touch* at 0:02. The product is on screen before the skip button appears.

**Hook C: "The Question"**
Picture: at the concierge desk, Eleanor asks the only line of dialogue in the film, *"What time does the spa close this evening?"* The concierge smiles warmly and reaches for a printed sheet.
VO: *"The details guests ask about most [beat] are the ones that change most."*
It is human and immediately relatable. The concierge is gracious, not failing.

---

## 18. Closing lines

### Development

| Candidate | Verdict |
|---|---|
| Your hotel changes. Your information moves with it. | Clear, but two sentences of eight words. It explains rather than resonates. |
| Essential information. Exactly where it belongs. | Elegant, but "essential information" is generic. |
| One place to control what your guests see. | It sells the product but has no emotion. |
| Change the information. Not the Touch Point. | This is the thesis, and VO11 already says it. Repeating it would be redundant. |
| The Touch Point stays. Your hotel moves on. | Nice, but "moves on" is ambiguous. |
| Always current. | Strong, but too bare on its own. |
| Everything your guests need. Exactly where they are. | Guest-centric and warm, but long. |
| Your hotel, always up to date. | Accurate, but flat. "Up to date" sounds like software. |
| **Every detail. Always current.** | ✅ **Selected.** Four words. It closes the loop opened by the first line ("the smallest details…"), it is true to the product, it isn't a claim a competitor could make equally well about print, and it works as a standalone brand line. |

### Final closing line
> ## **Every detail. Always current.**

### Three alternatives (record all three in the VO session)
1. **"Change the information. Never the Touch Point."** The most literal statement of the core selling idea. Best for the 15s cut if the audience testing shows the concept needs reinforcing.
2. **"Your hotel changes. Your information keeps pace."** A refinement of the brief's own direction. It's warm and operational, and senior operations audiences will respond to it.
3. **"Everything your guests need. Exactly where they are."** Guest-experience led. Best for spa and marketing directors.

---

## Asset and production checklist

- [ ] F1–F7 decided
- [ ] **§0A cleared: V1–V8 verified.** Space reordering (V1) is filmed only if it's live on production.
- [ ] Every interface shot traced to a ✅ LIVE feature and a genuine recording; nothing from `/admin`; no Scan codes in frame
- [ ] A1/A2 vectors, A3 Touch Point photos, A4 face artwork, A5 Touch mark, A6 typeface, A7 pronunciation
- [ ] Demo hotel "The Aurelia London" set up by an Informax admin (V6); P1–P10 and P12 recorded as a Hotel Admin (P3-R only if V1 passes)
- [ ] REF stills approved (characters, locations, Touch Point)
- [ ] AI plates generated, reviewed for hands and faces, upscaled
- [ ] VO recorded (45 / 30 / 15 plus alternate closing lines)
- [ ] Music composed with stems and cut-down edits
- [ ] Offline edit approved, then comps, grade and mix
- [ ] Brand QC: logos unaltered, UI wording matches the real app, no invented features
- [ ] Exports: 45 / 30 / 15 in UHD and 1080p, stems, textless version, SRT
