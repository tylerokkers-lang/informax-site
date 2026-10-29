import type { Metadata } from "next";
import { Clock, Mail } from "lucide-react";
import EnquireForm from "@/components/EnquireForm";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Request a demo",
  description:
    "Request a demonstration of Informax Cloud for your restaurant or hotel, or ask us anything about menus, guest information and Scan Points.",
  alternates: { canonical: "/enquire" },
};

const NEXT = [
  { n: "01", title: "A conversation", body: "We learn how your restaurant or hotel runs and what guests ask for most." },
  { n: "02", title: "A demonstration", body: "We use our own sample menus and directories to show how your content could look." },
  { n: "03", title: "A clear proposal", body: "Choose the Cloud plan for your property, with optional design work quoted separately." },
];

/** Links can preselect one interest (e.g. "Ask about Informax Cloud"). Only these values are accepted. */
const PRESELECT: Record<string, string> = {
  "informax-cloud": "Informax Cloud",
  demo: "A demonstration",
  restaurants: "Restaurant menus",
  hotels: "Hotel guest directory",
  design: "Content design",
};

export default async function EnquirePage({ searchParams }: { searchParams: Promise<{ interest?: string | string[] }> }) {
  const { interest } = await searchParams;
  const key = Array.isArray(interest) ? interest[0] : interest;
  const preselected = key && PRESELECT[key] ? [PRESELECT[key]] : [];
  return (
    <section className="relative overflow-hidden bg-charcoal-950 pb-24 pt-[150px] text-cream md:pb-32 md:pt-[190px]">
      <div className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-brass/20 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-glow-deep/10 blur-[140px]" />

      <div className="relative mx-auto grid max-w-8xl grid-cols-1 gap-14 px-6 md:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-[140px] lg:self-start">
          <p className="mb-5 text-[15px] font-semibold text-brass-light md:text-[17px]">
            Request a demo
          </p>
          <h1 className="max-w-[13ch] text-balance font-serif-display text-[clamp(42px,6vw,76px)] font-medium leading-[0.98] tracking-[-0.02em] text-white">
            Let&rsquo;s talk about <span className="text-cream-mute">your guests.</span>
          </h1>
          <p className="mt-7 max-w-[42ch] text-[17px] leading-relaxed text-white/72">
            Tell us a little about your restaurant or hotel. We will show you
            the workflow, the guest experience and the options for your property.
          </p>

          <ol className="mt-12 border-t border-white/10">
            {NEXT.map((s) => (
              <li key={s.n} className="grid grid-cols-[44px_1fr] gap-2 border-b border-white/10 py-5">
                <span className="font-serif-display text-[15px] text-brass-light">{s.n}</span>
                <div>
                  <div className="text-[16px] font-medium text-white">{s.title}</div>
                  <p className="mt-1 max-w-[38ch] text-[14.5px] leading-relaxed text-cream-mute">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 space-y-3 text-[14.5px] text-cream-mute">
            <p className="flex items-center gap-3">
              <Clock size={16} className="shrink-0 text-brass-light" />
              We reply within one business day.
            </p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 transition-colors hover:text-white">
              <Mail size={16} className="shrink-0 text-brass-light" />
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <div className="rounded-[28px] bg-paper p-6 text-ink shadow-[0_40px_100px_-40px_rgba(0,0,0,0.8)] sm:p-10 lg:p-12">
          <EnquireForm initialInterests={preselected} />
        </div>
      </div>
    </section>
  );
}
