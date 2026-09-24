import type { Product } from "@/lib/products";
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim().replace(/\/+$/, "");
export const isValidWhatsappNumber = (number: string) => /^[1-9]\d{7,14}$/.test(number);
export function whatsappUrl(number: string | undefined, message: string): string | null {
  return number && isValidWhatsappNumber(number) ? "https://wa.me/" + number + "?text=" + encodeURIComponent(message) : null;
}
export function productMessage(p: Product, quantity: number, origin: string) {
  return ["Hello three16craft, I’m interested in:", "", p.name, "Finish shown: " + p.finishLabel,
    "Quantity: " + quantity, ...(p.sku ? ["SKU: " + p.sku] : []),
    "Product: " + (siteUrl || origin) + "/products/" + p.id, "",
    "Please confirm the available sizes, compatibility, availability and price."].join("\n");
}
export function cartMessage(items: {product: Product; quantity: number}[], origin: string) {
  return ["Hello three16craft, please help with these items:", "",
    ...items.map(({product:p,quantity}) => "• " + p.name + " — " + p.finishLabel + " — quantity " + quantity + "\n" + (siteUrl || origin) + "/products/" + p.id),
    "", "Please confirm available sizes, compatibility, availability and pricing.", "", "Project details:"].join("\n");
}
export const projectMessage = "Hello three16craft, I’d like help choosing hardware for my project.\n\nProject type:\nItems I’m considering:\nApproximate quantities:\nMeasurements or specifications:\n";
