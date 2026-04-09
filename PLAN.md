# Plan: Rebuild the Three Hypernode Pages

## Goal
Port hypernode.com from WordPress to Astro for three pages: Homepage (`/en/`), Plans & Prices (`/en/plans-and-prices/`), and Changelog (`/changelog/`).

## Expected Outcome
- Rebuild the three requested pages while preserving URLs, SEO, and the information structure of the original site.
- Aim for a faithful content and structure replica without chasing pixel-perfect parity.
- Use Astro for all static markup and React only for interactive islands.
- Deliver a clean, maintainable base that is ready for `npm run lint` and `npm run build`.

## Current State
- The folder structure exists but is empty (only `.gitkeep`).
- `src/pages/index.astro` is still the default Astro placeholder (wrong URL: `/` instead of `/en/`).
- No components, types, layout, images, or libs exist yet.
- `public/` only contains favicons; `robots.txt` is missing.
- `strapi/` is empty; `seed.json` is missing.
- `.env.example` is missing.

---

## PHASE 1 — Planning and Setup

This phase covers the work already done before implementation starts.

**Step 1.1** — Refine project instructions
- Update `.github/copilot-instructions.md` so the project structure, type boundaries, SEO constraints, and implementation conventions are explicit.

**Step 1.2** — Build the implementation plan
- Create and refine `PLAN.md` as the main execution document for the project.
- Capture project scope, execution order, dependencies, risks, and open decisions.

**Step 1.3** — Define operational prompts
- Prepare milestone prompts so the agent can be guided with a constrained scope.
- Keep prompts reusable for implementation and resume scenarios.

**Step 1.4** — Prepare interview tracking
- Use `PLAN.md` as the single source of truth for planning, prompts, and execution trace.
- Align the workflow with branch naming and commit strategy.

**Phase 1 Output**
- The project has a clear written plan.
- Instructions and implementation constraints are aligned.
- Branch naming, milestone prompts, and interview tracking are ready before coding begins.

---

## PHASE 2 — Foundations (prerequisite for everything)

**Step 2.1** — TypeScript types in `src/types/`
- `seo.ts`: `SEOProps`, `HreflangEntry`
- `changelog.ts`: `ChangelogEntry`, `ChangelogCategory`, `StrapiChangelogEntry`, `StrapiListResponse`
- `pricing.ts`: `Plan`, `Currency` (`'EUR'|'GBP'`), `Environment` (`'production'|'development'`), `BillingPeriod` (`'monthly'|'daily'|'yearly'`), `PricingGroup` (`'cloud-openstack'|'cloud-aws'|'dedicated'|'dedicated-enterprise'`)

**Step 2.2** — `src/layouts/BaseLayout.astro`
Render the full SEO `<head>`: title, meta description, canonical, Open Graph, Twitter Card, and hreflang. Accept a `seo: SEOProps` prop. Include `global.css`. Expose a slot for page content.

SEO values to set as soon as final values are confirmed:
- Homepage
  - title: `Hosting Provider for eCommerce & Online stores - Hypernode`
  - description: `20+ years of experience as Hosting Provider for eCommerce & Online stores with Magento-, Shopware-, and WooCommerce hosting`
  - canonical: `https://www.hypernode.com/en/`
- Plans & Prices
  - title: `Plans and prices - Hypernode`
  - description: to be confirmed from a live source or a more reliable reference than public HTML alone
  - canonical: `https://www.hypernode.com/en/plans-and-prices/`
- Changelog
  - title: `Changelog - Hypernode`
  - description: to be confirmed from a live source or a more reliable reference than public HTML alone
  - canonical: use the final port URL, so `https://www.hypernode.com/changelog/`

**Step 2.3** — Page skeletons (correct URLs)
- Create `src/pages/en/index.astro` (stub using `BaseLayout`)
- Create `src/pages/en/plans-and-prices/index.astro` (stub)
- Create `src/pages/changelog/index.astro` (stub)
- Convert `src/pages/index.astro` into a redirect to `/en/` (meta redirect or Astro redirect)

