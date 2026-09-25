import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/services", destination: "/informax-cloud", permanent: true },
      { source: "/hospitality", destination: "/digital-experiences", permanent: true },
      { source: "/touch-points", destination: "/informax-cloud", permanent: true },
    ];
  },
};

export default nextConfig;
