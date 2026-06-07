/** @type {import('next').NextConfig} */
const isStaticExport = process.env.RENDER_STATIC_EXPORT === "true";

const nextConfig = {
  reactStrictMode: true,
  output: isStaticExport ? "export" : undefined,
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0"
          }
        ]
      }
    ];
  },
  images: {
    unoptimized: true
  }
};

export default nextConfig;
