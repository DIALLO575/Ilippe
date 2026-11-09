# Illipe — Institutional Website V2

[Illipe](https://illipe.vercel.app/) is an early-stage, founder-led technology venture in development. This is its **institutional website**, not a sales landing page.

## Information architecture
- `/` **Home** — identity, parent-venture role, approach, first initiative.
- `/company/` **Company** — who Illipe is, why it exists, and the parent organization it aims to build.
- `/work/` **Our work** — Aplunio as the only currently presented initiative, accurately labeled *in development*.
- `/contact/` **Contact** — dedicated institutional enquiry and partnership email channels.

Contact is a dedicated route, with compact call-to-action links across the three other pages. The founder-reported Zoho Mail addresses `contact@illipe.org` (general enquiries) and `partnerships@illipe.org` (partnerships) are public `mailto:` links; the privileged `admin@illipe.org` account remains private. No fictional office, team roster, customers, legal registration, or live Aplunio URL are claimed.

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
- Canonical site URLs: `https://illipe.org/`, `/company/`, `/work/`, `/contact/`.
- Verify Cloudflare DNS and custom domain HTTPS separately before publicly announcing the site.
- The two publicly designated Illipe email addresses are shown on the dedicated Contact page; the general address is also in the footer. Zoho mailbox delivery tests must still be verified separately; no Aplunio product URL is claimed.

## QA checklist
- All four pages load over HTTPS with CSS and logo.
- Navigation and CTA destinations stay within the correct page structure.
- Mobile menu opens, closes and keyboard Escape works.
- Verify at 320px, 390px, 768px and large desktop widths.
- Check readable contrast, keyboard navigation and no horizontal overflow.

## Aplunio brand asset provenance

The wordmark shown on Home and Our Work is Aplunio's **real founder-selected V1 kit**, not the illustrative A used in early mockups. The SVG assets are copied from the official [Aplunio Brand Kit V1](https://drive.google.com/file/d/1hl5yWrKj-R5OlrKNxCtKvY2bUVLBp3l7/view) stored in the Aplunio Google Drive project and documented in [Aplunio Brand Guidelines](https://app.notion.com/p/40663a5022e48197acfbe6fa586e0122). In the repo, `assets/aplunio-logo-primary.svg` is the source vector for light backgrounds; `assets/aplunio-logo-on-dark.svg` is the matching verified-on-dark variant for this site. **Aplunio brand asset status remains Needs QA** in Notion: exact vector and trademark clearance are not represented as final approvals.

## V3 design refresh

The selected editorial website direction is implemented in HTML/CSS: full-bleed architectural **concept image** behind the institutional hero (not company headquarters), a three-principle band, a standalone Aplunio initiative panel with its genuine blue-on-dark logo and abstract visual (not a fabricated screenshot), a light off-white company identity panel and dark navy approach cards. The interior Company and Our Work pages share the same component palette. No new backend, animation library, fictitious business claims or external image dependencies.

## Interaction and regression checks

The site includes a separate, small `polish.css` layer for responsive refinements, subtle transitions, a mobile navigation sheet and reduced-motion behaviour. `main.js` uses `IntersectionObserver` for on-screen reveals only; the site remains usable without animations or a JavaScript framework. Run `node --check main.js && node --test tests/site-smoke.test.mjs` to verify navigation anchors, required assets, SEO metadata, brand fidelity and responsive/reduced-motion rules. GitHub Actions runs these checks on `main` and pull requests. This automated smoke suite does **not** replace a visual mobile device check or Lighthouse performance audit.

## V5 panoramic hero

The Home hero is a full-width 1600x760 WebP editorial illustration. The source was a *generated webpage concept*, and `scripts/build_hero.py` extracts only a clean architectural area (no baked-in navbar, title, call-to-action or UI) and fades it into a dark navy panorama. Real Illipe typography, navigation and CTAs are rendered in semantic HTML above the background. Concept art is **not** an actual Illipe office/building; no property claim is made. Responsive framing keeps the text readable and preserves the architecture's visibility on desktop and mobile. The old 510x550 portrait card is no longer used on the homepage.

## Institutional contact update (2026-11-09)

The earlier contact section was consolidated into `/contact/` to keep navigation unambiguous. Other pages link to the dedicated page instead of repeating the full contact block. Only public institutional contact channels are published. This change introduces no external contact-form service, backend, tracking, or credentials. The `admin@illipe.org` mailbox stays internal. Provider-side delivery tests and 2FA checks are tracked in [Illipe's Business Email register](https://app.notion.com/p/45f5ccef74464beaa2fd11cdb6b943cc).

## Contact navigation consolidation (2026-11-09)

All main navigation, mobile navigation, footer and contact call-to-actions now link directly to `/contact/`, a standalone responsive page with two public Zoho Mail addresses. Older `/#contact` bookmarks redirect through a small client-side compatibility check. Home, Company, and Our Work show only a compact invitation to contact. The Contact page has canonical metadata, schema.org ContactPage markup, and a sitemap entry. `admin@illipe.org` remains unpublished. Browser and static smoke tests cover direct routing and mobile display. Delivery tests of email inboxes remain a separate Zoho task.
