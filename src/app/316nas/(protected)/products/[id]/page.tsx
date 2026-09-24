import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { verifyAdmin } from "@/lib/admin";
import { getCatalog } from "@/lib/catalog";
import { getProductById } from "@/lib/products";
import { ProductEditForm } from "@/components/ProductEditForm";
import { DeleteProductButton } from "@/components/DeleteProductButton";
import { deleteProduct, updateProduct } from "../actions";
export const metadata: Metadata = { title: "Edit product" };

export default async function AdminProductEditPage({ params }: PageProps<"/316nas/products/[id]">) {
  await verifyAdmin();
  const { id } = await params;
  const { products, categories } = await getCatalog();
  const product = getProductById(products, id);
  if (!product) notFound();
  return <>
    <Link className="breadcrumb" href="/316nas/products">← All products</Link>
    <p className="eyebrow">Edit product</p><h1>{product.name}</h1>
    <p className="form-note"><Link href={"/products/" + product.id} target="_blank">View on the site ↗</Link></p>
    <ProductEditForm product={product} categories={categories} action={updateProduct.bind(null, product.id)} />
    <div className="admin-actions">
      <DeleteProductButton name={product.name} action={deleteProduct.bind(null, product.id)} />
    </div>
  </>;
}
