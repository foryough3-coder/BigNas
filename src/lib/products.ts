import catalog from "@/data/catalog.json";
import type { IconName } from "@/components/Icon";
export type Product = {
  id: string; name: string; category: string; finishLabel: string;
  price: number | null; currency: string | null; description: string; alt: string;
  thumbnailKey: string; imageKey: string; sku: string | null;
};
export const products: Product[] = catalog.products;
export const categories = catalog.categories.map(c => ({ ...c, icon: c.icon as IconName }));
export const getProductById = (id: string) => products.find(p => p.id === id);
export const categoryName = (id: string) => categories.find(c => c.id === id)?.name ?? id;
export const finishClass = (p: Product) => p.finishLabel.toLowerCase().includes("black") ? "black" : p.finishLabel.toLowerCase().includes("gold") ? "gold" : "";
