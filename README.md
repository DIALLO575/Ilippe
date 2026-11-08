# Illipe — Institutional Website V2

[Illipe](https://illipe.vercel.app/) is an early-stage, founder-led technology venture in development. This is its **institutional website**, not a sales landing page.

## Information architecture
- `/` **Home** — identity, parent-venture role, approach, first initiative.
- `/company/` **Company** — who Illipe is, why it exists, and the parent organization it aims to build.
- `/work/` **Our work** — Aplunio as the only currently presented initiative, accurately labeled *in development*.

Contact is a shared footer section with a transparently pending public contact channel. No fictional email address, office, team roster, customers, legal registration, or live Aplunio URL are claimed.

## Brand fidelity
- Reused `assets/illipe-wordmark.svg`, `assets/illipe-i.svg` and `favicon.svg`, which were traced from the actual Illipe working PNG logo reference stored in Google Drive.
- Notion's working brand palette is **Mineral Black `#17191D`**, **Off-White `#F5F4F0`**, **Muted Gray `#858C86`**.
- Typography uses provisional Manrope and DM Sans; **no approved official typeface has been selected**.
- No beige cloud artwork, stock illustration, flashy gradients, scroll reveal animations, or decorative animations.
- The traced SVG is a web-use asset from working PNG, **not an approved vector master**. Final production-artwork QA, trademark similarity and rights review remain pending.

[Notion Brand & Visual Identity](https://app.notion.com/p/41263a5022e481e29557cf4aa87ebb57)
[Drive Logo Reference](https://drive.google.com/file/d/12QRbwhF0v2YhjwCR7sPzJvP4N2wyc-7w/view?usp=drivesdk)

## Implementation
Plain semantic HTML + shared CSS + minimal vanilla JavaScript (responsive menu and footer year). No backend, authentication, database or API keys. Desktop navigation, keyboard focus, reduced-motion and no-JS mobile navigation are supported.

Host: Vercel project `illipe`, connected to `DIALLO575/Ilippe` (repository spelling differs from brand), deploying from `main`.

- Build command: none
- Framework preset: Other / Static
- Output directory: root
- Canonical site URLs: `https://illipe.org/`, `/company/`, `/work/`.
- Verify Cloudflare DNS and custom domain HTTPS separately before publicly announcing the site.
- When a verified public email and Aplunio URL exist, add them to the appropriate pages, not before.

## QA checklist
- All three pages load over HTTPS with CSS and logo.
- Navigation and CTA destinations stay within the correct page structure.
- Mobile menu opens, closes and keyboard Escape works.
- Verify at 320px, 390px, 768px and large desktop widths.
- Check readable contrast, keyboard navigation and no horizontal overflow.