**Step 2.4** — Support files
- `public/robots.txt` — must not block any indexable page
- `.env.example` — `PUBLIC_STRAPI_URL` + `PUBLIC_STRAPI_TOKEN`
- `strapi/seed.json` — array of `ChangelogEntry` with at least 5 real entries (from changelog.hypernode.com)

**Step 2.5** — `src/lib/strapi.ts`
Typed client with fallback to `seed.json` when Strapi is unavailable. Export `getChangelogEntries(): Promise<ChangelogEntry[]>`.

**Step 2.6** — `src/lib/pricing.ts` + `src/lib/pricing-data.json`
- `pricing-data.json`: structure with two sections:
  1. `featureGroups`: dictionary A-G with feature arrays (defined only once)
     - A: Falcon XS — base group without pre-installed Magento and Varnish
     - B: Falcon S/M/L/XL — adds `Pre-installed Magento 2` and `Varnish Cache`
     - C: Falcon 2XL-5XL — adds `Near zero downtime scaling`
     - D: Eagle M/L/XL — same as B plus `PCI Compliancy Service`
     - E: Eagle 2XL-7XL — same as D plus `Near zero downtime scaling`
     - F: Jackal S/M/L — same as D without `400 Brancher minutes`
     - G: Enterprise Jackal S/M/L — same as F without `Dedicated IP`
  2. `plans`: array of plans with this structure:
     `{ id, name, planGroup, featureGroup, cpus, ssdGb, ramGb, label?, prod: { eurMonth, eurDay?, eurYear?, gbpMonth }, dev: { eurMonth, eurDay?, eurYear?, gbpMonth } | null }`
  - Cloud OpenStack (9 Falcon XS-5XL): prod+dev, `eurMonth`+`eurDay`+`gbpMonth`
  - Cloud AWS (9 Eagle M-7XL): prod+dev, `eurMonth`+`eurDay`+`gbpMonth`
  - Dedicated standard (3 Jackal S/M/L): prod+dev, `eurMonth`+`eurYear`+`gbpMonth`
  - Dedicated Enterprise (3): prod only, `dev=null` (Enterprise table is empty in Development)
  - Labels are plan-specific and independent from env
  - All prices come from the real tables provided, with no approximation
- `pricing.ts`: helper `getPrice(plan, env, currency, billingPeriod)`, with no derived conversion constant

**Phase 2 Output**
- The project builds with a base layout, correct routes, and minimum data files in place.
- The types and utilities needed to start components exist without changing APIs later.
- The pricing domain is already modeled correctly, including `featureGroups`, `labels`, prod/dev prices, and the empty Enterprise Dev case.

---

## PHASE 3 — Shared Components (parallel across ui / layout / shared)

**Step 3.1** — UI primitives in `src/components/ui/`
- `Button.astro` — variants: primary (brand orange), secondary (outline), ghost
- `Badge.astro` — category/feature labels
- `Tag.astro` — changelog category tags
- `Icon.astro` — wrapper for inline SVG icons

**Step 3.2** — Layout components in `src/components/layout/`
- `TopBar.astro` — top bar (login link, NL toggle as `<a href="https://www.hypernode.com/nl/">`)
- `Navbar.astro` — main navigation (Why Hypernode, Products, Plans & prices, Partners, Resources, Free hosting consult CTA). Mobile menu: keep it as static/minimal as possible, without introducing React logic unless strictly necessary
- `Footer.astro` — link columns (Applications, Services, Support & Resources, Partners, About Hypernode) + copyright + social icons + “Need help?” contacts

**Step 3.3** — Shared components in `src/components/shared/`
- `SectionHeader.astro` — centered eyebrow + h2 + subtitle
- `FeatureBlock.astro` — image + text + optional CTA, props: `imagePosition: 'left'|'right'`, `variant: 'light'|'dark'`
- `IconGrid.astro` — icon + title + body grid, prop `columns: 3|6`

