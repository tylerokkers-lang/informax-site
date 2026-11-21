import type { NextConfig } from "next";
import { PENDING_SLOTS } from "./src/lib/photography";

// Launch guard: a production deployment must never show "Photograph to come"
// placeholders, a photograph without a recorded licence, or a stock video whose
// licence has not been verified. Vercel keeps the current production site when
// this build fails. Preview builds are not affected. See HANDOVER.md §0c and
// media/README.md.
if (process.env.VERCEL_ENV === "production" && PENDING_SLOTS.length > 0) {
  throw new Error(
    `Production build stopped: these image slots have no licensed photograph and no built, licence-verified video: ${PENDING_SLOTS.join(", ")}. See media/README.md.`,
  );
}

// Films, posters and brand images are not content-hashed, so they cannot be
// cached forever. A day fresh, then served instantly from cache while the
// browser revalidates in the background, instead of Vercel's default
// max-age=0 (a round trip before every repeat view). When replacing one of
// these files, give it a new name so visitors never see the old one.
const MEDIA_CACHE = "public, max-age=86400, stale-while-revalidate=2592000";

// Security headers for every response. The site loads no third-party
// scripts; vercel.live is allowed only for Vercel's preview toolbar. Next.js
// needs inline scripts for hydration, and eval only in development.
const dev = process.env.NODE_ENV !== "production";
const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""} https://vercel.live`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://vercel.live https://vercel.com",
  "font-src 'self' data: https://vercel.live",
  "media-src 'self' blob:",
  "connect-src 'self' https://vercel.live wss://ws-us3.pusher.com",
  "frame-src https://vercel.live",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  ...(dev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      { source: "/video/:path*", headers: [{ key: "Cache-Control", value: MEDIA_CACHE }] },
      { source: "/brand/:path*", headers: [{ key: "Cache-Control", value: MEDIA_CACHE }] },
    ];
  },
  async redirects() {
    return [
      { source: "/services", destination: "/informax-cloud", permanent: true },
      { source: "/hotels", destination: "/hospitality", permanent: true },
      { source: "/touch-points", destination: "/how-it-works", permanent: true },
      { source: "/request-a-demo", destination: "/enquire", permanent: true },
      { source: "/demo", destination: "/enquire", permanent: true },
    ];
  },
};

export default nextConfig;
