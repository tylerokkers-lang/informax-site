import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Phone } from "./Devices";
import Photo from "./Photo";
import { Heading } from "./Sections";

export function CloudIntroduction() {
  return (
    <header className="relative overflow-hidden bg-charcoal-950 pb-20 pt-[120px] text-cream md:pb-28 md:pt-[150px]">
      <Photo slot="restaurantRoom" fill motion priority label={false} />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,10,18,0.97),rgba(6,10,18,0.8))]" aria-hidden />
      <div className="relative mx-auto grid max-w-8xl grid-cols-1 items-center gap-14 px-6 md:px-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="ix-hero-rise">
          <p className="mb-5 text-[15px] font-semibold text-brass-light">Informax Cloud · For hotels and restaurants</p>
          <h1 className="text-balance font-serif-display text-[clamp(42px,5.4vw,74px)] leading-[1] text-white">Better guest information.<br /><span className="text-cream-mute">Less work to keep it current.</span></h1>
          <p className="mt-7 max-w-[35rem] text-[18px] leading-relaxed text-white/75">Informax Cloud gives your team one place to manage the menus, directories and offers guests open from your QR codes. Change the content, keep the same codes, and make your next update a simpler one.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/hotels" className="ix-btn ix-btn-primary">For hotels <ArrowRight size={17} aria-hidden /></Link>
            <Link href="/restaurants" className="ix-btn ix-btn-secondary-dark">For restaurants <ArrowRight size={17} aria-hidden /></Link>
          </div>
          <p className="mt-6 text-[14px] text-cream-mute">Guests scan with their phone. No app to download. No guest account to create.</p>
        </div>
        <Reveal className="mx-auto w-full max-w-[430px]">
          <div className="grid grid-cols-2 items-center gap-5 sm:gap-7">
            <div><p className="mb-3 text-center text-[12px] font-semibold text-white/80">A hotel directory</p><Phone screens={["guestDirectoryAfter"]} sizes="210px" priority /></div>
            <div className="translate-y-7"><p className="mb-3 text-center text-[12px] font-semibold text-white/80">A restaurant menu</p><Phone screens={["guestMenuAfter"]} sizes="210px" priority /></div>
          </div>
          <p className="mt-14 text-center text-[12px] leading-relaxed text-cream-mute">Informax sample designs, shown with fictional businesses.</p>
        </Reveal>
      </div>
    </header>
  );
}

export function IndustryChoices() {
  const industries = [
    { href: "/hotels", title: "Hotels", eyebrow: "From reception to the spa", body: "Keep guest directories, dining information and treatment menus consistent across your property. Help guests discover more of what you offer, while giving your team less information to maintain.", screen: "guestDirectoryAfter" as const },
    { href: "/restaurants", title: "Restaurants", eyebrow: "From the first table to the last", body: "Give every table the latest menu, drinks list and specials. Replace one file instead of every printed copy, and let temporary menus finish at the time you choose.", screen: "guestMenuAfter" as const },
  ];
  return <section className="bg-paper py-20 md:py-28" aria-labelledby="industry-choice-h"><div className="mx-auto max-w-8xl px-6 md:px-10">
    <Heading id="industry-choice-h" eyebrow="Made for your business" title="One platform." soft="Two very different working days." body="Choose your business to see exactly where Informax Cloud can help." />
    <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">{industries.map((item) => <Link key={item.href} href={item.href} className="group grid grid-cols-[1fr_90px] items-center gap-5 overflow-hidden rounded-[24px] bg-white p-6 shadow-[0_0_0_1px_rgba(11,21,36,0.06)] transition-shadow hover:shadow-[0_12px_35px_-15px_rgba(11,21,36,0.2)] sm:grid-cols-[1fr_120px] sm:p-8">
      <div><p className="text-[12px] font-semibold text-brass-deep">{item.eyebrow}</p><h3 className="mt-3 font-serif-display text-[32px] leading-tight text-ink">{item.title}</h3><p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{item.body}</p><span className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-brass-deep">Explore {item.title.toLowerCase()} <ArrowRight size={16} aria-hidden /></span></div>
      <Phone screens={[item.screen]} tone="light" sizes="120px" />
    </Link>)}</div>
  </div></section>;
}

