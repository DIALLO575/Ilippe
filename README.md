# Illipe — Institutional landing page

A lightweight **static website** for [Illipe](https://illipe.org), the founder-led technology venture behind Aplunio. This is an institutional presentation rather than a sales funnel.

## Content

- Hero: technology products for real-world problems.
- Aplunio: first product, clearly marked **in development**.
- Company: realistic description of a small founder-led venture.
- Approach: real needs, reliable products, continuous improvement.
- Contact: no fictional or unconfigured email address.

## Design

- **Brand-reference colors (Notion, working status):** mineral black `#17191D`, off-white `#F5F4F0`, neutral gray `#858C86`.
- **Secondary mood colors:** muted sage and warm stone, drawn from the visual mockup; not asserted as permanent approved corporate brand tokens.
- **Wordmark:** `assets/illipe-wordmark.svg`. This is a vector *trace of the actual reference PNG* `illipe_wordmark_light_on_charcoal_working.png` stored in the Illipe Google Drive Brand Visual Identity folder, **including the original distinctive lowercase 'i'**. It is an interim web-use conversion, not a certified original master vector.
- **Monogram:** `assets/illipe-i.svg`, traced from the same reference; `favicon.svg` uses that mark.
- **Typography:** Manrope + DM Sans, a *provisional implementation choice*. The Notion Design Tokens database explicitly lists corporate typography as **Not selected**.
- Mineral backgrounds: `assets/hero-mineral.svg`, `assets/aplunio-form.svg`, abstract illustrations, not claims of real facilities or product screenshots.

Brand references:
- [Notion Brand & Visual Identity](https://app.notion.com/p/41263a5022e481e29557cf4aa87ebb57)
- [Drive original wordmark](https://drive.google.com/file/d/12QRbwhF0v2YhjwCR7sPzJvP4N2wyc-7w/view?usp=drivesdk)
- [Drive monogram lockup](https://drive.google.com/file/d/1Jnjrf18bHpctLJsUxw4KWZEgnTjYK4JW/view?usp=drivesdk)

Production-brand QA is still outstanding: artwork quality, original editable master, favicon testing and legal/logo clearance. Do not mark these assets as officially approved just because they are in use.

## Stack

Plain HTML, CSS, a tiny vanilla JavaScript enhancement file. No backend, accounts, auth, database, forms or secret credentials.

## Hosting

GitHub: `DIALLO575/Ilippe` (repository name differs from brand spelling). Vercel project: `illipe`. Deploys from `main`.

- Build command: **none**
- Framework: **Other / static**
- Output directory: **repository root**

Domain `illipe.org` and `www.illipe.org` are attached to the Vercel project but DNS must be configured at Cloudflare before the domain goes live. The `www` hostname redirects to the apex.

**Before announcing:** inspect mobile layout, confirm HTTPS/DNS/redirects, verify a working corporate contact route, and publish only substantiated company/product claims.
