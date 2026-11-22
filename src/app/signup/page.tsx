import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import EnquireForm from "@/components/EnquireForm";
import { PRICE, normalisePlan, cloudSignupDestination } from "@/lib/cloud-plans";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Get started with Informax Cloud",
  description: "Choose your Informax Cloud plan and take the next step for your hotel, restaurant or venue.",
  alternates: { canonical: "/signup" },
  robots: { index: false, follow: true },
};

const STEPS = [
  { title: "Set up your main administrator", body: "One person manages the account and invites the team." },
  { title: "Make it your property", body: "Add your logo, your Spaces and your first Scan Point." },
  { title: "Add your content", body: "Upload a PDF or link a website, preview it, then print your Scan Point." },
];

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  const plan = normalisePlan((await searchParams).plan);
  const destination = cloudSignupDestination(process.env.CLOUD_SIGNUP_URL, plan);
  const label = plan === "annual" ? PRICE.annualLabel : PRICE.monthlyLabel;

  return (
    <section aria-labelledby="signup-h" className="bg-paper pb-24 pt-[120px] md:pb-32 md:pt-[160px]">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-start gap-14 px-6 md:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <p className="text-[14px] font-semibold text-brass-deep">Get started · One property</p>
          <h1 id="signup-h" className="x-display mt-6 text-balance text-[clamp(44px,4.8vw,70px)] text-ink">
            Your next step. <span className="text-ink-quiet">A simpler way to update.</span>
          </h1>
          <div className="mt-8 rounded-[20px] bg-white p-5 shadow-[0_0_0_1px_rgba(11,21,36,0.07)]">
            <p className="text-[13px] font-semibold text-ink-mute">Selected plan</p>
            <p className="mt-1 text-[17px] font-semibold text-ink">{label}</p>
            <p className="mt-2 text-[14px] text-ink-mute">Total price per property. No VAT is added: Informax is not currently VAT registered.</p>
            <Link href="/pricing" className="ix-link group mt-3 text-[14.5px] text-brass-deep hover:text-ink">
              Compare the plans <ArrowRight size={15} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <ol className="mt-10 border-t border-line">
            {STEPS.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[44px_1fr] gap-2 border-b border-line py-5">
                <span className="x-num text-[14px] font-semibold text-brass-deep">0{i + 1}</span>
                <div>
                  <p className="text-[16.5px] font-semibold text-ink">{s.title}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink-mute">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-[32px] bg-white p-6 shadow-[0_0_0_1px_rgba(11,21,36,0.06),0_40px_80px_-50px_rgba(11,21,36,0.35)] sm:p-10 lg:p-12">
          {destination ? (
            <>
              <h2 className="x-title text-[30px] text-ink">Continue to secure account setup</h2>
              <p className="mt-5 text-[16px] leading-relaxed text-ink-soft">
                Your selected plan will be carried into Informax Cloud. Review the payment and billing terms there before confirming your subscription.
              </p>
              <a href={destination} className="ix-btn ix-btn-primary mt-8 w-full">
                Continue to Informax Cloud
              </a>
            </>
          ) : (
            <>
              <h2 className="x-title text-[30px] text-ink">Request your setup link</h2>
              <p className="mb-8 mt-4 text-[16px] leading-relaxed text-ink-soft">
                Online account setup is being prepared for launch. Tell us about your property and we will set you up personally. This sends a request to Informax; it does not create an account or take a payment.
              </p>
              <EnquireForm
                initialInterests={["Informax Cloud"]}
                initialMessage={`I would like to get started with Informax Cloud for one property. My selected plan is ${label}.`}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
