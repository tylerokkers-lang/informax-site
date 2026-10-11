/**
 * What Informax Cloud does today with Spaces and Access Points, and what is only planned.
 * Verified 11 October 2026 against informax-cloud-v2 (origin/main 7587f92; docs/stage-2.md,
 * docs/stage-3.md, ADR 0018):
 *
 * LIVE
 *  - Content (default, temporary with an expiry, version history) belongs to a Space.
 *  - Every Access Point placed in a Space shows exactly what that Space shows.
 *  - A room or a table is its own Space, so each can show different content, and temporary
 *    content on one room or table leaves the others alone.
 *  - Floors, terraces and Public Areas are container Spaces: they group places and have no
 *    Access Points or content of their own.
 *
 * PLANNED (not built; ADR 0018 point 13 "bulk operations later", Stage 4 "default destinations")
 *  - Updating every room on a floor, or a whole restaurant, in one step. Today content is
 *    published to each room or table on its own.
 *  - Giving one Access Point its own content, different from its Space. Today an Access Point
 *    (a "Code" in the app) owns nothing: no Code-specific content.
 *
 * Do not describe the PLANNED items as available. Update this file and the copy that reads it
 * (app/informax-cloud/page.tsx, hotels, restaurants) when they ship.
 */
export const PLANNED_SPACE_CAPABILITIES = [
  "Update every room on a floor, or a whole restaurant's menu, in one step. Today each room or table is updated on its own.",
  "Give a single Access Point content that differs from the rest of its Space.",
] as const;

/** One line for the hotel and restaurant pages. */
export const PLANNED_BULK_NOTE =
  "Planned: updating every room on a floor, or every table in a restaurant, in one step. Today each room or table is updated on its own.";

export const LIVE_SPACE_CAPABILITIES = [
  "Every room or table is a Space with its own Access Point and its own content.",
  "Every Access Point in a Space shows what that Space shows, now and in future.",
  "Floors, terraces and public areas group your Spaces, so you can find them quickly.",
  "Temporary content on one room or table ends on its own and leaves the others untouched.",
] as const;
