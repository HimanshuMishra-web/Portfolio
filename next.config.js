/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['images.unsplash.com'],
    },
    eslint: {
      dirs: ['pages', 'utils', 'components', 'app'],
    },
  }
  
  module.exports = nextConfig