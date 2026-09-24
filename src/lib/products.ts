import type { IconName } from "@/components/Icon";

export type Product = {
  id: string; name: string; category: string; finishLabel: string;
  price: number | null; currency: string | null; priceStatus: string;
  description: string; alt: string; thumbnailKey: string; imageKey: string;
  sku: string | null; dimensions: Record<string, unknown> | null;
  materialGrade: string | null; stock: number | null;
  includedItems: string[] | null; dataStatus: string;
};
export type Category = { id: string; name: string; icon: IconName };

export const getProductById = (products: Product[], id: string) => products.find(p => p.id === id);
export const categoryName = (categories: Category[], id: string) => categories.find(c => c.id === id)?.name ?? id;
export const finishClass = (p: Product) => p.finishLabel.toLowerCase().includes("black") ? "black" : p.finishLabel.toLowerCase().includes("gold") ? "gold" : "";
export const productsByCategory = (products: Product[], categoryId: string) => products.filter(p => p.category === categoryId);
export const relatedProducts = (products: Product[], product: Product, limit: number) =>
  products.filter(p => p.id !== product.id)
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
    .slice(0, limit);
