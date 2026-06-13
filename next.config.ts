import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Temporary dummy dentistry imagery (Unsplash). Swap for local assets later.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
