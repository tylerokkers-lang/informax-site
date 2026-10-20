import Image from "next/image";
import { PHOTOS, type PhotoKey } from "@/lib/photography";

const TONES: Record<(typeof PHOTOS)[PhotoKey]["tone"], string> = {
  candle:
    "radial-gradient(60% 55% at 30% 70%, rgba(214,150,84,0.55), transparent 70%), radial-gradient(40% 40% at 78% 30%, rgba(170,104,58,0.35), transparent 70%), linear-gradient(160deg, #2a1a10 0%, #120c09 100%)",
  kitchen:
    "radial-gradient(55% 50% at 65% 35%, rgba(220,226,232,0.32), transparent 70%), radial-gradient(45% 45% at 20% 80%, rgba(182,128,74,0.3), transparent 70%), linear-gradient(160deg, #22272d 0%, #0f1215 100%)",
  linen:
    "radial-gradient(60% 55% at 70% 35%, rgba(244,232,212,0.55), transparent 70%), radial-gradient(45% 45% at 20% 80%, rgba(176,150,120,0.35), transparent 70%), linear-gradient(160deg, #6b5a48 0%, #2f261e 100%)",
  marble:
    "radial-gradient(55% 55% at 35% 30%, rgba(246,244,240,0.7), transparent 70%), radial-gradient(40% 40% at 80% 75%, rgba(190,184,176,0.45), transparent 70%), linear-gradient(160deg, #9c968e 0%, #4a4641 100%)",
  spa:
    "radial-gradient(55% 55% at 60% 35%, rgba(222,232,222,0.55), transparent 70%), radial-gradient(40% 40% at 25% 80%, rgba(120,146,128,0.4), transparent 70%), linear-gradient(160deg, #5b6b60 0%, #252d28 100%)",
  dusk:
    "radial-gradient(60% 50% at 70% 30%, rgba(236,170,120,0.45), transparent 70%), radial-gradient(50% 50% at 20% 80%, rgba(66,92,140,0.45), transparent 70%), linear-gradient(160deg, #2b3550 0%, #11162a 100%)",
};

/**
 * One photograph slot. Until a licensed photograph is supplied for the slot
 * (src/lib/photography.ts), it renders the scene's light as a soft gradient
 * with a visible "Photograph to come" label, so a placeholder can never be
 * mistaken for a finished page.
 */
export default function Photo({
  slot,
  className = "",
  sizes = "100vw",
  priority = false,
  label = true,
  fill = false,
}: {
  slot: PhotoKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Hide the placeholder label where it would collide with overlaid content. */
  label?: boolean;
  /** Cover the nearest positioned parent instead of sizing itself. */
  fill?: boolean;
}) {
  const p = PHOTOS[slot];
  const box = `${fill ? "absolute inset-0" : "relative"} overflow-hidden ${className}`;
  if (p.src) {
    return (
      <div className={box}>
        <Image src={p.src} alt={p.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={`Placeholder for a photograph: ${p.alt}`}
      data-photo-placeholder={slot}
      className={box}
      style={{ background: TONES[p.tone] }}
    >
      <div className="absolute inset-0 opacity-[0.18] mix-blend-overlay [background-image:radial-gradient(rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:3px_3px]" />
      {label ? (
        <p className="absolute bottom-3 left-3 max-w-[calc(100%-24px)] rounded-full bg-black/45 px-3 py-1.5 text-[11px] font-medium leading-tight text-white/85 backdrop-blur-sm">
          Photograph to come: {p.brief}
        </p>
      ) : null}
    </div>
  );
}
