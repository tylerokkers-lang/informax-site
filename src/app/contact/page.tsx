import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, AtSign, Clock, LogIn, Mail } from "lucide-react";
import EnquireForm from "@/components/EnquireForm";
import { CLOUD_LOGIN_URL, CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Informax about Informax Cloud, Scan Points, design services or an existing account. We reply within one business day.",
  alternates: { canonical: "/contact" },
};

const ROUTES = [
  { icon: Mail, title: "Email us", body: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, external: false },
  { icon: ArrowRight, title: "Request a demo", body: "See Informax Cloud with your property in mind", href: "/enquire?interest=demo", external: false },
  { icon: LogIn, title: "Existing customers", body: "Sign in to Informax Cloud", href: CLOUD_LOGIN_URL, external: true },
  ...(SOCIAL_LINKS.instagram ? [{ icon: AtSign, title: "Instagram", body: "@informax_cloud", href: SOCIAL_LINKS.instagram, external: true }] : []),
];

export default function ContactPage() {
  return (
    <section aria-labelledby="contact-h" className="bg-paper pb-24 pt-[120px] md:pb-32 md:pt-[160px]">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-14 px-6 md:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-[120px] lg:self-start">
          <p className="ix-hero-rise text-[14px] font-semibold text-brass-deep">Contact</p>
          <h1 id="contact-h" className="ix-hero-rise x-display mt-6 text-balance text-[clamp(44px,4.8vw,70px)] text-ink" style={{ ["--rise-delay" as string]: "0.08s" }}>
            Talk to us.
          </h1>
          <p className="ix-hero-rise mt-7 max-w-[32rem] text-[18px] leading-relaxed text-ink-soft" style={{ ["--rise-delay" as string]: "0.18s" }}>
            Questions about Informax Cloud, Scan Points, design services or your account. A person reads every message.
          </p>
          <ul className="mt-12 grid grid-cols-1 gap-3">
            {ROUTES.map(({ icon: Icon, title, body, href, external }) => {
              const inner = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-brass/10 text-brass-deep">
                    <Icon size={19} aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[16px] font-semibold text-ink">{title}</span>
                    <span className="block truncate text-[14.5px] text-ink-mute">{body}</span>
                  </span>
                </>
              );
              const cls =
                "flex items-center gap-4 rounded-[20px] bg-white p-4 shadow-[0_0_0_1px_rgba(11,21,36,0.06)] transition-shadow hover:shadow-[0_0_0_1px_rgba(11,21,36,0.12),0_16px_30px_-20px_rgba(11,21,36,0.3)] focus-visible:outline-2 focus-visible:outline-brass";
              return (
                <li key={title}>
                  {external || href.startsWith("mailto:") ? (
                    <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                      {inner}
                    </a>
                  ) : (
                    <Link href={href} className={cls}>
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          <p className="mt-8 flex items-center gap-3 text-[15px] text-ink-mute">
            <Clock size={16} aria-hidden className="shrink-0 text-brass-deep" />
            We reply within one business day.
          </p>
        </div>

        <div className="rounded-[32px] bg-white p-6 shadow-[0_0_0_1px_rgba(11,21,36,0.06),0_40px_80px_-50px_rgba(11,21,36,0.35)] sm:p-10 lg:p-12">
          <h2 className="x-title mb-8 text-[28px] text-ink">Send a message</h2>
          <EnquireForm />
        </div>
      </div>
    </section>
  );
}
