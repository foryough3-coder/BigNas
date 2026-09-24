"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { verifyAdmin } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

export type ProductFormState = { error?: string; saved?: boolean } | undefined;

const text = (formData: FormData, key: string) => String(formData.get(key) ?? "").trim();
const nullableText = (formData: FormData, key: string) => text(formData, key) || null;

function parseProductForm(formData: FormData) {
  const name = text(formData, "name");
  const finishLabel = text(formData, "finishLabel");
  const description = text(formData, "description");
  const alt = text(formData, "alt") || name;
  const thumbnailKey = text(formData, "thumbnailKey");
  const imageKey = text(formData, "imageKey") || thumbnailKey;
  if (!name || !finishLabel || !description) return { error: "Name, finish and description are required." };
  if (!thumbnailKey) return { error: "Add an image path." };

  const priceRaw = text(formData, "price");
  const price = priceRaw === "" ? null : Number(priceRaw);
  if (price !== null && (Number.isNaN(price) || price < 0)) return { error: "Price must be a positive number." };

  const stockRaw = text(formData, "stock");
  const stock = stockRaw === "" ? null : Number(stockRaw);
  if (stock !== null && !Number.isInteger(stock)) return { error: "Stock must be a whole number." };

  const dimensionsRaw = text(formData, "dimensions");
  let dimensions: Record<string, unknown> | null = null;
  if (dimensionsRaw) {
    try { dimensions = JSON.parse(dimensionsRaw); } catch { return { error: "Dimensions must be valid JSON, or left empty." }; }
  }
  const includedItems = text(formData, "includedItems").split(",").map(s => s.trim()).filter(Boolean);

  return {
    values: {
      name, finish_label: finishLabel, description, alt,
      thumbnail_key: thumbnailKey, image_key: imageKey,
      category_id: text(formData, "category"),
      price, currency: nullableText(formData, "currency"),
      price_status: text(formData, "priceStatus") || "not-provided",
      sku: nullableText(formData, "sku"),
      material_grade: nullableText(formData, "materialGrade"),
      stock, dimensions,
      included_items: includedItems.length ? includedItems : null,
      data_status: text(formData, "dataStatus") || "draft-needs-owner-confirmation",
    },
  };
}

function revalidateProduct(id: string) {
  revalidatePath("/");
  revalidatePath("/products/" + id);
  revalidatePath("/316nas/products");
}

export async function updateProduct(id: string, _prevState: ProductFormState, formData: FormData): Promise<ProductFormState> {
  await verifyAdmin();
  const parsed = parseProductForm(formData);
  if ("error" in parsed) return { error: parsed.error };

  const supabase = await createClient();
  const { error } = await supabase.from("products")
    .update({ ...parsed.values, updated_at: new Date().toISOString() }).eq("id", id);
  if (error) return { error: "Could not save changes: " + error.message };

  revalidateProduct(id);
  revalidatePath("/316nas/products/" + id);
  return { saved: true };
}

export async function createProduct(_prevState: ProductFormState, formData: FormData): Promise<ProductFormState> {
  await verifyAdmin();
  const id = text(formData, "id").toLowerCase();
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)) return { error: "The URL name may only use lowercase letters, numbers and dashes, e.g. square-glass-clamp." };
  const parsed = parseProductForm(formData);
  if ("error" in parsed) return { error: parsed.error };

  const supabase = await createClient();
  const { data: last } = await supabase.from("products").select("position").order("position", { ascending: false }).limit(1).maybeSingle();
  const { error } = await supabase.from("products").insert({ id, position: (last?.position ?? -1) + 1, ...parsed.values });
  if (error) {
    return { error: error.code === "23505" ? "A product with that URL name already exists." : "Could not create product: " + error.message };
  }

  revalidateProduct(id);
  redirect("/316nas/products/" + id);
}

export async function deleteProduct(id: string) {
  await verifyAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error("Could not delete product: " + error.message);
  revalidateProduct(id);
  redirect("/316nas/products");
}
