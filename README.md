# Illipe — institutional landing page

A lightweight, static institutional website for **illipe.org**. No authentication, backend, database, framework, API keys or external UI runtime.

## Design and voice

- Dark mineral-black canvas with muted sage-green illumination and abstract CSS/SVG forms.
- Editorial typography, generous spacing, responsive mobile layout, reduced-motion support and keyboard-friendly navigation.
- Institutional and factual, not a conversion funnel. The first product is **Aplunio**, explicitly marked *in development*.
- All visual product graphics are abstract illustrations rather than purported screenshots.
- The contact section intentionally does **not** publish a nonfunctional `contact@illipe.org` mailbox. Add a verified contact method only after it is configured.
- Illipe is described as a founder-led *venture*: the site does not imply completed legal incorporation, trademark registration, financing, customers or company offices.

## Files

- `index.html` — content, semantic HTML, metadata, section links
- `styles.css` — responsive styling and artistic CSS visuals
- `main.js` — progressive enhancement: scroll indicator, mobile nav, reveal animations
- `favicon.svg` — provisional geometric "i" mark for the initial site, not a registered brand asset
- `robots.txt`, `sitemap.xml` — indexing basics

## Deployment

Static site. Can be served directly by Cloudflare Pages, Vercel (Other/framework: None), or any static host.
- Build command: **none**
- Output directory: **repository root** (`.`)
- No environment variables.

Attach `illipe.org` to the hosting project only after validating the deployment, then configure the DNS records requested by the hosting provider in the Cloudflare DNS zone. Domain registration and DNS routing are distinct steps.

## Before publicizing

1. Confirm live domain TLS, apex and www redirect, responsive mobile rendering and accessible navigation.
2. Configure and test an official contact mailbox/forwarder before replacing the temporary contact text with an email link.
3. Add a verified Aplunio product URL only when publicly available; currently no outbound URL is claimed.
4. Complete brand/trademark clearance and incorporate legal disclosures as appropriate. The current SVG identity is temporary pending approved original vector logo.
5. Keep statements about team, product status and company formation accurate as they evolve.
