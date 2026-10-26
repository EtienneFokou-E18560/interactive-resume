import type { NextConfig } from "next";

/** The old Vercel address; links already shared keep working through a permanent redirect. */
const LEGACY_HOST = "etiennefokouresume.vercel.app";
const CANONICAL_ORIGIN = "https://etienne.cieltd.org";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: LEGACY_HOST }],
        destination: `${CANONICAL_ORIGIN}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
