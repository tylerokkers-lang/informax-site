"use client";

import { useEffect, useRef, useState } from "react";
import { FileText, Globe } from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";

const FORMATS = [
  {
    id: "pdf",
    icon: FileText,
    name: "PDF",
    line: "Upload menus, directories, floor plans, guides and more.",
  },
  {
    id: "web",
    icon: Globe,
    name: "Website",
    line: "Connect an existing page from your Hotel website.",
  },
] as const;

function PdfPreview() {
  return (
    <div className="mx-auto w-[210px] bg-white p-5 shadow-[0_24px_60px_rgba(15,15,24,0.18)]">
      <div className="text-[8px] font-semibold uppercase tracking-[0.2em] text-brass-deep">The Grand Hotel</div>
      <div className="mt-3 font-serif-display text-[22px] leading-tight text-ink">Dinner Menu</div>
      <div className="mt-5 space-y-2">
        {[92, 70, 84, 60, 76, 52].map((w, i) => (
          <div key={i} className="h-1 bg-ink/10" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
}

function WebPreview() {
  return (
    <div className="mx-auto w-[280px] border border-line bg-white shadow-[0_24px_60px_rgba(15,15,24,0.18)]">
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className="flex gap-1">
          <i className="h-1.5 w-1.5 rounded-full bg-ink/15" />
          <i className="h-1.5 w-1.5 rounded-full bg-ink/15" />
          <i className="h-1.5 w-1.5 rounded-full bg-ink/15" />
        </span>
        <span className="flex-1 truncate bg-paper-alt px-2 py-0.5 text-[9px] text-ink-mute">hotel.com/dining/reserve</span>
      </div>
      <div className="p-5">
        <div className="font-serif-display text-[22px] leading-tight text-ink">Reserve a table</div>
        <div className="mt-4 grid grid-cols-3 gap-1.5">
          {["19:00", "19:30", "20:00"].map((t) => (
            <div key={t} className="border border-line py-1.5 text-center text-[10px] text-ink-mute">
              {t}
            </div>
          ))}
        </div>
        <div className="mt-4 bg-ink py-2 text-center text-[10px] font-semibold text-white">Book now</div>
      </div>
    </div>
  );
}

export default function ContentFormats() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [mode, setMode] = useState<"pdf" | "web">("pdf");
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (!inView || reduce || manual) return;
    const t = window.setInterval(() => setMode((m) => (m === "pdf" ? "web" : "pdf")), 4200);
    return () => window.clearInterval(t);
  }, [inView, reduce, manual]);

  return (
    <div ref={ref} className="grid items-center gap-12 grid-cols-1 lg:grid-cols-[1fr_1fr] lg:gap-20">
      <div className="grid gap-4">
        {FORMATS.map((f) => {
          const on = f.id === mode;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={on}
              onClick={() => {
                setManual(true);
                setMode(f.id);
              }}
              className={`flex items-start gap-5 border p-6 text-left transition-colors duration-500 ${
                on ? "border-ink bg-panel" : "border-line bg-transparent hover:border-ink/40"
              }`}
            >
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center border ${on ? "border-ink text-ink" : "border-line text-ink-mute"}`}>
                <f.icon size={19} />
              </span>
              <span>
                <span className="block font-serif-display text-[26px] leading-none text-ink">{f.name}</span>
                <span className="mt-3 block max-w-[34ch] text-[15px] leading-relaxed text-ink-mute">{f.line}</span>
              </span>
            </button>
          );
        })}
        <p className="pt-2 text-[14px] text-ink-mute">
          Change between them whenever you want. Nothing at the Touch Point changes.
        </p>
      </div>

      <div className="relative flex min-h-[320px] items-center justify-center bg-paper-alt py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={reduce ? false : { opacity: 0, y: 14, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10, filter: "blur(6px)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {mode === "pdf" ? <PdfPreview /> : <WebPreview />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
