import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { ProductCollection } from "@/components/ProductCollection";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { assetUrl, brandAssets } from "@/lib/assets";
import { getCatalog } from "@/lib/catalog";
import { getSiteSettings } from "@/lib/settings";
import { absoluteUrl, siteDescription, siteName } from "@/lib/site";
// Filtered/search views (?category=, ?q=) are variations of the homepage.
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default async function Home({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const [params, { products, categories }, settings] = await Promise.all([searchParams, getCatalog(), getSiteSettings()]);
  const storeLd = {
    "@context": "https://schema.org", "@type": "Store",
    name: siteName, description: siteDescription, url: absoluteUrl("/"),
    logo: absoluteUrl(assetUrl(brandAssets.static)), image: absoluteUrl("/opengraph-image.png"),
    ...(settings.location && { address: { "@type": "PostalAddress", addressLocality: settings.location } }),
    ...(settings.whatsappNumbers[0] && { telephone: "+" + settings.whatsappNumbers[0] }),
  };
  const query = typeof params.q === "string" ? params.q.trim() : "";
  const category = typeof params.category === "string" && categories.some(c => c.id === params.category) ? params.category : "all";
  return <main id="main">
    <JsonLd data={storeLd} />
    <section className="hero" id="top" aria-labelledby="hero-title">
      <Image className="hero-image" src={assetUrl("three16craft/banners/v1/hero-desktop.webp")} width={1851} height={850} unoptimized loading="eager" fetchPriority="high" alt="Polished silver and matte black glass spigots, a glass clamp, and gold and silver finials" />
      <div className="wrap hero-inner"><div className="hero-copy">
        <p className="eyebrow"><span />Hardware &amp; finishing details</p>
        <h1 id="hero-title">Every detail.<br /><span>Beautifully finished.</span></h1>
        <p className="hero-description">Explore fittings and finishing touches for glass, handrails and doors.</p>
        <div className="hero-actions"><Link className="button primary" href="/#collection">Explore products <Icon name="arrow-right" size={18} /></Link><Link className="text-link" href="/#project-help">Plan your project</Link></div>
      </div></div>
    </section>
    <section className="categories wrap" aria-labelledby="category-title">
      <div className="section-heading compact"><h2 id="category-title">Find the right fitting.</h2><span>Six categories. Every finishing touch.</span></div>
      <div className="category-grid">{categories.map(c => {
        const count = products.filter(p => p.category === c.id).length;
        return <Link key={c.id} className="category-tile" href={"/?category=" + c.id + "#collection"}><Icon name={c.icon} size={32} /><b>{c.name}</b><small>{count} {count === 1 ? "product" : "products"}</small></Link>;
      })}</div>
    </section>
    <ProductCollection key={query + ":" + category} query={query} category={category} />
    <section className="project-help wrap" id="project-help" aria-labelledby="project-title">
      <div className="project-copy"><p className="eyebrow">For your next project</p><h2 id="project-title">Good projects start<br />with the right details.</h2><p>Choose the items you’re considering and add them to your cart. Share your list, quantities and project details with us on WhatsApp.</p><WhatsAppButton className="button primary">Talk about your project</WhatsAppButton></div>
      <div className="project-steps">
        <div><span className="step-number">01</span><div><h3>Explore the collection</h3><p>Start with the fittings and finishes you like.</p></div></div>
        <div><span className="step-number">02</span><div><h3>Build your list</h3><p>Keep your chosen items and quantities together in your cart.</p></div></div>
        <div><span className="step-number">03</span><div><h3>Ask us on WhatsApp</h3><p>Confirm dimensions, compatibility and availability before ordering.</p></div></div>
      </div>
    </section>
  </main>;
}
