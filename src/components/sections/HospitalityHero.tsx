import VideoHero from "@/components/sections/VideoHero";

/**
 * Hospitality page hero. This film is entirely independent of the
 * homepage's Earth/global-network hero (see Hero.tsx) — different files,
 * different component instance, no shared constant. Swap it only by
 * replacing these three files in /public with new ones of the same name;
 * doing so has no effect on the homepage hero.
 */
const HOSPITALITY_VIDEO_MP4 = "/hospitality-hero-video.mp4";
const HOSPITALITY_VIDEO_WEBM = "/hospitality-hero-video.webm";
const HOSPITALITY_POSTER = "/hospitality-hero-poster.jpg";

export default function HospitalityHero() {
  return (
    <VideoHero
      videoMp4={HOSPITALITY_VIDEO_MP4}
      videoWebm={HOSPITALITY_VIDEO_WEBM}
      poster={HOSPITALITY_POSTER}
      eyebrow="Informax — Hospitality"
      headline="The digital guest experience for modern hospitality."
      description="Digital guest directories that put everything your hotel, resort or venue offers directly in front of guests, the moment they arrive."
      primaryLabel="Start a project"
      primaryHref="/enquire"
      secondaryLabel="See a guest directory"
      secondaryHref="#guest-directory"
    />
  );
}
