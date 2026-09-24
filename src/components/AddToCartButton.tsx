"use client";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/cart-context";
import { Icon } from "@/components/Icon";
import type { Product } from "@/lib/products";
export function AddToCartButton({ product, quantity = 1, className = "button add-button" }: { product: Product; quantity?: number; className?: string }) {
  const { addItem, ready } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  return <button className={className} disabled={!ready} aria-label={"Add " + product.name + " to cart"} onClick={() => {
    addItem(product, quantity); setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1300);
  }}><Icon name={added ? "check" : "plus"} size={16} /><span aria-live="polite">{added ? "Added" : "Add to cart"}</span></button>;
}
