import type { Metadata } from "next";
import { CloudIntroduction, IndustryChoices, DesignServices } from "@/components/site/CloudIntroduction";
import { Browser } from "@/components/site/Devices";
import { DemoCta, Heading, HowItWorksSteps, MoreLink } from "@/components/site/Sections";
import { PreviewNote } from "@/components/site/ComingSoon";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: { absolute: "Informax Cloud | Guest information for hotels and restaurants" },
  description: "Manage menus, guest directories and offers from one place. Discover Informax Cloud for hotels and restaurants: update your content, keep the same QR codes.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <>
    <CloudIntroduction />
    <IndustryChoices />
    <section className="overflow-hidden bg-paper-alt py-20 md:py-28" aria-labelledby="cloud-intro-h">
      <div className="mx-auto max-w-8xl px-6 md:px-10">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Heading id="cloud-intro-h" eyebrow="The platform behind every Scan Point" title="One place for your team." soft="Current information for your guests." body="A Scan Point is a permanent QR code linked to a PDF or website. In Informax Cloud, see what it shows, upload an update and decide when it should appear. Every printed copy keeps the same address." />
          <MoreLink href="/informax-cloud">See how Cloud works</MoreLink>
        </div>
        <Reveal className="mt-12"><Browser screen="deskSpaTemporary" /></Reveal>
        <div className="mt-5"><PreviewNote /></div>
      </div>
    </section>
    <section className="bg-paper py-20 md:py-28" aria-labelledby="simple-steps-h"><div className="mx-auto max-w-8xl px-6 md:px-10">
      <Heading id="simple-steps-h" eyebrow="Easy to understand. Easy to keep current." title="Your content." soft="Three simple steps." />
      <HowItWorksSteps />
      <div className="mt-9"><MoreLink href="/informax-cloud">Explore the workflow</MoreLink></div>
    </div></section>
    <DesignServices />
    <DemoCta title="See what Informax could do for your business." body="Explore our sample menus and guest directories, then choose the approach that fits your hotel or restaurant." />
  </>;
}
