/**
 * Where Informax Cloud Analytics actually is. The website must never say more than this.
 *
 * "planned": scan recording, reporting and dashboards are NOT built in Informax Cloud
 * (informax-cloud-v2: no insights route, no interaction table, the public Code route
 * writes nothing). The marketing sections say "Coming soon", show no dashboard and
 * no figures.
 *
 * Before changing this to "live": confirm in informax-cloud-v2 that the public Code
 * route records scans, that an Insights screen exists, who can see it, and what is
 * kept and for how long; then capture real screens (/dev/preview scenario), update
 * the wording in components/real/AnalyticsPanel.tsx and drop the "Coming soon" labels.
 */
export const ANALYTICS_STATUS: "planned" | "live" = "planned";
export const ANALYTICS_LABEL = "Coming soon";
