# Architectural Decisions

This document records the key technical decisions made for the Hypernode.com site port. Each decision includes context, the options considered, and the rationale for the choice made.

---

## 1. Framework — Astro with React islands

**Decision:** Use Astro as the framework with React for interactive components only.

**Context:** The site is primarily a marketing website. Most content is static and rarely changes. A small number of components require client-side interactivity (pricing table, FAQ accordion, changelog filters).

**Options considered:**

- Next.js (SSR/SSG): Full React, mature ecosystem, but ships a large JS runtime for a site that is 90% static.
- Remix: Great DX, but optimised for full-stack apps with data mutations — overkill here.
- Astro with React islands: Ships zero JS by default, hydrates only what needs it, and is purpose-built for content-heavy sites.

**Decision:** Astro. The island architecture directly maps to the site's actual needs. Static sections get no JS overhead. Interactive components opt in to hydration explicitly.

---

## 2. Island hydration strategy

**Decision:** Each React island uses the most conservative `client:*` directive that still delivers the correct UX.

| Component | Directive | Reason |
|---|---|---|
| `PricingTable` | `client:load` | Above the fold, user interacts immediately |
| `Navbar` (mobile menu) | `client:load` | Essential for navigation on all devices |
| `FAQAccordion` | `client:visible` | Below the fold — defer until in viewport |
| `ChangelogFilters` | `client:visible` | Below the fold, not critical on first render |
| Homepage contact form | static Astro | Render the form HTML server-side and only add client logic if CRM integration requires it |

Using conservative hydration instead of `client:load` everywhere reduces Time to Interactive and avoids hydrating components the user may never interact with.

---

## 3. Content strategy — typed static content files for pages, Strapi for changelog only

**Decision:** Homepage and Plans & Prices content lives in MDX content collections under `src/content/homepage/` and `src/content/pricing/` respectively. The changelog is managed through Strapi.

**Context:** The team asked for a headless CMS. However, not all content benefits equally from a CMS.

- Homepage and pricing copy changes rarely and is owned by developers. Keeping content in typed local modules keeps it in version control, reviewable in PRs, and deployable without a CMS dependency.
- The changelog is updated frequently by the team and benefits from a structured authoring experience, filtering by category, and a defined content model.

Strapi is therefore scoped to changelog entries only. This reduces CMS complexity and avoids making the static pages dependent on an external service at build time.

---

## 4. Pricing table — static shell with React island

**Decision:** The pricing page is a static Astro page. The pricing table itself is a React island hydrated on load.

**Context:** The existing site fetches prices from an external API and renders them client-side with dynamic toggles (Production/Development, EUR/GBP, Monthly/Daily).

For this port, pricing data is mocked with a JSON fixture (`src/lib/pricing-data.json`) that mirrors the structure of the original API response. The React island handles all toggle state locally.

**Why not static pricing?** The combination of three independent toggles (environment, currency, billing period) produces too many permutations to statically render. A React island with local state is the right boundary here.

**Why `client:load` and not `client:visible`?** The pricing table is the primary content of the page. It appears above the fold and is the first thing the user interacts with. Deferring it would cause visible layout shift.

---

## 5. Reusable layout components — FeatureBlock and IconGrid

**Decision:** Homepage sections that share a layout pattern (image + heading + body + optional CTA) are rendered by a single `FeatureBlock` component. Icon grid sections use `IconGrid`.

**Context:** The homepage contains multiple visually similar sections:
- Hypernode Insights (new product banner)
- Discover our managed hosting solutions
- Cloud hosting, Dedicated Hosting, Cluster Hosting, Green Hosting

All follow the same structure: an image on one side, text on the other, with an optional CTA button. Rather than building each as a standalone component, a single `FeatureBlock` accepts props for image, eyebrow label, title, subtitle, body, CTA, and image position.

Similarly, "Reliability, transparency & next-level support" (6 items) and "More about our managed hosting platform" (3 items) both use an icon + title + body grid layout, handled by a single `IconGrid` component with a configurable column count.

This approach reduces duplication and makes adding new sections (e.g. a future product launch) a data change, not a code change.

---

## 6. SEO and URL preservation

**Decision:** All URLs match the original site exactly. SEO metadata is centralised in `BaseLayout.astro`.

**Context:** The existing site has established URL equity from social shares, backlinks, and search indexing. Breaking URLs would damage both user experience and search rankings.

**Implementation:**

- Astro file-based routing mirrors the original URL structure (`/en/`, `/en/plans-and-prices/`, `/en/changelog/`).
- `BaseLayout.astro` accepts a `seo` prop with title, description, canonical URL, Open Graph image, and `hreflang` alternates (EN/NL).
- `@astrojs/sitemap` generates `sitemap.xml` at build time.
- `robots.txt` is preserved as-is from the original site.

---

## 7. Changelog subdomain

**Decision:** For this port, the changelog is served at `/en/changelog/` rather than `changelog.hypernode.com`.

**Context:** The original changelog lives on a separate subdomain. Replicating subdomain routing requires infrastructure configuration beyond the scope of this take-home assignment. The page was placed under `/en/` to keep all in-scope English routes in a single subtree, consistent with the homepage and pricing paths.

**Production path:** In a real deployment, this would be handled by one of:
- A separate Astro deployment with `site: "https://changelog.hypernode.com"` in `astro.config.mjs`.
- A reverse proxy rule routing `changelog.hypernode.com` to the `/en/changelog/` path of the main deployment.

The component architecture and Strapi integration are identical either way — only the routing configuration changes.

---

## 8. Strapi version and setup

**Decision:** Use Strapi v5 with SQLite for local development. No deployed instance required.

**Context:** The assessment specifies that a seed script or JSON fixture is sufficient. Strapi v5 is the current stable release and uses a cleaner API format than v4.

A `seed.json` fixture provides realistic changelog entries covering multiple categories (API, Autoscaling, Cluster, Control Panel) and date ranges. The Strapi client in `src/lib/strapi.ts` is typed against the `ChangelogEntry` interface and falls back to a local JSON import of `strapi/seed.json` when the Strapi instance is unavailable, ensuring the build never fails in CI without a live CMS.

---

## 9. Styling approach — Tailwind with design tokens

**Decision:** Use Tailwind CSS v4 with a custom theme that maps to Hypernode's brand colours and typography.

The primary brand colour (orange/coral `#FF6B35`) and secondary blue (`#003087`) are defined as CSS custom properties and extended into the Tailwind theme. This ensures consistency across all components without relying on hardcoded hex values in markup.

Typography uses the system font stack with Inter as the primary typeface, matching the feel of the original site without requiring a paid font licence for the prototype.

---

## 10. Linting — ESLint only, no Prettier

**Decision:** Use ESLint for both code quality and formatting rules. Prettier is not added.

**Context:** Adding both ESLint and Prettier requires extra configuration to avoid rule conflicts (`eslint-config-prettier`) and introduces two tools with overlapping responsibilities.

ESLint with `@typescript-eslint`, `eslint-plugin-astro`, `eslint-plugin-react`, and `eslint-plugin-jsx-a11y` covers all necessary checks for this stack: TypeScript correctness, Astro component rules, React best practices, and basic accessibility. Formatting consistency is enforced via ESLint stylistic rules.

This keeps the toolchain simpler without sacrificing code quality.
