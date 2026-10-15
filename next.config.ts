import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // The WordPress site served every page with a trailing slash (/about/, /training/).
  // Keeping that shape means existing links and search rankings carry over unchanged.
  trailingSlash: true,
  images: {
    qualities: [70, 80],
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    // Old WordPress endpoints that have no equivalent in the new site.
    return [
      { source: "/feed/", destination: "/", permanent: true },
      { source: "/comments/feed/", destination: "/", permanent: true },
      { source: "/xmlrpc.php", destination: "/", permanent: true },
      { source: "/wp-admin/:path*", destination: "/", permanent: true },
      { source: "/wp-login.php", destination: "/", permanent: true },
      { source: "/wp-content/:path*", destination: "/", permanent: true },
      { source: "/wp-json/:path*", destination: "/", permanent: true },
      { source: "/home/", destination: "/", permanent: true },
      { source: "/velocity-365/", destination: "/velocity365/", permanent: true },
      { source: "/coaches/", destination: "/staff/", permanent: true },
      { source: "/programs/", destination: "/training/", permanent: true },
      { source: "/lessons/", destination: "/training/", permanent: true },
      { source: "/book/", destination: "/contact/", permanent: true },
    ];
  },
};

export default nextConfig;
