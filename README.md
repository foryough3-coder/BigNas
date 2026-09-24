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
| Product content | src/data/catalog.json |
| Product data helpers | src/lib/products.ts |
| Header and footer | src/components/Header.tsx, Footer.tsx |
| Filterable collection | src/components/ProductCollection.tsx |
| Product card | src/components/ProductCard.tsx |
| Product page | src/app/products/[id]/page.tsx |
| Cart page and state | src/app/cart/page.tsx, src/context/cart-context.tsx |
| WhatsApp text and links | src/lib/enquiries.ts |
| Enquiry dialog | src/context/enquiry-context.tsx |
| Brand colors and font | src/app/design-tokens.css |
| Approved base layout | src/app/storefront.css |
| Latest UI retouch | src/app/refinements.css |
| Native page adjustments | src/app/globals.css |
| SVG icon component | src/components/Icon.tsx |
| Original SVG files | public/icons |
| Product images | public/three16craft/products/v1 |
| Banner | public/three16craft/banners/v1 |
| GIF and static logo | public/three16craft/brand/v1 |
| Local Geist font and license | public/fonts |
| R2 upload map | design/r2-manifest.json |
| Reference design pack | design/three16craft-design-pack.zip |

## Current behavior

- Prices are intentionally absent. Catalog prices and currency remain null.
- The cart stores IDs and quantities in localStorage under three16craft-cart-v1.
- Product pages use real shareable routes.
- WhatsApp buttons show a copyable draft until the business number is configured.
- The main logo remains an animated GIF. Reduced motion and the footer control use its static fallback.
- All images and the font work locally without R2 or a font service.

## Connect WhatsApp and R2

Copy .env.example to .env.local and supply the real values. Do not put upload secrets in NEXT_PUBLIC variables.

- NEXT_PUBLIC_WHATSAPP_NUMBER: the business number in international digits-only format.
- NEXT_PUBLIC_SITE_URL: the website's public origin for enquiry links.
- NEXT_PUBLIC_ASSET_BASE_URL: the HTTPS custom domain serving the R2 objects. Leave empty for bundled local images.

Upload every file listed in design/r2-manifest.json using its key. localPath now points to public/three16craft/... in this project. Preserve MIME types and versioned object keys. The GIF must remain image/gif. No upload or DNS change has been made.

Restart the dev server after changing environment values; rebuild for production.

## Before publishing

Confirm trade names, sellable units, finish variants, measurements, compatibility and included parts. The product descriptions remain drafts based on the supplied photos. Add the real business number, contact details and policies. Prices can be added when supplied; payment checkout has not been introduced.

## Backup

The original starter files were saved before integration to:
C:/Users/korsa/Documents/Codex/2026-09-22/le/outputs/ecommerce-app-before-three16craft.zip

The backup excludes dependencies and build output.
