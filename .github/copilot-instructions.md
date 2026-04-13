# Project context for AI-assisted development

This file provides persistent context for GitHub Copilot working on the Hypernode.com site port.

---

## What this project is

A port of [hypernode.com](https://www.hypernode.com/en/) from WordPress to Astro. The goal is a clean, maintainable codebase — not a pixel-perfect reproduction. Three pages are in scope: Homepage, Plans & Prices, and Changelog.

See `DECISIONS.md` for full architectural rationale.

---

## Tech stack

- **Astro** — framework, SSG, file-based routing
- **React 19** — used only for interactive islands
- **Tailwind CSS v4** — styling, no custom CSS unless unavoidable
- **TypeScript** — strict mode, no `any`
- **Strapi v5** — headless CMS, changelog entries only
- **TypeScript content modules** — static page content (homepage, pricing)
- **ESLint** — linting and formatting consistency

---

## CRITICAL — SEO and URL preservation

**URLs must never change.** The existing site has established URL equity from social shares, backlinks, and search indexing. Breaking URLs damages both user experience and search rankings.

### URL mapping — do not deviate from this

| Page | Astro file | Final URL |
|---|---|---|
| Homepage | `src/pages/en/index.astro` | `/en/` |
| Plans & Prices | `src/pages/en/plans-and-prices/index.astro` | `/en/plans-and-prices/` |
| Changelog | `src/pages/changelog/index.astro` | `/changelog/` |

- Never rename, move, or restructure these files — the file path is the URL in Astro.
- Never add or remove trailing slashes inconsistently — all URLs use a trailing slash.
- The changelog lives at `changelog.hypernode.com` in production. For this port it is at `/changelog/`. Do not change this path.

### SEO metadata — required on every page

Every page must render the following tags via `BaseLayout.astro`. Never hardcode these in individual pages.

```typescript
interface SEOProps {
  title: string           // matches the original page title exactly
  description: string     // matches the original meta description exactly
  canonical: string       // full absolute URL, e.g. https://www.hypernode.com/en/
  ogImage?: string        // Open Graph image URL
  hreflang: {             // always include both EN and NL alternates
    lang: string
    href: string
  }[]
}
```

Example for the homepage:

```astro
<BaseLayout seo={{
  title: 'Hosting Provider for eCommerce & Online stores | Hypernode',
  description: 'Hypernode is the leading managed eCommerce hosting platform...',
  canonical: 'https://www.hypernode.com/en/',
  hreflang: [
    { lang: 'en', href: 'https://www.hypernode.com/en/' },
    { lang: 'nl', href: 'https://www.hypernode.com/nl/' },
  ]
}}>
```

### What BaseLayout.astro must render in `<head>`

```html
<title>{seo.title}</title>
<meta name="description" content={seo.description} />
<link rel="canonical" href={seo.canonical} />

<!-- Open Graph -->
<meta property="og:title" content={seo.title} />
<meta property="og:description" content={seo.description} />
<meta property="og:url" content={seo.canonical} />
<meta property="og:image" content={seo.ogImage} />
<meta property="og:type" content="website" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={seo.title} />
<meta name="twitter:description" content={seo.description} />
<meta name="twitter:image" content={seo.ogImage} />

<!-- hreflang -->
{seo.hreflang.map(({ lang, href }) => (
  <link rel="alternate" hreflang={lang} href={href} />
))}
```

### Language toggle — EN / NL

- The "Dutch" link in the navbar is a plain `<a href="https://www.hypernode.com/nl/">` pointing to the original site. It is not implemented in this port.
- The English `hreflang` alternate always points to the `/en/` equivalent URL.
- The Dutch `hreflang` alternate always points to the `/nl/` equivalent URL on the original site.

### robots.txt and sitemap

- `public/robots.txt` must be present and must not block any page that was previously crawlable.
- `@astrojs/sitemap` generates `sitemap.xml` automatically at build time. The `site` option in `astro.config.mjs` must be set to `https://www.hypernode.com` for the sitemap URLs to be correct.

### "Free hosting consult" CTA and homepage form

- The navbar and hero "Free hosting consult" CTA remain links to `https://www.hypernode.com/en/free-hosting-consult/`.
- The final homepage contact section is a form, not a CTA-only block.
- Preserve the provided field names and consent labels so the markup remains easy to connect to the lead collection backend during migration.
- Prefer a static Astro form first. Only introduce a React island if validation, async submission, or CRM embedding requires client-side behaviour.

---

## Conventions

### File structure

```
src/
  assets/
    images/       # All images downloaded from the original site (SVG, WebP)
  components/
    pages-view/   # Feature-first page folders and page assembly components
      changelog/  # Changelog-specific components
      homepage/   # Homepage-specific components
      pricing/    # Pricing-page-specific components, Astro and React together
    ui/
      primitives/ # Button, Badge, Icon, Tag
      blocks/     # FeatureBlock, IconGrid, SectionHeader, CompanyLogoStrip,
                  # FormSection, HeroImage, IconGridSection,
                  # TestimonialsGrid, TestimonialsSection
  content/
    pages/        # TypeScript data files for static page sections
  layouts/
    BaseLayout.astro
    Navbar.astro
    TopBar.astro
    footer/
      Footer.astro
      FooterLegal.astro
      FooterMain.astro
      FooterSecondary.astro
  lib/
    strapi.ts     # typed Strapi client
    pricing.ts    # pricing calculation helpers
  types/
    seo.ts        # SEOProps, HreflangEntry
    homepage.ts   # HomepageImageKey, HomepageFeatureSection, Testimonial, etc.
    changelog.ts  # shared interfaces
    pricing.ts    # Plan, Currency, Environment, BillingPeriod
  pages/
    en/
      index.astro
      plans-and-prices/index.astro
    changelog/
      index.astro
strapi/
  seed.json       # fallback fixture data
.env.example      # documents required environment variables
.gitignore
```

### Types — one file per domain

Group interfaces and types by domain context, not by component or usage.
Each file in `src/types/` represents a single bounded context.

| File | Contains |
|---|---|
| `src/types/seo.ts` | SEOProps, HreflangEntry |
| `src/types/changelog.ts` | ChangelogEntry, StrapiChangelogEntry, StrapiListResponse |
| `src/types/pricing.ts` | Plan, Currency, Environment, BillingPeriod |

Never put interfaces inside component files unless they are props interfaces
used exclusively by that component and nowhere else.


### Naming

- Component files: PascalCase (`FeatureBlock.astro`, `PricingTable.tsx`)
- Utility files: camelCase (`strapi.ts`, `pricing.ts`)
- Variables and functions: camelCase
- Types and interfaces: PascalCase, no `I` prefix
- Named constants: UPPER_SNAKE_CASE (`const MAX_PLANS_PER_ROW = 4`)

### Environment variables

- Never commit `.env` or `.env.local` to the repository.
- Always keep `.env.example` up to date with every variable the project needs, with placeholder values.

```bash
# .env.example
PUBLIC_STRAPI_URL=http://localhost:1337
PUBLIC_STRAPI_TOKEN=your-api-token-here
```

---

## Best practices

### General — KISS (Keep It Simple, Stupid)

- Prefer the simplest solution that solves the problem. Do not over-engineer.
- If a component is hard to explain, it is probably doing too much — split it.
- Avoid premature abstractions. Extract a shared component only when the pattern appears at least twice.

### No magic numbers

Never use unexplained literal values in code. Extract them to named constants.

```typescript
// correct
const GBP_CONVERSION_RATE = 0.86
const price = eurPrice * GBP_CONVERSION_RATE

// wrong
const price = eurPrice * 0.86
```

### Astro vs React — when to use which

Always start with `.astro`. Switch to `.tsx` only when the component requires interactivity.

| Need | Use |
|---|---|
| Static markup, layout, text, images | `.astro` |
| `useState`, `useEffect`, event handlers | `.tsx` (island) |
| Data fetched at build time | `.astro` |
| User interactions (toggle, filter, form) | `.tsx` (island) |

Astro components run only at build time — they produce zero JavaScript in the browser. React islands opt in to hydration explicitly via `client:*` directives.

### Astro islands — hydration directives

Use the most conservative directive that still delivers the right UX:

- `client:load` — above the fold, user interacts immediately (PricingTable, Navbar mobile menu)
- `client:visible` — below the fold, defer until in viewport (FAQAccordion, ChangelogFilters)
- Contact forms should stay static Astro markup unless a real integration requires client-side behaviour
- Never use `client:only` unless there is a specific reason documented in a comment

### React — component style

- Always use arrow function components. Never use `function` declarations or class components.

```typescript
// correct
const PricingTable = ({ plans }: PricingTableProps) => {
  return <div>...</div>
}

// wrong
function PricingTable({ plans }: PricingTableProps) { ... }
class PricingTable extends React.Component { ... }
```

### TypeScript

- Strict mode is enabled. Never use `any`.
- Always use `import type` for type-only imports.

```typescript
// correct
import type { ChangelogEntry } from '@/types/changelog'

// wrong
import { ChangelogEntry } from '@/types/changelog'
```

- All Strapi API responses must be typed. Types live in `src/types/`.
- Use `satisfies` over `as` for type narrowing where possible.
- Props interfaces must be defined and exported from the same file as the component.

### Complexity

- Functions must not exceed a cyclomatic complexity of 10. Extract smaller helper functions if needed.
- Prefer early returns over deeply nested conditionals.

```typescript
// correct
const getPrice = (plan: Plan, currency: Currency) => {
  if (!plan) return 0
  if (currency === 'GBP') return plan.priceGbp
  return plan.priceEur
}

// wrong
const getPrice = (plan: Plan, currency: Currency) => {
  if (plan) {
    if (currency === 'GBP') {
      return plan.priceGbp
    } else {
      return plan.priceEur
    }
  } else {
    return 0
  }
}
```

### Atomic UI — component decomposition

1. **Primitives** (`ui/primitives/`) — Button, Badge, Tag, Icon, segmented controls, and presentational shells. No business logic. Primitives may be `.astro` or `.tsx` depending on whether interactivity is required.
2. **Blocks** (`ui/blocks/`) — FeatureBlock, IconGrid, SectionHeader, CompanyLogoStrip, FormSection, HeroImage, IconGridSection, TestimonialsGrid, TestimonialsSection. Composed from primitives.
3. **Islands (feature-local first)** — interactive components live inside `components/pages-view/*` when page-specific; promote to `components/islands/` only when genuinely shared across multiple pages/domains.
4. **Pages** (`components/pages-view/`) — feature-first folders that assemble page-specific Astro and React components into full page layouts.
5. **Layout** (`layouts/`) — BaseLayout, Navbar, TopBar, Footer modules. Site chrome and document shell.

### Feature-first structure

- Prefer grouping page-specific components by feature folder under `src/components/pages-view/`.
- If a component exists only to serve one page or one feature area, keep it in that page folder even when it is a `.tsx` island.
- Use `src/components/islands/` only for interactive components that are genuinely shared across multiple pages or domains.
- Keep page-specific interactive components in `src/components/pages-view/*`.
- Use `src/components/ui/blocks/` only for reusable page-agnostic building blocks.
- Do not split by renderer first. `.astro` and `.tsx` may live next to each other inside a feature folder when they belong to the same page flow.

### When to split files

- If a file becomes hard to scan or edit in one pass, split it before adding more logic.
- If a component has multiple distinct render units, extract the stable ones into named subcomponents.
- Start by splitting logically inside the same file, then promote to separate files when the subcomponent has a clear responsibility.
- Move a subcomponent to its own file when at least one of these is true:
  - it is reused in multiple places,
  - it keeps a large parent file too long to read comfortably,
  - it has a stable props interface that makes sense on its own,
  - it represents a distinct UI concept such as a modal, card, controls block, or section header.
- Avoid creating many tiny files for trivial one-off fragments with no stable API.
- Prefer feature-local files before promoting a component to `ui/blocks/` or `islands/`.

### Styling — Tailwind

- Use Tailwind utility classes directly in markup by default.
- Prefer Tailwind theme tokens for recurring values such as colours, radius, shadows, spacing, and typography.
- Do not create global semantic CSS classes that only wrap Tailwind utilities unless there is a clear design-system need shared across multiple components.
- No inline styles (`style="..."`).
- Do not hardcode brand colours — use Tailwind theme tokens (`text-brand-orange`, `bg-brand-blue`).
- For repeated or long class combinations within the same component, extract to a variable inside the component file.
- If the same visual shell appears across multiple components, prefer a small reusable UI primitive or wrapper component over duplicating long utility strings.
- When a class list becomes hard to scan, prefer named local constants such as `cardClass`, `panelClass`, `headerClass`, or `buttonClass`.
- Keep wrappers presentational. If a reusable wrapper starts accumulating domain-specific props, split it into a domain component instead.

```typescript
// correct
const buttonClass = 'bg-brand-orange text-white px-4 py-2 rounded hover:bg-orange-600'
return <button className={buttonClass}>Click</button>

// wrong
// .btn-primary { @apply bg-brand-orange text-white px-4 py-2 rounded; }
```

Use these readability rules when deciding whether to inline classes, extract constants, or create a wrapper:

- A short one-off class list can stay inline.
- If a class list is long or repeated within the same file, extract a local constant.
- If multiple components share the same visual shell, extract a primitive wrapper component.
- If only the numeric values recur, prefer theme tokens over new wrappers.

Use this senior-style hygiene checklist when styling components:

- Keep short one-off utility lists inline.
- Extract long or repeated utility lists into local constants.
- Centralize recurring numeric values in the theme before creating wrappers.
- Introduce a primitive wrapper only when the same shell appears across multiple files.
- Use variant helpers such as `cva` only for primitives with real, stable variant axes.
- Prefer splitting large components into smaller render units before adding more class abstractions.
- Avoid using multiple abstraction patterns for the same kind of component at the same layer.
- Only keep an abstraction if it clearly reduces complexity instead of moving it elsewhere.

### Responsive design

- Mobile-first. All components must work from 375px screen width upwards.
- Use Tailwind's standard breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px).
- Never use fixed pixel widths for layout containers — use `max-w-*` with `mx-auto`.
- Test every component at 375px, 768px, and 1280px before considering it done.

### Images

- All images from the original site must be downloaded and placed in `src/assets/images/`. Do not link directly to `https://www.hypernode.com/wp-content/uploads/`.
- Always use Astro's `<Image />` component — never a plain `<img>` tag.
- Prefer SVG for icons and illustrations. Use WebP for photographs.
- Always provide a meaningful `alt` attribute.

```astro
---
import { Image } from 'astro:assets'
import cloudIcon from '@/assets/images/cloud-hosting.svg'
---
<Image src={cloudIcon} alt="Cloud hosting illustration" />
```

### Error handling — Strapi

If the Strapi instance is unreachable at build time, the build must not fail. The Strapi client in `src/lib/strapi.ts` must fall back to `strapi/seed.json`.

```typescript
export const getChangelogEntries = async (): Promise<ChangelogEntry[]> => {
  try {
    const res = await fetch(`${import.meta.env.PUBLIC_STRAPI_URL}/api/changelog-entries`)
    if (!res.ok) throw new Error('Strapi unavailable')
    return await res.json()
  } catch {
    console.warn('Strapi unavailable — falling back to seed data')
    return (await import('../../strapi/seed.json')).default
  }
}
```

### Accessibility (a11y)

- All `<img>` elements must have a meaningful `alt` attribute. Decorative images use `alt=""`.
- All interactive elements must have a visible focus state. Do not remove `outline` without providing an alternative.
- Use semantic HTML elements (`<nav>`, `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`) over generic `<div>` where appropriate.
- All form inputs must have an associated `<label>`.
- Icon-only buttons must have an `aria-label`.
- Use `aria-expanded` on toggles (mobile menu, accordion) to communicate state to screen readers.
- Colour contrast must meet WCAG AA (4.5:1 for body text, 3:1 for large text).
- The tab order must follow the visual reading order of the page.

### Performance

- All images must go through Astro's `<Image />` component for automatic format conversion and size optimisation.
- Do not import heavy libraries in React islands if a lighter alternative exists.
- Avoid unnecessary re-renders — use `useMemo` and `useCallback` only when there is a measurable performance problem, not preemptively.
- Data fetching happens at build time in `.astro` files. No client-side API calls unless strictly necessary.

### Linting

- All code must pass `npm run lint` before commit.
- Run `npm run lint:fix` to auto-fix issues where possible.
- No `eslint-disable` comments without an explanation of why the rule cannot be satisfied.

---

## Key components

### FeatureBlock

```typescript
export interface FeatureBlockProps {
  image: ImageMetadata
  eyebrow?: string
  title: string
  subtitle?: string
  body?: string
  cta?: { label: string; href: string }
  imagePosition?: 'left' | 'right'
  variant?: 'light' | 'dark'
}
```

### IconGrid

```typescript
export interface IconGridItem {
  icon: string
  title: string
  body: string
}

export interface IconGridProps {
  title?: string
  items: IconGridItem[]
  columns?: 3 | 6
}
```

### PricingTable (React island)

Manages three independent toggles: Environment (Production/Development), Currency (EUR/GBP), Billing (Monthly/Daily, Yearly where available at -15%). Pricing data is passed as a prop from the `.astro` page. No client-side API calls.

### ChangelogFilters (React island)

Filters changelog entries by category client-side with `useState`. Entries are fetched from Strapi at build time and passed as a prop.

---

## Strapi content model

```typescript
export interface ChangelogEntry {
  id: number
  title: string
  slug: string
  date: string
  version?: string
  category: ChangelogCategory
  summary: string
  body: string
  featured: boolean
}

export type ChangelogCategory =
  | 'API'
  | 'Autoscaling'
  | 'Cluster'
  | 'ControlPanel'
  | 'HypernodeFloating'
  | 'All'
```

---

## Do not

- Do not change any URL — ever. See the URL mapping table above.
- Do not omit SEO tags from any page — every page needs title, description, canonical, OG, Twitter Card, and hreflang.
- Do not replace navbar or hero "Free hosting consult" buttons with forms.
- Do not remove the homepage contact form or replace it with a CTA-only block.
- Do not link directly to WordPress image URLs — download images to `src/assets/images/`.
- Do not use plain `<img>` tags — always use Astro's `<Image />` component.
- Do not use `any` in TypeScript.
- Do not use `function` declarations or class components in React.
- Do not spread `client:*` directives indiscriminately; keep hydration at page assembly boundaries and use the most conservative directive that still delivers the required UX.
- Do not fetch data client-side — fetch at build time in `.astro` files.
- Do not use inline styles.
- Do not create custom CSS classes that wrap Tailwind utilities.
- Do not hardcode brand colours.
- Do not use magic numbers — extract to named constants.
- Do not write functions with cyclomatic complexity above 10.
- Do not disable ESLint rules without a comment explaining why.
- Do not use type imports without the `import type` keyword.
- Do not commit `.env` or `.env.local` — keep `.env.example` updated instead.
