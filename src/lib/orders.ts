export type OrderItemInput = { productId: string; name: string; finishLabel: string; quantity: number; price: number | null };
export type OrderInput = {
  customerName: string; customerPhone: string; customerEmail: string | null;
  customerAddress: string | null; notes: string | null; items: OrderItemInput[];
};
export type OrderFieldErrors = Partial<Record<"customerName" | "customerPhone" | "items", string>>;

const clampQuantity = (quantity: number) => Math.min(999, Math.max(1, Math.floor(quantity)));

export function validateOrder(input: {
  customerName: string; customerPhone: string; customerEmail: string; customerAddress: string; notes: string;
  items: { productId: string; name: string; finishLabel: string; quantity: number; price: number | null }[];
}): { ok: true; order: OrderInput } | { ok: false; errors: OrderFieldErrors } {
  const errors: OrderFieldErrors = {};
  const customerName = input.customerName.trim();
  const customerPhone = input.customerPhone.trim();
  if (!customerName) errors.customerName = "Enter your name.";
  if (!customerPhone) errors.customerPhone = "Enter a phone number.";
  if (!input.items.length) errors.items = "Your cart is empty.";
  if (Object.keys(errors).length) return { ok: false, errors };
  return {
    ok: true,
    order: {
      customerName, customerPhone,
      customerEmail: input.customerEmail.trim() || null,
      customerAddress: input.customerAddress.trim() || null,
      notes: input.notes.trim() || null,
      items: input.items.map(item => ({ ...item, quantity: clampQuantity(item.quantity) })),
    },
  };
}
