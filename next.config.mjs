/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const repoName = "tier3topology_aws";

const nextConfig = {
  output: "export", // Required for static export
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig;
