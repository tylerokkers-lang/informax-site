import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
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
  title: "Digital Guest Directories for Hotels",
  description:
    "Informax gives hotels a tap-to-access digital guest directory — dining, spa, facilities, local recommendations and offers, all in one beautifully branded experience. No app required.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemJourney />
      <MeetInformax />
      <DigitalDirectory />
      <Customise />
      <Verticals />
      <Touchpoints />
      <GuestJourney />
      <Locations />
      <NoApp />
      <Showcase />
      <FinalCta />
    </>
  );
}
