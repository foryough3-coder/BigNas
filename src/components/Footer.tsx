"use client";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { assetUrl, brandAssets } from "@/lib/assets";
import { useLogoMotion } from "@/context/motion-context";
export function Footer() {
  const { paused, toggle } = useLogoMotion();
  return <footer>
    <div className="wrap footer-main">
      <div className="footer-brand"><Image src={assetUrl(brandAssets.static)} width={960} height={320} alt="three16craft" unoptimized /><p>The finishing touches<br />that bring a space together.</p></div>
      <div><h2>Explore</h2><Link href="/?category=glass-spigots#collection">Glass spigots</Link><Link href="/?category=handrail-fittings#collection">Handrail fittings</Link><Link href="/?category=door-hardware#collection">Door hardware</Link></div>
      <div><h2>Find your fit</h2><Link href="/?category=glass-clamps#collection">Glass clamps</Link><Link href="/?category=finials#collection">Finials</Link><Link href="/?category=mounting-accessories#collection">Mounting accessories</Link></div>
      <div><h2>Let’s talk</h2><WhatsAppButton className="footer-enquiry">WhatsApp enquiries</WhatsAppButton><p>Tell us what you’re working on.<br />We’ll help you find the next detail.</p></div>
    </div>
    <div className="wrap footer-bottom"><span>© three16craft</span><button id="motion-toggle" aria-pressed={paused} onClick={toggle}><Icon name={paused ? "play" : "pause"} size={14} />{paused ? "Play logo animation" : "Pause logo animation"}</button></div>
  </footer>;
}
