/**
 * Where Informax Cloud Analytics actually is. The website must never say more than this.
 *
 * "planned": scan recording, reporting and dashboards are NOT built in Informax Cloud
 * (informax-cloud-v2: no insights route, no interaction table, the public Code route
 * writes nothing). Every Analytics mention on the site is a secondary "Coming soon"
 * note, written as a future plan, with no dashboard, no figures and no statement
 * about what is recorded, kept or who can see it.
 *
 * Every Analytics string on the site comes from this file and
 * components/real/AnalyticsPanel.tsx. To update when Analytics ships:
 *  1. Confirm in informax-cloud-v2: the public Code route records scans, an Insights
 *     screen exists, who can see it, and what is kept and for how long.
 *  2. Capture real screens from a /dev/preview scenario (never recreate a dashboard).
 *  3. Set ANALYTICS_STATUS to "live", rewrite the copy below from the verified
 *     behaviour, and add the privacy statements the product can support.
 *  4. Search the site for "Coming soon" and "planned".
 */
export const ANALYTICS_STATUS: "planned" | "live" = "planned";
export const ANALYTICS_LABEL = "Coming soon";

/** Shown wherever Analytics appears while it is planned. Not a promise of dates or scope. */
export const ANALYTICS_PLANNED_NOTE =
  "Analytics is not available in Informax Cloud yet. What it will include, how data is handled and who can see it will be confirmed when it is designed, and this site will be updated then.";

/** The one-line answer used in the FAQ. */
export const ANALYTICS_FAQ_ANSWER =
  "Not yet. Analytics is planned for Informax Cloud and is not available today. We can tell you where it stands.";
