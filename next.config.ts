import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  // Static export powers the GitHub Pages demo without a Node host.
  output: "export",
  images: {
    unoptimized: true,
  },
  ...(isGithubPages
    ? {
        basePath: "/hiring-capacity-lab",
        assetPrefix: "/hiring-capacity-lab",
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
