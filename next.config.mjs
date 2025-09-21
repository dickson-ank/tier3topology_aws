/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/tier3topology_aws',
  assetPrefix: '/tier3topology_aws/',
  images: {
    loader: 'custom',
    loaderFile: './my_loader.ts',
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
