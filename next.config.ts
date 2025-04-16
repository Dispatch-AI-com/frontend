import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracing: false,
  swcMinify: true,
  experimental: {
    turbo:{}
  },
};

export default nextConfig;
