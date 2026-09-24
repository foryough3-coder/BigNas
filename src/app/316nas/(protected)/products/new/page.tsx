import type { Metadata } from "next";
import Link from "next/link";
import { verifyAdmin } from "@/lib/admin";
import { getCatalog } from "@/lib/catalog";
import { ProductEditForm } from "@/components/ProductEditForm";
import { createProduct } from "../actions";
export const metadata: Metadata = { title: "New product" };

export default async function AdminNewProductPage() {
  await verifyAdmin();
  const { categories } = await getCatalog();
  return <>
    <Link className="breadcrumb" href="/316nas/products">← All products</Link>
    <p className="eyebrow">Catalog</p><h1>New product</h1>
    <ProductEditForm categories={categories} action={createProduct} />
  </>;
}
