"use client";
import { useState } from "react";
import { AddToCartButton } from "@/components/AddToCartButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { QuantitySelector } from "@/components/QuantitySelector";
import type { Product } from "@/lib/products";
export function ProductPurchase({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  return <><QuantitySelector quantity={quantity} onChange={setQuantity} /><div className="detail-buttons"><AddToCartButton product={product} quantity={quantity} className="button primary" /><WhatsAppButton product={product} quantity={quantity} className="button secondary">Ask on WhatsApp</WhatsAppButton></div></>;
}
