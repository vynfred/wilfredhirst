import type { NextConfig } from "next";

const STUDIO = "https://vynfred.com";

const config: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  // This domain used to be a portfolio of startup and contract work. That
  // work is the studio's now and lives on vynfred.com; the art stayed. Every
  // old address goes somewhere that still answers it.
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/art.html", destination: "/gallery", permanent: true },
      { source: "/art", destination: "/gallery", permanent: true },
      { source: "/consulting.html", destination: `${STUDIO}/work`, permanent: true },
      { source: "/web-design.html", destination: `${STUDIO}/work`, permanent: true },
      { source: "/startups/:path*", destination: `${STUDIO}/portfolio`, permanent: true },
      { source: "/contract/:path*", destination: `${STUDIO}/portfolio`, permanent: true },
      { source: "/game/:path*", destination: "/", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default config;
