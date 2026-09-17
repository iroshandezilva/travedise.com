import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site, deployed to Cloudflare Pages from `out/`.
  output: "export",
};

export default nextConfig;
