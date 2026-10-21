import { ArrowUpRight } from "lucide-react";
import { CLOUD_COMING_SOON_LABEL, CLOUD_SITE_URL } from "@/lib/constants";

/** The "Coming Soon" badge for Informax Cloud. Informax Cloud V2 is in development and not publicly available. */
export function ComingSoonBadge({ dark = true, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-semibold ${
        dark ? "bg-brass-light/15 text-brass-light ring-1 ring-brass-light/30" : "bg-brass-deep/10 text-brass-deep ring-1 ring-brass-deep/20"
      } ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dark ? "bg-brass-light" : "bg-brass-deep"}`} aria-hidden />
      Coming Soon
    </span>
  );
}

/** The one link to informax.cloud, always labelled as coming soon (never a sign-up). */
export function ComingSoonLink({ dark = true, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <a
      href={CLOUD_SITE_URL}
      className={`ix-link ${dark ? "text-brass-light hover:text-white" : "text-brass-deep hover:text-ink"} ${className}`}
    >
      {CLOUD_COMING_SOON_LABEL} <ArrowUpRight size={16} aria-hidden />
    </a>
  );
}

/** A small note used under real development screens: what the visitor is looking at. */
export function PreviewNote({ dark = false, children }: { dark?: boolean; children?: React.ReactNode }) {
  return (
    <p className={`text-[13px] leading-relaxed ${dark ? "text-cream-mute" : "text-ink-mute"}`}>
      {children ?? "A preview of Informax Cloud, coming soon. Real screens from the development build; the businesses shown are fictional."}
    </p>
  );
}
