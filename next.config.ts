/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  swcMinify: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.shutterstock.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
      },

      {
        protocol: "https",
        hostname: "via.placeholder.com", // <-- Add this
      },
      {
        protocol: "https",
        hostname: "https://researchustad.org/", // <-- Add this
      },
      {
        protocol: "https",
        hostname: "https://www.researchustad.org/", // <-- Add this
      },
      {
        protocol: "https",
        hostname: "http://www.researchustad.org/", // <-- Add this
      },
      {
        protocol: "https",
        hostname: "http://www.researchustad.org/", // <-- Add this
      },
    ],
  },
};

module.exports = nextConfig;
