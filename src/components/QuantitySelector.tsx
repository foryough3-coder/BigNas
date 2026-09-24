"use client";
import { Icon } from "@/components/Icon";
export function QuantitySelector({ quantity, onChange }: { quantity: number; onChange: (quantity: number) => void }) {
  return <div className="quantity">
    <button disabled={quantity <= 1} onClick={() => onChange(quantity - 1)} aria-label="Decrease quantity"><Icon name="minus" size={16} /></button>
    <output aria-label="Quantity">{quantity}</output>
    <button disabled={quantity >= 999} onClick={() => onChange(quantity + 1)} aria-label="Increase quantity"><Icon name="plus" size={16} /></button>
  </div>;
}
