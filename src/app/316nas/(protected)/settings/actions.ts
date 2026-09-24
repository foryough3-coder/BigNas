"use server";
import { revalidatePath } from "next/cache";
import { verifyAdmin } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";
import { isValidWhatsappNumber } from "@/lib/enquiries";

export type UpdateSettingsState = { error?: string; saved?: boolean } | undefined;

export async function updateSettings(_prevState: UpdateSettingsState, formData: FormData): Promise<UpdateSettingsState> {
  await verifyAdmin();

  const raw = String(formData.get("whatsappNumbers") ?? "").split(/[\n,]/).map(s => s.trim()).filter(Boolean);
  const numbers = [...new Set(raw.map(s => s.replace(/\D/g, "")))];
  const invalid = raw.filter(s => !isValidWhatsappNumber(s.replace(/\D/g, "")));
  if (invalid.length) {
    return { error: "Not a valid international number: " + invalid.join(", ") + ". Include the country code, e.g. +591 7XXXXXXX." };
  }
  const location = String(formData.get("location") ?? "").trim();

  const supabase = await createClient();
  const { data, error } = await supabase.from("site_settings")
    .update({ whatsapp_numbers: numbers, location, updated_at: new Date().toISOString() })
    .eq("id", 1).select("id");
  if (error) return { error: "Could not save settings: " + error.message };
  if (!data?.length) return { error: "Settings row not found — run supabase/sql/004_site_settings.sql in the Supabase SQL editor first." };

  revalidatePath("/", "layout");
  return { saved: true };
}
