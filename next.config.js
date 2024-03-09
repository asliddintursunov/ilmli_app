/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  images: {
    domains: [],
    remotePatterns: [],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
