import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: "/user",
  // output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
