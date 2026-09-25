"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ChoiceTile } from "@/components/product/ui";
import { DocumentIcon, LockIcon, WebsiteIcon } from "@/components/product/icons";

const FORMATS = [
  { id: "pdf", title: "Upload a PDF", detail: "A guide, menu or document", Icon: DocumentIcon },
  { id: "web", title: "Use a website", detail: "A page on your own site", Icon: WebsiteIcon },
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
      <div className="ixp rounded-[28px] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_30px_70px_-30px_rgba(2,6,14,0.6)] sm:p-7">
        <h4 className="text-[17px] font-medium tracking-normal">What should guests see?</h4>
        <div className="mt-4 grid gap-3">
          {FORMATS.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={f.id === mode}
              onClick={() => {
                setManual(true);
                setMode(f.id);
              }}
              className="block w-full text-left"
            >
              <ChoiceTile
                selected={f.id === mode}
                icon={<f.Icon size={22} />}
                title={f.title}
                detail={f.detail}
              />
            </button>
          ))}
        </div>
        <p className="mt-5 flex items-center gap-2 text-[13px] text-ix-dim">
          <LockIcon size={14} />
          Your Space URL and connected Touch Points stay the same.
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
