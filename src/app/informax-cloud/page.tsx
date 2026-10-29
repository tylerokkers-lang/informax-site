import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Browser, Phone } from "@/components/site/Devices";
import { Heading, Story, DemoCta } from "@/components/site/Sections";
import { PreviewNote } from "@/components/site/ComingSoon";
import { DesignServices } from "@/components/site/CloudIntroduction";

export const metadata: Metadata = {
  title: "Informax Cloud | Simple updates, permanent QR codes",
  description: "See how Informax Cloud works: organise Spaces and Scan Points, upload a PDF or website, preview your content and keep the same QR codes when it changes.",
  alternates: { canonical: "/informax-cloud" },
};

const STEPS = [
  { title: "Name your Space", body: "A Space is an area of your property, such as the Spa, Main Restaurant or Bedrooms. Keep the names familiar to your team." },
  { title: "Add a Scan Point", body: "Give each thing guests need a place: Restaurant Menu, Spa Treatments or Guest Directory. Each Scan Point has its own permanent QR code." },
  { title: "Choose what it shows", body: "Upload your PDF or add a website address. Check the preview, then publish when you are ready. Bring your existing content or use our design services." },
  { title: "Download, print and update", body: "Place copies of the QR code wherever guests need them. When your information changes, update it in Cloud. Every copy keeps working." },
];
const BENEFITS = ["PDFs and websites in one place", "The same QR code after each update", "Temporary content with an automatic end time", "Schedules for content that changes through the day", "Current PDF plus two previous versions to restore", "Updates from a phone or computer"];

export default function CloudPage() {
  return <>
    <header className="relative overflow-hidden bg-charcoal-950 pb-20 pt-[130px] text-cream md:pb-28 md:pt-[170px]">
      <div className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-brass/20 blur-[140px]" aria-hidden />
      <div className="relative mx-auto grid max-w-8xl grid-cols-1 items-center gap-14 px-6 md:px-10 lg:grid-cols-[1fr_1fr]">
        <div><p className="mb-5 text-[15px] font-semibold text-brass-light">Meet Informax Cloud</p><h1 className="text-balance font-serif-display text-[clamp(42px,5.4vw,74px)] leading-[1] text-white">Open. Update. Publish.<br /><span className="text-cream-mute">Get on with your day.</span></h1><p className="mt-7 max-w-[34rem] text-[18px] leading-relaxed text-white/75">Guest information should not take over your working day. Informax Cloud puts your Spaces, Scan Points and content in one clear place, so your team can find the right item and keep it current.</p><div className="mt-9 flex flex-wrap gap-3"><Link href="/pricing" className="ix-btn ix-btn-primary">Find your plan</Link><a href="#cloud-workflow" className="ix-btn ix-btn-secondary-dark">See how easy it is</a></div></div>
        <div><Browser screen="deskMenuPublished" /><div className="mt-5"><PreviewNote dark /></div></div>
      </div>
    </header>
    <section id="cloud-workflow" className="scroll-mt-24 bg-paper py-20 md:py-28" aria-labelledby="workflow-h"><div className="mx-auto max-w-8xl px-6 md:px-10"><Heading id="workflow-h" eyebrow="A familiar way to work" title="From your first Space" soft="to your first guest scan." body="Start with one piece of content. Add more when you are ready." /><ol className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">{STEPS.map((step, i) => <li key={step.title} className="rounded-[22px] bg-white p-7 shadow-[0_0_0_1px_rgba(11,21,36,0.06)]"><span className="text-[13px] font-semibold text-brass-deep">Step {i + 1}</span><h3 className="mt-3 font-serif-display text-[25px] leading-tight text-ink">{step.title}</h3><p className="mt-4 text-[16px] leading-relaxed text-ink-soft">{step.body}</p></li>)}</ol></div></section>
    <Story tone="alt" eyebrow="Check before you publish" title="Know what your guests" soft="are about to see." media={<Browser screen="deskMenuReplace" />}><p>Open the Scan Point, choose your updated PDF or website, and check it before publishing. The overview helps your team see what is showing and where to make the next change.</p><p>Menus are updated by uploading your revised PDF. Your existing design tools still do the design work; Cloud manages how guests access the result.</p></Story>
    <Story tone="dark" eyebrow="Less to remember at the end of a shift" title="A special for today." soft="An end time you can trust." media={<div className="mx-auto max-w-[260px]"><Phone screens={["cloudSpaTemporary"]} sizes="260px" /></div>}><p>Show a seasonal menu, a spa offer or a temporary update, with a clear end time. When it ends, Cloud shows the scheduled content that is then due, or your usual content if there is no schedule.</p><p>Use the calendar to prepare content for different times. Keep the current PDF and two previous versions, so you can restore a recent version without storing every upload.</p></Story>
    <section className="bg-paper py-20 md:py-28" aria-labelledby="team-h"><div className="mx-auto grid max-w-8xl grid-cols-1 gap-14 px-6 md:px-10 lg:grid-cols-2"><Heading id="team-h" eyebrow="A clear setup for your team" title="One main administrator." soft="Your team, working together." body="The main administrator looks after the account and invites colleagues. Each person uses their own login to manage content, while account settings stay with the main administrator. Add your property logo to the guest loading screen for a consistent first impression." /><div><h3 className="font-serif-display text-[25px] text-ink">Built around everyday updates</h3><ul className="mt-6 space-y-4">{BENEFITS.map((benefit) => <li key={benefit} className="flex items-start gap-3 text-[16px] text-ink-soft"><Check size={19} className="mt-0.5 shrink-0 text-brass-deep" aria-hidden />{benefit}</li>)}</ul><p className="mt-6 text-[13px] leading-relaxed text-ink-mute">Self-service account setup, billing and the simplified team model are being prepared for launch. The demo shows the current development experience.</p></div></div></section>
    <DesignServices />
    <DemoCta title="See it once. Picture it in your property." body="Our sample designs show the guest experience. Our demo shows the everyday workflow. Explore the plans when you are ready." />
  </>;
}
