/** @type {import('next').NextConfig} */

const nextConfig = {
  // output: 'export',
  // basePath: '/tier3topology_aws',
  // assetPrefix: '/tier3topology_aws/',
  // trailingSlash: true,
  images: {
    unoptimized: true,
  },
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
