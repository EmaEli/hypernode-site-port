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

## PHASE 2 — Foundations (minimum technical base only)

This phase should stay intentionally narrow. Its job is to make the project routable and structurally ready, not to model every page domain yet.

**Step 2.1** — Core SEO type in `src/types/`
- `seo.ts`: `SEOProps`, `HreflangEntry`

**Step 2.2** — `src/layouts/BaseLayout.astro`
Render the shared document shell with the central SEO contract: title, meta description, canonical, Open Graph, Twitter Card, and hreflang. Accept a `seo: SEOProps` prop. Include `global.css`. Expose a slot for page content.

SEO values can stay provisional at this stage where exact descriptions are still unverified. The priority here is the layout contract, not final page content.

**Step 2.3** — Root redirect
- Convert `src/pages/index.astro` into a redirect to `/en/`

**Step 2.4** — Minimal support files
- `public/robots.txt` — must not block any indexable page
- `.env.example` — `PUBLIC_STRAPI_URL` + `PUBLIC_STRAPI_TOKEN`

**Phase 2 Output**
- The project has the correct routes, a shared base layout, and the minimum project plumbing needed to continue.
- All page-specific domains that are not globally required remain deferred to their own milestones.
- The milestone stays small enough that later work can be built page by page without premature modeling.

---

## PHASE 3 — Shared Shell (common UI and structure only)

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
- The reusable shell exists before any real page implementation begins.
- Navbar, footer, buttons, and shared section primitives are solved once and reused later.
- No page-specific pricing or changelog modeling is introduced yet.

---

## PHASE 4 — Homepage `/en/` (first full page only)

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

If the homepage needs local models, interfaces, constants, or repeated class patterns, introduce them here only for the homepage. Do not pre-model pricing or changelog concerns in this phase.

**Step 4.3** — `TestimonialsCarousel.tsx` in `src/components/islands/`
Carousel/slider for testimonials. `client:visible`. Data passed as props from the Astro page.

**Step 4.4** — Assemble `src/pages/en/index.astro`
Import `BaseLayout` with full SEO, Navbar, sections in the correct order, and Footer.
SEO title: `Hosting Provider for eCommerce & Online stores | Hypernode`

**Phase 4 Output**
- Homepage complete and navigable at `/en/`.
- All images used are local in `src/assets/images/`.
- No real form is implemented: the CTA remains an external link per spec.
- The visual tone of the project is locked in through the homepage before moving on to the more complex pricing logic.

---

## PHASE 5 — Plans & Prices `/en/plans-and-prices/`

This is the first milestone where the pricing domain is modeled in full.

**Step 5.1** — Pricing domain types and data
- `src/types/pricing.ts`: `Plan`, `Currency`, `Environment`, `BillingPeriod`, `PricingGroup`
- `src/lib/pricing-data.json`: feature groups A-G and full plan data
- `src/lib/pricing.ts`: helper `getPrice(plan, env, currency, billingPeriod)` with explicit stored prices only

**Step 5.2** — Download pricing page images
- `pricing-cloud.png` (2023/10/Frame-195@3x.png)

**Step 5.3** — `PricingTable.tsx` in `src/components/islands/` — `client:load`
3 independent toggles: Environment (Production/Development), Currency (EUR/GBP), Billing.
- Cloud billing: Monthly/Daily
- Dedicated billing: Monthly/Yearly (-15%)
2 main tabs: Cloud (subtabs Combell OpenStack / AWS) | Dedicated (subtabs Standard / Enterprise).
Enterprise Dedicated in Development shows an empty table (header columns only).
Each card shows: name, price, CPUs, SSD storage, RAM, optional label (`most popular` / `Near zero downtime scaling`), order link.
The `features` button opens a modal with the plan feature bullet list (from `pricing-data.json`). Features are identical for Dev and Prod for the same plan.
Data is passed from the Astro page as props (no client-side fetch).

**Step 5.4** — `FAQAccordion.tsx` in `src/components/islands/` — `client:visible`
Hardcoded FAQ questions (text from the original site). Toggle state handled with `useState`.