export function IndustryBenefits({ industry }: { industry: "hotel" | "restaurant" }) {
  const hotel = industry === "hotel";
  const points = hotel ? [
    { title: "Less repeated information to maintain", body: "Keep dining times, Wi-Fi details and everyday information together in a directory guests can open themselves. Your team updates the source instead of replacing cards around the property." },
    { title: "More opportunities to be discovered", body: "Put spa treatments, room service and experiences in front of guests where they are relevant. Give them a clear route to your existing booking page or your team." },
    { title: "A more consistent guest experience", body: "Make the same current information available through every copy of a Scan Point. Temporary offers end automatically, while the two previous PDF versions stay available to restore." },
  ] : [
    { title: "Less reprinting when a menu changes", body: "Upload your revised PDF once. Every copy of that menu's QR code opens the update, so a new price or dish does not mean replacing the QR cards on every table." },
    { title: "A smoother handover between services", body: "Prepare breakfast, lunch and evening content with schedules, or use a temporary menu with an end time. Your team has a clear view of what guests should see." },
    { title: "Make more of your menus and offers", body: "Give drinks, wine, specials and seasonal menus their own place. Help guests find what is available without asking them to download an app or create an account." },
  ];
  return <section className="bg-paper py-20 md:py-28" aria-labelledby={`${industry}-benefits-h`}><div className="mx-auto max-w-8xl px-6 md:px-10">
    <Heading id={`${industry}-benefits-h`} eyebrow={`Why it matters to your ${hotel ? "hotel" : "restaurant"}`} title={hotel ? "Less chasing information." : "Less admin between services."} soft={hotel ? "More time for your guests." : "More attention on your guests."} />
    <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">{points.map((item, i) => <Reveal key={item.title} delay={i * 0.06} className="rounded-[22px] bg-white p-7 shadow-[0_0_0_1px_rgba(11,21,36,0.06)]"><p className="text-[13px] font-semibold text-brass-deep">0{i + 1}</p><h3 className="mt-3 font-serif-display text-[23px] leading-tight text-ink">{item.title}</h3><p className="mt-4 text-[16px] leading-relaxed text-ink-soft">{item.body}</p></Reveal>)}</div>
  </div></section>;
}

export function DesignServices({ industry }: { industry?: "hotel" | "restaurant" }) {
  const examples = industry === "hotel" ? "guest directory, spa menu or room-service guide" : industry === "restaurant" ? "food menu, drinks list or seasonal special" : "menu, guest directory or spa guide";
  return <section className="bg-paper-alt py-20 md:py-28" aria-labelledby="design-services-h"><div className="mx-auto grid max-w-8xl grid-cols-1 items-center gap-12 px-6 md:px-10 lg:grid-cols-[1.1fr_0.9fr]">
    <div><Heading id="design-services-h" eyebrow="Your content. Your identity." title="Bring your own design." soft="Or let us create it." /><p className="mt-6 max-w-[36rem] text-[18px] leading-relaxed text-ink-soft">Already have a {examples}? Upload your PDF or link to your website. If you want a more polished result, Informax can design the content around your brand.</p><p className="mt-4 max-w-[36rem] text-[16px] leading-relaxed text-ink-mute">Our demo uses Informax sample designs, so you can see how your own materials could look. Bespoke design is an optional, separately quoted service.</p><Link href="/enquire?interest=design" className="ix-link mt-7 text-brass-deep">Talk about your design <ArrowRight size={16} aria-hidden /></Link></div>
    <div className="mx-auto grid w-full max-w-[360px] grid-cols-2 items-center gap-6"><Phone screens={[industry === "restaurant" ? "guestMenuAfter" : "guestDirectoryAfter"]} tone="light" sizes="170px" /><Phone screens={[industry === "restaurant" ? "guestMenuBefore" : "guestSpa"]} tone="light" className="translate-y-5" sizes="170px" /></div>
  </div></section>;
}
