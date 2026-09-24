"use client";
import { useActionState, useEffect, useRef } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { useCart } from "@/context/cart-context";
import { createOrder } from "@/app/checkout/actions";

export function CheckoutForm() {
  const { items, ready, clearCart } = useCart();
  const [state, action, pending] = useActionState(createOrder, undefined);
  const cleared = useRef(false);

  useEffect(() => {
    if (state?.orderId && !cleared.current) { cleared.current = true; clearCart(); }
  }, [state?.orderId, clearCart]);

  if (state?.orderId) {
    return <div className="empty-cart">
      <Icon name="check" size={40} />
      <h3>Order request received.</h3>
      <p>Reference: {state.orderId}<br />We’ll be in touch to confirm details, availability and pricing.</p>
      <Link className="button primary" href="/#collection">Continue exploring</Link>
    </div>;
  }
  if (!ready) return <p role="status">Loading your selection…</p>;
  if (!items.length) {
    return <div className="empty-cart">
      <Icon name="cart" size={40} /><h3>Your cart is empty.</h3>
      <p>Add products before requesting an order.</p>
      <Link className="button primary" href="/#collection">Explore the collection</Link>
    </div>;
  }

  const itemsJson = JSON.stringify(items.map(({ product, quantity }) => ({
    productId: product.id, name: product.name, finishLabel: product.finishLabel, quantity, price: product.price,
  })));

  return <>
    <div className="order-summary">
      {items.map(({ product, quantity }) => <div className="order-summary-line" key={product.id}>
        <span>{product.name} — {product.finishLabel}</span><span>Qty {quantity}</span>
      </div>)}
    </div>
    <form action={action} className="form-grid">
      <input type="hidden" name="items" value={itemsJson} />
      <div className="form-field">
        <label htmlFor="customerName">Name</label>
        <input id="customerName" name="customerName" required autoComplete="name" />
        {state?.errors?.customerName && <p className="form-error">{state.errors.customerName}</p>}
      </div>
      <div className="form-field">
        <label htmlFor="customerPhone">Phone</label>
        <input id="customerPhone" name="customerPhone" required autoComplete="tel" />
        {state?.errors?.customerPhone && <p className="form-error">{state.errors.customerPhone}</p>}
      </div>
      <div className="form-field">
        <label htmlFor="customerEmail">Email (optional)</label>
        <input id="customerEmail" name="customerEmail" type="email" autoComplete="email" />
      </div>
      <div className="form-field">
        <label htmlFor="customerAddress">Delivery address (optional)</label>
        <textarea id="customerAddress" name="customerAddress" rows={3} />
      </div>
      <div className="form-field">
        <label htmlFor="notes">Notes (optional)</label>
        <textarea id="notes" name="notes" rows={3} placeholder="Sizes, compatibility questions, timing…" />
      </div>
      {state?.message && <p className="form-error">{state.message}</p>}
      <p className="form-note">No payment is taken here — we’ll confirm availability and pricing before anything is finalised.</p>
      <button className="button primary" type="submit" disabled={pending}>{pending ? "Submitting…" : "Submit order request"}</button>
    </form>
  </>;
}
