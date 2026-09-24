"use server";
import { createClient } from "@/lib/supabase/server";
import { validateOrder, type OrderFieldErrors } from "@/lib/orders";

export type CreateOrderState = { errors?: OrderFieldErrors; orderId?: string; message?: string } | undefined;

export async function createOrder(_prevState: CreateOrderState, formData: FormData): Promise<CreateOrderState> {
  let items: { productId: string; name: string; finishLabel: string; quantity: number; price: number | null }[] = [];
  try { items = JSON.parse(String(formData.get("items") ?? "[]")); } catch { items = []; }

  const result = validateOrder({
    customerName: String(formData.get("customerName") ?? ""),
    customerPhone: String(formData.get("customerPhone") ?? ""),
    customerEmail: String(formData.get("customerEmail") ?? ""),
    customerAddress: String(formData.get("customerAddress") ?? ""),
    notes: String(formData.get("notes") ?? ""),
    items,
  });
  if (!result.ok) return { errors: result.errors };

  const supabase = await createClient();
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      customer_name: result.order.customerName,
      customer_phone: result.order.customerPhone,
      customer_email: result.order.customerEmail,
      customer_address: result.order.customerAddress,
      notes: result.order.notes,
    })
    .select("id")
    .single();
  if (orderError || !order) {
    return { message: "Something went wrong submitting your order. Please try again, or use the WhatsApp option instead." };
  }

  const { error: itemsError } = await supabase.from("order_items").insert(
    result.order.items.map(item => ({
      order_id: order.id, product_id: item.productId, product_name: item.name,
      finish_label: item.finishLabel, quantity: item.quantity, price: item.price,
    }))
  );
  if (itemsError) {
    return { message: "Something went wrong submitting your order. Please try again, or use the WhatsApp option instead." };
  }

  return { orderId: order.id as string };
}
