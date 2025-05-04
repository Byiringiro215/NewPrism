/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  poweredByHeader: false,
  compress: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizeCss: true
  },
  // Simplified webpack configuration to address caching issues
  webpack: (config, { dev }) => {
    if (!dev) {
      config.cache = false; // Disable webpack caching to prevent snapshot issues
    }
    return config;
  }
}

export default nextConfig
