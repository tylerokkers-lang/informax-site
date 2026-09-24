"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import HotelScene from "./HotelScene";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-charcoal-950 text-cream"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-glow-deep/[0.09] to-transparent" />

      <motion.div
        style={{ y: sceneY }}
        className="absolute inset-x-0 top-[84px] h-[40svh] xl:inset-y-0 xl:top-[88px] xl:h-auto xl:pb-16"
      >
        <div className="relative mx-auto h-full max-w-[1500px]">
          <div className="absolute inset-y-0 right-0 w-full xl:w-[58%]">
            <HotelScene className="h-full w-full" />
          </div>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-charcoal-950 via-charcoal-950/40 to-transparent xl:via-charcoal-950/20" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-charcoal-950 to-transparent xl:hidden" />

      <div className="relative z-[2] mx-auto flex w-full max-w-8xl flex-1 flex-col justify-end px-6 pb-14 pt-[calc(40svh+70px)] md:px-10 xl:pb-24 xl:pt-40">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/70"
        >
          <span className="h-px w-8 bg-white/50" />
          Informax Cloud
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 26, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.28 }}
          className="font-serif-display font-medium leading-[0.96] tracking-[-0.015em] text-white text-[clamp(44px,8.4vw,96px)] xl:text-[clamp(44px,5.4vw,84px)]"
        >
          Every space.
          <br />
          <span className="italic text-glow">Connected.</span>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
          className="mt-6 max-w-[44ch] text-[16px] leading-relaxed text-white/75 md:mt-7 md:text-[18px]"
        >
          Informax Cloud gives every part of your hotel a permanent digital
          Space. Connect Touch Points throughout your property and change
          what guests see whenever you want.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.66 }}
          className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 md:mt-10"
        >
          <Link
            href="/informax-cloud"
            className="group inline-flex items-center gap-2.5 border-b border-white/40 pb-1 text-[15px] font-medium text-white transition-colors duration-300 hover:border-white"
          >
            Discover Informax Cloud
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <Link href="/how-it-works" className="text-[15px] font-medium text-white/60 transition-colors duration-300 hover:text-white">
            See how it works
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
