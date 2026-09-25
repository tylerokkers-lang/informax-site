"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";

/**
 * Tiny film engine for the product animations. No animation library: a
 * list of timed marks drives plain React state, CSS does the movement.
 * A film only runs while it is on screen; leaving the viewport clears every
 * timer (nothing runs in the background) and re-entering restarts it.
 */

/* --------------------------------- Scaling --------------------------------- */

/**
 * Fit a fixed-size logical stage into its container. Scale is measured in a
 * ResizeObserver callback (which also fires on first observe), so there is
 * no synchronous state update inside an effect.
 */
export function useFit(logicalWidth: number, maxScale = 1) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setScale(Math.min(maxScale, el.clientWidth / logicalWidth));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [logicalWidth, maxScale]);

  return { ref, scale };
}

/* --------------------------------- The clock ------------------------------- */

export interface CursorEvent {
  t: number;
  /** `data-cur` id to move to. `null` hides the pointer. */
  target: string | null;
  /** Press at the current position instead of moving. */
  click?: boolean;
}

interface CursorState {
  x: number;
  y: number;
  on: boolean;
}

export interface FilmAction {
  t: number;
  name: string;
}

export function useFilm({
  stages,
  cursor = [],
  actions = [],
  onAction,
  total,
  active,
  measure,
}: {
  /** Absolute times (ms) at which the stage number increments. Module-level constant. */
  stages: readonly number[];
  cursor?: readonly CursorEvent[];
  /** Imperative moments (such as a smooth scroll) that are not React state. */
  actions?: readonly FilmAction[];
  onAction?: (name: string) => void;
  /** Loop length in ms, including the closing pause. */
  total: number;
  active: boolean;
  measure?: (target: string) => { x: number; y: number } | null;
}) {
  const actionRef = useRef(onAction);
  useEffect(() => {
    actionRef.current = onAction;
  });
  const [stage, setStage] = useState(0);
  const [run, setRun] = useState(0);
  const [cur, setCur] = useState<CursorState>({ x: 0, y: 0, on: false });
  const [clicks, setClicks] = useState(0);
  const [pressing, setPressing] = useState(false);

  useEffect(() => {
    if (!active) return;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => {
      timers.push(window.setTimeout(fn, ms));
    };

    at(0, () => {
      setStage(0);
      setCur((c) => ({ ...c, on: false }));
      actionRef.current?.("reset");
    });
    stages.forEach((t, i) => at(t, () => setStage(i + 1)));
    actions.forEach((a) => at(a.t, () => actionRef.current?.(a.name)));

    cursor.forEach((ev) => {
      at(ev.t, () => {
        if (ev.target === null) {
          setCur((c) => ({ ...c, on: false }));
          return;
        }
        if (ev.click) {
          setPressing(true);
          setClicks((n) => n + 1);
          timers.push(window.setTimeout(() => setPressing(false), 220));
          return;
        }
        requestAnimationFrame(() => {
          const p = measure?.(ev.target as string);
          if (p) setCur({ x: p.x, y: p.y, on: true });
        });
      });
    });

    at(total, () => setRun((r) => r + 1));
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [active, run, stages, cursor, actions, total, measure]);

  return { stage, cur, clicks, pressing };
}

/** Measures a `data-cur` element's pointer position in the stage's own (unscaled) coordinates. */
export function useMeasure(stageRef: RefObject<HTMLElement | null>, scale: number | null) {
  return useCallback(
    (target: string) => {
      const stage = stageRef.current;
      if (!stage) return null;
      const el = stage.querySelector<HTMLElement>(`[data-cur="${target}"]`);
      if (!el) return null;
      const s = stage.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      const k = scale || 1;
      return { x: (r.left - s.left + r.width * 0.5) / k, y: (r.top - s.top + r.height * 0.55) / k };
    },
    [stageRef, scale],
  );
}

/* --------------------------------- Helpers --------------------------------- */

export function useTyper(text: string, on: boolean, cps = 15) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!on) {
      const t = window.setTimeout(() => setN(0), 0);
      return () => window.clearTimeout(t);
    }
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setN(i);
      if (i >= text.length) window.clearInterval(id);
    }, 1000 / cps);
    return () => window.clearInterval(id);
  }, [on, text, cps]);
  return text.slice(0, n);
}

/** Eases 0 to `target` once when `on` becomes true. Not continuous. */
export function useCountUp(target: number, on: boolean, ms = 1100) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!on) {
      const t = window.setTimeout(() => setV(0), 0);
      return () => window.clearTimeout(t);
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / ms);
      setV(Math.round(target * (1 - (1 - p) ** 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on, target, ms]);
  return v;
}

export const fmt = (n: number) => n.toLocaleString("en-GB");

/* ---------------------------------- Cursor --------------------------------- */

export function Cursor({ x, y, on, clicks, tap = false }: { x: number; y: number; on: boolean; clicks: number; tap?: boolean }) {
  if (tap) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-50"
        style={{
          transform: `translate(${x}px, ${y}px)`,
          opacity: on ? 1 : 0,
          transition: "transform 850ms cubic-bezier(0.32, 0.72, 0, 1), opacity 300ms ease",
        }}
      >
        <span className="absolute -left-[17px] -top-[17px] h-[34px] w-[34px] rounded-full border border-white/50 bg-white/25 shadow-[0_2px_10px_rgba(2,6,14,0.4)]" />
        {clicks > 0 && (
          <span
            key={clicks}
            className="absolute -left-[17px] -top-[17px] h-[34px] w-[34px] rounded-full border-2 border-white/70"
            style={{ animation: "ixp-click 520ms cubic-bezier(0.22,1,0.36,1) both" }}
          />
        )}
      </div>
    );
  }
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 z-50"
      style={{
        transform: `translate(${x}px, ${y}px)`,
        opacity: on ? 1 : 0,
        transition: "transform 950ms cubic-bezier(0.32, 0.72, 0, 1), opacity 300ms ease",
      }}
    >
      {clicks > 0 && (
        <span
          key={clicks}
          className="absolute -left-[13px] -top-[13px] h-[26px] w-[26px] rounded-full border-2 border-white/70"
          style={{ animation: "ixp-click 520ms cubic-bezier(0.22,1,0.36,1) both" }}
        />
      )}
      <svg width="20" height="22" viewBox="0 0 20 22" fill="none" style={{ filter: "drop-shadow(0 2px 4px rgba(2,6,14,0.5))" }}>
        <path d="M3 2l13 6.6-5.8 1.7L7.6 16 3 2z" fill="#fff" stroke="#0b1524" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
