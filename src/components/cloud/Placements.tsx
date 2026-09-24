import { PLACEMENTS, type PlacementScene } from "@/lib/spaces";
import { RevealStagger, RevealStaggerItem } from "@/components/Reveal";
import TouchPoint from "./TouchPoint";

/** A tonal, lit surface per placement. Illustrative, no photography. */
function Scene({ scene, space }: { scene: PlacementScene; space: string }) {
  const tp = <TouchPoint label={space.split(" ")[0]} size="sm" />;
  return (
    <div className="relative h-[190px] overflow-hidden bg-gradient-to-b from-[#211f27] to-[#141319]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(243,210,156,0.18),transparent_65%)]" />
      {scene === "wall" && <div className="absolute inset-y-0 left-0 w-[14%] bg-white/[0.03]" />}
      {scene === "lift" && (
        <div className="absolute inset-x-[22%] bottom-0 top-6 flex gap-px">
          <div className="flex-1 bg-white/[0.06]" />
          <div className="flex-1 bg-white/[0.06]" />
        </div>
      )}
      {scene === "bed" && (
        <>
          <div className="absolute inset-x-[10%] bottom-0 h-[46%] bg-white/[0.06]" />
          <div className="absolute inset-x-[16%] bottom-[46%] h-[14%] bg-white/[0.09]" />
        </>
      )}
      {scene === "table" && <div className="absolute inset-x-0 bottom-0 h-[34%] border-t border-white/15 bg-[#2b2620]" />}
      {scene === "desk" && <div className="absolute inset-x-0 bottom-0 h-[38%] border-t border-glow/25 bg-[#2a2620]" />}
      {scene === "pool" && <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-b from-brass-light/25 to-brass/10" />}
      <div
        className={`absolute left-1/2 -translate-x-1/2 ${
          scene === "table" || scene === "desk" ? "bottom-[26%]" : scene === "pool" ? "bottom-[38%]" : "top-1/2 -translate-y-1/2"
        }`}
      >
        {tp}
      </div>
    </div>
  );
}

export default function Placements() {
  return (
    <RevealStagger className="grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">
      {PLACEMENTS.map((p) => (
        <RevealStaggerItem key={p.name} className="border-b border-r border-white/10">
          <Scene scene={p.scene} space={p.space} />
          <div className="p-6">
            <div className="font-serif-display text-[22px] text-white">{p.name}</div>
            <div className="mt-1.5 text-[13px] text-cream-mute">Opens the {p.space} Space</div>
          </div>
        </RevealStaggerItem>
      ))}
    </RevealStagger>
  );
}