**Step 5.5** — Assemble `src/pages/en/plans-and-prices/index.astro`
Hero with title + subtitle, `PricingTable` island (with `plans` prop), `FAQAccordion` island.
SEO title: `Plans & Prices — Managed eCommerce Hosting | Hypernode`

**Phase 5 Output**
- Pricing page complete with all toggles working.
- The `features` modal shows the correct content for each plan group.
- The Enterprise Development variant shows only the table header, matching the original site.

---

## PHASE 6 — Changelog `/changelog/`

This is the milestone where the changelog domain and fallback data are introduced.

**Step 6.1** — Changelog types and fallback data
- `src/types/changelog.ts`: `ChangelogEntry`, `ChangelogCategory`, `StrapiChangelogEntry`, `StrapiListResponse`
- `strapi/seed.json`: array of at least 5 real changelog entries
- `src/lib/strapi.ts`: typed client with fallback to `seed.json`

**Step 6.2** — `ChangelogFilters.tsx` in `src/components/islands/` — `client:visible`
Category buttons (All, API, Autoscaling, Cluster, ControlPanel, HypernodeFloating).
Filter the passed `entries` prop with local `useState`.
Render entry list: title, date, summary, and `Read more` link.

**Step 6.3** — Assemble `src/pages/changelog/index.astro`
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
2. Complete PHASE 2 right after that, but keep it strictly minimal: layout, routing, and support plumbing only.
3. Complete PHASE 3 next, so the common shell exists before any page is fully implemented.
4. Implement the homepage first and in isolation: it establishes the visual language, content structure, and shared section patterns.
5. Implement the pricing page next, including its own domain modeling, once the shared shell and homepage are stable.
6. Finish with changelog, including its own types, fallback seed, and build-time data integration.
7. Run PHASE 7 only when all three pages are mounted.

---

## Dependencies Between Phases

- PHASE 2 depends on PHASE 1.
- PHASE 3 depends on PHASE 2.
- PHASE 4 depends on PHASE 2 + PHASE 3 + homepage image downloads.
- PHASE 5 depends on PHASE 2 + PHASE 3 + completion of the homepage shell and pricing data modeling.
- PHASE 6 depends on PHASE 2 + PHASE 3 + completion of changelog types and fallback data.
- PHASE 7 depends on completion of PHASE 4, 5, and 6.

---

## Risks To Watch Closely

- SEO metadata must match the original: title and description need page-by-page verification.
- Original images must be downloaded and named consistently; no remote WordPress URLs should remain.
- The homepage should not be blocked by pricing or changelog modeling; keep those concerns deferred to their own phases.
- The pricing domain is the easiest area to implement incorrectly: toggles, billing modes, and feature groups must be modeled inside the pricing phase, not guessed early.
- The homepage can become too complex if sections are coded ad hoc instead of using `FeatureBlock`, `IconGrid`, and `SectionHeader` from the shared shell.
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
- Create `src/layouts/BaseLayout.astro`
- Convert `src/pages/index.astro` into a redirect to `/en/`
- Create `public/robots.txt`
- Create `.env.example`

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
- Create `src/pages/en/index.astro`
- Add local placeholder assets for the required homepage images
- Add homepage-specific models, constants, or repeated class patterns only where they are needed for `/en/`
- Assemble the hero and main static sections in `/en/`
- Add `TestimonialsCarousel.tsx` only if it is truly needed to reproduce the minimum behavior
- Gradually replace placeholders with final assets
- Verify header, footer, and final CTAs

### Milestone 5 — Pricing
- Create `src/types/pricing.ts`
- Populate `pricing-data.json` with complete featureGroups and plans
- Create `src/lib/pricing.ts`
- Implement `PricingTable.tsx`
- Implement the `features` modal
- Implement `FAQAccordion.tsx`
- Create `src/pages/en/plans-and-prices/index.astro`
- Verify all toggles: env, currency, billing, tabs, subtabs

### Milestone 6 — Changelog
- Create `src/types/changelog.ts`
- Populate `strapi/seed.json` with at least 5 real entries
- Create `src/lib/strapi.ts`
- Implement `ChangelogFilters.tsx`
- Create `src/pages/changelog/index.astro`
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

