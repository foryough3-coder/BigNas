"use client";
import { Icon } from "@/components/Icon";
import { useEnquiry } from "@/context/enquiry-context";
import { productMessage, projectMessage } from "@/lib/enquiries";
import type { Product } from "@/lib/products";
export function WhatsAppButton({ product, quantity = 1, children = "WhatsApp", className = "button wa-button" }: {
  product?: Product; quantity?: number; children?: React.ReactNode; className?: string;
}) {
  const enquire = useEnquiry();
  return <button className={className}
    aria-label={product ? "Enquire about " + product.name + " on WhatsApp" : undefined}
    onClick={() => enquire(product ? productMessage(product, quantity, window.location.origin) : projectMessage)}>
    <Icon name="whatsapp" size={18} />{children}
  </button>;
}
