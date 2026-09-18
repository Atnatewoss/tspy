import type { NextConfig } from "next";

const LEARN_MOVES: Record<string, string> = {
  "the-parser-and-manifest": "the-parser-and-manifest",
  "virtual-modules": "virtual-modules",
  "layout-adaptation": "layout-adaptation",
  "python-execution-model": "python-execution-model",
  "vite-and-nitro": "vite-and-nitro",
  "the-dev-server": "the-dev-server",
  "hmr-and-watchers": "hmr-and-watchers",
  "build-pipeline": "build-pipeline",
  "how-it-works": "project-generator",
  "server-and-hono": "server-and-hono",
  "api-proxying": "api-proxying",
  "merge-strategy": "project-generator",
};

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
    ],
  },
  async redirects() {
    return Object.entries(LEARN_MOVES).map(([slug, chapter]) => ({
      source: `/docs/${slug}`,
      destination: `/learn/${chapter}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