**Phase 3 Output**
- A minimal reusable component system exists and is sufficient to assemble all three pages.
- UI primitives contain no business logic.
- Shared layout components reduce duplication across homepage, pricing, and changelog.

---

## PHASE 4 — Homepage `/en/`

**Step 4.1** — Download WordPress images into `src/assets/images/`
Required image list (all from `wp-content/uploads/`):
- `hypernode-insights.webp` (2026/02/width_500.webp)
- `hosting-solutions.svg` (2023/06/Property-1people-around-screen.svg)
- `cloud-hosting.svg` (2023/01/cloud-hostings.svg)
- `dedicated-hosting.svg` (2023/01/dedicated-hostings-1.svg)
- `cluster-hosting.svg` (2023/11/Property-1cluster-app-mysql1.svg)
- `enterprise-monitoring.svg` (2023/05/namegear-with-optimization.svg)
- `control-panel.png` (2023/01/Component-2@3x-3.png)
- `server-updates.svg` (2023/05/namebackups.svg)
- `green-hosting.svg` (2023/06/Property-1cloud.svg)
- `support.svg` (2023/05/headphones.svg)
- `worldwide-coverage.svg` (2023/06/Property-1world-pins.svg)

Two-step asset strategy:
- Phase A: use temporary local placeholders only where needed to unblock page composition
- Phase B: replace all placeholders with final downloaded assets before closing PHASE 6

**Step 4.2** — MDX content for static sections in `src/content/pages/homepage/`
Sections to replicate in page order:
1. Hero: H1 title, subtitle, 2 CTA buttons
2. Hypernode Insights (`FeatureBlock`, imageRight)
3. Discover our managed hosting (`FeatureBlock`, imageLeft)
4. Reliability 6-item section (`IconGrid`, col=6)
5. Cloud hosting (`FeatureBlock`)
6. Dedicated Hosting (`FeatureBlock`)
7. Cluster Hosting (`FeatureBlock`)
8. More about platform 3-item section (`IconGrid`, col=3)
9. Green Hosting (`FeatureBlock`)
10. Testimonials — static quote data for the carousel
11. Support (`FeatureBlock`)
12. Worldwide coverage (`FeatureBlock`)
13. Contact CTA section (note: original is a HubSpot form, but it must be implemented as a static section with the `Free hosting consult` link)

**Step 4.3** — `TestimonialsCarousel.tsx` in `src/components/islands/`
Carousel/slider for testimonials. `client:visible`. Data passed as props from the Astro page.

**Step 4.4** — Assemble `src/pages/en/index.astro`
Import `BaseLayout` with full SEO, Navbar, sections in the correct order, and Footer.
SEO title: `Hosting Provider for eCommerce & Online stores | Hypernode`

**Phase 4 Output**
- Homepage complete and navigable at `/en/`.
- All images used are local in `src/assets/images/`.
- No real form is implemented: the CTA remains an external link per spec.

---

## PHASE 5 — Plans & Prices `/en/plans-and-prices/`

**Step 5.1** — Download pricing page images
- `pricing-cloud.png` (2023/10/Frame-195@3x.png)

**Step 5.2** — `PricingTable.tsx` in `src/components/islands/` — `client:load`
3 independent toggles: Environment (Production/Development), Currency (EUR/GBP), Billing.
- Cloud billing: Monthly/Daily
- Dedicated billing: Monthly/Yearly (-15%)
2 main tabs: Cloud (subtabs Combell OpenStack / AWS) | Dedicated (subtabs Standard / Enterprise).
Enterprise Dedicated in Development shows an empty table (header columns only).
Each card shows: name, price, CPUs, SSD storage, RAM, optional label (`most popular` / `Near zero downtime scaling`), order link.
The `features` button opens a modal with the plan feature bullet list (from `pricing-data.json`). Features are identical for Dev and Prod for the same plan.
Data is passed from the Astro page as props (no client-side fetch).

