/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  // basePath: "/tier3topology_aws",
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
