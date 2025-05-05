/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      "placeholder.pics",
      "images.unsplash.com",
      "via.placeholder.com",
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // Increase memory limit for builds
  experimental: {
    serverComponentsExternalPackages: ["sharp", "pg"],
    optimizeCss: true,
  },
  // Disable source maps in production to reduce bundle size
  productionBrowserSourceMaps: false,
  // Configure webpack to handle large files
  webpack: (config, { isServer }) => {
    // Optimize bundle size
    config.optimization.minimize = true

    // Increase performance budget
    config.performance = {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    }

    return config
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
