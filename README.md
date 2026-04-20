# Hypernode.com — Site Port

A port of [hypernode.com](https://www.hypernode.com/en/) away from WordPress, built with **Astro**, **React** (component islands), and **Tailwind CSS**.

## Stack

| Layer | Technology | Reason |
|---|---|---|
| Framework | [Astro](https://astro.build/) | SSG with fine-grained hydration control |
| UI islands | React 19 | Interactive components only where needed |
| Styling | Tailwind CSS v4 | Utility-first, consistent design tokens |
| Static content | Markdown/MDX content collections | Structured, typed content validated with Zod |
| Changelog CMS | Strapi v5 | Headless CMS for editor-managed entries |
| Language | TypeScript | Strict mode throughout |
| Linting | ESLint | Code quality and consistency |

## Pages

| Route | Source | Content strategy |
|---|---|---|
| `/en/` | `src/pages/en/index.astro` | MDX content collection, near-fully static |
| `/en/plans-and-prices/` | `src/pages/en/plans-and-prices/index.astro` | Static shell, React island for pricing table |
| `/en/changelog/` | `src/pages/en/changelog/index.astro` | Fetched from Strapi at build time |

> The changelog lives at `changelog.hypernode.com` in production. For this port it is served at `/en/changelog/`. See [`DECISIONS.md`](./DECISIONS.md) for the subdomain strategy.

## Project structure

```
.
├── .github/
│   └── copilot-instructions.md  # AI assistant context and conventions
├── public/
│   └── robots.txt
├── src/
│   ├── assets/
│   │   └── images/              # Downloaded site images (SVG, WebP, PNG)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── navbar/          # Navbar.astro, NavbarMobileDrawer.tsx, navbarLinks.ts
│   │   │   ├── topbar/          # TopBar.astro
│   │   │   └── footer/          # Footer.astro, FooterMain.astro, FooterLegal.astro, FooterSecondary.astro, footerData.ts
│   │   ├── pages-view/          # Feature-first page assembly components
│   │   │   ├── changelog/       # ChangelogPage.astro, ChangelogFilters.tsx, ChangelogCard.tsx
│   │   │   ├── homepage/        # Homepage.astro, HomepageLeadForm.tsx
│   │   │   └── pricing/         # PricingPage.astro + all pricing React islands
│   │   └── ui/
│   │       ├── primitives/      # Button, Badge, Tag, Icon, FormField, Grid, HorizontalFlex,
│   │       │                    # VerticalFlex, Section, RoundedCard, Pagination, SearchField,
│   │       │                    # SelectField, ImageLinkButton, CheckboxField, ErrorBoundary
│   │       └── blocks/          # FeatureBlock, IconGrid, SectionHeader, CompanyLogoStrip,
│   │                            # FormSection, HeroImage, IconGridSection,
│   │                            # TestimonialsGrid, TestimonialsSection, FAQAccordion
│   ├── content/
│   │   ├── homepage/            # content.mdx — homepage sections data
│   │   └── pricing/             # content.mdx — pricing page sections data
│   ├── content.config.ts        # Content collection schemas (Zod)
│   ├── layouts/
│   │   └── BaseLayout.astro     # <head>, SEO, shared document shell
│   ├── lib/
│   │   ├── strapi.ts            # Strapi client + typed fetchers + seed fallback
│   │   ├── pricing.ts           # Pricing calculation helpers
│   │   ├── pricing-data.json    # Plan data (prices, CPUs, RAM, features)
│   │   ├── pricing-content.json # Pricing page copy (hero, FAQ, etc.)
│   │   └── pricingSchema.ts     # Zod schemas for pricing data validation
│   ├── types/
│   │   ├── changelog.ts         # ChangelogEntry, StrapiChangelogEntry, StrapiListResponse
│   │   ├── core.ts              # Shared base types (e.g. PaginatedResult)
│   │   ├── forms.ts             # LeadFormData
│   │   ├── homepage.ts          # HomepageFeatureSection, Testimonial, etc.
│   │   ├── pricing.ts           # Plan, Currency, Environment, BillingPeriod
│   │   ├── seo.ts               # SEOProps, HreflangEntry
│   │   └── uitypes.ts           # FlexAlign, FlexJustify, FlexGap, etc.
│   └── pages/
│       ├── en/
│       │   ├── index.astro
│       │   ├── plans-and-prices/
│       │   │   └── index.astro
│       │   └── changelog/
│       │       └── index.astro
│       ├── api/
│       │   └── leads.ts         # POST /api/leads — lead form handler
│       └── index.astro          # Redirect → /en/
├── strapi/
│   └── seed.json                # Fixture data for local development
├── eslint.config.js
├── DECISIONS.md
└── astro.config.mjs
```

## Getting started

### Prerequisites

- Node.js >= 22.12.0
- npm ≥ 10

### Install dependencies

```bash
npm install
```

### Optional: run Strapi (changelog CMS)

The changelog is fetched from Strapi at build time. If Strapi is not configured the build falls back to `strapi/seed.json` automatically — no setup required for local development.

To run a full Strapi instance with real data:

**1. Create the Strapi app**

```bash
cd strapi
npx create-strapi-app@latest . --quickstart
```

This scaffolds a Strapi v5 app with SQLite in the `strapi/` directory.

**2. Register the `changelog-entry` content type**

Copy the schema file into the Strapi app:

```bash
mkdir -p strapi/src/api/changelog-entry/content-types/changelog-entry
cp strapi/content-type-schema.json \
   strapi/src/api/changelog-entry/content-types/changelog-entry/schema.json
```

**3. Start Strapi**

```bash
cd strapi
npm run develop
```

Strapi runs at `http://localhost:1337`. Open the admin panel and create your admin account on first launch.

**4. Generate an API token**

In the Strapi admin: **Settings → API Tokens → Create new token**

- Name: `astro-build`
- Token type: **Full access**

Copy the token.

**5. Configure environment variables**

Add the following to `.env.local` in the project root:

```bash
PUBLIC_STRAPI_URL=http://localhost:1337
PUBLIC_STRAPI_TOKEN=<paste-token-here>
```

**6. Import seed data**

```bash
npm run strapi:seed
```

This POSTs all entries from `strapi/seed.json` into Strapi via the REST API and logs each import. Exit code is non-zero on any failure.

**7. Build with live Strapi data**

```bash
npm run build
```

### Start Astro dev server

```bash
npm run dev
```

The site runs at `http://localhost:4321`.

### Build for production

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint        # check for issues
npm run lint:fix    # auto-fix where possible
```

## Environment variables

Create a `.env.local` file in the project root (copy from `.env.example`):

```bash
# Strapi configuration (optional — build falls back to seed.json if unavailable)
PUBLIC_STRAPI_URL=http://localhost:1337
PUBLIC_STRAPI_TOKEN=your-api-token-here

# Lead form API endpoint (optional — form data is logged to console if not configured)
PUBLIC_LEAD_API_URL=http://localhost:3000/api/leads
PUBLIC_LEAD_API_TOKEN=your-lead-api-token-here
```

See `.env.example` for the full template.

## SEO

All pages preserve the original URL structure from `hypernode.com`. Each page renders full `<meta>`, Open Graph, Twitter Card, and `hreflang` tags via `BaseLayout.astro`. A sitemap is generated at build time via `@astrojs/sitemap`.

See [`DECISIONS.md`](./DECISIONS.md) for the full SEO strategy.

## Forms and API Routes

### Lead form (`/api/leads`)

The homepage contact form (`src/components/pages-view/homepage/HomepageLeadForm.astro`) submits to `POST /api/leads`.

**Flow:**
1. Form data is validated server-side (required fields: `firstname`, `lastname`, `email`, privacy consent)
2. Submission is logged to console (development)
3. If `PUBLIC_LEAD_API_URL` is configured, the data is forwarded to that endpoint
4. Response is returned as JSON to the client
5. UI provides feedback (success message, error toast, or retry)

**For production:** Connect `PUBLIC_LEAD_API_URL` to your lead management backend (HubSpot, Marketo, etc.). The `src/pages/api/leads.ts` route handles the bridge.

## Changelog

The changelog is fetched from Strapi at build time (`src/pages/en/changelog/index.astro`). Entries are cached in `strapi/seed.json` as a fallback if Strapi is unavailable.

**To update changelog entries:** Add/edit records in Strapi, then rebuild (`npm run build`).

**Offline development:** If Strapi is not running, the build automatically uses `strapi/seed.json`.

## Development approach

This project uses **AI-driven development**. The `.github/copilot-instructions.md` file provides GitHub Copilot with persistent context about the stack, conventions, and component patterns. Architectural decisions are documented in `DECISIONS.md` before implementation.
