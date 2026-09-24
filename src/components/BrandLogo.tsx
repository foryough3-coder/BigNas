"use client";
import Image from "next/image";
import { assetUrl, brandAssets } from "@/lib/assets";
import { useLogoMotion } from "@/context/motion-context";
export function BrandLogo() {
  const { paused } = useLogoMotion();
  return <Image id="brand-logo" src={assetUrl(paused ? brandAssets.static : brandAssets.animated)} width={960} height={320} alt="three16craft" unoptimized loading="eager" />;
}
