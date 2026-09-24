# Continue with three16craft

The retouched storefront is now integrated as native Next.js pages in:
C:/Users/korsa/Desktop/BIG_NAS/ecommerce-app

## Start working

From the project directory:

    npm run dev

Open http://localhost:3000. Existing dependencies are installed. For a fresh checkout, run npm ci first.

    npm run lint
    npm run build

Both checks passed after integration. The production build was also checked in Chromium: home, category/search filters, product pages, cart quantities and persistence, removal, enquiry drafts, mobile layout and logo animation controls.

## Where to edit

| Area | Location |
|---|---|
| Homepage arrangement | src/app/page.tsx |
| Product catalog (database) | Supabase `products`/`categories` tables — edit via /316nas/products, or the SQL editor |
| Database SQL (schema, policies, seed, settings) | supabase/sql/001–004 |
| Server-side data access | src/lib/catalog.ts, src/lib/products.ts |
| Client catalog context | src/context/catalog-context.tsx |
| Supabase clients | src/lib/supabase/client.ts, server.ts, public.ts |
| Admin area (products, orders, settings) — URL /316nas | src/app/316nas |
| Checkout / order request | src/app/checkout, src/lib/orders.ts |
| Session refresh + admin route guard | src/proxy.ts (Next.js 16 renamed Middleware to Proxy) |
| Header and footer | src/components/Header.tsx, Footer.tsx |
| Filterable collection | src/components/ProductCollection.tsx |
| Product card | src/components/ProductCard.tsx |
| Product page | src/app/products/[id]/page.tsx |
| Cart page and state | src/app/cart/page.tsx, src/context/cart-context.tsx |
| WhatsApp text and links | src/lib/enquiries.ts |
| Enquiry dialog | src/context/enquiry-context.tsx |
| Brand colors and font | src/app/design-tokens.css |
| Approved base layout | src/app/storefront.css |
| Latest UI retouch (also checkout/admin forms) | src/app/refinements.css |
| Native page adjustments | src/app/globals.css |
| SVG icon component | src/components/Icon.tsx |
| Original SVG files | public/icons |
| Product images | public/three16craft/products/v1 |
| Banner | public/three16craft/banners/v1 |
| GIF and static logo | public/three16craft/brand/v1 |
| Local Geist font and license | public/fonts |
| Image upload map (for a future image host; unused) | design/r2-manifest.json |
| Reference design pack | design/three16craft-design-pack.zip |

## Current behavior

- The product catalog lives in Supabase (Postgres). The original catalog.json was removed; its data is in supabase/sql/003_seed.sql and in git history.
- Prices are intentionally mostly absent still. Catalog prices and currency are null until confirmed and edited in /316nas/products.
- The cart stores IDs and quantities in localStorage under three16craft-cart-v1; it resolves full product data from the Supabase-backed catalog.
- Product pages use real shareable routes, statically generated from the catalog at build time.
- Customers can either "Enquire about your cart" (WhatsApp draft, unchanged) or "Submit order request" (/checkout), which writes to the `orders`/`order_items` tables. No payment is taken.
- WhatsApp numbers and the business location are edited at /316nas/settings. The first number is used by every WhatsApp button; until one is set, the buttons show a copyable draft.
- The main logo is an animated GIF and plays by default, including on devices set to reduce motion. The footer button pauses it.
- The live site is https://three16craft.com. All images and the font are served from the site itself (public/); no image host or font service is used.

## Environment variables

Copy .env.example to .env.local and supply the real values. Do not put upload secrets in NEXT_PUBLIC variables.

- NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY: from your Supabase project's Project Settings > API. Required — the catalog, checkout and admin area all depend on them.
- NEXT_PUBLIC_SITE_URL: optional; defaults to https://three16craft.com. Used for canonical links, the sitemap, share previews and product links in WhatsApp messages.
- NEXT_PUBLIC_ASSET_BASE_URL: leave empty. Only needed if images later move to a separate host such as Cloudflare R2 (see design/r2-manifest.json).

### Set up Supabase (one time)

1. Create a project at supabase.com.
2. In the SQL editor, run supabase/sql/001_schema.sql, 002_policies.sql, 003_seed.sql and 004_site_settings.sql, in that order. This creates the tables and security policies, seeds the 6 categories and 12 products, and adds the editable settings (location starts as La Paz).
3. Copy the Project URL and anon (public) key into `.env.local` as above. No service-role key is used anywhere in this app.
4. Create your own admin login under Authentication > Users > Add user (email + password) — there is no public sign-up page, by design.
5. Back in the SQL editor, run: `update profiles set is_admin = true where email = 'the-email-you-used';`
6. Sign in at /316nas/login, then add your WhatsApp numbers under Settings.

Restart the dev server after changing environment values; rebuild for production. To test from a phone on the same network, open the Network address `npm run dev` prints; next.config.ts allows common local-network ranges (iPhone hotspot 172.20.10.x, 192.168.x.x, 10.x.x.x).

## Before publishing

Confirm trade names, sellable units, finish variants, measurements, compatibility and included parts — edit them directly in /316nas/products now that the catalog is in Supabase. Add the real business number, contact details and policies. Prices can be added when supplied via the same admin screen; a payment processor has not been introduced — checkout currently collects an order request only.

## Backup

The original starter files were saved before integration to:
C:/Users/korsa/Documents/Codex/2026-09-22/le/outputs/ecommerce-app-before-three16craft.zip

The backup excludes dependencies and build output.
