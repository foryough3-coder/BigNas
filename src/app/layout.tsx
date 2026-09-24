import type { Metadata, Viewport } from "next";
import "./design-tokens.css";
import "./storefront.css";
import "./refinements.css";
import "./globals.css";
import { CatalogProvider } from "@/context/catalog-context";
import { CartProvider } from "@/context/cart-context";
import { EnquiryProvider } from "@/context/enquiry-context";
import { MotionProvider } from "@/context/motion-context";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { getCatalog } from "@/lib/catalog";
import { getSiteSettings } from "@/lib/settings";
import { SiteSettingsProvider } from "@/context/site-settings-context";
import { siteDescription, siteName, siteUrl } from "@/lib/site";
export async function generateMetadata(): Promise<Metadata> {
  const { location } = await getSiteSettings();
  const title = siteName + " — Architectural hardware" + (location ? " in " + location : "");
  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: "%s | " + siteName },
    description: siteDescription,
    applicationName: siteName,
    openGraph: { type: "website", siteName, title, description: siteDescription, url: "/", locale: "en" },
    twitter: { card: "summary_large_image", title, description: siteDescription },
  };
}
export const viewport: Viewport = { themeColor: "#243f50" };
export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [{ products, categories }, settings] = await Promise.all([getCatalog(), getSiteSettings()]);
  return <html lang="en"><body>
    <link rel="preload" href="/fonts/geist-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
    <SiteSettingsProvider settings={settings}><CatalogProvider products={products} categories={categories}>
    <CartProvider><EnquiryProvider><MotionProvider>
      <a className="skip" href="#main">Skip to content</a><Header />{children}<Footer /><CartDrawer />
    </MotionProvider></EnquiryProvider></CartProvider>
    </CatalogProvider></SiteSettingsProvider>
  </body></html>;
}
