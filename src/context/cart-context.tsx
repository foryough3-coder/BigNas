"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getProductById, type Product } from "@/lib/products";
export type CartItem = { product: Product; quantity: number };
type SavedItem = { id: string; quantity: number };
type CartState = { lines: SavedItem[]; ready: boolean };
type CartContextValue = {
  items: CartItem[]; ready: boolean; totalItems: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: string) => void; setQuantity: (id: string, quantity: number) => void;
  clearCart: () => void; cartOpen: boolean; openCart: () => void; closeCart: () => void;
};
const STORAGE_KEY = "three16craft-cart-v1";
const CartContext = createContext<CartContextValue | null>(null);
const clamp = (quantity: number) => Math.min(999, Math.max(1, Math.floor(quantity)));
function readCart(): SavedItem[] {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (!Array.isArray(raw)) return [];
    const merged = new Map<string, number>();
    for (const row of raw) {
      if (!row || typeof row !== "object" || typeof row.id !== "string" ||
          !getProductById(row.id) || !Number.isInteger(row.quantity) || row.quantity < 1) continue;
      merged.set(row.id, clamp((merged.get(row.id) ?? 0) + row.quantity));
    }
    return [...merged].map(([id, quantity]) => ({ id, quantity }));
  } catch { return []; }
}
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CartState>({ lines: [], ready: false });
  const [cartOpen, setCartOpen] = useState(false);
  useEffect(() => {
    // Hydrate localStorage once after SSR, before enabling cart controls.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({ lines: readCart(), ready: true });
  }, []);
  useEffect(() => {
    if (!state.ready) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines)); } catch {}
  }, [state]);
  const items = state.lines.flatMap(({ id, quantity }) => {
    const product = getProductById(id);
    return product ? [{ product, quantity }] : [];
  });
  const removeItem = (id: string) => setState(prev => ({ ...prev, lines: prev.lines.filter(line => line.id !== id) }));
  const addItem = (product: Product, quantity = 1) => {
    if (!getProductById(product.id) || !Number.isFinite(quantity) || quantity <= 0) return;
    setState(prev => {
      const exists = prev.lines.some(line => line.id === product.id);
      return { ...prev, lines: exists ? prev.lines.map(line => line.id === product.id
        ? { ...line, quantity: clamp(line.quantity + quantity) } : line)
        : [...prev.lines, { id: product.id, quantity: clamp(quantity) }] };
    });
  };
  const setQuantity = (id: string, quantity: number) => {
    if (!Number.isFinite(quantity)) return;
    if (quantity <= 0) { removeItem(id); return; }
    setState(prev => ({ ...prev, lines: prev.lines.map(line => line.id === id ? { ...line, quantity: clamp(quantity) } : line) }));
  };
  return <CartContext.Provider value={{ items, ready: state.ready,
    totalItems: items.reduce((sum, item) => sum + item.quantity, 0), addItem, removeItem, setQuantity,
    clearCart: () => setState(prev => ({ ...prev, lines: [] })),
    cartOpen, openCart: () => setCartOpen(true), closeCart: () => setCartOpen(false) }}>{children}</CartContext.Provider>;
}
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart requires CartProvider");
  return context;
}
