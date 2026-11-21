import Image from "next/image";
import { QR_PATH, QR_VIEWBOX } from "@/components/cloud/qr-path";

/**
 * The Informax Scan Point as a physical object: a small plate with the mark
 * at the top, the Code in the middle and the place at the foot. The drawn
 * Code is illustrative, never a working Code. Sizes are fluid: the plate is
 * as wide as its container, and its type scales with it (container units).
 */
export type Finish = "navy" | "ivory" | "stone" | "graphite";

const FINISH: Record<Finish, { plate: string; text: string; sub: string; logo: string }> = {
  navy: {
    plate:
      "bg-[linear-gradient(165deg,#1b3154_0%,#0b1524_72%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.16),inset_0_-1px_0_rgba(0,0,0,0.4),0_30px_50px_-22px_rgba(6,10,18,0.7)] ring-1 ring-white/10",
    text: "text-white",
    sub: "text-white/55",
    logo: "",
  },
  ivory: {
    plate:
      "bg-[linear-gradient(165deg,#ffffff_0%,#eceef2_100%)] shadow-[inset_0_1px_0_#fff,inset_0_-1px_0_rgba(11,21,36,0.08),0_30px_50px_-24px_rgba(11,21,36,0.45)] ring-1 ring-[#0b1524]/8",
    text: "text-[#0b1524]",
    sub: "text-[#0b1524]/50",
    logo: "brightness-0 opacity-80",
  },
  stone: {
    plate:
      "bg-[linear-gradient(165deg,#f3eee6_0%,#ddd4c5_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(43,38,32,0.1),0_30px_50px_-24px_rgba(43,38,32,0.5)] ring-1 ring-[#2b2620]/10",
    text: "text-[#2b2620]",
    sub: "text-[#2b2620]/55",
    logo: "brightness-0 opacity-75",
  },
  graphite: {
    plate:
      "bg-[linear-gradient(165deg,#41454d_0%,#1c1e23_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-1px_0_rgba(0,0,0,0.5),0_30px_50px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/10",
    text: "text-white",
    sub: "text-white/50",
    logo: "",
  },
};

export default function ScanPoint({
  place,
  sub = "Scan for guest information",
  finish = "navy",
  className = "",
  pulse,
  standing = true,
  decorative = false,
}: {
  place: string;
  sub?: string;
  finish?: Finish;
  className?: string;
  /** Change this value to replay the "just updated" ring. */
  pulse?: number | string | null;
  /** Draw a contact shadow, as if the plate stands on a surface. */
  standing?: boolean;
  decorative?: boolean;
}) {
  const f = FINISH[finish];
  return (
    <div
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : `Informax Scan Point: ${place}`}
      // Positioned by the caller when it passes "absolute"; otherwise relative, for the ring and shadow.
      className={`${/\babsolute\b/.test(className) ? "" : "relative"} isolate [container-type:inline-size] ${className}`}
    >
      {standing ? <span aria-hidden className="x-contact-shadow" /> : null}
      {pulse !== undefined && pulse !== null ? (
        <span
          key={String(pulse)}
          aria-hidden
          className="x-ping pointer-events-none absolute -inset-[6%] rounded-[16cqw] ring-2 ring-brass-light/70"
        />
      ) : null}
      <div className={`relative flex aspect-[3/4] flex-col rounded-[14cqw] p-[11cqw] ${f.plate}`}>
        <Image
          src="/brand/informax-logo-white-trim.png"
          alt=""
          width={80}
          height={24}
          className={`h-auto w-[36cqw] self-start ${f.logo}`}
        />
        <div className="flex flex-1 items-center justify-center">
          <div className="aspect-square w-[42cqw] rounded-[5cqw] bg-white p-[3cqw] shadow-[0_0_0_1px_rgba(11,21,36,0.06),0_1px_2px_rgba(0,0,0,0.1)]">
            <svg viewBox={QR_VIEWBOX} className="h-full w-full" shapeRendering="crispEdges" aria-hidden>
              <path stroke="#0b1524" d={QR_PATH} />
            </svg>
          </div>
        </div>
        <p className={`x-title truncate text-[11.5cqw] leading-tight ${f.text}`}>{place}</p>
        <p className={`mt-[1.5cqw] truncate text-[6.4cqw] font-medium ${f.sub}`}>{sub}</p>
      </div>
    </div>
  );
}
