"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { BedDouble, ChevronRight, Clock, Compass, ConciergeBell, Sparkles, UtensilsCrossed, Wifi } from "lucide-react";

const SECTIONS = [
  { icon: UtensilsCrossed, title: "Dining", note: "Terrazza open until 22:30" },
  { icon: Sparkles, title: "Spa & Wellness", note: "Book a treatment" },
  { icon: BedDouble, title: "Your Room", note: "Housekeeping and in-room dining" },
  { icon: ConciergeBell, title: "Guest Services", note: "Boat transfers, laundry, requests" },
  { icon: Compass, title: "Explore Lake Como", note: "Bellagio, Varenna, Villa del Balbianello" },
];

/**
 * A guest-facing directory Informax designs, shown on a phone. The row a
 * guest would open next softly highlights in turn: finding things is the
 * point.
 */
export default function DirectoryShowcase({ tone = "light" }: { tone?: "light" | "dark" }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const t = window.setInterval(() => setActive((i) => (i + 1) % SECTIONS.length), 2400);
    return () => window.clearInterval(t);
  }, [inView, reduce]);

  return (
    <div
      ref={ref}
      role="img"
      aria-label="A Maison Aurelia digital guest directory on a phone: Dining, Spa and Wellness, Your Room, Guest Services and Explore Lake Como."
      className="mx-auto w-full max-w-[340px]"
    >
      <div
        className={`rounded-[46px] p-2 ${tone === "dark" ? "bg-[#0a0d14] shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_40px_80px_-30px_rgba(0,0,0,0.8)]" : "bg-charcoal-950 shadow-[0_40px_80px_-30px_rgba(15,15,24,0.45)]"}`}
        aria-hidden
      >
        <div className="overflow-hidden rounded-[38px] bg-[#f7f4ee]">
          <div className="relative h-[210px] overflow-hidden bg-[linear-gradient(170deg,#2c3e50_0%,#51708a_42%,#c9b79c_78%,#e8dcc6_100%)]">
            <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(20,24,32,0.55))]" />
            <svg viewBox="0 0 340 210" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
              <path d="M0 150 C60 120 110 132 170 118 C230 104 280 126 340 112 L340 210 L0 210 Z" fill="#2e3b46" opacity="0.55" />
              <path d="M0 168 C80 150 150 164 220 152 C270 144 310 156 340 150 L340 210 L0 210 Z" fill="#1d2731" opacity="0.7" />
            </svg>
            <div className="absolute left-5 top-7 text-[9px] font-semibold uppercase tracking-[0.26em] text-white/85">Maison Aurelia</div>
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <div className="font-serif-display text-[26px] leading-tight">Buonasera, Sofia.</div>
              <div className="mt-1 flex items-center gap-3 text-[11px] text-white/80">
                <span className="flex items-center gap-1">
                  <Wifi size={12} /> Aurelia-Guest
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} /> Check-out 12:00
                </span>
              </div>
            </div>
          </div>
          <div className="px-4 pb-6 pt-4">
            {SECTIONS.map((sct, i) => {
              const on = !reduce && i === active;
              return (
                <div
                  key={sct.title}
                  className={`flex items-center gap-3 rounded-[16px] px-3 py-3 transition-colors duration-500 ${on ? "bg-white shadow-[0_6px_18px_rgba(20,20,28,0.08)]" : ""}`}
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-500 ${on ? "bg-[#1f2a33] text-white" : "bg-[#ece6db] text-[#5b4d39]"}`}>
                    <sct.icon size={16} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[14px] font-medium text-[#1d1b18]">{sct.title}</div>
                    <div className="truncate text-[11.5px] text-[#8a8175]">{sct.note}</div>
                  </div>
                  <ChevronRight size={15} className="text-[#b3a996]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