`Follow [PLAN.md](PLAN.md) and execute only Milestone 2 — Foundations. Create only the minimum technical base: SEO type, BaseLayout, route stubs, root redirect, robots.txt, and .env.example. Do not model pricing or changelog domains yet. Do not implement shared UI components yet. At the end, tell me what was created and what remains intentionally deferred.`

### Milestone 3 Prompt — Shared Shell

`Follow [PLAN.md](PLAN.md) and execute only Milestone 3 — Shared Shell. Create only the shared components in ui, layout, and shared. Keep the mobile navbar as static/minimal as possible. Do not implement homepage content, pricing logic, or changelog data yet.`

### Milestone 4 Prompt — Homepage

`Follow [PLAN.md](PLAN.md) and execute only Milestone 4 — Homepage. Implement the homepage at /en/ using the shared components already created. If the homepage needs local models, constants, or repeated class patterns, introduce them only for the homepage in this milestone. You may use temporary local placeholders for missing assets, but do not use remote WordPress images in the final page version. Do not work on pricing or changelog yet.`

### Milestone 5 Prompt — Pricing

`Follow [PLAN.md](PLAN.md) and execute only Milestone 5 — Pricing. First model the pricing domain in pricing.ts and pricing-data.json, then implement the /en/plans-and-prices/ page, including PricingTable, the features modal, and FAQAccordion. Respect env, currency, billing, tabs, and subtabs behavior. Do not change homepage or changelog beyond what is necessary for shared components.`

### Milestone 6 Prompt — Changelog

`Follow [PLAN.md](PLAN.md) and execute only Milestone 6 — Changelog. First create the changelog types, seed data, and strapi.ts fallback, then implement /changelog/ and ChangelogFilters. Do not introduce client-side fetches.`

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
- `src/types/seo.ts` in PHASE 2
- `src/layouts/BaseLayout.astro` in PHASE 2
- `src/pages/en/index.astro`, `src/pages/en/plans-and-prices/index.astro`, `src/pages/changelog/index.astro` in PHASE 2 as route stubs
- `src/components/ui/Button.astro`, `Badge.astro`, `Tag.astro`, `Icon.astro`
- `src/components/layout/TopBar.astro`, `Navbar.astro`, `Footer.astro`
- `src/components/shared/SectionHeader.astro`, `FeatureBlock.astro`, `IconGrid.astro`
- `src/types/pricing.ts`, `src/lib/pricing.ts`, `src/lib/pricing-data.json` in PHASE 5
- `src/types/changelog.ts`, `src/lib/strapi.ts`, `strapi/seed.json` in PHASE 6
- `src/components/islands/PricingTable.tsx`, `FAQAccordion.tsx`, `ChangelogFilters.tsx`, `TestimonialsCarousel.tsx`
- `public/robots.txt`
- `.env.example`

**Modify:**
- `src/pages/index.astro` — convert into a redirect to `/en/`

**Do not touch:**
- `astro.config.mjs` — already configured correctly
- `tsconfig.json`, `eslint.config.js`, `package.json`, `src/styles/global.css`

---

## Key Decisions
- `src/pages/index.astro` becomes an HTTP redirect to `/en/` (Astro supports `Astro.redirect`)
- PHASE 2 stays minimal and must not absorb pricing or changelog domain modeling
- Shared UI, navbar, footer, and reusable section primitives are built before the first real page is implemented
- The homepage is the first page implemented end to end and may introduce only homepage-local models or styling helpers where needed
- Dev/Prod, EUR/GBP, and Month/Day/Year prices must be stored explicitly in `pricing-data.json`, with no derived calculations
- Pricing modal features are handled through shared `featureGroups`, not duplicated per plan
- Enterprise Dedicated in Development shows an empty table with header columns only, matching the original site
- `TestimonialsCarousel` uses `client:visible` (it is below the fold)
- Mobile navbar should be implemented statically or with the minimum JS required, avoiding a dedicated React island unless truly necessary
- No cookie banner should be implemented (it is WordPress-only)
- The “Would you like to receive more info” section must be implemented as a static section with only the `Free hosting consult` link (per spec: DO NOT implement a form)