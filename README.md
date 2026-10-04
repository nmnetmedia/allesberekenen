# AllesBerekenen – gratis online calculators

A fast, SEO-optimised Dutch-language calculator platform built with **Astro 7** (static prerender) and **Preact islands** (only the calculator on the page loads JavaScript, ±15–25 kB uncompressed).

## Getting started

```bash
npm install
npm run dev        # http://localhost:4321
npm test           # unit tests for all calculation logic
npm run build      # static site in dist/
npm run preview    # serve the production build
npm run assets     # regenerate favicons and OG image
```

Copy `.env.example` to `.env` and set the real domain (`PUBLIC_SITE_URL`), contact address and optionally `PUBLIC_GTM_ID` / `PUBLIC_GA4_ID` / `PUBLIC_GSC_VERIFICATION`. Without analytics IDs no external scripts are loaded and no consent banner is shown.

## Structure

| Path | Purpose |
| --- | --- |
| `src/config/site.ts` | Site name, domain, nav, analytics config |
| `src/config/tax/` | Tax parameters per country/year (`nl-2026.ts`, Belgian placeholder) |
| `src/config/redirects.mjs` | 301 redirects (old URL → new URL) |
| `src/lib/calc/` | Pure calculation logic (tested in `tests/calc.test.ts`) |
| `src/data/calculators/` | All content per calculator: SEO, intro, formula, examples, mistakes, FAQ, sources, review date |
| `src/data/categories.ts` | Category landing page content |
| `src/islands/` | Interactive Preact calculators + shared UI (`ui/`) |
| `src/components/`, `src/layouts/` | Astro components (server-rendered HTML) |
| `src/pages/[slug].astro` | One route for all calculator and category pages |

## Adding a calculator

1. Add the logic to `src/lib/calc/` plus tests.
2. Add a content file in `src/data/calculators/` and register it in `index.ts`.
3. Build the island in `src/islands/` and add one line to `src/components/CalculatorIsland.astro`.

The page, sitemap, search, category overviews, footer and related links pick it up automatically.

## Yearly tax update

Copy `src/config/tax/nl-2026.ts` to `nl-2027.ts`, update brackets/credits, `sources` and `checkedOn`, add it to `taxConfigs` in `src/config/tax/index.ts` and make it `defaultTaxConfig`. The tables on the bruto-netto page are generated from this config.

## Analytics events

`calculator_view`, `calculator_start`, `calculator_completed`, `calculator_share` — each with `calculator_name` (and `share_method` for shares). Pushed to `dataLayer` (GTM) or sent via `gtag` (GA4). Consent Mode v2 defaults to denied.

## Deploying

The output in `dist/` is fully static (`build.format: 'file'`, no trailing slashes). Works on Netlify, Vercel, Cloudflare Pages or any static host. Configure the host to serve `404.html` for unknown paths and, ideally, mirror `src/config/redirects.mjs` as real 301s.
