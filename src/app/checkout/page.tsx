import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutForm } from "@/components/CheckoutForm";
export const metadata: Metadata = { title: "Request an order", robots: { index: false } };
export default function CheckoutPage() {
  return <main id="main" className="wrap cart-page">
    <Link className="breadcrumb" href="/cart">← Back to cart</Link>
    <p className="eyebrow">Your selection</p><h1>Request an order</h1>
    <CheckoutForm />
  </main>;
}
