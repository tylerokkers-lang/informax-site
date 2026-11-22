import Image from "next/image";
import type { ReactNode } from "react";
import { SCREENS, type ScreenKey } from "@/lib/screens";

/** Guest captures end in a strip of browser chrome; they are drawn this much taller so it falls below the screen edge. */
export const GUEST_SCALE = 1.09;

/**
 * Device frames for the redesign. Both accept several screens and crossfade
 * to the `active` one, so a demonstration can change what a device shows
 * without the device moving. A phone can also hold rendered HTML (`children`)
 * for sample guest pages that have no captured screen.
 */

export function PhoneFrame({
  screens = [],
  active = 0,
  children,
  className = "",
  sizes = "(min-width: 1024px) 300px, 45vw",
  priority = false,
  tone = "dark",
  label,
  highlight = null,
}: {
  screens?: ScreenKey[];
  active?: number;
  children?: ReactNode;
  className?: string;
  sizes?: string;
  priority?: boolean;
  tone?: "dark" | "light";
  /** Accessible name when the phone holds rendered HTML. */
  label?: string;
  /** A ring around what changed, in fractions of the captured screen's height (a marketing layer, not part of the screen). */
  highlight?: { top: number; height: number; tone: "warn" | "ok" } | null;
}) {
  const app = screens.length > 0 && screens.every((k) => k.startsWith("cloud"));
  return (
    <div
      className={`relative aspect-[390/844] rounded-[15%/7%] p-[2.8%] ${
        tone === "dark"
          ? "bg-[linear-gradient(150deg,#3a414d,#0c1018_55%)] shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_50px_90px_-36px_rgba(0,0,0,0.75)]"
          : "bg-[linear-gradient(150deg,#f1f3f6,#c9ced6_60%)] shadow-[0_0_0_1px_rgba(11,21,36,0.08),0_50px_90px_-36px_rgba(11,21,36,0.5)]"
      } ${className}`}
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-[12.6%/5.9%] bg-white [container-type:inline-size]"
        role={children ? "img" : undefined}
        aria-label={children ? label : undefined}
      >
        {screens.map((key, i) => {
          const s = SCREENS[key];
          const guest = key.startsWith("guest");
          return (
            <div key={`${key}-${i}`} className="absolute inset-x-0 top-0" style={{ height: guest ? `${GUEST_SCALE * 100}%` : "100%" }}>
              <Image
                src={s.src}
                alt={i === active ? s.alt : ""}
                aria-hidden={i === active ? undefined : true}
                fill
                sizes={sizes}
                priority={priority && i === active}
                className={`object-cover object-top transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          );
        })}
        {children ? <div aria-hidden className="absolute inset-0">{children}</div> : null}
        {highlight ? (
          <span
            aria-hidden
            className={`pointer-events-none absolute inset-x-[4%] rounded-[5px] ${
              highlight.tone === "warn" ? "bg-amber-400/15 shadow-[0_0_0_2px_rgba(245,158,11,0.9)]" : "bg-emerald-400/12 shadow-[0_0_0_2px_rgba(16,185,129,0.9)]"
            }`}
            // Guest captures are drawn taller (GUEST_SCALE), so their fractions scale with them.
            style={{ top: `${highlight.top * GUEST_SCALE * 100}%`, height: `${highlight.height * GUEST_SCALE * 100}%` }}
          />
        ) : null}
        {!app ? <div aria-hidden className="absolute left-1/2 top-[1.5%] h-[3.2%] w-[29%] -translate-x-1/2 rounded-full bg-black" /> : null}
      </div>
    </div>
  );
}

export function BrowserFrame({
  screens,
  active = 0,
  className = "",
  sizes = "(min-width: 1180px) 960px, 94vw",
  priority = false,
  address = "app.informax.cloud",
  children,
  aspect,
  aspectClass,
  imgClassName = "",
  compact = false,
}: {
  screens: ScreenKey[];
  active?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  address?: string;
  children?: ReactNode;
  /** Crop the screen to this aspect ratio (CSS, e.g. "1800 / 820"), keeping the top of the capture. */
  aspect?: string;
  /** Responsive aspect ratio as a class (overrides `aspect`), e.g. "aspect-[1415/722] sm:aspect-[1800/722]". */
  aspectClass?: string;
  /** Extra classes on every screen image, for example a zoom on small screens. */
  imgClassName?: string;
  /** A slimmer title bar, for small compositions. */
  compact?: boolean;
}) {
  const first = SCREENS[screens[0]];
  return (
    <figure
      className={`relative overflow-hidden rounded-[14px] bg-[#eef0f4] shadow-[0_0_0_1px_rgba(11,21,36,0.08),0_60px_120px_-50px_rgba(6,10,18,0.55),0_20px_40px_-30px_rgba(6,10,18,0.3)] md:rounded-[18px] ${className}`}
    >
      <div className={`flex items-center gap-1.5 px-3 ${compact ? "h-6 sm:h-7" : "h-7 md:h-9 md:px-4"}`} aria-hidden>
        <span className={`rounded-full bg-[#ff5f57] ${compact ? "h-1.5 w-1.5 sm:h-2 sm:w-2" : "h-2 w-2 md:h-2.5 md:w-2.5"}`} />
        <span className={`rounded-full bg-[#febc2e] ${compact ? "h-1.5 w-1.5 sm:h-2 sm:w-2" : "h-2 w-2 md:h-2.5 md:w-2.5"}`} />
        <span className={`rounded-full bg-[#28c840] ${compact ? "h-1.5 w-1.5 sm:h-2 sm:w-2" : "h-2 w-2 md:h-2.5 md:w-2.5"}`} />
        <span className={`mx-auto hidden w-[min(320px,40%)] items-center justify-center rounded-md bg-white font-medium text-ink-soft sm:flex ${compact ? "h-4 text-[10px]" : "h-5 text-[11px]"}`}>
          {address}
        </span>
        <span className="hidden w-[38px] sm:block" />
      </div>
      <div className={`relative ${aspectClass ?? ""}`} style={aspectClass ? undefined : { aspectRatio: aspect ?? `${first.width} / ${first.height}` }}>
        {screens.map((key, i) => {
          const s = SCREENS[key];
          return (
            <Image
              key={`${key}-${i}`}
              src={s.src}
              alt={i === active ? s.alt : ""}
              aria-hidden={i === active ? undefined : true}
              fill
              sizes={sizes}
              priority={priority && i === 0}
              className={`object-cover object-top transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${imgClassName} ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            />
          );
        })}
        {children}
      </div>
    </figure>
  );
}
