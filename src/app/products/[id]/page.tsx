import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductPurchase } from "@/components/ProductPurchase";
import { ProductCard } from "@/components/ProductCard";
import { getProductById, products, categoryName, finishClass } from "@/lib/products";
import { assetUrl } from "@/lib/assets";
export function generateStaticParams() { return products.map(product => ({ id: product.id })); }
export async function generateMetadata({ params }: PageProps<"/products/[id]">): Promise<Metadata> {
  const product = getProductById((await params).id);
  return { title: product?.name ?? "Product not found", description: product?.description };
}
export default async function ProductPage({ params }: PageProps<"/products/[id]">) {
  const product = getProductById((await params).id);
  if (!product) notFound();
  const related = products.filter(p => p.id !== product.id).sort((a,b) => Number(b.category === product.category) - Number(a.category === product.category)).slice(0,4);
  return <main id="main" className="wrap product-page">
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/#collection">Products</Link><span>/</span><Link href={"/?category=" + product.category + "#collection"}>{categoryName(product.category)}</Link></nav>
    <div className="product-detail-layout">
      <div className="detail-photo"><Image src={assetUrl(product.imageKey)} width={1000} height={1000} alt={product.alt} unoptimized loading="eager" /></div>
      <div className="detail-copy"><p className="eyebrow">{categoryName(product.category)}</p><h1>{product.name}</h1><p className="description">{product.description}</p><p className="finish"><span className={"finish-dot " + finishClass(product)} />{product.finishLabel}</p><ProductPurchase product={product} /><p className="detail-note">Ask us to confirm dimensions, fitting compatibility and what is included for your project.</p></div>
    </div>
    <section className="related-products"><div className="section-heading"><div><p className="eyebrow">Keep exploring</p><h2>Complete the details.</h2></div></div><div className="product-grid">{related.map(p => <ProductCard key={p.id} product={p} />)}</div></section>
  </main>;
}