**Step 5.3** — `FAQAccordion.tsx` in `src/components/islands/` — `client:visible`
Hardcoded FAQ questions (text from the original site). Toggle state handled with `useState`.

**Step 5.4** — Assemble `src/pages/en/plans-and-prices/index.astro`
Hero with title + subtitle, `PricingTable` island (with `plans` prop), `FAQAccordion` island.
SEO title: `Plans & Prices — Managed eCommerce Hosting | Hypernode`

**Phase 5 Output**
- Pricing page complete with all toggles working.
- The `features` modal shows the correct content for each plan group.
- The Enterprise Development variant shows only the table header, matching the original site.

---

## PHASE 6 — Changelog `/changelog/`

**Step 6.1** — `ChangelogFilters.tsx` in `src/components/islands/` — `client:visible`
Category buttons (All, API, Autoscaling, Cluster, ControlPanel, HypernodeFloating).
Filter the passed `entries` prop with local `useState`.
Render entry list: title, date, summary, and `Read more` link.

**Step 6.2** — Assemble `src/pages/changelog/index.astro`
Fetch entries from Strapi at build time via `getChangelogEntries()`, then pass them to `ChangelogFilters`.
SEO title: `Changelog | Hypernode`

**Phase 6 Output**
- Changelog rendered at build time with fallback to `strapi/seed.json`.
- Client-side filtering works without browser-side fetches.

---

## PHASE 7 — Quality Checks (blocking before completion)

1. `npm run lint` — zero errors
2. `npm run build` — clean build
3. Manual verification for each page at 375px, 768px, and 1280px
4. Verify SEO tags in the generated HTML for all three pages
5. Check that generated `sitemap.xml` includes all three pages
6. Verify that `robots.txt` does not block any page

**Phase 7 Output**
- Build validated, main regressions excluded, and the plan completed end-to-end.

---

## Recommended Execution Order

1. Complete PHASE 1 first: planning, instructions, prompts, and tracking.
2. Complete PHASE 2 right after that, so the project has correct routes, types, and base data files.
3. Complete PHASE 3 next, so homepage, pricing, and changelog share the same components.
4. Implement the homepage first: it lets you lock in visual tone, shared layout, header/footer, and replica structure early.
5. Implement the pricing page next: it reuses the stabilized layout and adds the most complex interaction afterward.
6. Finish with changelog: it is the least risky page and works well as the final integration for `strapi.ts` and client-side filters.
7. Run PHASE 7 only when all three pages are mounted.

---

## Dependencies Between Phases

- PHASE 2 depends on PHASE 1.
- PHASE 3 depends on PHASE 2.
- PHASE 4 depends on PHASE 2 + PHASE 3 + homepage image downloads.
- PHASE 5 depends on PHASE 2 + PHASE 3 + complete `pricing-data.json`.
- PHASE 6 depends on PHASE 2 + PHASE 3 + `strapi/seed.json`.
- PHASE 7 depends on completion of PHASE 4, 5, and 6.

---

## Risks To Watch Closely

- SEO metadata must match the original: title and description need page-by-page verification.
- Original images must be downloaded and named consistently; no remote WordPress URLs should remain.
- The pricing domain is the easiest area to implement incorrectly: toggles, billing modes, and feature groups must be modeled before building the UI.
- The homepage can become too complex if sections are coded ad hoc instead of using `FeatureBlock`, `IconGrid`, and `SectionHeader`.
- Changelog build must not fail when Strapi is unreachable.

---

## Open Decisions To Confirm

- Recover the exact meta descriptions for pricing and changelog, because they do not appear reliably in public HTML.
- Confirm the exact level of detail to replicate for homepage secondary content: testimonials, footer links, latest releases, latest blog posts.

Already confirmed decisions:
- Faithful content and structure replica, but not pixel-perfect.
- Keep the mobile menu as static/minimal as possible.
- Two-step image strategy: local placeholders first, final assets later.
- Advanced UI/polish improvements are postponed until after the base replica is complete.

---

## Execution Checklist

