"use client";
import Link from "next/link";
import { Icon } from "@/components/Icon";

export default function Error({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return <main id="main" className="wrap cart-page">
    <div className="empty-cart">
      <Icon name="close" size={40} />
      <h3>Something went wrong.</h3>
      <p>Please try again in a moment.</p>
      <button className="button primary" onClick={() => retry()}>Try again</button>{" "}
      <Link className="button secondary" href="/">Go to the homepage</Link>
    </div>
  </main>;
}
