import type { Metadata } from "next";
import { Nfc, QrCode } from "lucide-react";
import HospitalityHero from "@/components/sections/HospitalityHero";
import ProblemJourney from "@/components/sections/ProblemJourney";
import HowItWorks from "@/components/sections/HowItWorks";
import DigitalDirectory from "@/components/sections/DigitalDirectory";
import Customise from "@/components/sections/Customise";
import Verticals from "@/components/sections/Verticals";
import Touchpoints from "@/components/sections/Touchpoints";
import GuestJourney from "@/components/sections/GuestJourney";
import Locations from "@/components/sections/Locations";
import NoApp from "@/components/sections/NoApp";
import Showcase from "@/components/sections/Showcase";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Hospitality: Digital Guest Directories & Hospitality Websites",
  description:
    "Informax's hospitality practice: digital guest directories accessed by NFC tap or QR scan, and hospitality websites, helping hotels, resorts and venues showcase dining, spa, facilities and offers.",
  alternates: { canonical: "/hospitality" },
};

export default function HospitalityPage() {
  return (
    <>
      <HospitalityHero />

      <ProblemJourney />

      <div id="guest-directory">
        <HowItWorks />
      </div>
      <DigitalDirectory />
      <Customise />
      <Verticals />
      <Touchpoints />
      <GuestJourney />
      <Locations />

      <section className="bg-panel border-y border-line py-16 md:py-20">
        <div className="mx-auto max-w-8xl px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="flex items-center gap-4">
            <Nfc size={22} className="text-brass-deep shrink-0" />
            <QrCode size={22} className="text-brass-deep shrink-0" />
            <p className="text-ink-soft text-[15px] leading-relaxed">
              A physical tag stays on the wall or in the room. Guests tap or
              scan it and the directory opens instantly, with no app
              required.
            </p>
          </div>
          <p className="text-ink-mute text-[15px] leading-relaxed">
            Beyond directories, we also design and build full hospitality
            websites. See our{" "}
            <a href="/websites" className="text-brass-deep underline underline-offset-2">
              website service
            </a>{" "}
            for details.
          </p>
        </div>
      </section>

      <NoApp />
      <Showcase />

      <FinalCta
        eyebrow="Ready When You Are"
        title={<>Give guests the full picture.</>}
        description="Tell us about your property, and we'll help design a digital guest directory, or a hospitality website, that puts everything you offer one tap away."
        primaryLabel="Start a Project"
        primaryHref="/enquire"
        secondaryLabel="Explore Our Services"
        secondaryHref="/services"
        meta={[
          {
            title: "Built around your property",
            desc: "Every directory is designed for your brand, not a shared template.",
          },
          {
            title: "The tag stays, content evolves",
            desc: "Update hours, offers and recommendations without new hardware.",
          },
          {
            title: "Websites too",
            desc: "Guest directories and hospitality websites, from the same studio.",
          },
        ]}
      />
    </>
  );
}
