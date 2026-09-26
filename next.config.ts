import type { NextConfig } from "next";

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
      { source: "/hospitality", destination: "/digital-experiences", permanent: true },
      { source: "/touch-points", destination: "/informax-cloud", permanent: true },
    ];
  },
};

export default nextConfig;
