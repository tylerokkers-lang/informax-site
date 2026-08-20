import type { Metadata } from "next";
import { Nfc, QrCode } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { BtnGhost, BtnPrimary, Eyebrow, EmLight } from "@/components/ui";
import ProblemJourney from "@/components/sections/ProblemJourney";
import MeetInformax from "@/components/sections/MeetInformax";
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
      <section className="relative overflow-hidden bg-charcoal-950 text-cream pt-[150px] pb-20 md:pt-[170px] md:pb-24">
        <div className="absolute inset-0 bg-grid-fade-dark pointer-events-none" />
        <div className="relative mx-auto max-w-8xl px-6 md:px-8">
          <Reveal className="max-w-2xl">
            <Eyebrow tone="dark">Our Hospitality Practice</Eyebrow>
            <h1 className="font-serif-display font-medium text-[clamp(32px,4.6vw,52px)] leading-[1.15] text-white mb-6">
              Digital experiences for <EmLight>hospitality.</EmLight>
            </h1>
            <p className="text-cream-mute text-[17px] leading-relaxed max-w-xl mb-9">
              Hospitality is where Informax started, and it remains one of
              our specialisms today. We design digital guest directories and
              hospitality websites that help hotels, resorts and venues put
              everything they offer directly in front of guests.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <BtnPrimary href="/enquire">Start a Project</BtnPrimary>
              <BtnGhost href="#guest-directory" tone="dark">
                See a Guest Directory
              </BtnGhost>
            </div>
          </Reveal>
        </div>
      </section>

      <ProblemJourney />

      <div id="guest-directory">
        <MeetInformax />
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
        title={<>Give guests the <EmLight>full picture.</EmLight></>}
        description="Tell us about your property, and we'll help design a digital guest directory, or a hospitality website, that puts everything you offer one tap away."
        primaryLabel="Start a Project"
        primaryHref="/enquire"
        secondaryLabel="See Our Pricing"
        secondaryHref="/pricing"
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
