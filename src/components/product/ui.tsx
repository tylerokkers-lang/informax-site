import Image from "next/image";
import type { ReactNode } from "react";
import {
  AccessPointIcon,
  ActivityIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  DirectIcon,
  DocumentIcon,
  HotelIcon,
  LockIcon,
  MenuIcon,
  MoreIcon,
  OpenIcon,
  OverviewIcon,
  PeopleIcon,
  PlusIcon,
  ReceiptIcon,
  ScrollIcon,
  SettingsIcon,
  SpacesIcon,
  WebsiteIcon,
} from "./icons";
import type { SpaceCardData, TouchPointRowData, VersionRowData } from "./data";

/**
 * Recreated presentational pieces of Informax Cloud. Wording, hierarchy,
 * spacing and states follow the production app (Spaces, Space, Current
 * Content, Change Content, Access Points, Activity, Previous Versions).
 * They are display-only: state such as "hover", "press" and "focus" is
 * passed in by the film that is directing them.
 */

const cx = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(" ");

/* ---------------------------------- Brand --------------------------------- */

export function Logo({ height = 40 }: { height?: number }) {
  return (
    <Image
      src="/product/informax-logo.png"
      alt="Informax Cloud"
      width={640}
      height={196}
      style={{ height, width: "auto" }}
      className="max-w-full object-contain object-left"
    />
  );
}

/* --------------------------------- Controls -------------------------------- */

