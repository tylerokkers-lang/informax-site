"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const X0 = 90;
const Y0 = 175;
const W = 155;
const H = 125;
const COLS = 4;

// row (0 = top floor), col, label, warmth of the lit room, has Touch Point
const CELLS: [number, number, string, number, boolean][] = [
  [0, 0, "Meetings & Events", 0.9, true],
  [0, 1, "Executive Lounge", 1, true],
  [0, 2, "Bedrooms", 0.45, true],
  [0, 3, "Bedrooms", 0.7, false],
  [1, 0, "Restaurants", 1, true],
  [1, 1, "Gym", 0.75, true],
  [1, 2, "Bedrooms", 0.55, false],
  [1, 3, "Guest Directory", 0.5, true],
  [2, 0, "Reception", 0.95, true],
  [2, 1, "Spa", 1, true],
  [2, 2, "Pool", 0.6, true],
  [2, 3, "Restaurants", 0.85, false],
];

const arcY = (x: number) => 40 + 100 * ((x - 400) / 340) ** 2;
const colX = (c: number) => X0 + W * c + W / 2;

/**
 * Illustrative hotel section. Warm rooms are the physical property; the
 * indigo arc above is Informax Cloud; each column carries a fine riser of
 * light connecting every Touch Point in it to the Cloud.
 */
export default function HotelScene({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const base = reduce ? false : undefined;

  return (
    <svg
      viewBox="0 0 800 600"
      className={className}
      role="img"
      aria-label="A hotel with Touch Points in the spa, restaurants, gym, meeting rooms and bedrooms, all connected to Informax Cloud"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="hs-room" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3d29c" stopOpacity="0.5" />
          <stop offset="1" stopColor="#d9a45b" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id="hs-arc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8ed1fc" stopOpacity="0" />
          <stop offset="0.5" stopColor="#8ed1fc" stopOpacity="1" />
          <stop offset="1" stopColor="#8ed1fc" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="hs-cloud" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#0693e3" stopOpacity="0.55" />
          <stop offset="1" stopColor="#0693e3" stopOpacity="0" />
        </radialGradient>
        <filter id="hs-blur" x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      <ellipse cx="400" cy="70" rx="330" ry="90" fill="url(#hs-cloud)" />

      <motion.g
        initial={base ?? { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.15 }}
      >
        <path d="M60 140 Q400 -60 740 140" fill="none" stroke="url(#hs-arc)" strokeWidth="6" filter="url(#hs-blur)" opacity="0.8" />
        <path d="M60 140 Q400 -60 740 140" fill="none" stroke="url(#hs-arc)" strokeWidth="1.4" />
        <text x="400" y="26" textAnchor="middle" className="fill-brass-light" fontSize="10" letterSpacing="4" fontWeight="600">
          INFORMAX CLOUD
        </text>
      </motion.g>

      <g>
        {CELLS.map(([row, col, label, warm, touch], i) => {
          const x = X0 + W * col;
          const y = Y0 + H * row;
          return (
            <motion.g
              key={`${row}-${col}`}
              initial={base ?? { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 + i * 0.05 }}
            >
              <rect x={x} y={y} width={W} height={H} fill="url(#hs-room)" opacity={warm * 0.55} />
              <rect x={x} y={y} width={W} height={H} fill="none" stroke="#ffffff" strokeOpacity="0.14" />
              <text x={x + 12} y={y + H - 12} className="hidden fill-white/55 sm:block" fontSize="10" letterSpacing="1.4" fontWeight="500">
                {label.toUpperCase()}
              </text>
              {touch && (
                <g>
                  <circle cx={colX(col)} cy={y + 46} r="14" className="animate-tp-pulse fill-none stroke-glow" strokeOpacity="0.6" style={{ transformOrigin: `${colX(col)}px ${y + 46}px`, animationDelay: `${(i % 6) * 0.55}s` }} />
                  <circle cx={colX(col)} cy={y + 46} r="4.5" className="fill-glow" />
                </g>
              )}
            </motion.g>
          );
        })}
        <line x1={X0} y1={Y0 + H * 3} x2={X0 + W * COLS} y2={Y0 + H * 3} stroke="#ffffff" strokeOpacity="0.25" />
      </g>

      {Array.from({ length: COLS }, (_, c) => {
        const x = colX(c);
        const top = arcY(x);
        const d = `M${x} ${Y0 + H * 3} L${x} ${top}`;
        return (
          <g key={c}>
            <motion.path
              d={d}
              stroke="#8ed1fc"
              strokeOpacity="0.45"
              strokeWidth="1"
              fill="none"
              initial={base ?? { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, ease: EASE, delay: 0.7 + c * 0.12 }}
            />
            <path
              d={d}
              pathLength={260}
              stroke="#c9c2ff"
              strokeWidth="1.6"
              fill="none"
              className="animate-riser"
              style={{ animationDelay: `${c * 1.1}s` }}
            />
            <circle cx={x} cy={top} r="3.5" className="fill-brass-light" />
          </g>
        );
      })}
    </svg>
  );
}
