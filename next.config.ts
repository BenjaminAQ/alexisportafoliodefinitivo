import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Allow the preview proxy and local variations to fetch dev assets.
  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
    "*.space-z.ai",
    "*.z.ai",
    "0.0.0.0",
    "alexispompilla.com",
    "*.alexispompilla.com",
  ],
};

export default nextConfig;
