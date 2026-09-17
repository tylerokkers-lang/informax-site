import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Statement from "@/components/sections/Statement";
import GuestJourneyStrip from "@/components/sections/GuestJourneyStrip";
import HowItWorks from "@/components/sections/HowItWorks";
import AccessIndex from "@/components/sections/AccessIndex";
import HotelBenefit from "@/components/sections/HotelBenefit";
import Showcase from "@/components/sections/Showcase";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Digital Guest Directories for Hotels & Hospitality",
  description:
    "Informax designs digital guest directories for hotels and hospitality businesses. Guests get instant, app-free access to everything a property offers; hotels control it from one place.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <GuestJourneyStrip />
      <HowItWorks />
      <AccessIndex />
      <HotelBenefit />
      <Showcase />
      <FinalCta
        title={<>Give your guests the full picture.</>}
        primaryLabel="Start a project"
      />
    </>
  );
}
