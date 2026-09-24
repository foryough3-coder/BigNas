import type { Metadata } from "next";
import { verifyAdmin } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";
export const metadata: Metadata = { title: "Admin dashboard" };

export default async function AdminDashboardPage() {
  await verifyAdmin();
  const supabase = await createClient();
  const [{ count: productCount }, { count: openOrderCount }] = await Promise.all([
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("orders").select("id", { count: "exact", head: true }).eq("status", "pending_quote"),
  ]);
  return <>
    <p className="eyebrow">Overview</p><h1>Dashboard</h1>
    <div className="order-summary">
      <div className="order-summary-line"><span>Products</span><span>{productCount ?? 0}</span></div>
      <div className="order-summary-line"><span>Orders awaiting quote</span><span>{openOrderCount ?? 0}</span></div>
    </div>
  </>;
}
