import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  // 🚨 ADD THIS BLOCK HERE
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
};

export default nextConfig;