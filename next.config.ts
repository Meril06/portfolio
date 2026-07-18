import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Keep the JS bundle lean: no image optimizer needed since art is inline SVG.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
