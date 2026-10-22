#!/usr/bin/env node
// Audits media/videos.json: prints every clip's provenance and licence status, and fails if a clip is marked
// licenceVerified without the documented evidence the production guard requires (src/lib/videos.ts, videoCleared).
//
//   npm run media:licences
//
// An owner's declaration counts as provenance. It does not clear a clip that has contradicting evidence, an
// unreviewed rights review (people, branding, endorsement), a known-wrong source URL, or no licence URL.
import { readFileSync } from "node:fs";

const slots = JSON.parse(readFileSync(new URL("../../media/videos.json", import.meta.url), "utf8"));
const assets = JSON.parse(readFileSync(new URL("../../src/lib/video-assets.json", import.meta.url), "utf8"));
const rows = [];
let errors = 0;
for (const [key, v] of Object.entries(slots)) {
  const problems = [];
  if (v.licenceVerified) {
    if (!v.provenance?.statement) problems.push("verified without a documented provenance");
    if (v.provenance?.contradictingEvidence?.length) problems.push("verified despite contradicting evidence");
    if (!v.licenceUrl) problems.push("verified without a licence URL");
    if (v.rightsReview?.status !== "cleared") problems.push("verified without a cleared people/branding review");
    if (/^mismatch/.test(v.sourceUrlStatus ?? "")) problems.push("verified with a source URL known to be wrong");
    if (v.page !== null && !/^https:\/\/www\.pexels\.com\/video\//.test(v.page)) problems.push("verified with a malformed source URL");
  }
  if (v.excluded && v.licenceVerified) problems.push("an excluded clip is marked verified");
  errors += problems.length;
  const built = Boolean(assets[key]);
  rows.push({
    clip: key,
    file: v.file.split("_")[0].split("-")[0],
    used: v.excluded ? "excluded" : built ? "used" : "not built",
    provenance: v.provenance ? v.provenance.basis : "none",
    source: v.page ?? "unknown",
    sourceStatus: (v.sourceUrlStatus ?? "unchecked").slice(0, 28),
    rights: v.rightsReview?.status ?? "none",
    cleared: v.licenceVerified ? "YES" : "no",
    problems: problems.join("; "),
  });
}
console.table(rows.map((r) => ({ ...r, problems: undefined })));
const used = rows.filter((r) => r.used === "used");
const blocked = used.filter((r) => r.cleared !== "YES");
console.log(`${used.length} clips used; ${used.length - blocked.length} cleared; ${blocked.length} not cleared${blocked.length ? ": " + blocked.map((r) => r.clip).join(", ") : ""}`);
for (const r of rows.filter((x) => x.problems)) console.log(`ERROR ${r.clip}: ${r.problems}`);
console.log(errors ? `\n${errors} manifest error(s)` : "\nManifest consistent");
process.exit(errors ? 1 : 0);