### Milestone 1 — Planning and Setup
- Update `.github/copilot-instructions.md`
- Create and refine `PLAN.md`
- Define milestone prompts
- Define the interview tracking approach

### Milestone 2 — Foundations
- Create `src/types/seo.ts`
- Create `src/types/changelog.ts`
- Create `src/types/pricing.ts`
- Create `src/layouts/BaseLayout.astro`
- Create `src/pages/en/index.astro`
- Create `src/pages/en/plans-and-prices/index.astro`
- Create `src/pages/changelog/index.astro`
- Convert `src/pages/index.astro` into a redirect to `/en/`
- Create `public/robots.txt`
- Create `.env.example`
- Create `strapi/seed.json`
- Create `src/lib/strapi.ts`
- Create `src/lib/pricing.ts`
- Create `src/lib/pricing-data.json`

### Milestone 3 — Shared Shell
- Create `src/components/ui/Button.astro`
- Create `src/components/ui/Badge.astro`
- Create `src/components/ui/Tag.astro`
- Create `src/components/ui/Icon.astro`
- Create `src/components/layout/TopBar.astro`
- Create `src/components/layout/Navbar.astro`
- Create `src/components/layout/Footer.astro`
- Create `src/components/shared/SectionHeader.astro`
- Create `src/components/shared/FeatureBlock.astro`
- Create `src/components/shared/IconGrid.astro`

### Milestone 4 — Homepage
- Add local placeholder assets for the required homepage images
- Assemble the hero and main static sections in `/en/`
- Add `TestimonialsCarousel.tsx` only if it is truly needed to reproduce the minimum behavior
- Gradually replace placeholders with final assets
- Verify header, footer, and final CTAs

### Milestone 5 — Pricing
- Populate `pricing-data.json` with complete featureGroups and plans
- Implement `PricingTable.tsx`
- Implement the `features` modal
- Implement `FAQAccordion.tsx`
- Assemble `/en/plans-and-prices/`
- Verify all toggles: env, currency, billing, tabs, subtabs

### Milestone 6 — Changelog
- Populate `strapi/seed.json` with at least 5 real entries
- Implement `ChangelogFilters.tsx`
- Assemble `/changelog/`
- Verify build-time fallback from `strapi.ts`

### Milestone 7 — Finalization
- Replace all remaining placeholders
- Verify meta tags for all three pages
- Run `npm run lint`
- Run `npm run build`
- Manually verify the three main breakpoints

---

## Operational Prompts By Milestone

This section is meant to launch milestones consistently and to show during the interview how the agent was guided step by step.

### Base Prompt

Always use this structure:

`Follow [PLAN.md](PLAN.md) and execute only Milestone X. Do not go beyond it. If you find ambiguity, stop and tell me what is missing. First implement, then validate with lint/build if applicable, then summarize what you changed.`

### Milestone 1 Prompt — Foundations

`Follow [PLAN.md](PLAN.md) and execute only Milestone 1 — Planning and Setup. Refine project instructions if needed, finalize PLAN.md, keep prompts aligned with the plan, and do not implement application code yet. At the end, summarize the planning artifacts and confirm readiness for coding.`

### Milestone 2 Prompt — Foundations

`Follow [PLAN.md](PLAN.md) and execute only Milestone 2 — Foundations. Create types, BaseLayout, stub pages, root redirect, robots.txt, .env.example, seed.json, strapi.ts, pricing.ts, and pricing-data.json. Do not implement page components yet. At the end, tell me what was created and what is still open.`

### Milestone 3 Prompt — Shared Shell

`Follow [PLAN.md](PLAN.md) and execute only Milestone 3 — Shared Shell. Create only the shared components in ui, layout, and shared. Keep the mobile navbar as static/minimal as possible. Do not implement full homepage, pricing, or changelog yet.`

### Milestone 4 Prompt — Homepage

