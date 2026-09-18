import VideoHero from "@/components/sections/VideoHero";

/**
 * Websites page hero. Entirely independent of the homepage's Earth hero,
 * the hospitality hero and the Digital Information hero — different
 * constants, different files, cannot overwrite one another. Swap it only
 * by replacing these three files in /public with new ones of the same
 * name.
 */
const WEBSITE_VIDEO_MP4 = "/website-hero-video.mp4";
const WEBSITE_VIDEO_WEBM = "/website-hero-video.webm";
const WEBSITE_POSTER = "/website-hero-poster.jpg";

export default function WebsitesHero() {
  return (
    <VideoHero
      videoMp4={WEBSITE_VIDEO_MP4}
      videoWebm={WEBSITE_VIDEO_WEBM}
      poster={WEBSITE_POSTER}
      eyebrow="Informax — Websites"
      headline="A website that actually looks like it's yours."
      description="Custom-designed and built around your business, not a generic template. Part of the same studio behind your guest directory."
      primaryLabel="Start a project"
      primaryHref="/enquire"
      secondaryLabel="See how we work"
      secondaryHref="#how-we-work"
    />
  );
}
