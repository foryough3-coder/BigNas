import type { NextConfig } from "next";
const base = process.env.NEXT_PUBLIC_ASSET_BASE_URL?.trim();
const remotePatterns: NonNullable<NonNullable<NextConfig["images"]>["remotePatterns"]> = [];
if (base) {
  const url = new URL(base);
  if (url.protocol !== "https:") throw new Error("NEXT_PUBLIC_ASSET_BASE_URL must use HTTPS.");
  remotePatterns.push({ protocol:"https", hostname:url.hostname, port:url.port,
    pathname:url.pathname.replace(/\/+$/, "") + "/three16craft/**" });
}
const nextConfig: NextConfig = { images: { remotePatterns } };
export default nextConfig;
