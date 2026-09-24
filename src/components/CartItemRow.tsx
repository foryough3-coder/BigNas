"use client";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { QuantitySelector } from "@/components/QuantitySelector";
import { useCart, type CartItem } from "@/context/cart-context";
import { assetUrl } from "@/lib/assets";
export function CartItemRow({ item: { product, quantity } }: { item: CartItem }) {
  const { setQuantity, removeItem, closeCart } = useCart();
  return <div className="cart-line">
    <Image src={assetUrl(product.thumbnailKey)} width={74} height={88} alt={product.name} unoptimized />
    <div><h3><Link href={"/products/" + product.id} onClick={closeCart}>{product.name}</Link></h3><span className="finish">{product.finishLabel}</span><QuantitySelector quantity={quantity} onChange={n => setQuantity(product.id, n)} /></div>
    <button onClick={() => removeItem(product.id)} aria-label={"Remove " + product.name + " from cart"}><Icon name="trash" size={18} /></button>
  </div>;
}
