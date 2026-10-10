import { QR_PATH, QR_VIEWBOX } from "@/components/cloud/qr-path";

/** A framed A5 Code card, as Informax can supply it. Illustrative; the Code is the same on every card. */
export default function TouchpointCard() {
  return (
    <div className="relative mx-auto w-full max-w-[320px]">
      <div className="absolute -inset-6 -z-10 rounded-[40px] bg-[radial-gradient(ellipse_at_50%_40%,rgba(6,147,227,0.12),transparent_70%)]" />
      <div className="border-[12px] border-[#18283d] bg-white px-9 py-12 text-center shadow-[0_40px_80px_-30px_rgba(7,20,42,0.55)]" style={{ aspectRatio: "148 / 210" }}>
        <p className="text-[11px] tracking-[0.22em] text-ink-mute">MARLOWE GRAND</p>
        <h3 className="mt-8 font-serif-display text-[30px] leading-tight text-ink">
          Welcome to
          <br />
          Room 324
        </h3>
        <svg viewBox={QR_VIEWBOX} className="mx-auto my-8 h-32 w-32" shapeRendering="crispEdges" role="img" aria-label="An illustrative Code on a framed card">
          <path stroke="#18283d" d={QR_PATH} />
        </svg>
        <p className="text-[13px] text-ink-mute">Scan for your guest directory</p>
      </div>
    </div>
  );
}
