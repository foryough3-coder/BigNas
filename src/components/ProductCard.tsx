"use client";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { AddToCartButton } from "@/components/AddToCartButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { categoryName, finishClass, type Product } from "@/lib/products";
import { assetUrl } from "@/lib/assets";
import { useCatalog } from "@/context/catalog-context";
export function ProductCard({ product }: { product: Product }) {
  const { categories } = useCatalog();
  return <article className="product-card">
    <Link className="product-photo" href={"/products/" + product.id} aria-label={"View " + product.name}>
      <Image src={assetUrl(product.thumbnailKey)} width={480} height={480} alt={product.alt} unoptimized />
      <span className="photo-open"><Icon name="arrow-right" size={14} /></span>
    </Link>
    <div className="product-info">
      <p className="product-category">{categoryName(categories, product.category)}</p>
      <Link className="product-name" href={"/products/" + product.id}>{product.name}</Link>
      <p className="finish"><span className={"finish-dot " + finishClass(product)} />{product.finishLabel}</p>
      <div className="product-actions"><AddToCartButton product={product} /><WhatsAppButton product={product} /></div>
    </div>
  </article>;
}
