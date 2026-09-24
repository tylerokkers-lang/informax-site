"use client";

import { useEffect, useRef, useState } from "react";
import { Check, FileText, Globe, Link2 } from "lucide-react";
import { useInView, useReducedMotion } from "framer-motion";
import { DEMO_SPACES } from "@/lib/spaces";
import CloudChrome from "./CloudChrome";

const STEPS = ["Choose the Space", "Change content", "Publish"];

/**
 * Scripted product walkthrough: pick a Space, change what it serves from a
 * PDF to a website, publish, and watch every connected Touch Point follow.
 * Runs while on screen; with reduced motion it shows the finished state.
 */
export default function CloudDemo() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [idx, setIdx] = useState(0);
  const [stage, setStage] = useState(0);
  const [typed, setTyped] = useState("");
  const [run, setRun] = useState(0);

  const space = DEMO_SPACES[idx];
  const s = reduce ? 5 : stage;
  const url = reduce ? space.site : typed;
  const litDots = Math.min(space.touchPoints, 24);

  useEffect(() => {
    if (!inView || reduce) return;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => {
      timers.push(window.setTimeout(fn, ms));
    };
    const target = space.site;
    at(1500, () => setStage(1));
    at(2500, () => setStage(2));
    at(3400, () => setStage(3));
    for (let i = 1; i <= target.length; i++) {
      at(3400 + i * 55, () => setTyped(target.slice(0, i)));
    }
    const done = 3400 + target.length * 55 + 600;
    at(done, () => setStage(4));
    at(done + 1000, () => setStage(5));
    at(done + 6500, () => {
      setStage(0);
      setTyped("");
      setRun((r) => r + 1);
    });
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [inView, reduce, space, run]);

  function choose(i: number) {
    setIdx(i);
    setStage(0);
    setTyped("");
    setRun((r) => r + 1);
  }

  const activeStep = s === 0 ? 0 : s < 4 ? 1 : 2;
  const showWebsite = s >= 5;

  return (
    <div ref={ref}>
      <CloudChrome>
        <div className="grid grid-cols-[minmax(0,1fr)] md:grid-cols-[210px_minmax(0,1fr)]">
          <div className="min-w-0 border-b border-white/10 p-3 md:border-b-0 md:border-r md:p-4">
            <div className="mb-3 hidden text-[10px] uppercase tracking-[0.2em] text-cream-mute md:block">
              Spaces
            </div>
            <div className="scrollbar-none -mx-1 flex gap-1.5 overflow-x-auto px-1 md:mx-0 md:flex-col md:gap-1 md:px-0">
              {DEMO_SPACES.map((sp, i) => (
                <button
                  key={sp.id}
                  type="button"
                  onClick={() => choose(i)}
                  aria-pressed={i === idx}
                  className={`flex shrink-0 items-center gap-2.5 border px-3 py-2.5 text-left text-[12.5px] transition-colors duration-300 ${
                    i === idx
                      ? "border-brass-light/40 bg-brass/15 text-white"
                      : "border-transparent text-cream-mute hover:text-white"
                  }`}
                >
                  <sp.icon size={14} className={i === idx ? "text-brass-light" : ""} />
                  <span className="whitespace-nowrap">{sp.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="min-h-[400px] min-w-0 p-4 sm:p-6">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="font-serif-display text-[28px] leading-none text-white">{space.name}</div>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-cream-mute">
                  <Link2 size={12} className="text-brass-light" />
                  Permanent Informax address. Never changes.
                </div>
              </div>
              <div className="text-[11px] text-cream-mute">
                {space.touchPoints} Touch Points connected
              </div>
            </div>

            <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-cream-mute">
              Guests currently see
            </div>
            <div className="flex items-center gap-4 border border-white/12 bg-charcoal-850 p-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/10 text-brass-light">
                {showWebsite ? <Globe size={19} /> : <FileText size={19} />}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[14px] font-medium text-white">
                  {showWebsite ? space.site : space.pdf}
                </div>
                <div className="mt-0.5 text-[11px] text-cream-mute">
                  {showWebsite ? "Website" : "PDF"}
                </div>
              </div>
              <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-moss">
                <span className="h-1.5 w-1.5 rounded-full bg-moss" />
                Live
              </span>
            </div>

            <div className="mt-4 min-h-[148px]">
              {s === 0 && (
                <div className="flex h-[148px] items-center justify-center border border-dashed border-white/15">
                  <span className="border border-white/25 px-4 py-2 text-[12px] text-white">Change content</span>
                </div>
              )}
              {s >= 1 && s < 5 && (
                <div className="border border-brass-light/30 bg-brass/[0.07] p-4">
                  <div className="mb-3 text-[10px] uppercase tracking-[0.2em] text-brass-light">
                    Change content
                  </div>
                  <div className="mb-3 inline-flex border border-white/12 text-[12px]">
                    {["PDF", "Website"].map((opt) => {
                      const on = (opt === "Website") === (s >= 2);
                      return (
                        <span
                          key={opt}
                          className={`px-4 py-1.5 transition-colors duration-500 ${
                            on ? "bg-white text-charcoal-950" : "text-cream-mute"
                          }`}
                        >
                          {opt}
                        </span>
                      );
                    })}
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="min-w-0 flex-1 basis-[180px] border border-white/12 bg-charcoal-950/60 px-3 py-2 text-[13px] text-white">
                      {s >= 3 ? (
                        <>
                          {url}
                          <span className="ml-px inline-block h-3.5 w-px translate-y-0.5 bg-brass-light" />
                        </>
                      ) : (
                        <span className="text-cream-mute">{space.pdf}</span>
                      )}
                    </div>
                    <span
                      className={`px-4 py-2 text-[12px] font-semibold transition-colors duration-500 ${
                        s === 4 ? "bg-white/20 text-white" : "bg-brass text-white"
                      }`}
                    >
                      {s === 4 ? "Publishing" : "Publish"}
                    </span>
                  </div>
                </div>
              )}

              {s >= 5 && (
                <div className="border border-moss/40 bg-moss/[0.07] p-4">
                  <div className="mb-3 flex items-center gap-2 text-[13px] font-medium text-white">
                    <Check size={15} className="text-moss" />
                    {space.touchPoints} Touch Points updated
                  </div>
                  <div className="flex flex-wrap gap-1.5" aria-hidden="true">
                    {Array.from({ length: litDots }, (_, i) => (
                      <span
                        key={i}
                        className="h-2.5 w-2.5 bg-glow"
                        style={
                          reduce
                            ? undefined
                            : { animation: `dot-in 0.5s ${i * 40}ms both` }
                        }
                      />
                    ))}
                    {space.touchPoints > litDots && (
                      <span className="ml-1 text-[11px] text-cream-mute">
                        +{space.touchPoints - litDots}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-[11px] text-cream-mute">
                    Nothing was reinstalled. The Touch Points stayed exactly where they are.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CloudChrome>

      <ol className="mt-5 grid grid-cols-3 gap-3 text-[12px]" aria-label="Steps in the demonstration">
        {STEPS.map((label, i) => (
          <li
            key={label}
            className={`border-t pt-3 transition-colors duration-500 ${
              i <= activeStep ? "border-brass-light text-white" : "border-white/15 text-cream-mute"
            }`}
          >
            <span className="mr-2 font-serif-display italic text-brass-light">0{i + 1}</span>
            {label}
          </li>
        ))}
      </ol>
    </div>
  );
}
