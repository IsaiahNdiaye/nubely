/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable Edge Runtime for middleware
  experimental: {
    middleware: {
      // Mark middleware as part of Edge Runtime
      runtime: 'edge',
    },
  },
};

module.exports = nextConfig; 