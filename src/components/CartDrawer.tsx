"use client";
import { useEffect, useRef } from "react";
import { Icon } from "@/components/Icon";
import { CartContents } from "@/components/CartContents";
import { useCart } from "@/context/cart-context";
export function CartDrawer() {
  const ref = useRef<HTMLDialogElement>(null);
  const { cartOpen, closeCart } = useCart();
  useEffect(() => {
    if (cartOpen && ref.current && !ref.current.open) ref.current.showModal();
    if (!cartOpen && ref.current?.open) ref.current.close();
  }, [cartOpen]);
  return <dialog ref={ref} className="cart-dialog" aria-labelledby="cart-title" onClose={closeCart}>
    <div className="drawer-head"><div><p className="eyebrow">Your selection</p><h2 id="cart-title">Your cart</h2></div><button className="icon-button" onClick={closeCart} aria-label="Close cart"><Icon name="close" /></button></div>
    <CartContents />
  </dialog>;
}
