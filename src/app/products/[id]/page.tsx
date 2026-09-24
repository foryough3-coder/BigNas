import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductPurchase } from "@/components/ProductPurchase";
import { ProductCard } from "@/components/ProductCard";
import { getProductById, categoryName, finishClass, relatedProducts } from "@/lib/products";
import { assetUrl } from "@/lib/assets";
import { getCatalog } from "@/lib/catalog";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, siteName } from "@/lib/site";
export async function generateStaticParams() {
  const { products } = await getCatalog();
  return products.map(product => ({ id: product.id }));
}
export async function generateMetadata({ params }: PageProps<"/products/[id]">): Promise<Metadata> {
  const [{ id }, { products, categories }] = await Promise.all([params, getCatalog()]);
  const product = getProductById(products, id);
  if (!product) return { title: "Product not found", robots: { index: false } };
  const title = product.name + " — " + product.finishLabel;
  const description = product.description + " " + categoryName(categories, product.category) + " in " + product.finishLabel.toLowerCase() + " from " + siteName + ".";
  const image = { url: absoluteUrl(assetUrl(product.imageKey)), width: 1000, height: 1000, alt: product.alt };
  return {
    title, description,
    alternates: { canonical: "/products/" + product.id },
    openGraph: { type: "website", siteName, title, description, url: "/products/" + product.id, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}
export default async function ProductPage({ params }: PageProps<"/products/[id]">) {
  const [{ id }, { products, categories }] = await Promise.all([params, getCatalog()]);
  const product = getProductById(products, id);
  if (!product) notFound();
  const related = relatedProducts(products, product, 4);
  const url = absoluteUrl("/products/" + product.id);
  const category = categoryName(categories, product.category);
  const productLd = {
    "@context": "https://schema.org", "@type": "Product",
    name: product.name, description: product.description, url,
    image: [absoluteUrl(assetUrl(product.imageKey))],
    category, color: product.finishLabel,
    brand: { "@type": "Brand", name: siteName },
    ...(product.sku && { sku: product.sku }),
    ...(product.materialGrade && { material: product.materialGrade }),
    ...(product.price != null && product.currency && {
      offers: {
        "@type": "Offer", url, price: product.price, priceCurrency: product.currency,
        availability: product.stock === 0 ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
      },
    }),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Products", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: category, item: absoluteUrl("/?category=" + product.category) },
      { "@type": "ListItem", position: 3, name: product.name, item: url },
    ],
  };
  return <main id="main" className="wrap product-page">
    <JsonLd data={productLd} /><JsonLd data={breadcrumbLd} />
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/#collection">Products</Link><span>/</span><Link href={"/?category=" + product.category + "#collection"}>{categoryName(categories, product.category)}</Link></nav>
    <div className="product-detail-layout">
      <div className="detail-photo"><Image src={assetUrl(product.imageKey)} width={1000} height={1000} alt={product.alt} unoptimized loading="eager" /></div>
      <div className="detail-copy"><p className="eyebrow">{categoryName(categories, product.category)}</p><h1>{product.name}</h1><p className="description">{product.description}</p><p className="finish"><span className={"finish-dot " + finishClass(product)} />{product.finishLabel}</p><ProductPurchase product={product} /><p className="detail-note">Ask us to confirm dimensions, fitting compatibility and what is included for your project.</p></div>
    </div>
    <section className="related-products"><div className="section-heading"><div><p className="eyebrow">Keep exploring</p><h2>Complete the details.</h2></div></div><div className="product-grid">{related.map(p => <ProductCard key={p.id} product={p} />)}</div></section>
  </main>;
}
