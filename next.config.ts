import type { NextConfig } from "next";

// When deploying to GitHub Pages under tdottahmed/me, basePath must be "/me"
// If using a custom domain in the future, set CUSTOM_DOMAIN=true or NEXT_PUBLIC_BASE_PATH=""
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const isCustomDomain = process.env.CUSTOM_DOMAIN === "true";

const basePath = isCustomDomain
  ? ""
  : (process.env.NEXT_PUBLIC_BASE_PATH || (isGithubActions ? "/me" : ""));

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
