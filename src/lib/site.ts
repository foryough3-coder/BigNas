// Absolute site origin for canonical URLs, the sitemap, share previews and
// structured data. NEXT_PUBLIC_SITE_URL overrides it (e.g. for a preview deploy).
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://three16craft.com").trim().replace(/\/+$/, "");
export const siteName = "three16craft";
export const siteDescription = "Glass spigots, handrail fittings, glass clamps, door hardware and finials in polished silver, matte black and gold. Build your selection and order on WhatsApp.";
export const absoluteUrl = (path: string) => (/^https?:\/\//.test(path) ? path : siteUrl + "/" + path.replace(/^\/+/, ""));
