"use client";
import { createContext, useContext, type ReactNode } from "react";
import type { Category, Product } from "@/lib/products";

type CatalogContextValue = { products: Product[]; categories: Category[] };
const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({ products, categories, children }: CatalogContextValue & { children: ReactNode }) {
  return <CatalogContext.Provider value={{ products, categories }}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context) throw new Error("useCatalog requires CatalogProvider");
  return context;
}
