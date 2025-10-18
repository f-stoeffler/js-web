import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost", "julius.florian-stoeffler.at"],
  },
  transpilePackages: ["next-mdx-remote"],
};

export default nextConfig;
