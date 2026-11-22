"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/*
 * Every entrance starts from the same "hidden" state on the server and in the
 * browser, so the markup always matches. Reduced motion is passed as `custom`
 * and only changes the "show" transition: it appears at once.
 */
type Custom = { reduce: boolean; delay?: number };

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: ({ reduce, delay = 0 }: Custom) => ({
    opacity: 1,
    y: 0,
    transition: reduce ? { duration: 0 } : { duration: 0.9, ease: EASE, delay },
  }),
};

const itemBlur: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
  show: ({ reduce, delay = 0 }: Custom) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: reduce ? { duration: 0 } : { duration: 1, ease: EASE, delay },
  }),
};

export function Reveal({
  children,
  className,
  delay = 0,
  blur = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Soft blur-to-sharp entrance. Use on headings and small blocks only. */
  blur?: boolean;
}) {
  const reduce = Boolean(useReducedMotion());
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={blur ? itemBlur : item}
      custom={{ reduce, delay } satisfies Custom}
    >
      {children}
    </motion.div>
  );
}

const stagger: Variants = {
  hidden: {},
  show: ({ reduce }: Custom) => ({ transition: { staggerChildren: reduce ? 0 : 0.1 } }),
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: ({ reduce }: Custom) => ({ opacity: 1, y: 0, transition: reduce ? { duration: 0 } : { duration: 0.7, ease: EASE } }),
};

export function RevealStagger({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = Boolean(useReducedMotion());
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={stagger}
      custom={{ reduce } satisfies Custom}
    >
      {children}
    </motion.div>
  );
}

export function RevealStaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = Boolean(useReducedMotion());
  return (
    <motion.div className={className} variants={staggerItem} custom={{ reduce } satisfies Custom}>
      {children}
    </motion.div>
  );
}