`Follow [PLAN.md](PLAN.md) and execute only Milestone 4 — Homepage. Implement the homepage at /en/ using the shared components already created. You may use temporary local placeholders for missing assets, but do not use remote WordPress images in the final page version. Do not work on pricing or changelog yet.`

### Milestone 5 Prompt — Pricing

`Follow [PLAN.md](PLAN.md) and execute only Milestone 5 — Pricing. Implement the /en/plans-and-prices/ page, including PricingTable, the features modal, and FAQAccordion. Use only the data in pricing-data.json. Respect env, currency, billing, tabs, and subtabs behavior. Do not change homepage or changelog beyond what is necessary for shared components.`

### Milestone 6 Prompt — Changelog

`Follow [PLAN.md](PLAN.md) and execute only Milestone 6 — Changelog. Implement /changelog/, ChangelogFilters, and the build-time fallback from strapi.ts to seed.json. Do not introduce client-side fetches.`

### Milestone 7 Prompt — Finalization

`Follow [PLAN.md](PLAN.md) and execute only Milestone 7 — Finalization. Replace remaining placeholders, verify meta tags, run lint and build, then clearly report any open issues.`

### Resume Prompt

If the work is interrupted and you want to resume without losing context:

`Resume the work following [PLAN.md](PLAN.md). Consider complete only the milestones that are actually implemented in code. First tell me what is already done, then propose the next smallest useful block and implement it.`

---

## Interview Tracking

To present the process clearly without creating extra files, use this approach:

1. Keep [PLAN.md](PLAN.md) as the source of truth.
2. Launch one milestone at a time using the prompts above.
3. After each milestone, make a small, readable commit.
4. In the commit message or interview notes, always connect the commit to the executed milestone.
5. If you want even clearer traceability, add a temporary mini section at the bottom of this file with:
   - executed milestone
   - prompt used
   - output produced
   - open issues

Minimal manual log template:

`Milestone: M1`
`Prompt used: Follow PLAN.md and execute only Milestone 1...`
`Outcome: completed / partial`
`Notes: ...`

---

## Critical Files To Create / Modify

**Create from scratch:**
- `src/types/seo.ts`, `changelog.ts`, `pricing.ts`
- `src/layouts/BaseLayout.astro`
- `src/lib/strapi.ts`, `pricing.ts`, `pricing-data.json`
- `src/pages/en/index.astro`
- `src/pages/en/plans-and-prices/index.astro`
- `src/pages/changelog/index.astro`
- `src/components/ui/Button.astro`, `Badge.astro`, `Tag.astro`, `Icon.astro`
- `src/components/layout/TopBar.astro`, `Navbar.astro`, `Footer.astro`
- `src/components/shared/SectionHeader.astro`, `FeatureBlock.astro`, `IconGrid.astro`
- `src/components/islands/PricingTable.tsx`, `FAQAccordion.tsx`, `ChangelogFilters.tsx`, `TestimonialsCarousel.tsx`
- `public/robots.txt`
- `.env.example`
- `strapi/seed.json`

**Modify:**
- `src/pages/index.astro` — convert into a redirect to `/en/`

**Do not touch:**
- `astro.config.mjs` — already configured correctly
- `tsconfig.json`, `eslint.config.js`, `package.json`, `src/styles/global.css`

---

## Key Decisions
- `src/pages/index.astro` becomes an HTTP redirect to `/en/` (Astro supports `Astro.redirect`)
- Dev/Prod, EUR/GBP, and Month/Day/Year prices must be stored explicitly in `pricing-data.json`, with no derived calculations
- Pricing modal features are handled through shared `featureGroups`, not duplicated per plan
- Enterprise Dedicated in Development shows an empty table with header columns only, matching the original site
- `TestimonialsCarousel` uses `client:visible` (it is below the fold)
- Mobile navbar should be implemented statically or with the minimum JS required, avoiding a dedicated React island unless truly necessary
- No cookie banner should be implemented (it is WordPress-only)
- The “Would you like to receive more info” section must be implemented as a static section with only the `Free hosting consult` link (per spec: DO NOT implement a form)