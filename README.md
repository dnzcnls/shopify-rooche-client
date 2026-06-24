# Maison Noir — Shopify Theme

A luxurious Parisian-inspired Shopify theme for women's clothing and fine jewelry, in the editorial spirit of Chanel and Prada. Black & white minimalist with full-color product photography.

## What's Included

### Pages / Templates
- `index.json` — Editorial homepage (hero, manifesto, split editorial, featured products, jewelry banner, services)
- `product.json` — Product detail page (gallery, variants/sizes, add to cart, details)
- `collection.json` — Shop / boutique grid with filter tabs
- `cart.json` — Shopping bag with line item editing
- `page.json` — Generic content page (About, Contact, Journal, etc.)
- `search.json` — Site search
- `404.json` — Custom not-found page
- `customers/login.liquid` — Sign in (editorial split)
- `customers/register.liquid` — Create account (editorial split)
- `customers/account.liquid` — Order history & addresses
- `customers/reset_password.liquid` — Password reset
- `customers/activate_account.liquid` — Account activation
- `customers/addresses.liquid` — Address book
- `customers/order.liquid` — Order detail

### Sections (all configurable in the theme editor)
- Header (with announcement bar marquee, menu, cart count)
- Footer (newsletter, menu columns)
- Hero, Manifesto, Editorial Split, Featured Collection, Feature Banner, Services
- Main Product, Main Collection, Main Cart, Main Page, Main Login, Main Register, Main Account, Main Search, Main 404

## Installation

1. In your Shopify admin go to **Online Store → Themes**.
2. Under **Theme library**, click **Add theme → Upload zip file**.
3. Select `maison-noir-theme.zip`.
4. Once uploaded, click **Customize** to configure menus, products, and content.

## Recommended Setup

After installation:

1. **Navigation** (Online Store → Navigation)
   - Main menu: Boutique (`/collections/all`), Ready-to-Wear (`/collections/ready-to-wear`), Joaillerie (`/collections/jewelry`), Journal (`/pages/journal`), Maison (`/pages/about`)
   - Footer menus: `la-maison`, `client-services`, `boutiques` (or reuse `footer`)

2. **Collections** (Products → Collections — create these handles)
   - `frontpage` — for the "Pieces of the Season" homepage block
   - `ready-to-wear` — clothing
   - `jewelry` — fine jewelry

3. **Pages** (Online Store → Pages)
   - About (handle: `about`)
   - Contact (handle: `contact`) — Shopify renders a contact form via the `page.contact` template if you create `templates/page.contact.json` and add a form section (or use a Shopify contact app).
   - Journal (handle: `journal`)

4. **Products** — add real product images. The theme uses the first product variant's options as size/variant swatches.

## Brand Palette
- Ivory background `#fbfaf7`
- Ink `#0a0a0a`
- Stone (muted) `#888581`
- Fonts: Bodoni Moda (display), Cormorant Garamond (serif), Inter (sans) — loaded from Google Fonts.

## Notes
- All checkout/cart actions use Shopify's native AJAX cart API (`/cart/add.js`, `/cart/change.js`).
- Customer flows use native Shopify forms (`customer_login`, `create_customer`, `recover_customer_password`, etc.) — fully compatible with Shopify accounts.
- Sample editorial photography is bundled in `assets/` and is used as fallback imagery in the sections; replace via the theme editor by uploading your own images.
