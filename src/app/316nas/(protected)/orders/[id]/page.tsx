import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { verifyAdmin } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";
import { OrderStatusForm } from "@/components/OrderStatusForm";
import { updateOrderStatus } from "../actions";
export const metadata: Metadata = { title: "Order detail" };

type OrderItemRow = { id: string; product_name: string; finish_label: string | null; quantity: number; price: number | null };
type OrderDetailRow = {
  id: string; status: string; customer_name: string; customer_phone: string;
  customer_email: string | null; customer_address: string | null; notes: string | null;
  created_at: string; order_items: OrderItemRow[];
};

export default async function AdminOrderDetailPage({ params }: PageProps<"/316nas/orders/[id]">) {
  await verifyAdmin();
  const { id } = await params;
  const supabase = await createClient();
  const { data: order } = await supabase
    .from("orders")
    .select("id, status, customer_name, customer_phone, customer_email, customer_address, notes, created_at, order_items(id, product_name, finish_label, quantity, price)")
    .eq("id", id)
    .single<OrderDetailRow>();
  if (!order) notFound();

  return <>
    <p className="eyebrow">Order</p><h1>{order.customer_name}</h1>
    <div className="order-summary">
      <div className="order-summary-line"><span>Phone</span><span>{order.customer_phone}</span></div>
      {order.customer_email && <div className="order-summary-line"><span>Email</span><span>{order.customer_email}</span></div>}
      {order.customer_address && <div className="order-summary-line"><span>Address</span><span>{order.customer_address}</span></div>}
      {order.notes && <div className="order-summary-line"><span>Notes</span><span>{order.notes}</span></div>}
      <div className="order-summary-line"><span>Received</span><span>{new Date(order.created_at).toLocaleString()}</span></div>
    </div>
    <div className="order-summary">
      {order.order_items.map(item => <div className="order-summary-line" key={item.id}>
        <span>{item.product_name}{item.finish_label ? " — " + item.finish_label : ""}</span><span>Qty {item.quantity}</span>
      </div>)}
    </div>
    <OrderStatusForm status={order.status} action={updateOrderStatus.bind(null, order.id)} />
  </>;
}
