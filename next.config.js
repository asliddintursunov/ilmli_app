/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["api.escuelajs.co", "i.imgur.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.escuelajs.co",
        port: "",
        pathname: "/",
      },
    ],
  },
};

module.exports = nextConfig;
