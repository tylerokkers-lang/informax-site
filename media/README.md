# Stock video

Ten stock videos were named for the redesign on 22 October 2026; nine were
supplied, eight are built and used and one (smartphone) is excluded. The staircase
was never supplied and is excluded. Status per clip: `media/videos.json` and HANDOVER.md §0c. The
originals are **not committed** (too large for git, and never served); only
the optimised web versions are.

## 1. Put the originals here

```
informax-site/media/source/
  2174411-hd_1920_1080_30fps.mp4
  15018462_2160_3840_30fps.mp4
  3769032-hd_1920_1080_25fps.mp4
  13476222_3840_2160_25fps.mp4
  19905887-uhd_3840_2160_24fps.mp4
  12680170_3840_2160_25fps.mp4
  6278838-uhd_3840_2160_30fps.mp4
  15358608_3840_2160_25fps.mp4
  14983318_3840_2160_25fps.mp4
  6187887-uhd_3840_2160_25fps.mp4
```

Keep the original file names: `media/videos.json` maps each one to its place
on the site. `media/source/` is in `.gitignore`.

Ways to get them there:
- **Cloud session (fastest):** allow `videos.pexels.com` and `www.pexels.com` in
  the session's network settings (environment → Edit → Network access →
  Allowed domains). The files can then be fetched by their exact names and
  each licence page checked.
- **Local machine:** copy the files into `media/source/` in a checkout of the
  `redesign/restaurant-first` branch and run step 2 there.
- **Through GitHub:** files over 100 MB cannot be pushed to GitHub. Either use
  Pexels' HD download of the same clip (under 100 MB) on a separate branch, or
  run step 2 locally and push only the optimised outputs.

## 2. Build the web versions

Needs ffmpeg 6+ with libx264 and libvpx-vp9.

```bash
npm run media:review      # contact sheets in media/review/: check content and framing first
npm run media:build       # optimise every clip found in media/source/
```

For each slot this writes `public/video/stock/<slot>/`:
- `<slot>-1080.mp4` (H.264) and `<slot>-1080.webm` (VP9): 16:9, at most
  1920×1080, no audio, a seamless loop (1 s crossfade from end to start);
- `<slot>-m720.mp4` / `.webm`: a 720×960 portrait crop for phones;
- `<slot>-poster.jpg` / `-poster-m.jpg`: the exact first frames;

and records sizes and paths in `src/lib/video-assets.json`. Commit those
outputs and the JSON. A slot with no outputs keeps its labelled placeholder.

Tune per clip in `media/videos.json`: `start` (seconds into the source),
`duration` (loop length), `mode` ("loop": 1 s crossfade, the default;
"pingpong": forward then reverse, for slow camera moves; "once": plays once
and holds, and stills use its last frame), `focus` / `focusMobile` (CSS
object-position of the subject, used for the crops and on the page), `region`
("x y w h" fractions of the source to keep before any other crop, e.g. to cut
away third-party branding; restaurantInterior uses it), `alt`,
`notes`, `branding`, `licenceCheck` and `excluded` (with a reason).

After building, run the QA in `docs/qa/` (video-checks and film-contrast in
particular: a new clip can make hero text unreadable).

## 3. Licences: the clearance process

Clips are free stock under the Pexels Licence (https://www.pexels.com/license/):
free for commercial use, editing and cropping allowed, no attribution needed;
not allowed: selling unaltered copies, implying endorsement by the people, brands
or places shown, or showing identifiable people in a bad light. Never name or
imply a real venue: the footage illustrates use cases, not Informax customers.

A clip may be used in production when `media/videos.json` documents, and
`videoCleared()` in `src/lib/videos.ts` accepts:

1. **Provenance** (`provenance`): either an independently opened listing
   (`basis: "verified-listing"`) or the owner's dated declaration of where the
   file came from (`basis: "owner-declaration"`), with the evidence that
   supports it. An owner declaration is sufficient on its own **unless
   something contradicts it** (`contradictingEvidence`), such as a file name
   whose ID shows different footage, or a file that was re-encoded rather than
   downloaded as an original.
2. **The licence's URL** (`licenceUrl`).
3. **A people, branding and endorsement review** (`rightsReview.status:
   "cleared"`, with any conditions).
4. **A source URL that is not known to be wrong.** `page` is either a real
   listing URL or `null` (unknown). Never invent one. A wrong file-name ID is
   recorded in `filenameClaim` and never reused as the source.
5. `licenceVerified: true`.

`npm run media:licences` prints every clip's status and fails if a clip is
marked verified without the above. A `VERCEL_ENV=production` build refuses to
run while any slot the site uses depends on an uncleared clip (`next.config.ts`).
Do not weaken either; fix the evidence.
