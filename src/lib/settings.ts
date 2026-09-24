import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/public";

export type SiteSettings = { whatsappNumbers: string[]; location: string };

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const { data, error } = await createClient()
    .from("site_settings").select("whatsapp_numbers, location").eq("id", 1).maybeSingle();
  // Settings are non-essential: if 004_site_settings.sql hasn't been run yet,
  // keep the storefront up with no WhatsApp number instead of failing every page.
  if (error || !data) {
    if (error) console.error("site_settings unavailable:", error.message);
    return { whatsappNumbers: [], location: "" };
  }
  return { whatsappNumbers: data.whatsapp_numbers ?? [], location: data.location ?? "" };
});
