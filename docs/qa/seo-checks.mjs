// Search and social sharing: every page in the sitemap has the metadata search engines and link previews need.
//   BASE=http://localhost:3200 node docs/qa/seo-checks.mjs
// Plain HTTP (no browser): metadata must be in the server-rendered HTML.
const BASE = process.env.BASE ?? "http://localhost:3200";
const SITE = "https://informax.co.uk";
let failures = 0;
const ok = (cond, msg) => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${msg}`);
  if (!cond) failures++;
};
const local = (u) => u.replace(/^https:\/\/(www\.)?informax\.co\.uk/, BASE);
const meta = (html, attr, name) => {
  const tag = html.match(new RegExp(`<meta[^>]+${attr}="${name}"[^>]*>`, "i"))?.[0];
  return tag ? tag.match(/content="([^"]*)"/i)?.[1]?.replace(/&amp;/g, "&") : undefined;
};
const decode = (s) => s?.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');

// robots.txt and sitemap
const robots = await (await fetch(`${BASE}/robots.txt`)).text();
ok(/Sitemap:\s*https:\/\/informax\.co\.uk\/sitemap\.xml/i.test(robots), "robots.txt points to the sitemap");
ok(!/Disallow:\s*\/\s*$/m.test(robots), "robots.txt does not block the whole site");
const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
ok(urls.length >= 8, `sitemap lists ${urls.length} pages`);

const titles = new Map();
const images = new Set();
for (const url of urls) {
  const path = url.replace(SITE, "") || "/";
  const res = await fetch(local(url), { redirect: "manual" });
  ok(res.status === 200, `${path}: 200 (got ${res.status})`);
  if (res.status !== 200) continue;
  const html = await res.text();
  const title = decode(html.match(/<title>([^<]*)<\/title>/i)?.[1]);
  const description = decode(meta(html, "name", "description"));
  const canonical = html.match(/<link[^>]+rel="canonical"[^>]*href="([^"]+)"/i)?.[1];
  const og = Object.fromEntries(["og:title", "og:description", "og:image", "og:url", "og:type", "og:site_name", "og:locale"].map((k) => [k, meta(html, "property", k)]));
  const tw = Object.fromEntries(["twitter:card", "twitter:image", "twitter:title"].map((k) => [k, meta(html, "name", k)]));
  ok(Boolean(title) && title.length <= 70, `${path}: title "${title}" (${title?.length} chars, at most 70)`);
  if (title) titles.set(title, [...(titles.get(title) ?? []), path]);
  ok(Boolean(description) && description.length >= 50 && description.length <= 170, `${path}: description ${description?.length ?? 0} chars (50 to 170)`);
  ok(canonical === url || canonical === url.replace(/\/$/, ""), `${path}: canonical ${canonical}`);
  ok(/<html[^>]+lang="en-GB"/i.test(html), `${path}: html lang en-GB`);
  ok((html.match(/<h1[\s>]/gi) ?? []).length === 1, `${path}: exactly one h1`);
  ok(!/<meta[^>]+name="robots"[^>]+noindex/i.test(html), `${path}: not marked noindex`);
  ok(Boolean(og["og:title"] && og["og:description"] && og["og:image"] && og["og:type"] && og["og:site_name"]), `${path}: Open Graph title, description, image, type and site name`);
  ok(og["og:locale"] === "en_GB", `${path}: og:locale en_GB (got ${og["og:locale"]})`);
  ok(tw["twitter:card"] === "summary_large_image" && Boolean(tw["twitter:image"]), `${path}: Twitter large-image card`);
  ok(/^https:\/\/informax\.co\.uk\//.test(og["og:image"] ?? ""), `${path}: og:image is an absolute informax.co.uk URL`);
  if (og["og:image"]) images.add(og["og:image"]);
  if (tw["twitter:image"]) images.add(tw["twitter:image"]);
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  for (const m of ld) {
    let parsed = true;
    try {
      JSON.parse(m[1]);
    } catch {
      parsed = false;
    }
    ok(parsed, `${path}: structured data is valid JSON`);
  }
}
for (const [title, paths] of titles) ok(paths.length === 1, `title is unique: "${title}"${paths.length > 1 ? " on " + paths.join(", ") : ""}`);

// Every share image loads and has the 1200x630 Open Graph size.
for (const img of images) {
  const res = await fetch(local(img));
  const buf = Buffer.from(await res.arrayBuffer());
  let size = "";
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    for (let i = 2; i < buf.length - 8; ) {
      if (buf[i] !== 0xff) break;
      const marker = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xc2) {
        size = `${buf.readUInt16BE(i + 7)}x${buf.readUInt16BE(i + 5)}`;
        break;
      }
      i += 2 + len;
    }
  } else if (buf.subarray(1, 4).toString() === "PNG") size = `${buf.readUInt32BE(16)}x${buf.readUInt32BE(20)}`;
  ok(res.status === 200 && /^image\//.test(res.headers.get("content-type") ?? "") && size === "1200x630", `share image ${img.replace(SITE, "")}: ${res.status} ${res.headers.get("content-type")} ${size}`);
}

console.log(failures ? `\n${failures} FAILED` : "\nALL PASSED");
process.exit(failures ? 1 : 0);
