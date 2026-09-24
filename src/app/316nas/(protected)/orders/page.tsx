import type { Metadata } from "next";
import Link from "next/link";
import { verifyAdmin } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";
export const metadata: Metadata = { title: "Admin — orders" };

type OrderRow = { id: string; status: string; customer_name: string; created_at: string; order_items: { quantity: number }[] };

export default async function AdminOrdersPage() {
  await verifyAdmin();
  const supabase = await createClient();
  const { data: orders } = await supabase
    .from("orders")
    .select("id, status, customer_name, created_at, order_items(quantity)")
    .order("created_at", { ascending: false });

  return <>
    <p className="eyebrow">Orders</p><h1>Order requests</h1>
    <table className="admin-table">
      <thead><tr><th>Customer</th><th>Items</th><th>Status</th><th>Received</th></tr></thead>
      <tbody>{((orders ?? []) as OrderRow[]).map(order => <tr key={order.id}>
        <td><Link href={"/316nas/orders/" + order.id}>{order.customer_name}</Link></td>
        <td>{order.order_items.reduce((sum, item) => sum + item.quantity, 0)}</td>
        <td><span className="status-pill">{order.status}</span></td>
        <td>{new Date(order.created_at).toLocaleDateString()}</td>
      </tr>)}</tbody>
    </table>
    {!orders?.length && <p className="form-note">No order requests yet.</p>}
  </>;
}
