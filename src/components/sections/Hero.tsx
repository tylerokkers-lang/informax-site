import VideoHero from "@/components/sections/VideoHero";

/**
 * Homepage hero. This is the permanent Earth/global-network film — the
 * intended visual identity for `/`, not a placeholder. Swap it only by
 * replacing these three files in /public with new ones of the same name.
 * This is fully independent of the hospitality page's hero (see
 * HospitalityHero.tsx) — no shared constant, so one can never overwrite
 * the other.
 */
const HERO_VIDEO_MP4 = "/hero-video.mp4";
const HERO_VIDEO_WEBM = "/hero-video.webm";
const HERO_POSTER = "/hero-poster.jpg";

export default function Hero() {
  return (
    <VideoHero
      videoMp4={HERO_VIDEO_MP4}
      videoWebm={HERO_VIDEO_WEBM}
      poster={HERO_POSTER}
      eyebrow="Digital Guest Information"
      headline="Every answer a guest needs, one tap away."
      description="Informax turns everything your property offers into a single, beautifully designed guest directory. No app, no download, nothing for your team to manage by hand."
      primaryLabel="Start a project"
      primaryHref="/enquire"
      secondaryLabel="See how it works"
      secondaryHref="/hospitality"
    />
  );
}
