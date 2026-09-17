import { Nfc } from "lucide-react";
import { Reveal } from "@/components/Reveal";

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
      <div className="mx-auto grid max-w-8xl grid-cols-1 gap-16 px-6 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <Reveal>
          <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-mute">
            Fully Customisable
          </span>
          <h2 className="mb-6 font-serif-display font-medium leading-[1.16] tracking-[-0.01em] text-[clamp(28px,3.6vw,42px)] text-ink">
            Your hotel. Your information.{" "}
            <span className="italic text-brass-deep">Your experience.</span>
          </h2>
          <p className="mb-8 max-w-[440px] text-[16.5px] leading-relaxed text-ink-mute">
            Every Informax directory is designed around your property, not
            forced into a template. From the branding down to the smallest
            offer, it&rsquo;s built to feel like a natural extension of your
            hotel.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-7">
            {CUSTOMISABLE.map((tag) => (
              <li key={tag} className="text-[14.5px] font-medium text-ink-soft">
                {tag}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="border-t border-line pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-16">
          <span className="mb-5 block text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-mute">
            The Physical Tag Stays Put
          </span>
          <h3 className="mb-5 font-serif-display text-2xl font-medium leading-[1.3] text-ink md:text-[26px]">
            Update the digital experience without replacing the physical
            tag.
          </h3>
          <p className="mb-6 max-w-[440px] text-[15.5px] leading-relaxed text-ink-mute">
            Change opening hours, swap a recommendation, launch a new offer,
            or refresh the branding entirely. The tag on the wall never
            changes, but what appears behind it always can.
          </p>
          <div className="flex items-center gap-2.5 text-[14px] font-semibold text-ink">
            <Nfc size={16} className="text-brass-deep" />
            One tag. Infinite updates.
          </div>
        </Reveal>
      </div>
    </section>
  );
}
