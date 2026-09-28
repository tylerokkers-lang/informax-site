import Image from "next/image";
import { QR_PATH, QR_VIEWBOX } from "@/components/cloud/qr-path";

/**
 * The Informax Access Point: one consistent physical object in a small set
 * of approved colourways. The structure never changes (mark at the top, the
 * code in the centre, the place at the foot); only the finish does.
 *
 * The Code (the permanent identity connected to a Room, Area or Space) is
 * framed quietly, like a hallmark rather than a sticker. The drawn Code is
 * illustrative, not the production Code system, and the centre mark stays
 * Informax's: colourways change the finish, never the mark. The public site never names the
 * technology behind it, so the object stays flexible: a future
 * Touch-enabled Access Point keeps the same face.
 */

export type Colourway = "navy" | "platinum" | "stone" | "graphite";

const FINISH: Record<Colourway, { plate: string; text: string; sub: string; logo: string; edge: string }> = {
  navy: {
    plate: "bg-[linear-gradient(160deg,#16294a_0%,#0b1524_70%)]",
    text: "text-white",
    sub: "text-white/55",
    logo: "",
    edge: "shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_24px_50px_-18px_rgba(6,10,18,0.65)] ring-1 ring-white/10",
  },
  platinum: {
    plate: "bg-[linear-gradient(160deg,#fbfbfd_0%,#e3e7ee_100%)]",
    text: "text-[#0b1524]",
    sub: "text-[#0b1524]/50",
    logo: "brightness-0 opacity-80",
    edge: "shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_24px_50px_-20px_rgba(11,21,36,0.35)] ring-1 ring-[#0b1524]/10",
  },
  stone: {
    plate: "bg-[linear-gradient(160deg,#efe9df_0%,#ddd4c6_100%)]",
    text: "text-[#2b2620]",
    sub: "text-[#2b2620]/50",
    logo: "brightness-0 opacity-75",
    edge: "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_24px_50px_-20px_rgba(43,38,32,0.35)] ring-1 ring-[#2b2620]/10",
  },
  graphite: {
    plate: "bg-[linear-gradient(160deg,#3a3d44_0%,#1f2126_100%)]",
    text: "text-white",
    sub: "text-white/50",
    logo: "",
    edge: "shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_24px_50px_-18px_rgba(0,0,0,0.6)] ring-1 ring-white/10",
  },
};

const SIZES = {
  sm: { plate: "w-[104px] rounded-[18px] p-3", logo: "h-[8px]", code: "w-[40%] rounded-[6px] p-[3px]", label: "text-[12px]", sub: "text-[7px]" },
  md: { plate: "w-[156px] rounded-[24px] p-4", logo: "h-[11px]", code: "w-[40%] rounded-[8px] p-[4px]", label: "text-[17px]", sub: "text-[9px]" },
  lg: { plate: "w-[216px] rounded-[30px] p-5", logo: "h-[14px]", code: "w-[40%] rounded-[10px] p-[6px]", label: "text-[22px]", sub: "text-[10.5px]" },
} as const;

export default function AccessPoint({
  place,
  colourway = "navy",
  size = "md",
  className = "",
}: {
  place: string;
  colourway?: Colourway;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const f = FINISH[colourway];
  const s = SIZES[size];
  return (
    <div
      role="img"
      aria-label={`Informax Access Point for ${place}`}
      className={`relative flex aspect-[3/4] shrink-0 flex-col ${s.plate} ${f.plate} ${f.edge} ${className}`}
    >
      <Image src="/informax-logo-white.png" alt="" width={420} height={140} className={`w-auto self-start ${s.logo} ${f.logo}`} />
      <div className="flex flex-1 items-center justify-center">
        <div className={`aspect-square bg-white ${s.code} shadow-[0_0_0_1px_rgba(11,21,36,0.06),0_1px_2px_rgba(0,0,0,0.08)]`}>
          <svg viewBox={QR_VIEWBOX} className="h-full w-full" shapeRendering="crispEdges" aria-hidden>
            <path stroke="#0b1524" d={QR_PATH} />
          </svg>
        </div>
      </div>
      <p className={`font-serif-display leading-tight ${s.label} ${f.text}`}>{place}</p>
      <p className={`mt-0.5 font-medium ${s.sub} ${f.sub}`}>Guest information</p>
    </div>
  );
}
