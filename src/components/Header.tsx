"use client";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { Icon } from "@/components/Icon";
import { useCart } from "@/context/cart-context";
import { categories } from "@/lib/products";
export function Header() {
  const { totalItems, openCart, ready } = useCart();
  return <>
    <div className="utility"><div className="wrap"><span>Architectural hardware &amp; finishing details</span><Link href="/#project-help">Planning a project? Let’s talk <span aria-hidden="true">↗</span></Link></div></div>
    <header className="site-header">
      <div className="wrap header-main">
        <Link className="brand" href="/" aria-label="three16craft home"><BrandLogo /></Link>
        <form role="search" className="search" action="/#collection" method="get">
          <Icon name="search" /><input name="q" type="search" placeholder="Search fittings, handles & more" aria-label="Search products" autoComplete="off" />
        </form>
        <button className="cart-trigger" onClick={openCart} disabled={!ready} aria-label={"Open cart, " + totalItems + " items"}>
          <Icon name="cart" /><span className="cart-label">Your cart</span><span className="cart-count">{totalItems}</span>
        </button>
      </div>
      <nav className="primary-nav" aria-label="Main navigation"><div className="wrap nav-inner">
        <Link href="/#collection" className="all-link">All products</Link>
        {categories.map(c => <Link key={c.id} href={"/?category=" + c.id + "#collection"}>{c.id === "mounting-accessories" ? "Accessories" : c.name}</Link>)}
      </div></nav>
    </header>
  </>;
}
