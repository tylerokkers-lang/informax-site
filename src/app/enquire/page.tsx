import type { Metadata } from "next";
import { Clock, Mail, Sparkles } from "lucide-react";
import EnquireForm from "@/components/EnquireForm";
import { Eyebrow, EmLight } from "@/components/ui";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Enquire",
  description:
    "Tell us about your property and what you'd like Informax to achieve for your guests. We'll help design a digital directory built around your hotel.",
  alternates: { canonical: "/enquire" },
};

const SIDE_POINTS = [
  "A digital directory designed entirely around your property and brand",
  "NFC tags and QR access — guests need no app to get started",
  "Content you can update yourself, any time, without new hardware",
  "Straightforward pricing sized to your property, not inflated guest-directory fees",
];

export default function EnquirePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-charcoal-950 text-cream pt-[150px] pb-16 md:pt-[170px] md:pb-20">
        <div className="absolute inset-0 bg-grid-fade-dark pointer-events-none" />
        <div className="relative mx-auto max-w-8xl px-6 md:px-8 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-14 items-end">
          <div>
            <Eyebrow tone="dark">Enquire</Eyebrow>
            <h1 className="font-serif-display font-medium leading-[1.16] tracking-tight text-[clamp(32px,4.4vw,50px)] text-white mb-5">
              Let&rsquo;s make more of <EmLight>your guest journey.</EmLight>
            </h1>
            <p className="text-cream-mute text-[17px] leading-relaxed max-w-[480px]">
              Tell us a little about your property and what you&rsquo;d like
              Informax to achieve for your guests. We&rsquo;ll get back to
              you shortly to start the conversation.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <MetaItem
              icon={Clock}
              title="We reply within one business day"
              desc="A short, no-pressure conversation about your property."
            />
            <MetaItem
              icon={Sparkles}
              title="No obligation walkthrough"
              desc="See what a directory could look like before deciding anything."
            />
            <MetaItem
              icon={Mail}
              title="Prefer email?"
              desc={CONTACT_EMAIL}
              last
            />
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-8xl px-6 md:px-8 grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-14 items-start">
          <div className="lg:sticky lg:top-[130px]">
            <h3 className="font-serif-display text-xl font-medium text-ink mb-3.5">
              What to expect
            </h3>
            <p className="text-[14.5px] text-ink-mute leading-relaxed mb-6">
              Every Informax enquiry starts with a conversation, not a sales
              pitch — we want to understand your property before we suggest
              anything.
            </p>
            <ul className="flex flex-col gap-4">
              {SIDE_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                  <span className="text-sm text-ink-soft leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-line bg-panel p-6 sm:p-10 md:p-12">
            <EnquireForm />
          </div>
        </div>
      </section>
    </>
  );
}

function MetaItem({
  icon: Icon,
  title,
  desc,
  last = false,
}: {
  icon: typeof Clock;
  title: string;
  desc: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-3.5 pb-4 ${
        last ? "" : "border-b border-line-dark"
      }`}
    >
      <Icon size={18} className="mt-0.5 shrink-0 text-brass-light" />
      <div>
        <div className="text-sm font-semibold text-white mb-0.5">{title}</div>
        <div className="text-[13px] text-cream-mute">{desc}</div>
      </div>
    </div>
  );
}
