/** The "Coming Soon" badge for Informax Cloud. Informax Cloud V2 is in development and not publicly available. */
export function ComingSoonBadge({ dark = true, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-semibold ${
        dark ? "bg-[rgba(8,20,36,0.72)] text-brass-light ring-1 ring-brass-light/35" : "bg-brass-deep/10 text-[#04598f] ring-1 ring-brass-deep/20"
      } ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dark ? "bg-brass-light" : "bg-[#04598f]"}`} aria-hidden />
      Coming Soon
    </span>
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
