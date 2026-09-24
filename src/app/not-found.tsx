import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return <main id="main" className="wrap cart-page">
    <div className="empty-cart">
      <Icon name="search" size={40} />
      <h3>We couldn’t find that page.</h3>
      <p>The product may have moved, or the link may be mistyped.</p>
      <Link className="button primary" href="/#collection">Explore the collection</Link>
    </div>
  </main>;
}
