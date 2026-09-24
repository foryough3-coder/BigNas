import type { NextConfig } from "next";
const base = process.env.NEXT_PUBLIC_ASSET_BASE_URL?.trim();
const remotePatterns: NonNullable<NonNullable<NextConfig["images"]>["remotePatterns"]> = [];
if (base) {
  const url = new URL(base);
  if (url.protocol !== "https:") throw new Error("NEXT_PUBLIC_ASSET_BASE_URL must use HTTPS.");
  remotePatterns.push({ protocol:"https", hostname:url.hostname, port:url.port,
    pathname:url.pathname.replace(/\/+$/, "") + "/three16craft/**" });
}
// Lets phones on the local network (iPhone hotspot, home Wi-Fi) load dev
// scripts; without this the page never hydrates and buttons stay disabled.
const nextConfig: NextConfig = {
  images: { remotePatterns },
  allowedDevOrigins: ["172.20.10.*", "192.168.*.*", "10.*.*.*"],
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
        ],
      },
      { source: "/316nas/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
    ];
  },
};
export default nextConfig;
