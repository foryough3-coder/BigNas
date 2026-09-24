import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

// The admin path is deliberately not listed here (robots.txt is public and
// would advertise it); admin pages send a noindex header instead.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/cart", "/checkout"] },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
