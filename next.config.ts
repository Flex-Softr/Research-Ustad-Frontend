/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
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
        hostname: "api.researchustad.org",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com", // <-- Add this
      },
    ],
  },
};

module.exports = nextConfig;
