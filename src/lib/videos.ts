import generated from "./video-assets.json";
import slots from "../../media/videos.json";

/**
 * The stock videos supplied by the owner (22 October 2026), by slot. The
 * settings live in media/videos.json, shared with the build script.
 *
 * Sources are NOT committed (4K originals are far too large): put them in
 * media/source/ under their original file names and run `npm run media:build`
 * (scripts/media/build-videos.mjs). That writes the optimised web files to
 * public/video/stock/ and their details to ./video-assets.json, which is what
 * the site reads. A slot with no generated asset falls back to its labelled
 * photography placeholder, and a production build refuses to run while a slot
 * the site uses has neither a finished photograph nor a finished video
 * (next.config.ts). See media/README.md.
 *
 * Licence: the file names follow Pexels' download naming ("<id>-uhd_3840_2160_25fps.mp4"),
 * so each clip is presumed to be from Pexels under the Pexels Licence (free for
 * commercial use, no attribution required, no implied endorsement by people or
 * brands shown). That has NOT been verified from this build environment
 * (pexels.com is blocked). `licenceVerified` stays false until someone opens
 * each `page` and confirms the clip and its licence; production requires true.
 *
 * Stock footage never implies that a property shown is an Informax customer:
 * no venue is named, and captions describe the use case, not the place.
 */
export type VideoSlot = {
  /** The original file name, as supplied. */
  file: string;
  /** The clip's original listing, once the owner has confirmed it shows this footage. `null` = source not identified. */
  page: string | null;
  /** The listing the file name claimed, when it was found not to match (kept for the record only). */
  filenameClaim?: string;
  /** Why `page` is null, or how the source was confirmed (older free-text field). */
  sourceStatus?: string;
  /** "owner-checked" (owner reviewed the link), "verified" (independently opened), "unknown" (listing not found) or "mismatch" (known wrong). */
  sourceUrlStatus?: string;
  /** The licence's own terms, e.g. https://www.pexels.com/license/. */
  licenceUrl?: string;
  /** Documented origin of the file: who said what, when, and what supports or contradicts it. */
  provenance?: { basis: "owner-declaration" | "verified-listing"; declaredOn: string; declaredBy: string; statement: string; supportingEvidence: string[]; contradictingEvidence?: string[] };
  /** People, branding and endorsement review. Only "cleared" can reach production. */
  rightsReview?: { status: "cleared" | "unresolved" | "not-used"; peopleAndBranding: string; conditions: string; reviewedOn: string };
  licence: string;
  licenceVerified: boolean;
  /** Plain description for alt text and captions. Check it against the footage. */
  alt: string;
  /** Where the site uses it. */
  usedFor: string;
  /** Seconds into the source where the loop starts, and how long it lasts. The poster is the loop's first frame. */
  start: number;
  duration: number;
  /** CSS object-position: keep the subject visible when the frame is cropped (desktop, then phone). */
  focus: string;
  focusMobile?: string;
  /** "x y w h" fractions of the source frame to keep before any other crop (e.g. to cut away third-party branding). */
  region?: string;
  /** "loop" (crossfade, default), "pingpong" (forward then reverse) or "once" (plays once, holds the last frame). */
  mode?: "loop" | "pingpong" | "once";
  /** What was done to verify the licence, and when. */
  licenceCheck?: string;
  /** Third-party branding, people or signage in the footage, and how it is handled. */
  branding?: string;
  /** What the footage actually shows, and anything to watch for. */
  notes?: string;
  /** Excluded slots are documented but not built or shown. */
  excluded?: string;
};

export const VIDEOS = slots as Record<keyof typeof slots, VideoSlot>;

export type VideoKey = keyof typeof VIDEOS;

/** What the build script generated for a slot (public paths, sizes in bytes). */
export type VideoAsset = {
  mp4: string;
  webm: string;
  mp4Mobile: string;
  webmMobile: string;
  poster: string;
  /** "once" films: the last frame, for still uses of the clip (the poster stays the film's first frame). */
  still?: string;
  width: number;
  height: number;
  duration: number;
  /** False for "once" films: play through, then hold the last frame. */
  loop?: boolean;
  posterMobile: string;
  mobileWidth: number;
  mobileHeight: number;
  bytes: Record<"mp4" | "webm" | "mp4Mobile" | "webmMobile" | "poster" | "posterMobile", number> & { still?: number };
};

export const VIDEO_ASSETS = generated as Partial<Record<VideoKey, VideoAsset>>;

/** A clip the site may show: generated, not excluded. */
export const videoAsset = (k: VideoKey): VideoAsset | null => ((VIDEOS[k] as VideoSlot).excluded ? null : VIDEO_ASSETS[k] ?? null);

/**
 * Ready for production: the film is built AND its licence is cleared. Cleared means `licenceVerified` with a documented
 * `provenance` (an independently opened listing, or the owner's declaration), the licence's URL, a `rightsReview` of
 * "cleared" (people, branding, endorsement), no contradicting evidence, and a source URL that is not known to be wrong.
 * An owner declaration is accepted as provenance; a contradicted or unreviewed one is not. `npm run media:licences` checks
 * the manifest against the same rules.
 */
export const videoCleared = (k: VideoKey): boolean => {
  const v = VIDEOS[k] as VideoSlot;
  return Boolean(
    v.licenceVerified &&
      v.provenance &&
      !v.provenance.contradictingEvidence?.length &&
      v.licenceUrl &&
      v.rightsReview?.status === "cleared" &&
      !/^mismatch/.test(v.sourceUrlStatus ?? "") &&
      (v.page === null || /^https:\/\/www\.pexels\.com\/video\//.test(v.page)),
  );
};
export const videoReady = (k: VideoKey) => Boolean(videoAsset(k) && videoCleared(k));
