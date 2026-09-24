import type { Metadata } from "next";
import Link from "next/link";
import { CartContents } from "@/components/CartContents";
export const metadata: Metadata = { title: "Your cart", robots: { index: false } };
export default function CartPage() {
  return <main id="main" className="wrap cart-page">
    <Link className="breadcrumb" href="/#collection">← Continue exploring</Link>
    <p className="eyebrow">Your selection</p><h1>Your cart</h1>
    <CartContents fullPage />
  </main>;
}
