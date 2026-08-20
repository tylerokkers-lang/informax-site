"use client";

import { motion } from "framer-motion";
import { Layers, Nfc } from "lucide-react";
import { BtnGhost, BtnPrimary } from "@/components/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-charcoal-950 text-cream pt-[150px] pb-32 md:pt-[170px] md:pb-40">
      <div className="absolute inset-0 bg-grid-fade-dark pointer-events-none" />
      <div className="absolute -top-52 -right-32 w-[640px] h-[640px] rounded-full bg-[radial-gradient(circle,rgba(86,67,224,0.22),transparent_70%)] blur-[20px] pointer-events-none" />
      <div className="absolute bottom-0 -left-40 w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(255,107,78,0.14),transparent_70%)] blur-[20px] pointer-events-none" />

      <div className="relative z-[2] mx-auto max-w-8xl px-6 md:px-8 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-16 lg:gap-10 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.16em] uppercase mb-6 text-brass-light"
          >
            <span className="h-px w-[22px] inline-block bg-brass-light" />
            Digital Design &amp; Development Studio
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="font-serif-display font-medium text-[clamp(36px,4.4vw,56px)] leading-[1.1] tracking-tight text-white mb-7"
          >
            Digital experiences,{" "}
            <em className="not-italic italic text-brass-light">
              designed around your business.
            </em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            className="text-lg leading-relaxed text-cream-mute max-w-[500px] mb-10"
          >
            Informax designs and builds websites, digital brochures,
            directories and bespoke digital experiences — turning the
            information your business needs to share into something
            professional, useful and engaging.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
            className="flex flex-wrap items-center gap-5"
          >
            <BtnPrimary href="/enquire">Start a Project</BtnPrimary>
            <BtnGhost href="/services" tone="dark">
              Explore Our Services
            </BtnGhost>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}
            className="flex items-center gap-2.5 text-[13.5px] text-cream-mute mt-9"
          >
            <Layers size={15} className="text-brass-light shrink-0" />
            Websites · Digital Brochures · Directories · Hospitality ·
            Bespoke
          </motion.div>
        </div>

        <div className="relative flex items-center justify-center min-h-[420px] md:min-h-[540px]">
          {/* Laptop — website */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.25 }}
            className="absolute left-1/2 top-[6%] w-[300px] sm:w-[340px] -translate-x-[62%] -rotate-[2.5deg]"
          >
            <div className="rounded-t-xl border border-line-dark bg-gradient-to-br from-charcoal-800 to-charcoal-850 p-2.5 shadow-[0_50px_90px_-30px_rgba(0,0,0,0.7)]">
              <div className="rounded-[6px] overflow-hidden bg-panel">
                <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-coral" />
                  <span className="h-2 w-2 rounded-full bg-brass-light" />
                  <span className="h-2 w-2 rounded-full bg-line" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-2.5 w-16 rounded-full bg-ink/80" />
                    <div className="flex gap-2">
                      <div className="h-2 w-8 rounded-full bg-ink-mute/40" />
                      <div className="h-2 w-8 rounded-full bg-ink-mute/40" />
                      <div className="h-5 w-14 rounded-full bg-brass" />
                    </div>
                  </div>
                  <div className="h-3 w-3/4 rounded-full bg-ink/80 mb-2" />
                  <div className="h-3 w-1/2 rounded-full bg-ink/50 mb-4" />
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-14 rounded-md bg-gradient-to-br from-brass-light/50 to-brass/20" />
                    <div className="h-14 rounded-md bg-paper-alt" />
                    <div className="h-14 rounded-md bg-gradient-to-br from-coral-light/50 to-coral/20" />
                  </div>
                </div>
              </div>
            </div>
            <div className="h-2.5 rounded-b-xl bg-gradient-to-b from-charcoal-700 to-charcoal-850 border-x border-b border-line-dark" />
          </motion.div>

          {/* Tablet — brochure */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.4 }}
            className="absolute right-[2%] bottom-[18%] sm:bottom-[16%] w-[130px] sm:w-[150px] rotate-[6deg] z-[3]"
          >
            <div className="rounded-2xl border border-line-dark bg-gradient-to-br from-charcoal-800 to-charcoal-900 p-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.65)]">
              <div className="aspect-[3/4] rounded-lg overflow-hidden bg-panel p-3 flex flex-col">
                <span className="text-[7px] font-bold uppercase tracking-[0.1em] text-coral-deep mb-1.5">
                  Brochure
                </span>
                <div className="h-2 w-4/5 rounded-full bg-ink/80 mb-1" />
                <div className="h-2 w-3/5 rounded-full bg-ink/50 mb-3" />
                <div className="flex-1 rounded-md bg-gradient-to-br from-coral-light/60 to-brass-light/30" />
                <div className="mt-2 h-1.5 w-full rounded-full bg-ink-mute/25" />
                <div className="mt-1 h-1.5 w-4/5 rounded-full bg-ink-mute/25" />
              </div>
            </div>
          </motion.div>

          {/* Phone — directory */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.55 }}
            className="absolute left-[6%] sm:left-[10%] bottom-0 w-[110px] sm:w-[128px] rotate-[-8deg] z-[4] animate-float-slow"
          >
            <div className="rounded-[20px] border border-line-dark bg-gradient-to-br from-charcoal-800 to-charcoal-850 p-1.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.65)]">
              <div className="aspect-[9/18] rounded-[14px] overflow-hidden bg-panel p-2.5 flex flex-col gap-1.5">
                <span className="text-[6.5px] font-bold uppercase tracking-[0.1em] text-brass-deep text-center mb-0.5">
                  Directory
                </span>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 rounded-md border border-line-soft bg-paper px-1.5 py-1.5"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-brass shrink-0" />
                    <div className="h-1.5 flex-1 rounded-full bg-ink-mute/30" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="hidden sm:flex absolute right-[8%] top-[2%] items-center gap-2 rounded-xl border border-line-dark bg-charcoal-800 px-3.5 py-2.5 text-xs font-semibold text-cream shadow-[0_20px_45px_-18px_rgba(0,0,0,0.6)] z-[5] animate-float-slow">
            <Nfc size={16} className="text-brass-light" />
            NFC &amp; QR ready
          </div>
        </div>
      </div>
    </section>
  );
}
