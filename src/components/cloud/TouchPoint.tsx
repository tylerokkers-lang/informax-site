import Image from "next/image";
import { QR_PATH, QR_VIEWBOX } from "./qr-path";

const SIZES = {
  sm: { box: "h-[76px] w-[76px] rounded-[14px]", logo: "h-[12px]", label: "text-[13px]", cue: "text-[6.5px]", pad: "p-2.5", qr: "h-[38px] w-[38px] p-[3px]", icon: 14 },
  md: { box: "h-[132px] w-[132px] rounded-[22px]", logo: "h-[18px]", label: "text-[22px]", cue: "text-[9px]", pad: "p-4", qr: "h-[74px] w-[74px] p-[5px]", icon: 22 },
  lg: { box: "h-[208px] w-[208px] rounded-[32px]", logo: "h-[26px]", label: "text-[34px]", cue: "text-[11px]", pad: "p-6", qr: "h-[120px] w-[120px] p-[8px]", icon: 32 },
} as const;

/** Proximity mark, matching the Informax Touch icon used in the app. */
function TouchMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="1.9" fill="currentColor" stroke="none" />
      <path d="M8.3 8.3a5.2 5.2 0 0 0 0 7.4M15.7 8.3a5.2 5.2 0 0 1 0 7.4" />
      <path d="M5.3 5.3a9.4 9.4 0 0 0 0 13.4M18.7 5.3a9.4 9.4 0 0 1 0 13.4" opacity=".55" />
    </svg>
  );
}

/**
 * The physical Informax Touch Point, drawn in CSS.
 *   touch  the Space name and "Touch your phone here"
 *   scan   a code to open with the camera, nothing else
 */
export default function TouchPoint({
  label,
  mode = "touch",
  size = "md",
  active = false,
  className = "",
}: {
  label: string;
  mode?: "touch" | "scan";
  size?: keyof typeof SIZES;
  /** Soft pulse ring, used when the Touch Point is being demonstrated. */
  active?: boolean;
  className?: string;
}) {
  const s = SIZES[size];
  return (
    <div className={`relative inline-block ${className}`} role="img" aria-label={mode === "touch" ? `${label} Touch Point: touch your phone here` : `${label} Touch Point with a code to scan`}>
      {active && <span aria-hidden="true" className={`animate-tp-pulse absolute inset-0 border border-glow/60 ${s.box}`} />}
      <div
        className={`relative flex flex-col border border-white/15 bg-gradient-to-b from-[#2a2a36] to-[#14141c] text-left shadow-[0_18px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.12)] ${s.box} ${s.pad} ${
          mode === "scan" ? "items-center justify-center" : "justify-between"
        }`}
      >
        {mode === "touch" ? (
          <>
            <div className="flex items-start justify-between">
              <Image src="/informax-logo-white.png" alt="" width={420} height={140} className={`w-auto opacity-90 ${s.logo}`} />
              <span className="text-glow/90">
                <TouchMark size={s.icon} />
              </span>
            </div>
            <div>
              <div className={`font-serif-display italic leading-none text-white ${s.label}`}>{label}</div>
              <div className={`mt-1.5 font-semibold uppercase leading-snug tracking-[0.16em] text-glow/85 ${s.cue}`}>Touch your phone here</div>
            </div>
          </>
        ) : (
          <div className={`rounded-[6px] bg-white ${s.qr}`}>
            <svg viewBox={QR_VIEWBOX} className="h-full w-full" shapeRendering="crispEdges" aria-hidden>
              <path stroke="#0b0b12" d={QR_PATH} />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
