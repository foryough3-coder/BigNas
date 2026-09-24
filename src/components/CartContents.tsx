"use client";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { CartItemRow } from "@/components/CartItemRow";
import { useCart } from "@/context/cart-context";
import { useEnquiry } from "@/context/enquiry-context";
import { cartMessage } from "@/lib/enquiries";
export function CartContents({ fullPage = false }: { fullPage?: boolean }) {
  const { items, totalItems, ready, closeCart } = useCart();
  const enquire = useEnquiry();
  if (!ready) return <p className="empty-cart" role="status">Loading your selection…</p>;
  if (!items.length) return <div className="empty-cart"><Icon name="cart" size={40} /><h3>Your next project starts here.</h3><p>Add products to build your selection.</p><Link className="button primary" href="/#collection" onClick={closeCart}>Explore the collection</Link></div>;
  return <>
    <div>{items.map(item => <CartItemRow key={item.product.id} item={item} />)}</div>
    <div className="cart-summary">
      <p className="item-total">{totalItems} {totalItems === 1 ? "item" : "items"} in your selection</p>
      <p>Share your list with us to confirm the details, availability and pricing.</p>
      <button className="button primary" onClick={() => { closeCart(); enquire(cartMessage(items, window.location.origin)); }}><Icon name="whatsapp" size={18} />Enquire about your cart</button>
      <Link className="button secondary" href="/checkout" onClick={closeCart}>Submit order request</Link>
      {!fullPage && <Link className="cart-page-link" href="/cart" onClick={closeCart}>View full cart <Icon name="arrow-right" size={16} /></Link>}
    </div>
  </>;
}
