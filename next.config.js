/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing configuration

  // Ensure static files are served correctly
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["hebbkx1anhila5yf.public.blob.vercel-storage.com", "v0.dev"],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
}

module.exports = nextConfig
