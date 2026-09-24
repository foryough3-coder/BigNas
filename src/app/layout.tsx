import type { Metadata } from "next";
import "./design-tokens.css";
import "./storefront.css";
import "./refinements.css";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { EnquiryProvider } from "@/context/enquiry-context";
import { MotionProvider } from "@/context/motion-context";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
export const metadata: Metadata = {
  title: { default: "three16craft — Architectural hardware", template: "%s | three16craft" },
  description: "Explore glass spigots, handrail fittings, door hardware and finishing details. Build your selection and enquire on WhatsApp.",
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en"><body>
    <link rel="preload" href="/fonts/geist-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
    <CartProvider><EnquiryProvider><MotionProvider>
      <a className="skip" href="#main">Skip to content</a><Header />{children}<Footer /><CartDrawer />
    </MotionProvider></EnquiryProvider></CartProvider>
  </body></html>;
}
