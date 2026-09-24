import type { ReactNode } from "react";
import { Cloud } from "lucide-react";

/** Window frame shared by every Informax Cloud interface mockup so they read as one product. */
export default function CloudChrome({
  children,
  hotel = "The Grand Hotel",
  className = "",
}: {
  children: ReactNode;
  hotel?: string;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden border border-white/12 bg-charcoal-900 shadow-[0_40px_90px_rgba(0,0,0,0.35)] ${className}`}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center bg-brass text-white">
            <Cloud size={13} />
          </span>
          <span className="text-[12px] font-semibold text-white">Informax Cloud</span>
        </div>
        <span className="text-[11px] text-cream-mute">{hotel}</span>
      </div>
      {children}
    </div>
  );
}
