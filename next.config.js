/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
    },
    images: {
      domains: ['images.unsplash.com'],
    },
    eslint: {
      dirs: ['pages', 'utils', 'components', 'app'],
    },
  }
  
  module.exports = nextConfig