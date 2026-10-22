#!/usr/bin/env node
// Optimises the supplied stock videos for the web. Run from the repo root:
//
//   npm run media:build                 # every slot whose source is in media/source/
//   npm run media:build -- chef spa     # only these slots
//   npm run media:review                # contact sheets in media/review/ (to judge content and framing)
//
// Needs ffmpeg and ffprobe 6+ with libx264 and libvpx-vp9 on the PATH.
// Reads media/videos.json; writes public/video/stock/<slot>/ and src/lib/video-assets.json.
// The outputs are committed; the 4K sources in media/source/ are not (see .gitignore).
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "media/source");
const OUT = join(ROOT, "public/video/stock");
const REVIEW = join(ROOT, "media/review");
const MANIFEST = join(ROOT, "media/videos.json");
const ASSETS = join(ROOT, "src/lib/video-assets.json");

const args = process.argv.slice(2);
const review = args.includes("--review");
const only = args.filter((a) => !a.startsWith("--"));
const slots = JSON.parse(readFileSync(MANIFEST, "utf8"));
const assets = existsSync(ASSETS) ? JSON.parse(readFileSync(ASSETS, "utf8")) : {};

const DESKTOP_WIDTH = 1920; // 16:9 at most 1920x1080
const MOBILE = { width: 720, height: 960 }; // 3:4 portrait crop for phones
const FADE = 1; // seconds of crossfade from the end of the loop into its start

function run(cmd, argv) {
  const r = spawnSync(cmd, argv, { encoding: "utf8", maxBuffer: 1 << 26 });
  if (r.status !== 0) throw new Error(`${cmd} failed:\n${(r.stderr || "").split("\n").slice(-15).join("\n")}`);
  return r.stdout;
}
const ffmpeg = (argv) => run("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...argv]);

function probe(file) {
  const j = JSON.parse(run("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height,r_frame_rate:format=duration", "-of", "json", file]));
  const s = j.streams[0];
  const [n, d] = s.r_frame_rate.split("/").map(Number);
  return { width: s.width, height: s.height, fps: n / (d || 1), duration: Number(j.format.duration) };
}

/** "50% 40%" -> [0.5, 0.4] */
const focusOf = (f) => (f || "50% 50%").split(/\s+/).map((v) => Math.min(1, Math.max(0, parseFloat(v) / 100)));

/**
 * The film's filter graph, by `mode` in media/videos.json:
 * - "loop" (default): a seamless loop of `duration` seconds. Take duration+FADE seconds, play from FADE to the end,
 *   and crossfade the last FADE seconds into the first FADE seconds, so the last frame flows into the first.
 * - "pingpong": `duration` seconds forward, then the same in reverse (end frames not repeated). Seamless for slow
 *   camera moves over a still scene, where a crossfade would ghost.
 * - "once": `duration` seconds, played once; the page holds the last frame.
 */
function filmFilter(mode, start, duration, fps, tail) {
  const take = `[0:v]trim=start=${start}:duration=${mode === "loop" ? duration + FADE : duration},setpts=PTS-STARTPTS,fps=${fps}`;
  if (mode === "once") return `${take},${tail}[v]`;
  if (mode === "pingpong") {
    const n = Math.round(duration * fps);
    return `${take},${tail},split[a][b];[b]reverse,trim=start_frame=1:end_frame=${n - 1},setpts=PTS-STARTPTS[r];[a][r]concat=n=2:v=1:a=0[v]`;
  }
  return (
    `${take},split[a][b];` +
    `[a]trim=start=${FADE},setpts=PTS-STARTPTS[body];` +
    `[b]trim=duration=${FADE},setpts=PTS-STARTPTS[head];` +
    `[body][head]xfade=transition=fade:duration=${FADE}:offset=${duration - FADE},${tail}[v]`
  );
}

const size = (f) => statSync(f).size;
const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

