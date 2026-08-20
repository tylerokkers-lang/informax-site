import { Nfc } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Em } from "@/components/ui";

const CUSTOMISABLE = [
  "Branding",
  "Colours",
  "Typography",
  "Images",
  "Sections",
  "Content",
  "Services",
  "Menus",
  "Opening Hours",
  "Offers",
  "Guest Information",
  "Local Recommendations",
  "Booking Links",
];

export default function Customise() {
  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-8xl px-6 md:px-8 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-16 items-center">
        <Reveal>
          <Eyebrow>Fully Customisable</Eyebrow>
          <h2 className="font-serif-display font-medium leading-[1.16] tracking-tight text-[clamp(28px,3.6vw,42px)] text-ink mb-5">
            Your hotel.
            <br />
            Your information.
            <br />
            <Em>Your experience.</Em>
          </h2>
          <p className="text-ink-mute text-[16.5px] leading-relaxed max-w-[440px] mb-8">
            Every Informax directory is designed around your property, not
            forced into a template. From the branding down to the smallest
            offer, it&rsquo;s built to feel like a natural extension of your
            hotel.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {CUSTOMISABLE.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line bg-panel px-4 py-2.5 text-[13px] font-semibold text-ink-soft transition-colors duration-300 hover:border-brass hover:text-brass-deep"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-3xl bg-charcoal-950 p-10 md:p-12 text-white">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(111,224,172,0.18),transparent_60%)]" />
            <div className="relative text-xs font-bold uppercase tracking-[0.1em] text-brass-light mb-5">
              The Physical Tag Stays Put
            </div>
            <h3 className="relative font-serif-display font-medium text-2xl md:text-[26px] leading-[1.3] mb-5">
              Update the digital experience without replacing the physical
              tag.
            </h3>
            <p className="relative text-cream-mute text-[15px] leading-relaxed">
              Change opening hours, swap a recommendation, launch a new
              offer, or refresh the branding entirely — the tag on the wall
              never changes, but what appears behind it always can.
            </p>
            <div className="relative mt-6 inline-flex items-center gap-2 rounded-full border border-line-dark px-4 py-2.5 text-[12.5px] font-semibold text-cream">
              <Nfc size={14} className="text-brass-light" />
              One tag. Infinite updates.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
