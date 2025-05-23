import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.dummyjson.com"],
  },

  async redirects() {
    return [
      {
        source: "/app/products/all",
        destination: "/home",
        permanent: true,
      },
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
      {
        source: "/app",
        destination: "/home",
        permanent: true,
      },
      {
        source: "/products",
        destination: "/home",
        permanent: true,
      },
      {
        source: "/dashboard",
        destination: "/home",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
