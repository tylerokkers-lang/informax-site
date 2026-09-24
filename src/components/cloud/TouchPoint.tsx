import Image from "next/image";

const SIZES = {
  sm: { box: "h-[76px] w-[76px] rounded-[14px]", logo: "h-[13px]", label: "text-[13px]", cue: "text-[6px]", pad: "p-2.5" },
  md: { box: "h-[132px] w-[132px] rounded-[22px]", logo: "h-[20px]", label: "text-[22px]", cue: "text-[8px]", pad: "p-4" },
  lg: { box: "h-[208px] w-[208px] rounded-[32px]", logo: "h-[30px]", label: "text-[34px]", cue: "text-[10px]", pad: "p-6" },
} as const;

/**
 * The physical Informax Touch Point, drawn in CSS. Deliberately has no
 * technical symbols: a wordmark, the name of the Space it connects to and a
 * one-line instruction.
 */
export default function TouchPoint({
  label,
  size = "md",
  active = false,
  className = "",
}: {
  label: string;
  size?: keyof typeof SIZES;
  /** Soft pulse ring, used when the Touch Point is being demonstrated. */
  active?: boolean;
  className?: string;
}) {
  const s = SIZES[size];
  return (
    <div className={`relative inline-block ${className}`}>
      {active && (
        <span
          aria-hidden="true"
          className={`animate-tp-pulse absolute inset-0 border border-glow/60 ${s.box}`}
        />
      )}
      <div
        className={`relative flex flex-col justify-between border border-white/15 bg-gradient-to-b from-[#2a2a36] to-[#14141c] text-left shadow-[0_18px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.12)] ${s.box} ${s.pad}`}
      >
        <Image
          src="/informax-logo-white.png"
          alt=""
          width={420}
          height={140}
          className={`w-auto opacity-90 ${s.logo}`}
        />
        <div>
          <div className={`font-serif-display italic leading-none text-white ${s.label}`}>
            {label}
          </div>
          <div className={`mt-1.5 font-semibold uppercase tracking-[0.2em] text-glow/80 ${s.cue}`}>
            Touch or scan
          </div>
        </div>
      </div>
    </div>
  );
}
