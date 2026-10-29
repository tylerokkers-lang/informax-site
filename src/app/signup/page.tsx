import type { Metadata } from "next";
import Link from "next/link";
import EnquireForm from "@/components/EnquireForm";
import { normalisePlan, cloudSignupDestination } from "@/lib/cloud-plans";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Get started with Informax Cloud", description: "Choose your Informax Cloud plan and take the next step for your hotel or restaurant.", alternates: { canonical: "/signup" }, robots: { index: false, follow: true } };

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  const plan = normalisePlan((await searchParams).plan);
  const destination = cloudSignupDestination(process.env.CLOUD_SIGNUP_URL, plan);
  const label = plan === "annual" ? "Annual: £1,788 upfront per year (£149/month equivalent)" : "Monthly: £199/month for 6 months, then £249/month";
  return <section className="relative overflow-hidden bg-charcoal-950 pb-24 pt-[140px] text-cream md:pt-[180px]"><div className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-brass/20 blur-[140px]" aria-hidden /><div className="relative mx-auto grid max-w-8xl grid-cols-1 items-start gap-14 px-6 md:px-10 lg:grid-cols-[0.85fr_1.15fr]">
    <div><p className="mb-5 text-[15px] font-semibold text-brass-light">Get started · One property</p><h1 className="text-balance font-serif-display text-[clamp(42px,5.4vw,68px)] leading-[1.02] text-white">Your next step.<br /><span className="text-cream-mute">A simpler way to update.</span></h1><p className="mt-7 text-[18px] leading-relaxed text-white/80">{label}</p><p className="mt-3 text-[14px] text-cream-mute">Total price per property. No VAT is added; Informax is not currently VAT registered.</p><Link href="/pricing" className="ix-link mt-5 text-brass-light">Compare the plans</Link><ol className="mt-10 space-y-5 text-[16px] text-white/75"><li><strong className="text-white">01. Set up your main administrator.</strong><br />One person manages the account and invites the team.</li><li><strong className="text-white">02. Make it your property.</strong><br />Add your logo, Spaces and first Scan Point.</li><li><strong className="text-white">03. Add your content.</strong><br />Upload a PDF or link a website, preview it and download your QR code.</li></ol></div>
    <div className="rounded-[28px] bg-paper p-6 text-ink sm:p-10">{destination ? <><h2 className="font-serif-display text-[30px] leading-tight">Continue to secure account setup</h2><p className="mt-5 text-[16px] leading-relaxed text-ink-soft">Your selected plan will be carried into Informax Cloud. Review the payment and billing terms there before confirming your subscription.</p><a href={destination} className="ix-btn ix-btn-primary mt-8 w-full">Continue to Informax Cloud</a></> : <><h2 className="font-serif-display text-[30px] leading-tight">Request your setup link</h2><p className="mb-8 mt-4 text-[16px] leading-relaxed text-ink-soft">Online account setup is being connected. Tell us about your property and chosen plan, and we will help with the next step. This sends a request to Informax; it does not create an account or take a payment.</p><EnquireForm initialInterests={["Informax Cloud"]} initialMessage={`I would like to get started with Informax Cloud for one property. My selected plan is ${label}.`} /></>}</div>
  </div></section>;
}
