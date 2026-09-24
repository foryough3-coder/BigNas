import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/public";
import { absoluteUrl } from "@/lib/site";

// Refresh hourly so products added or edited in the admin appear.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data, error } = await createClient().from("products").select("id, updated_at").order("position");
  if (error) throw error;
  const products = data ?? [];
  const latest = products.reduce((max, p) => (p.updated_at > max ? p.updated_at : max), "");
  return [
    { url: absoluteUrl("/"), lastModified: latest || undefined, changeFrequency: "weekly", priority: 1 },
    ...products.map(p => ({
      url: absoluteUrl("/products/" + p.id),
      lastModified: p.updated_at,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
