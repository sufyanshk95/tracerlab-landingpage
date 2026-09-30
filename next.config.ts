import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      // /agents (retired 2026-09-22: its figures were unsupported) is consolidated
      // into the custom CRM & automation service page.
      { source: "/agents", destination: "/services/custom-crm", permanent: true },
      // /voice-agents (scenario page) is consolidated into the voice-agents service page.
      { source: "/voice-agents", destination: "/services/ai-voice-agents", permanent: true },
      // The meat-processing case study was published at /work/harbs-farm until
      // 2026-09-29, when the client was anonymized site-wide. The old URL is
      // indexed and linked, so it 308s rather than 404ing.
      { source: "/work/harbs-farm", destination: "/work/meat-processing-platform", permanent: true },
    ];
  },
};

export default nextConfig;
