/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "api.escuelajs.co",
      "i.imgur.com",
      "placeimg.com",
      "www.pulsecarshalton.co.uk",
      "i.pinimg.com",
    ],
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
