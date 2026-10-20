"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Drives a step-by-step demonstration. It advances on its own only while the
 * demo is on screen, never under reduced motion, and stops for good once the
 * visitor chooses a step themselves (their choice is never taken away).
 */
export function useSteps(count: number, intervalMs = 5200) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [manual, setManual] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const playing = visible && !reduce && !manual && !paused;

  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => setStep((s) => (s + 1) % count), intervalMs);
    return () => window.clearTimeout(t);
  }, [playing, step, count, intervalMs]);

  return {
    ref,
    step,
    playing,
    intervalMs,
    choose: (i: number) => {
      setManual(true);
      setStep(((i % count) + count) % count);
    },
    /** Hover and keyboard focus pause the demo without ending it. */
    pauseProps: {
      onMouseEnter: () => setPaused(true),
      onMouseLeave: () => setPaused(false),
      onFocus: () => setPaused(true),
      onBlur: () => setPaused(false),
    },
  };
}
