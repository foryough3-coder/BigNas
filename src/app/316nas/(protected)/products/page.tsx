import type { Metadata } from "next";
import Link from "next/link";
import { verifyAdmin } from "@/lib/admin";
import { getCatalog } from "@/lib/catalog";
export const metadata: Metadata = { title: "Admin — products" };

export default async function AdminProductsPage() {
  await verifyAdmin();
  const { products, categories } = await getCatalog();
  return <>
    <p className="eyebrow">Catalog</p><h1>Products</h1>
    <div className="admin-actions"><Link className="button primary" href="/316nas/products/new">Add product</Link></div>
    <p className="form-note">Click a product name to edit it.</p>
    <table className="admin-table">
      <thead><tr><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th></tr></thead>
      <tbody>{products.map(product => {
        const category = categories.find(c => c.id === product.category);
        return <tr key={product.id}>
          <td><Link href={"/316nas/products/" + product.id}>{product.name}</Link></td>
          <td>{category?.name ?? product.category}</td>
          <td>{product.price != null ? product.price + " " + (product.currency ?? "") : "—"}</td>
          <td>{product.stock ?? "—"}</td>
          <td><span className="status-pill">{product.dataStatus}</span></td>
        </tr>;
      })}</tbody>
    </table>
  </>;
}
