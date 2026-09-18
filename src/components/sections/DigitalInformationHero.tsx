import VideoHero from "@/components/sections/VideoHero";

/**
 * Digital Information page hero. Entirely independent of the homepage's
 * Earth/global-network hero (Hero.tsx) and the hospitality hero
 * (HospitalityHero.tsx) — different files, different component instance,
 * no shared constant. Swap it only by replacing these three files in
 * /public with new ones of the same name; doing so has no effect on the
 * other two heroes.
 */
const DIGITAL_INFO_VIDEO_MP4 = "/digital-information-hero-video.mp4";
const DIGITAL_INFO_VIDEO_WEBM = "/digital-information-hero-video.webm";
const DIGITAL_INFO_POSTER = "/digital-information-hero-poster.jpg";

export default function DigitalInformationHero() {
  return (
    <VideoHero
      videoMp4={DIGITAL_INFO_VIDEO_MP4}
      videoWebm={DIGITAL_INFO_VIDEO_WEBM}
      poster={DIGITAL_INFO_POSTER}
      eyebrow="Informax — Digital Information"
      headline="Documents your guests actually want to open."
      description="Brochures, pamphlets and directories, designed to be scanned, opened and explored in seconds, not downloaded and forgotten."
      primaryLabel="Start a project"
      primaryHref="/enquire"
      secondaryLabel="See how it works"
      secondaryHref="#flow"
    />
  );
}
