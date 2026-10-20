// Generates the fictional demo documents used in the marketing captures.
// The Copper Table (restaurant) and Marlowe Grand Hotel are Informax Cloud's own fictional demo businesses.
// Usage (from an informax-cloud-v2 checkout, which provides playwright-core):
//   FONTS_DIR=<dir with @fontsource/cormorant-garamond and @fontsource/inter> OUT_DIR=./pdfs node make-pdfs.mjs
// Fonts: npm i @fontsource/cormorant-garamond @fontsource/inter (SIL Open Font Licence).
import { chromium } from "playwright-core";
import { mkdirSync, writeFileSync } from "node:fs";

const F = `${process.env.FONTS_DIR ?? "./node_modules"}/@fontsource`;
const OUT = process.env.OUT_DIR ?? "./pdfs";
const CHROMIUM = process.env.CHROMIUM ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
mkdirSync(OUT, { recursive: true });

const fonts = `
@font-face{font-family:Cormorant;font-weight:500;src:url(file://${F}/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2)}
@font-face{font-family:Cormorant;font-weight:600;src:url(file://${F}/cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff2)}
@font-face{font-family:Cormorant;font-weight:400;src:url(file://${F}/cormorant-garamond/files/cormorant-garamond-latin-400-normal.woff2)}
@font-face{font-family:Inter;font-weight:400;src:url(file://${F}/inter/files/inter-latin-400-normal.woff2)}
@font-face{font-family:Inter;font-weight:500;src:url(file://${F}/inter/files/inter-latin-500-normal.woff2)}
@font-face{font-family:Inter;font-weight:600;src:url(file://${F}/inter/files/inter-latin-600-normal.woff2)}
`;

const base = (bg, ink, accent) => `
${fonts}
@page{size:120mm 240mm;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:${bg};color:${ink}}
body{font-family:Inter;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{width:120mm;height:240mm;padding:16mm 11mm 12mm;display:flex;flex-direction:column;page-break-after:always;overflow:hidden;position:relative}
.brand{font-family:Cormorant;font-weight:600;font-size:25pt;letter-spacing:.02em;text-align:center;line-height:1}
.sub{font-size:6.4pt;letter-spacing:.32em;text-transform:uppercase;text-align:center;margin-top:3mm;color:${accent}}
.rule{height:.3mm;background:${accent};opacity:.5;width:14mm;margin:6mm auto}
h2{font-family:Cormorant;font-weight:500;font-size:15pt;text-align:center;letter-spacing:.04em;margin:5mm 0 3.5mm}
.item{margin:0 0 4.2mm}
.row{display:flex;justify-content:space-between;align-items:baseline;gap:4mm}
.name{font-family:Cormorant;font-weight:600;font-size:12.4pt;line-height:1.1}
.price{font-size:8pt;font-weight:500;color:${accent}}
.desc{font-size:7pt;line-height:1.45;opacity:.72;margin-top:.8mm;max-width:82mm}
.foot{margin-top:auto;font-size:6pt;letter-spacing:.06em;text-align:center;opacity:.55;line-height:1.6}
.tag{display:inline-block;font-size:5.6pt;letter-spacing:.2em;text-transform:uppercase;border:.25mm solid ${accent};color:${accent};padding:.6mm 1.6mm;border-radius:4mm;margin-left:2mm;vertical-align:middle;font-family:Inter;font-weight:600}
.hours{display:flex;justify-content:space-between;font-size:8pt;padding:2.2mm 0;border-bottom:.2mm solid rgba(0,0,0,.08)}
.hours b{font-weight:500}
.p{font-size:7.6pt;line-height:1.6;opacity:.8;text-align:center;max-width:86mm;margin:0 auto}
`;

const dish = (name, desc, price, tag = "") =>
  `<div class="item"><div class="row"><span class="name">${name}${tag ? `<span class="tag">${tag}</span>` : ""}</span><span class="price">${price}</span></div><div class="desc">${desc}</div></div>`;

function menu(updated) {
  const css = base("#f6f1e8", "#1d1a16", "#8a5a2b");
  const main = updated
    ? dish("Roast Cornish hake", "Mussels, saffron and fennel broth, charred leeks, sea herbs", "£27", "Tonight")
    : dish("Line-caught sea bass", "Brown shrimp butter, crushed Jersey Royals, samphire", "£29");
  return `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>
  <section class="page">
    <div class="brand">The Copper Table</div><div class="sub">Dinner · Autumn</div><div class="rule"></div>
    <h2>To begin</h2>
    ${dish("Heritage beetroot", "Whipped goat’s curd, toasted hazelnut, blood orange", "£11")}
    ${dish("Orkney scallop", "Cauliflower, golden raisin, curry oil", "£16")}
    ${dish("Ham hock terrine", "Piccalilli, pickled shallot, sourdough", "£12")}
    <h2>Mains</h2>
    ${main}
    ${dish("Aged sirloin of beef", "Bone marrow, triple-cooked chips, watercress, peppercorn sauce", "£34")}
    ${dish("Wild mushroom risotto", "Aged Parmesan, truffle, crispy sage", "£21")}
    ${dish("Free-range chicken", "Hispi cabbage, smoked bacon, tarragon jus", "£25")}
    <h2>To finish</h2>
    ${dish("Dark chocolate delice", "Salted caramel, crème fraîche", "£10")}
    ${dish("Bramley apple tart", "Calvados ice cream", "£9")}
    <div class="foot">Please tell your server about any allergies.<br/>A discretionary service charge of 12.5% is added to your bill.</div>
  </section></body></html>`;
}

