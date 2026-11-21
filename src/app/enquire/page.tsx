import type { Metadata } from "next";
import { Clock, Mail } from "lucide-react";
import EnquireForm from "@/components/EnquireForm";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Request a demo",
  description:
    "Request a demonstration of Informax Cloud for your hotel, restaurant or venue, or ask us anything about menus, guest information and Scan Points.",
  alternates: { canonical: "/enquire" },
};

const NEXT = [
  { n: "01", title: "A conversation", body: "We learn how your property runs and what guests ask for most." },
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
    <section aria-labelledby="demo-h" className="relative bg-paper pb-24 pt-[120px] md:pb-32 md:pt-[160px]">
      {/* Phones see the form straight after the introduction; wide screens keep the steps beside it. */}
      <div className="relative mx-auto grid max-w-[1240px] grid-cols-1 gap-12 px-6 md:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:grid-rows-[auto_1fr] lg:gap-x-20 lg:gap-y-0">
        <div className="order-1 lg:col-start-1 lg:row-start-1">
          <p className="ix-hero-rise text-[14px] font-semibold text-brass-deep">Request a demo</p>
          <h1 id="demo-h" className="ix-hero-rise x-display mt-6 text-balance text-[clamp(44px,4.8vw,70px)] text-ink" style={{ ["--rise-delay" as string]: "0.08s" }}>
            See it with <span className="text-ink-quiet">your property in mind.</span>
          </h1>
          <p className="ix-hero-rise mt-7 max-w-[34rem] text-[18px] leading-relaxed text-ink-soft" style={{ ["--rise-delay" as string]: "0.18s" }}>
            Tell us a little about your hotel, restaurant or venue. We will show you Informax Cloud, the guest experience and the options for your property.
          </p>
        </div>

        <div className="order-3 lg:col-start-1 lg:row-start-2">
          <ol className="border-t border-line lg:mt-12">
            {NEXT.map((s) => (
              <li key={s.n} className="grid grid-cols-[44px_1fr] gap-2 border-b border-line py-5">
                <span className="x-num text-[14px] font-semibold text-brass-deep">{s.n}</span>
                <div>
                  <div className="text-[16.5px] font-semibold tracking-[-0.01em] text-ink">{s.title}</div>
                  <p className="mt-1 max-w-[38ch] text-[15px] leading-relaxed text-ink-mute">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 space-y-3 text-[15px] text-ink-mute">
            <p className="flex items-center gap-3">
              <Clock size={16} aria-hidden className="shrink-0 text-brass-deep" />
              We reply within one business day.
            </p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 transition-colors hover:text-ink">
              <Mail size={16} aria-hidden className="shrink-0 text-brass-deep" />
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <div className="order-2 rounded-[32px] bg-white p-6 text-ink shadow-[0_0_0_1px_rgba(11,21,36,0.06),0_40px_80px_-50px_rgba(11,21,36,0.35)] sm:p-10 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start lg:p-12">
          <EnquireForm initialInterests={preselected} />
        </div>
      </div>
    </section>
  );
}
