/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/serverless_aws",
  assetPrefix: "/serverless_aws/",
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

export default nextConfig