function directory(updated) {
  const css = base("#0f1a2b", "#eef2f7", "#c8a96a") + `.hours{border-color:rgba(255,255,255,.1)} .card{border:.25mm solid rgba(200,169,106,.45);border-radius:3mm;padding:4mm;margin-top:4mm}`;
  const dinner = updated ? "17:30 – 22:30" : "18:00 – 22:00";
  return `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>
  <section class="page">
    <div class="brand">Marlowe Grand</div><div class="sub">Guest Directory</div><div class="rule"></div>
    <p class="p">Welcome. Everything you need for your stay is here, and it is always up to date.</p>
    <h2>The Garden Room</h2>
    <div class="hours"><span>Breakfast</span><b>07:00 – 10:30</b></div>
    <div class="hours"><span>Lunch</span><b>12:00 – 14:30</b></div>
    <div class="hours"><span>Dinner${updated ? '<span class="tag">New hours</span>' : ""}</span><b>${dinner}</b></div>
    <h2>In-room dining</h2>
    <div class="hours"><span>All-day menu</span><b>11:00 – 23:00</b></div>
    <div class="hours"><span>Night menu</span><b>23:00 – 06:30</b></div>
    <p class="p" style="margin-top:3mm">Dial 3 from your room telephone.</p>
    <h2>The Spa</h2>
    <div class="hours"><span>Treatments</span><b>09:00 – 20:00</b></div>
    <div class="hours"><span>Pool &amp; thermal suite</span><b>07:00 – 21:00</b></div>
    <div class="card">
      <div class="name" style="text-align:center">Make your stay even more memorable</div>
      <p class="p" style="margin-top:2mm">Ask about upgrading to one of our suites. Reception will check what is available for your dates. Dial 0.</p>
    </div>
    <div class="foot">Reception is open 24 hours · Dial 0<br/>Check-out is at 11:00</div>
  </section></body></html>`;
}

function spa(offer) {
  const css = base("#eef0ec", "#1e2a24", "#5d7a68");
  if (offer) {
    return `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>
    <section class="page">
      <div class="brand">The Spa</div><div class="sub">At Marlowe Grand</div><div class="rule"></div>
      <h2 style="font-size:19pt;margin-top:3mm">This afternoon</h2>
      <p class="p">We have a little more time this afternoon. Treat yourself before dinner.</p>
      <div style="margin:7mm 0 2mm;padding:6mm 5mm;border-radius:4mm;background:#1e2a24;color:#eef0ec;text-align:center">
        <div class="sub" style="color:#b9cdbf;margin:0">Today only · 14:00 – 18:00</div>
        <div class="name" style="font-size:17pt;margin-top:3mm">Signature massage</div>
        <div class="desc" style="margin:2mm auto 0;opacity:.8">Sixty minutes, warm oils, full body</div>
        <div style="font-family:Cormorant;font-size:20pt;margin-top:4mm">£95 <span style="font-size:11pt;opacity:.6;text-decoration:line-through">£120</span></div>
      </div>
      <p class="p" style="margin-top:4mm">To book, dial 5 from your room or visit the spa reception on the lower ground floor.</p>
      <h2>Also available</h2>
      ${dish("Radiance facial", "Fifty minutes", "£105")}
      ${dish("Hot stone ritual", "Seventy-five minutes", "£140")}
      <div class="foot">Subject to availability. Offer ends at 18:00 today.</div>
    </section></body></html>`;
  }
  return `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>
  <section class="page">
    <div class="brand">The Spa</div><div class="sub">At Marlowe Grand</div><div class="rule"></div>
    <p class="p">A calm space on the lower ground floor. Open to hotel guests every day.</p>
    <h2>Massage</h2>
    ${dish("Signature massage", "Sixty minutes, warm oils, full body", "£120")}
    ${dish("Deep tissue", "Sixty minutes, focused pressure", "£125")}
    ${dish("Hot stone ritual", "Seventy-five minutes", "£140")}
    <h2>Face</h2>
    ${dish("Radiance facial", "Fifty minutes", "£105")}
    ${dish("Gentleman’s facial", "Forty minutes", "£85")}
    <h2>Opening hours</h2>
    <div class="hours"><span>Treatments</span><b>09:00 – 20:00</b></div>
    <div class="hours"><span>Pool &amp; thermal suite</span><b>07:00 – 21:00</b></div>
    <div class="foot">To book, dial 5 from your room.</div>
  </section></body></html>`;
}

const docs = {
  "Dinner menu.pdf": menu(false),
  "Dinner menu (hake tonight).pdf": menu(true),
  "Guest Directory.pdf": directory(false),
  "Guest Directory (new dinner hours).pdf": directory(true),
  "Spa treatments.pdf": spa(false),
  "Spa this afternoon.pdf": spa(true),
};

const browser = await chromium.launch({ executablePath: CHROMIUM, args: ["--allow-file-access-from-files"] });
const page = await browser.newPage();
for (const [name, html] of Object.entries(docs)) {
  writeFileSync(`${OUT}/tmp.html`, html);
  await page.goto(`file://${OUT}/tmp.html`, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: `${OUT}/${name}`, width: "120mm", height: "240mm", printBackground: true });
  console.log("wrote", name);
}
await browser.close();
