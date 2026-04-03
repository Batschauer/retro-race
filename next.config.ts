import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "6mb",
    },
  },
  async redirects() {
    return [
      { source: "/results", destination: "/", permanent: true },
      { source: "/circuits", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