export function Btn({
  variant = "primary",
  children,
  hover,
  press,
  disabled,
  cur,
  className,
}: {
  variant?: "primary" | "secondary" | "quiet";
  children: ReactNode;
  hover?: boolean;
  press?: boolean;
  disabled?: boolean;
  /** Cursor target id used by the film's fake pointer. */
  cur?: string;
  className?: string;
}) {
  return (
    <span
      data-cur={cur}
      className={cx(
        "ixp-btn",
        variant === "primary" && "ixp-btn-primary",
        variant === "secondary" && "ixp-btn-secondary",
        variant === "quiet" && "ixp-btn-quiet",
        hover && "is-hover",
        press && "is-press",
        disabled && "is-disabled",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Badge({ tone = "positive", children }: { tone?: "positive" | "warn" | "neutral"; children: ReactNode }) {
  const dot = tone === "positive" ? "bg-ix-pos" : tone === "warn" ? "bg-ix-warn" : "bg-ix-dim";
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-[13px] font-medium text-ix-muted">
      <span className={cx("h-1.5 w-1.5 shrink-0 rounded-full", dot)} aria-hidden />
      {children}
    </span>
  );
}

export function ContentKindTile({ kind, size = 44 }: { kind: "pdf" | "website" | null; size?: number }) {
  const Icon = kind === "website" ? WebsiteIcon : DocumentIcon;
  return (
    <span
      className={cx(
        "inline-flex shrink-0 items-center justify-center rounded-[14px]",
        kind ? "bg-white/[0.08] text-ix-cream" : "bg-white/[0.05] text-ix-dim",
      )}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <Icon size={Math.round(size * 0.5)} />
    </span>
  );
}

export type Interaction = "touch" | "scan" | "direct";

const TILE: Record<Interaction, string> = {
  touch: "bg-ix-brand/[0.14] text-ix-bright",
  scan: "bg-ix-brand/[0.14] text-ix-bright",
  direct: "bg-white/[0.06] text-ix-muted",
};

export function InteractionTile({ kind, size = 40 }: { kind: Interaction; size?: number }) {
  const Icon = kind === "direct" ? DirectIcon : AccessPointIcon;
  return (
    <span
      className={cx("inline-flex shrink-0 items-center justify-center rounded-[12px]", TILE[kind])}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <Icon size={Math.round(size * 0.5)} />
    </span>
  );
}

/* --------------------------------- Spaces --------------------------------- */

export function SpaceCard({
  space,
  hover,
  cur,
  archivedLook,
}: {
  space: SpaceCardData;
  hover?: boolean;
  cur?: string;
  archivedLook?: boolean;
}) {
  return (
    <div data-cur={cur} className={cx("ixp-card relative flex min-w-0 flex-col p-6", hover && "is-hover", archivedLook && "opacity-70")}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="min-w-0 break-words text-[1.375rem] leading-snug">{space.name}</h3>
        <span className="-mr-2 -mt-1.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ix-muted">
          <MoreIcon size={18} />
        </span>
      </div>
      <div className="mt-2">
        <Badge>Live</Badge>
      </div>
      <div className="mt-6 flex items-center gap-3.5">
        <ContentKindTile kind={space.kind} size={40} />
        <div className="min-w-0">
          <p className="text-[13px] text-ix-dim">Current content · {space.kind === "website" ? "Website" : "PDF"}</p>
          <p className="truncate text-[15px] text-ix-cream">{space.file}</p>
        </div>
      </div>
      <p className="ixp-tabular mt-5 text-[13px] text-ix-dim">
        {space.touchPoints} Access Points · {space.interactions.toLocaleString("en-GB")} interactions this month
      </p>
    </div>
  );
}

/**
 * The Space's connected Access Points: they stay exactly where they are
 * whatever the Space shows. (The site never shows web addresses.)
 */
export function SpaceConnection({
  touchPoints,
  ring,
  compact,
  note = "Change what this Space shows as often as you like. Every connected Access Point stays exactly where it is.",
}: {
  touchPoints: number;
  /** One soft pulse, used to draw the eye to the fact that nothing moved. */
  ring?: boolean;
  compact?: boolean;
  note?: string | null;
}) {
  return (
    <div
      className={cx("rounded-[20px] bg-white/[0.05] shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_8px_24px_-12px_rgba(2,6,14,0.55)]", compact ? "p-5" : "p-5 sm:p-6", ring && "ixp-ring")}
      data-cur="url"
    >
      <p className="ixp-label">Connected Access Points</p>
      <div className="mt-2.5 flex items-center gap-3">
        <InteractionTile kind="touch" size={compact ? 36 : 40} />
        <p className={cx("ixp-display ixp-tabular leading-snug tracking-[-0.01em] text-white", compact ? "text-[1.0625rem]" : "text-[1.125rem] sm:text-[1.3125rem]")}>
          {touchPoints.toLocaleString("en-GB")} Access Points
        </p>
        <span className="ml-auto">
          <Badge>Unchanged</Badge>
        </span>
      </div>
      {note && <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-ix-dim">{note}</p>}
    </div>
  );
}

/* ------------------------------ Current Content ----------------------------- */

export function ChoiceTile({
  icon,
  title,
  detail,
  selected,
  cur,
}: {
  icon: ReactNode;
  title: string;
  detail: string;
  selected: boolean;
  cur?: string;
}) {
  return (
    <span
      data-cur={cur}
      className={cx(
        "flex min-h-[4.5rem] items-center gap-4 rounded-[20px] px-4 py-3.5 text-left transition-[background-color,box-shadow] duration-300",
        selected
          ? "bg-ix-brand/[0.12] shadow-[inset_0_0_0_1.5px_rgba(6,147,227,0.75)]"
          : "bg-white/[0.05] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]",
      )}
    >
      <span
        className={cx(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] transition-colors duration-300",
          selected ? "bg-ix-brand/20 text-ix-bright" : "bg-white/[0.08] text-ix-cream",
        )}
      >
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[15px] font-medium text-white">{title}</span>
        <span className="mt-0.5 block text-[13px] text-ix-dim">{detail}</span>
      </span>
    </span>
  );
}

export function Collapse({ open, children }: { open: boolean; children: ReactNode }) {
  return (
    <div className="ixp-collapse" data-open={open} aria-hidden={!open}>
      <div>{children}</div>
    </div>
  );
}

export interface ChangePanelState {
  open: boolean;
  choice: "pdf" | "website" | null;
  address: string;
  inputFocus: boolean;
  publishing: boolean;
  publishedAddress: string | null;
  hoverPublish?: boolean;
  pressPublish?: boolean;
  /** A chosen PDF awaiting Publish. */
  staged?: { name: string; size: string } | null;
  /** The PDF flow has published. */
  pdfPublished?: boolean;
}

/** The real "What should guests see?" panel with its two flows underneath. */
export function ChangePanel({ s }: { s: ChangePanelState }) {
  const valid = s.address.length > 0;
  return (
    <Collapse open={s.open}>
      <div className="pt-6">
        <div data-anchor="panel" className="@container rounded-[20px] bg-white/[0.04] p-5 sm:p-6">
          <h4 className="text-[17px] font-medium tracking-normal">What should guests see?</h4>
          <div className="mt-4 grid gap-3 @md:grid-cols-2">
            <ChoiceTile
              cur="tile-pdf"
              selected={s.choice === "pdf"}
              icon={<DocumentIcon size={22} />}
              title="Upload a PDF"
              detail="A guide, menu or document"
            />
            <ChoiceTile
              cur="tile-website"
              selected={s.choice === "website"}
              icon={<WebsiteIcon size={22} />}
              title="Use a website"
              detail="A page on your own site"
            />
          </div>

          <Collapse open={s.choice === "pdf"}>
            <div className="pt-5">
              {s.pdfPublished ? (
                <div className="ixp-enter-scale">
                  <p className="text-[17px] font-medium text-white">Guests now see your new PDF</p>
                  <p className="mt-1.5 text-[15px] text-ix-muted">Your Space and connected Access Points stay the same.</p>
                </div>
              ) : s.staged ? (
                <div data-anchor="entry" className="ixp-enter-fade">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="min-w-0 break-words text-sm text-ix-cream">{s.staged.name}</p>
                    <p className="text-xs text-ix-dim">{s.staged.size}</p>
                  </div>
                  <Btn variant="secondary" className="mt-3 w-full">
                    Open preview
                  </Btn>
                  <p className="mt-4 text-sm text-ix-muted">When you publish, guests will see this version straight away.</p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    <Btn cur="publish" variant="primary" disabled={s.publishing} hover={s.hoverPublish} press={s.pressPublish}>
                      {s.publishing ? "Publishing…" : "Publish"}
                    </Btn>
                  </div>
                </div>
              ) : (
                <div data-cur="dropzone" data-anchor="entry" className="flex flex-col items-center justify-center rounded-[20px] bg-white/[0.04] px-5 py-8 text-center">
                  <p className="text-sm text-ix-cream">Drag your PDF here</p>
                  <p className="mt-1 text-xs text-ix-dim">or</p>
                  <Btn variant="secondary" className="mt-3" cur="choose-file">
                    Choose file
                  </Btn>
                  <p className="mt-4 text-xs text-ix-dim">PDF, up to 25 MB</p>
                </div>
              )}
            </div>
          </Collapse>

          <Collapse open={s.choice === "website"}>
            <div className="pt-5">
              {s.publishedAddress ? (
                <div className="ixp-enter-scale">
                  <p className="text-[17px] font-medium text-white">Guests now see the {s.publishedAddress}</p>
                  <p className="mt-1.5 text-[15px] text-ix-muted">Your Space and connected Access Points stay the same.</p>
                </div>
              ) : (
                <div data-anchor="entry" className="space-y-4">
                  <div>
                    <span className="ixp-label mb-2 block">Page on your website</span>
                    <div data-cur="input" className={cx("ixp-input flex items-center", s.inputFocus && "is-focus")}>
                      {s.address ? (
                        <span className="text-ix-cream">
                          {s.address}
                          {s.inputFocus && <span className="ml-px inline-block h-[1.1em] w-px translate-y-[3px] bg-ix-bright" />}
                        </span>
                      ) : (
                        <span className="text-ix-dim">Choose a page</span>
                      )}
                    </div>
                  </div>
                  <div className="min-h-5 text-[13px] text-ix-dim">{valid ? "Guests will open this page." : ""}</div>
                  <div className="flex flex-wrap gap-2.5">
                    <Btn cur="publish" variant="primary" disabled={!valid || s.publishing} hover={s.hoverPublish} press={s.pressPublish}>
                      {s.publishing ? "Publishing…" : "Publish"}
                    </Btn>
                    {valid && (
                      <Btn variant="secondary">
                        Open website
                        <OpenIcon size={16} />
                      </Btn>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Collapse>

          <p className="mt-5 flex items-center gap-2 text-[13px] text-ix-dim">
            <LockIcon size={14} />
            Your Space and connected Access Points stay the same.
          </p>
        </div>
      </div>
    </Collapse>
  );
}

export function CurrentContentCard({
  kind,
  headline,
  updated,
  open,
  hoverButton,
  pressButton,
  children,
}: {
  kind: "pdf" | "website";
  headline: string;
  updated: string;
  open: boolean;
  hoverButton?: boolean;
  pressButton?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="rounded-[20px] bg-white/[0.035] p-6 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_8px_24px_-12px_rgba(2,6,14,0.55)] sm:p-7">
      <p className="ixp-label">Guests currently see</p>
      <div className="mt-4 flex items-center gap-4">
        <ContentKindTile kind={kind} size={52} />
        <div className="min-w-0">
          <p className="text-[13px] text-ix-dim">{kind === "website" ? "Website" : "PDF"}</p>
          <p className="ixp-display break-words text-[1.25rem] font-medium leading-snug text-white">{headline}</p>
          <p className="mt-0.5 text-[13px] text-ix-dim">Updated {updated}</p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-2.5">
        <Btn cur="change-content" variant="primary" hover={hoverButton} press={pressButton}>
          {open ? "Close" : "Change Content"}
        </Btn>
        <Btn variant="secondary">{kind === "website" ? "Open website" : "Preview"}</Btn>
      </div>
      {children}
    </div>
  );
}

/* ---------------------------------- Codes ---------------------------------- */

export function TouchPointRows({ rows, total, hero }: { rows: TouchPointRowData[]; total: number; hero?: boolean }) {
  return (
    <section>
      <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-[1.375rem]">Codes</h3>
        <p className="text-[13px] text-ix-dim">{total} active</p>
      </div>
      <p className="mb-5 text-[15px] text-ix-dim">
        Connected to this Space. Each one opens this Space&apos;s current content, so changing the content never means
        changing anything physical.
      </p>
      <ul className="divide-y divide-white/[0.06]">
        {rows.map((r) => (
          <li key={r.location} className="py-4">
            <div className="flex items-center gap-3.5">
              <InteractionTile kind={r.source} size={44} />
              <div className="min-w-0 flex-1">
                <p className="break-words text-[16px] font-medium text-ix-cream">{r.location}</p>
                <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-ix-dim">
                  <span>Code</span>
                  <Badge>Active</Badge>
                  <span className="ixp-tabular">{r.interactions} interactions · all time</span>
                </p>
              </div>
              <MoreIcon size={18} className="shrink-0 text-ix-muted" />
            </div>
          </li>
        ))}
      </ul>
      {hero ? null : (
        <p className="pt-4 text-[13px] text-ix-dim">{total - rows.length} more connected to this Space</p>
      )}
    </section>
  );
}

/* ---------------------------------- Activity -------------------------------- */

export function ActivitySummary({
  interactions,
  touch,
  scan,
  direct,
  fullNames,
}: {
  interactions: string;
  touch: string;
  scan: string;
  direct: string;
  /** Kept for callers; the labels are "Codes" and "Direct" either way. */
  fullNames?: boolean;
}) {
  // Touch and Scan are one public idea: arriving through a Code.
  const num = (v: string) => Number(v.replace(/[^0-9]/g, "")) || 0;
  const viaAccessPoints = (num(touch) + num(scan)).toLocaleString("en-GB");
  const rows = [
    { id: "ap", icon: <AccessPointIcon size={16} />, label: "Codes", value: viaAccessPoints },
    { id: "direct", icon: <DirectIcon size={16} />, label: "Direct", value: direct },
  ];
  return (
    <div>
      <p className="ixp-display ixp-tabular text-[3rem] font-semibold leading-none tracking-[-0.03em] text-white">
        {interactions}
      </p>
      <p className="mt-2 text-[15px] text-ix-muted">Interactions this month</p>
      <dl className="mt-6 grid grid-cols-2 gap-3">
        {rows.map((row) => (
          <div key={row.id}>
            <dt className="flex items-center gap-1.5 text-[13px] text-ix-dim">
              {row.icon}
              {row.label}
            </dt>
            <dd className="ixp-display ixp-tabular mt-1 text-[1.5rem] font-medium text-white">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ---------------------------- Previous Versions ----------------------------- */

export function VersionRows({
  rows,
  restoreHover,
  restoreCur,
}: {
  rows: VersionRowData[];
  restoreHover?: boolean;
  restoreCur?: boolean;
}) {
  return (
    <ul className="divide-y divide-white/[0.06]">
      {rows.map((v, i) => (
        <li key={v.headline + v.published} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 py-4">
          <div className="flex min-w-0 items-center gap-3.5">
            <ContentKindTile kind={v.kind} size={40} />
            <div className="min-w-0">
              <p className="break-words text-[15px] text-ix-cream">{v.headline}</p>
              <p className="mt-0.5 text-[13px] text-ix-dim">
                {v.kind === "website" ? "Website" : "PDF"} · Published {v.published}
              </p>
            </div>
          </div>
          <Btn variant="quiet" hover={i === 0 && restoreHover} cur={i === 0 && restoreCur ? "restore" : undefined}>
            Restore
          </Btn>
        </li>
      ))}
    </ul>
  );
}

/** The real confirmation sheet, shown inline over a dimmed surface. */
export function ConfirmSheetView({ hoverConfirm }: { hoverConfirm?: boolean }) {
  return (
    <div className="ixp-enter-scale w-[min(100%,420px)] rounded-[28px] bg-ix-navy-850 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.07),0_24px_60px_-20px_rgba(2,6,14,0.85)]">
      <h2 className="text-[1.375rem] leading-snug">Go back to this version?</h2>
      <p className="mt-2.5 text-[15px] leading-relaxed text-ix-muted">
        Guests will see it straight away. Your Space link and connected Access Points stay the same, and your current
        version stays in the history.
      </p>
      <div className="mt-7 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
        <Btn variant="secondary">Cancel</Btn>
        <Btn variant="primary" cur="confirm" hover={hoverConfirm}>
          Go back to this version
        </Btn>
      </div>
    </div>
  );
}

/* --------------------------------- App chrome -------------------------------- */

const NAV = [
  { label: "Overview", icon: OverviewIcon },
  { label: "Hotels", icon: HotelIcon },
  { label: "Activity", icon: ActivityIcon },
  { label: "Codes", icon: AccessPointIcon },
  { label: "People", icon: PeopleIcon },
];
const NAV2 = [
  { label: "Subscriptions", icon: ReceiptIcon },
  { label: "Audit log", icon: ScrollIcon },
  { label: "Settings", icon: SettingsIcon },
];

export function AppSidebar({ active = "Hotels" }: { active?: string }) {
  const link = (item: (typeof NAV)[number], quiet = false) => {
    const on = item.label === active;
    return (
      <div
        key={item.label}
        className={cx(
          "flex items-center gap-3 rounded-[12px] px-3",
          quiet ? "min-h-10 text-[14px]" : "min-h-11 text-[15px]",
          on ? "bg-white/[0.08] font-medium text-white" : "text-ix-muted",
        )}
      >
        <item.icon size={quiet ? 17 : 19} className={cx("shrink-0", on ? "text-ix-bright" : "text-ix-dim")} />
        {item.label}
      </div>
    );
  };
  return (
    <aside className="flex w-[17rem] shrink-0 flex-col justify-between border-r border-white/[0.06] bg-ix-navy-950/40 px-4 py-7">
      <div>
        <div className="block px-3 pb-8">
          <Logo height={40} />
        </div>
        <nav className="space-y-0.5" aria-hidden>
          {NAV.map((n) => link(n))}
        </nav>
      </div>
      <div className="space-y-6">
        <nav className="space-y-0.5" aria-hidden>
          {NAV2.map((n) => link(n, true))}
        </nav>
        <div className="border-t border-white/[0.06] px-3 pt-5">
          <p className="text-[12px] text-ix-dim">Informax administrator</p>
          <p className="mt-0.5 truncate text-[15px] font-medium text-ix-cream">Informax Team</p>
          <p className="mt-0.5 truncate text-[13px] text-ix-dim">team@informax.co.uk</p>
        </div>
      </div>
    </aside>
  );
}

const TABS = ["Overview", "Spaces", "Codes", "Activity", "People"];

export function HotelTabs({ active, cur }: { active: string; cur?: string }) {
  return (
    <nav className="mb-10 flex gap-1 border-b border-white/[0.06] px-1" aria-hidden>
      {TABS.map((t) => {
        const on = t === active;
        return (
          <span
            key={t}
            data-cur={t === cur ? `tab-${t.toLowerCase().replace(" ", "-")}` : undefined}
            className={cx(
              "relative flex min-h-11 shrink-0 items-center px-3.5 text-[15px] transition-colors duration-200",
              "after:absolute after:inset-x-3.5 after:-bottom-px after:h-[2px] after:origin-left after:rounded-full after:bg-white after:transition-transform after:duration-300",
              on ? "font-medium text-white after:scale-x-100" : "text-ix-muted after:scale-x-0",
            )}
          >
            {t}
          </span>
        );
      })}
    </nav>
  );
}

export function HotelHeader({ hotel, place }: { hotel: string; place: string }) {
  return (
    <header className="mb-9 flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
      <div className="min-w-0">
        <p className="ixp-label mb-2">Hotels</p>
        <h1 className="text-[2.6rem] leading-[1.1]">{hotel}</h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ix-muted">{place}</p>
      </div>
      <Badge>Active</Badge>
    </header>
  );
}

export function StatCardView({ label, value, emphasis }: { label: string; value: string; emphasis?: boolean }) {
  return (
    <div className={cx("ixp-card flex flex-col justify-between p-6", emphasis && "bg-white/[0.06]")}>
      <p className="ixp-label">{label}</p>
      <p className="ixp-display ixp-tabular mt-3 text-[2.5rem] font-semibold leading-none tracking-[-0.03em] text-white">{value}</p>
      <span className="mt-2.5 block h-4" />
    </div>
  );
}

export function BackLink({ children }: { children: ReactNode }) {
  return (
    <span className="mb-8 inline-flex items-center gap-1.5 text-[14px] text-ix-muted">
      <ArrowLeftIcon size={16} />
      {children}
    </span>
  );
}

export function NewSpaceButton() {
  return (
    <span className="ixp-btn ixp-btn-primary">
      <PlusIcon size={16} />
      New Space
    </span>
  );
}

export { ChevronRightIcon, MenuIcon, MoreIcon, SpacesIcon };
