import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/public";
import type { Category, Product } from "@/lib/products";
import type { IconName } from "@/components/Icon";

type CategoryRow = { id: string; name: string; icon: string; sort_order: number };
type ProductRow = {
  id: string; category_id: string | null; position: number; name: string; finish_label: string;
  price: number | null; currency: string | null; price_status: string;
  description: string; alt: string; thumbnail_key: string; image_key: string;
  sku: string | null; dimensions: Record<string, unknown> | null;
  material_grade: string | null; stock: number | null;
  included_items: string[] | null; data_status: string;
};

const toCategory = (row: CategoryRow): Category => ({ id: row.id, name: row.name, icon: row.icon as IconName });
const toProduct = (row: ProductRow): Product => ({
  id: row.id, name: row.name, category: row.category_id ?? "", finishLabel: row.finish_label,
  price: row.price, currency: row.currency, priceStatus: row.price_status,
  description: row.description, alt: row.alt, thumbnailKey: row.thumbnail_key, imageKey: row.image_key,
  sku: row.sku, dimensions: row.dimensions, materialGrade: row.material_grade, stock: row.stock,
  includedItems: row.included_items, dataStatus: row.data_status,
});

export const getCatalog = cache(async (): Promise<{ products: Product[]; categories: Category[] }> => {
  const supabase = await createClient();
  const [{ data: categoryRows, error: categoryError }, { data: productRows, error: productError }] = await Promise.all([
    supabase.from("categories").select("id, name, icon, sort_order").order("sort_order"),
    supabase.from("products").select(
      "id, category_id, position, name, finish_label, price, currency, price_status, description, alt, thumbnail_key, image_key, sku, dimensions, material_grade, stock, included_items, data_status"
    ).order("position"),
  ]);
  if (categoryError) throw categoryError;
  if (productError) throw productError;
  return {
    categories: (categoryRows as CategoryRow[]).map(toCategory),
    products: (productRows as ProductRow[]).map(toProduct),
  };
});
