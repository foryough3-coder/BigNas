"use client";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/Icon";
import { whatsappUrl } from "@/lib/enquiries";
import { useSiteSettings } from "@/context/site-settings-context";
const EnquiryContext = createContext<((message: string) => void) | null>(null);
export function EnquiryProvider({ children }: { children: ReactNode }) {
  const primaryNumber = useSiteSettings().whatsappNumbers[0];
  const dialog = useRef<HTMLDialogElement>(null);
  const field = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState("Copy message");
  useEffect(() => {
    if (message !== null && dialog.current && !dialog.current.open) dialog.current.showModal();
  }, [message]);
  function openEnquiry(text: string) {
    const href = whatsappUrl(primaryNumber, text);
    if (href && href.length < 7000) { window.open(href, "_blank", "noopener,noreferrer"); return; }
    setCopyStatus("Copy message"); setMessage(text);
  }
  async function copy() {
    try { await navigator.clipboard.writeText(message ?? ""); setCopyStatus("Message copied"); }
    catch { field.current?.focus(); field.current?.select(); setCopyStatus("Select and copy the message"); }
  }
  return <EnquiryContext.Provider value={openEnquiry}>{children}
    <dialog ref={dialog} className="enquiry-dialog" aria-labelledby="enquiry-title" onClose={() => setMessage(null)}>
      <button className="dialog-close" onClick={() => dialog.current?.close()} aria-label="Close enquiry"><Icon name="close" /></button>
      <p className="eyebrow">WhatsApp enquiry</p><h2 id="enquiry-title">Your message, ready to go.</h2>
      <p className="enquiry-intro">Keep your product details and project notes together.</p>
      <label htmlFor="enquiry-message" className="sr-only">Enquiry message</label>
      <textarea id="enquiry-message" ref={field} value={message ?? ""} onChange={e => setMessage(e.target.value)} rows={8} />
      <button className="button primary" onClick={copy}>{copyStatus}</button>
      <p className="preview-notice">{whatsappUrl(primaryNumber, "") ? "This selection is too long for one chat link. Copy the list and paste it into your conversation." : "WhatsApp contact details will be available soon. You can copy your enquiry in the meantime."}</p>
    </dialog>
  </EnquiryContext.Provider>;
}
export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (!context) throw new Error("useEnquiry requires EnquiryProvider");
  return context;
}
