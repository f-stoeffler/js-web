import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost"],
  },
  transpilePackages: ["next-mdx-remote"],
};

export default nextConfig;
