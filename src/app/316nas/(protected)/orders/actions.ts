"use server";
import { revalidatePath } from "next/cache";
import { verifyAdmin } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

export type UpdateOrderStatusState = { error?: string; saved?: boolean } | undefined;

const STATUSES = ["pending_quote", "quoted", "confirmed", "fulfilled", "cancelled"];

export async function updateOrderStatus(id: string, _prevState: UpdateOrderStatusState, formData: FormData): Promise<UpdateOrderStatusState> {
  await verifyAdmin();
  const status = String(formData.get("status") ?? "");
  if (!STATUSES.includes(status)) return { error: "Invalid status." };

  const supabase = await createClient();
  const { error } = await supabase.from("orders").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
  if (error) return { error: "Could not update status: " + error.message };

  revalidatePath("/316nas/orders");
  revalidatePath("/316nas/orders/" + id);
  return { saved: true };
}
