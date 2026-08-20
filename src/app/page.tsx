import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ProblemStory from "@/components/sections/ProblemStory";
import ServicesOverview from "@/components/sections/ServicesOverview";
import HospitalityTeaser from "@/components/sections/HospitalityTeaser";
import ExamplesTeaser from "@/components/sections/ExamplesTeaser";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Website Design, Digital Brochures & Digital Directories",
  description:
    "Informax designs and builds custom websites, digital brochures, digital directories and bespoke digital experiences for businesses, plus a specialist hospitality practice. Websites from £1,200.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemStory />
      <ServicesOverview />
      <HospitalityTeaser />
      <ExamplesTeaser />
      <FinalCta />
    </>
  );
}
