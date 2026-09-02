import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // The dev indicator renders in a <nextjs-portal> pinned bottom-left, on top of the
  // reference's nav-drawer toggle (left:12px bottom:12px), and swallows real clicks.
  devIndicators: false,
};

export default nextConfig;
