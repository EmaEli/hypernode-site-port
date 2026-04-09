# Hypernode.com — Site Port

A port of [hypernode.com](https://www.hypernode.com/en/) away from WordPress, built with **Astro**, **React** (component islands), and **Tailwind CSS**.

## Stack

| Layer | Technology | Reason |
|---|---|---|
| Framework | [Astro](https://astro.build/) | SSG with fine-grained hydration control |
| UI islands | React 18 | Interactive components only where needed |
| Styling | Tailwind CSS v4 | Utility-first, consistent design tokens |
| Static content | MDX | Co-located content for static pages |
| Changelog CMS | Strapi v5 | Headless CMS for editor-managed entries |
| Language | TypeScript | Strict mode throughout |
| Linting | ESLint | Code quality and consistency |

## Pages

| Route | Source | Content strategy |
|---|---|---|
| `/en/` | `src/pages/en/index.astro` | MDX sections, near-fully static |
| `/en/plans-and-prices/` | `src/pages/en/plans-and-prices/index.astro` | Static shell, React island for pricing table |
| `/changelog/` | `src/pages/changelog/index.astro` | Fetched from Strapi at build time |

> The changelog lives at `changelog.hypernode.com` in production. For this port it is served at `/changelog/`. See [`DECISIONS.md`](./DECISIONS.md) for the subdomain strategy.

## Project structure

```
.
├── .github/
│   └── copilot-instructions.md  # AI assistant context and conventions
├── public/
│   ├── robots.txt
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ui/                  # Shared primitives (Button, Badge, etc.)
│   │   ├── layout/              # Navbar, Footer, TopBar, TeamBlueBar
│   │   ├── shared/              # FeatureBlock, IconGrid, SectionHeader
│   │   └── islands/             # React islands (PricingTable, FAQAccordion, etc.)
│   ├── content/
│   │   └── pages/               # MDX files for static page sections
│   ├── layouts/
│   │   └── BaseLayout.astro     # <head>, SEO, shared structure
│   ├── lib/
│   │   ├── strapi.ts            # Strapi client + typed fetchers
│   │   └── pricing.ts           # Pricing calculation helpers
│   ├── types/
│   │   └── changelog.ts         # Shared TypeScript interfaces
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
└── astro.config.ts
```

## Getting started

### Prerequisites

- Node.js ≥ 20
- npm ≥ 10

### Install dependencies

```bash
npm install
```

### Start Strapi (changelog CMS)

```bash
cd strapi
npx create-strapi-app@latest . --quickstart   # first time only
npm run develop
```

Strapi runs at `http://localhost:1337`. On first run, create an admin account and import the seed data:

```bash
npm run seed        # from project root
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

```bash
# .env.local
PUBLIC_STRAPI_URL=http://localhost:1337
PUBLIC_STRAPI_TOKEN=your-api-token-here
```

## SEO

All pages preserve the original URL structure from `hypernode.com`. Each page renders full `<meta>`, Open Graph, Twitter Card, and `hreflang` tags via `BaseLayout.astro`. A sitemap is generated at build time via `@astrojs/sitemap`.

See [`DECISIONS.md`](./DECISIONS.md) for the full SEO strategy.

## Development approach

This project uses **AI-driven development**. The `.github/copilot-instructions.md` file provides GitHub Copilot with persistent context about the stack, conventions, and component patterns. Architectural decisions are documented in `DECISIONS.md` before implementation.
