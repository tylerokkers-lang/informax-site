import type { NextConfig } from "next";
import { PHOTOGRAPHY_PENDING } from "./src/lib/photography";

// Launch guard: a production deployment must never show "Photograph to come"
// placeholders or a photograph without a recorded licence. Vercel keeps the
// current production site when this build fails. Preview builds are not
// affected. See HANDOVER.md §0c.
if (process.env.VERCEL_ENV === "production" && PHOTOGRAPHY_PENDING) {
  throw new Error(
    "Production build stopped: src/lib/photography.ts still has photo slots without a photograph, licence and source.",
  );
}

// Films, posters and brand images are not content-hashed, so they cannot be
// cached forever. A day fresh, then served instantly from cache while the
// browser revalidates in the background, instead of Vercel's default
// max-age=0 (a round trip before every repeat view). When replacing one of
// these files, give it a new name so visitors never see the old one.
const MEDIA_CACHE = "public, max-age=86400, stale-while-revalidate=2592000";

const nextConfig: NextConfig = {
  async headers() {
    return [
      { source: "/video/:path*", headers: [{ key: "Cache-Control", value: MEDIA_CACHE }] },
      { source: "/brand/:path*", headers: [{ key: "Cache-Control", value: MEDIA_CACHE }] },
    ];
  },
  async redirects() {
    return [
      { source: "/services", destination: "/informax-cloud", permanent: true },
      { source: "/hospitality", destination: "/hotels", permanent: true },
      { source: "/touch-points", destination: "/how-it-works", permanent: true },
    ];
  },
};

export default nextConfig;
