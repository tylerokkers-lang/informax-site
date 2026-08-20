"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Nfc, QrCode } from "lucide-react";
import { BtnGhost, BtnPrimary } from "@/components/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-charcoal-950 text-cream pt-[150px] pb-28 md:pt-[170px] md:pb-32">
      <div className="absolute inset-0 bg-grid-fade-dark pointer-events-none" />
      <div className="absolute -top-52 -right-32 w-[640px] h-[640px] rounded-full bg-[radial-gradient(circle,rgba(111,224,172,0.16),transparent_70%)] blur-[20px] pointer-events-none" />

      <div className="relative z-[2] mx-auto max-w-8xl px-6 md:px-8 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-16 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.16em] uppercase mb-6 text-brass-light"
          >
            <span className="h-px w-[22px] inline-block bg-brass-light" />
            Digital Guest Experience for Hospitality
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="font-serif-display font-medium text-[clamp(36px,4.6vw,58px)] leading-[1.1] tracking-tight text-white mb-7"
          >
            Your hotel has more to say.
            <br />
            Give guests a reason to{" "}
            <em className="not-italic italic text-brass-light">discover it.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            className="text-lg leading-relaxed text-cream-mute max-w-[500px] mb-10"
          >
            Informax transforms the physical guest journey into a personalised
            digital experience — giving hotels a smarter way to showcase
            their facilities, services, experiences and information.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
            className="flex flex-wrap items-center gap-5"
          >
            <BtnPrimary href="/#how-it-works">See How Informax Works</BtnPrimary>
            <BtnGhost href="/enquire" tone="dark">
              Enquire About Informax
            </BtnGhost>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}
            className="flex items-center gap-2.5 text-[13.5px] text-cream-mute mt-9"
          >
            <span className="h-[7px] w-[7px] rounded-full bg-brass-light shadow-[0_0_0_4px_rgba(111,224,172,0.18)]" />
            Built exclusively for hotels, resorts &amp; serviced apartments
          </motion.div>
        </div>

        <div className="relative flex items-center justify-center min-h-[460px] md:min-h-[560px]">
          <div className="absolute w-[400px] h-[400px] md:w-[430px] md:h-[430px] rounded-full border border-dashed border-line-dark animate-orbit" />

          <div className="relative z-[2] w-[260px] md:w-[280px] rounded-[38px] border border-line-dark bg-gradient-to-br from-charcoal-800 to-charcoal-850 p-3.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] animate-float-phone">
            <div className="w-[76px] h-1.5 rounded-full bg-white/[0.14] mx-auto mb-4" />
            <div className="rounded-[26px] overflow-hidden min-h-[380px] md:min-h-[420px] relative bg-gradient-to-b from-charcoal-900 to-charcoal-850 flex flex-col items-center justify-center text-center px-5 pt-12 pb-11">
              <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[220px] h-[220px] rounded-full bg-[radial-gradient(circle,rgba(111,224,172,0.24),transparent_70%)] blur-[6px] pointer-events-none" />
              <Image
                src="/informax-logo-white.png"
                alt=""
                aria-hidden
                width={280}
                height={90}
                priority
                className="relative h-11 w-auto mb-7"
              />
              <div className="relative font-serif-display text-xl font-medium leading-snug text-cream">
                Welcome to the
              </div>
              <div className="relative font-serif-display italic text-xl font-medium leading-snug text-brass-light mb-8">
                Grand Hotel
              </div>
              <div className="relative flex items-center gap-2 text-xs font-semibold tracking-wide text-cream-mute border border-line-dark rounded-full px-4 py-2.5 animate-pulse-ring">
                <Nfc size={15} className="text-brass-light" />
                Tap anywhere to begin
              </div>
            </div>
          </div>

          <div className="hidden sm:flex absolute right-[-6px] top-14 items-center gap-2 rounded-xl border border-line-dark bg-charcoal-800 px-3.5 py-2.5 text-xs font-semibold text-cream shadow-[0_20px_45px_-18px_rgba(0,0,0,0.6)] z-[3] animate-float-slow">
            <Nfc size={16} className="text-brass-light" />
            NFC tap
          </div>
          <div
            className="hidden sm:flex absolute left-[-14px] bottom-[70px] items-center gap-2 rounded-xl border border-line-dark bg-charcoal-800 px-3.5 py-2.5 text-xs font-semibold text-cream shadow-[0_20px_45px_-18px_rgba(0,0,0,0.6)] z-[3] animate-float-slow"
            style={{ animationDelay: "2.4s" }}
          >
            <QrCode size={16} className="text-brass-light" />
            Or scan the QR
          </div>
        </div>
      </div>
    </section>
  );
}
