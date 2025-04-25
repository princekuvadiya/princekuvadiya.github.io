/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '',
  assetPrefix: './', // Critical for GitHub Pages
  images: {
    unoptimized: true // Required for static export
  },
  trailingSlash: true, // Ensures proper linking
  // Disable type checking during build
  typescript: {
    ignoreBuildErrors: true
  },
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig