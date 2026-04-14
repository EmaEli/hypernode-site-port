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
| `/changelog/` | `src/pages/changelog/index.astro` | Fetched from Strapi at build time |

> The changelog lives at `changelog.hypernode.com` in production. For this port it is served at `/changelog/`. See [`DECISIONS.md`](./DECISIONS.md) for the subdomain strategy.

## Project structure

```
.
├── .github/
│   └── copilot-instructions.md  # AI assistant context and conventions
├── public/
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── pages-view/          # Feature-first page assembly components
│   │   ├── ui/
│   │   │   ├── primitives/      # Button, Badge, Tag, Icon
│   │   │   └── blocks/          # FeatureBlock, IconGrid, SectionHeader, etc.
│   ├── content/
│   │   ├── homepage/            # MDX content entry for homepage
│   │   ├── pricing/             # MDX content entry for pricing
│   │   └── config.ts            # Content collection schemas (Zod)
│   ├── layouts/
│   │   ├── BaseLayout.astro     # <head>, SEO, shared structure
│   │   ├── Navbar.astro
│   │   ├── TopBar.astro
│   │   └── footer/              # Footer split into focused components
│   ├── lib/
│   │   ├── strapi.ts            # Strapi client + typed fetchers
│   │   └── pricing.ts           # Pricing calculation helpers
│   ├── types/
│   │   ├── changelog.ts
│   │   ├── homepage.ts
│   │   ├── pricing.ts
│   │   └── seo.ts
│   └── pages/
│       ├── en/
│       │   ├── index.astro
│       │   └── plans-and-prices/
│       │       └── index.astro
│       └── changelog/
│           └── index.astro
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

```bash
cd strapi
npx create-strapi-app@latest . --quickstart
npm run develop
```

Strapi runs at `http://localhost:1337`. If Strapi is unavailable, the app automatically falls back to `strapi/seed.json` during build.

No local seed script is required from the root project.

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

The changelog is fetched from Strapi at build time (`src/pages/changelog/index.astro`). Entries are cached in `strapi/seed.json` as a fallback if Strapi is unavailable.

**To update changelog entries:** Add/edit records in Strapi, then rebuild (`npm run build`).

**Offline development:** If Strapi is not running, the build automatically uses `strapi/seed.json`.

## Development approach

This project uses **AI-driven development**. The `.github/copilot-instructions.md` file provides GitHub Copilot with persistent context about the stack, conventions, and component patterns. Architectural decisions are documented in `DECISIONS.md` before implementation.
