/**
 * What Informax Cloud does today with the approved hierarchy
 * PROPERTY -> SPACE -> BLOCK -> ACCESS POINT (owner, 12 October 2026), and what is only planned.
 * Audited 12 October 2026 against informax-cloud-v2 origin/main 7587f92
 * (docs/product-hierarchy-plan.md, ADR 0020, ADR 0016, ADR 0018).
 *
 * The website already uses the approved words. The Cloud application and database do NOT yet:
 * they still call a Property a Location, a Block a (leaf) Space, and an Access Point a Code, and
 * they have a Floor level the approved hierarchy does not. Never put floors on the website.
 *
 * LIVE (in substance, under the older words)
 *  - A Property is organised into top-level areas (Spaces: Bedrooms, Spa, Restaurant, Bar...).
 *  - Rooms and tables inside them (Blocks) each have their own content (default, temporary with
 *    an expiry, version history) and their own Access Points.
 *  - Every Access Point in a Block shows exactly what that Block shows; a Block can have several.
 *  - Temporary content on one Block ends on its own and leaves the others untouched.
 *
 * PLANNED (not built; ADR 0020 target requirements, precedence rules still to be defined)
 *  - Shared default content for a whole Space that Blocks can inherit or replace.
 *  - Changing content across a whole Space in one step (today each Block is updated on its own).
 *  - Different content for different Access Points in the same Block (today an Access Point
 *    owns nothing).
 *
 * Do not describe the PLANNED items as available, and never call a Block (Room 324, Table 7) a
 * Space. Update this file and the copy that reads it when they ship.
 */
export const PLANNED_SPACE_CAPABILITIES = [
  "Shared default content for a whole Space, which Blocks can inherit or replace with their own.",
  "Changing content across a whole Space in one step. Today each room or table is updated on its own.",
  "Different content for different Access Points in the same Block.",
] as const;

/** One line for the hotel and restaurant pages. */
export const PLANNED_BULK_NOTE =
  "Planned: shared content for a whole Space and updating every room or table in one step. Today each room or table is updated on its own.";

export const LIVE_SPACE_CAPABILITIES = [
  "Your Property is organised into Spaces such as Bedrooms, the Spa or the Restaurant.",
  "Every room or table inside a Space is a Block with its own content and its own Access Points.",
  "Every Access Point in a Block shows what that Block shows, now and in future.",
  "Temporary content on one Block ends on its own and leaves the others untouched.",
] as const;