let built = 0;
for (const [key, slot] of Object.entries(slots)) {
  if (only.length && !only.includes(key)) continue;
  const src = join(SRC, slot.file);
  if (!existsSync(src)) {
    console.log(`- ${key}: source not found (media/source/${slot.file})`);
    continue;
  }
  const info = probe(src);
  const fps = Math.min(30, Math.round(info.fps));
  const mode = slot.mode || "loop";
  const need = mode === "loop" ? slot.duration + FADE : slot.duration;
  const start = Math.max(0, Math.min(slot.start, info.duration - need));
  if (review) {
    mkdirSync(REVIEW, { recursive: true });
    const step = info.duration / 12;
    ffmpeg(["-i", src, "-vf", `${slot.region ? `crop=iw*${slot.region.split(/\s+/)[2]}:ih*${slot.region.split(/\s+/)[3]}:iw*${slot.region.split(/\s+/)[0]}:ih*${slot.region.split(/\s+/)[1]},` : ""}fps=1/${step.toFixed(3)},scale=480:-2,tile=4x3:padding=4:color=white`, "-frames:v", "1", join(REVIEW, `${key}.jpg`)]);
    console.log(`review ${key}: ${info.width}x${info.height} ${info.fps.toFixed(2)}fps ${info.duration.toFixed(1)}s -> media/review/${key}.jpg`);
    continue;
  }
  if (info.duration < need) throw new Error(`${key}: source is ${info.duration.toFixed(2)}s, "${mode}" needs ${need}s (lower "duration")`);
  if (slot.excluded) {
    console.log(`- ${key}: excluded (${slot.excluded.slice(0, 60)}...)`);
    continue;
  }

  const dir = join(OUT, key);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });

  // Optional `region` ("x y w h", fractions of the source): cut away part of the frame first, e.g. third-party
  // branding at one edge. Both the desktop and phone versions are taken from inside it.
  const region = slot.region ? slot.region.split(/\s+/).map(Number) : null;
  const pre = region ? `crop=iw*${region[2]}:ih*${region[3]}:iw*${region[0]}:ih*${region[1]},` : "";
  // Desktop: 16:9 crop around the focus point if needed, then at most 1920 wide.
  const [fx, fy] = focusOf(slot.focus);
  const cw = `min(iw\\,ih*16/9)`;
  const ch = `min(ih\\,iw*9/16)`;
  const desk = `${pre}crop=${cw}:${ch}:(iw-${cw})*${fx}:(ih-${ch})*${fy},scale='min(${DESKTOP_WIDTH},iw)':-2:flags=lanczos,format=yuv420p`;
  // Phone: 3:4 portrait crop around the (mobile) focus point.
  const [mx, my] = focusOf(slot.focusMobile || slot.focus);
  const mw = `min(iw\\,ih*3/4)`;
  const mh = `min(ih\\,iw*4/3)`;
  const mob = `${pre}crop=${mw}:${mh}:(iw-${mw})*${mx}:(ih-${mh})*${my},scale=${MOBILE.width}:${MOBILE.height}:flags=lanczos,format=yuv420p`;

  const outs = {
    mp4: join(dir, `${key}-1080.mp4`),
    webm: join(dir, `${key}-1080.webm`),
    mp4Mobile: join(dir, `${key}-m720.mp4`),
    webmMobile: join(dir, `${key}-m720.webm`),
    poster: join(dir, `${key}-poster.jpg`),
    posterMobile: join(dir, `${key}-poster-m.jpg`),
    // A film that plays once ends on its strongest frame: stills elsewhere on the site use that.
    ...(mode === "once" ? { still: join(dir, `${key}-still.jpg`) } : {}),
  };
  // Level pinned (4.1 for 1080p, 3.1 for the phone crop) so older iPhones and hardware decoders accept it; avc1 tag for Safari.
  const h264 = (crf, maxrate, level) => ["-an", "-c:v", "libx264", "-preset", "slow", "-profile:v", "high", "-level:v", level, "-tag:v", "avc1", "-crf", String(crf), "-maxrate", maxrate, "-bufsize", `${parseFloat(maxrate) * 2}M`, "-movflags", "+faststart", "-pix_fmt", "yuv420p"];
  // Constrained quality: CRF sets the quality, -b:v caps the bitrate so a busy clip cannot balloon.
  const vp9 = (crf, cap) => ["-an", "-c:v", "libvpx-vp9", "-crf", String(crf), "-b:v", cap, "-deadline", "good", "-cpu-used", "2", "-row-mt", "1", "-pix_fmt", "yuv420p"];

  ffmpeg(["-i", src, "-filter_complex", filmFilter(mode, start, slot.duration, fps, desk), "-map", "[v]", ...h264(24, "3M", "4.1"), outs.mp4]);
  ffmpeg(["-i", src, "-filter_complex", filmFilter(mode, start, slot.duration, fps, desk), "-map", "[v]", ...vp9(35, "2.5M"), outs.webm]);
  ffmpeg(["-i", src, "-filter_complex", filmFilter(mode, start, slot.duration, fps, mob), "-map", "[v]", ...h264(26, "1.2M", "3.1"), outs.mp4Mobile]);
  ffmpeg(["-i", src, "-filter_complex", filmFilter(mode, start, slot.duration, fps, mob), "-map", "[v]", ...vp9(37, "1M"), outs.webmMobile]);
  // Posters are the exact first frames, so the swap from poster to film never jumps.
  ffmpeg(["-i", outs.mp4, "-frames:v", "1", "-q:v", "3", outs.poster]);
  ffmpeg(["-i", outs.mp4Mobile, "-frames:v", "1", "-q:v", "3", outs.posterMobile]);
  if (outs.still) ffmpeg(["-sseof", "-0.2", "-i", outs.mp4, "-update", "1", "-q:v", "3", outs.still]);

  const d = probe(outs.mp4);
  const m = probe(outs.mp4Mobile);
  const pub = (f) => f.slice(join(ROOT, "public").length).split("\\").join("/");
  assets[key] = {
    mp4: pub(outs.mp4),
    webm: pub(outs.webm),
    mp4Mobile: pub(outs.mp4Mobile),
    webmMobile: pub(outs.webmMobile),
    poster: pub(outs.poster),
    posterMobile: pub(outs.posterMobile),
    ...(outs.still ? { still: pub(outs.still) } : {}),
    width: d.width,
    height: d.height,
    mobileWidth: m.width,
    mobileHeight: m.height,
    duration: Number(d.duration.toFixed(2)),
    loop: mode !== "once",
    bytes: Object.fromEntries(Object.entries(outs).map(([k, f]) => [k, size(f)])),
    source: { file: slot.file, width: info.width, height: info.height, fps: Number(info.fps.toFixed(2)), bytes: size(src) },
  };
  built++;
  const b = assets[key].bytes;
  console.log(
    `✓ ${key}: ${info.width}x${info.height} ${kb(size(src))} -> ${d.width}x${d.height} mp4 ${kb(b.mp4)}, webm ${kb(b.webm)}; phone ${m.width}x${m.height} mp4 ${kb(b.mp4Mobile)}, webm ${kb(b.webmMobile)}; posters ${kb(b.poster)} / ${kb(b.posterMobile)}`,
  );
}

if (!review) {
  // Drop entries whose files are gone (e.g. a slot was excluded later).
  for (const [k, a] of Object.entries(assets)) if (!slots[k] || slots[k].excluded || !existsSync(join(ROOT, "public", a.mp4))) delete assets[k];
  writeFileSync(ASSETS, JSON.stringify(assets, null, 2) + "\n");
  console.log(`\n${built} built; ${Object.keys(assets).length} slot(s) in src/lib/video-assets.json`);
}
