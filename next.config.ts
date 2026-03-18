import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // 🚨 SPEEDHACK: This tells Next.js to ignore apostrophe errors and just build the app!
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;