---
description: Implement only Milestone 6 changelog page for the Hypernode Astro port
---

Follow PLAN.md and execute only MILESTONE 6 — Changelog.

Before implementing the changelog page, check the shared content width token in `src/styles/global.css`.
Keep the shared width token centralized and reusable for shared page layouts.

Implement the full changelog page for `/changelog/`.

Create or update only the files needed for this milestone:

**Changelog domain**

1. `src/types/changelog.ts`
Define and export the changelog domain types, including:
- `ChangelogEntry`
- `ChangelogCategory`
- `StrapiChangelogEntry`
- `StrapiListResponse`
- any small supporting types needed for typed Strapi mapping

The category union must support:
- `API`
- `Autoscaling`
- `Cluster`
- `ControlPanel`
- `HypernodeDeploy`
- `MageReport`
- `Platform`
- `All`

2. `strapi/seed.json`
Add fallback seed data for the changelog page.

Requirements:
- keep the data realistic and typed against the changelog domain
- include multiple entries across different categories
- include the fields needed by the UI and Strapi fallback mapping

3. `src/lib/strapi.ts`
Create a typed Strapi client with fallback behavior.

Requirements:
- export a helper that fetches changelog entries at build time
- use `PUBLIC_STRAPI_URL` and `PUBLIC_STRAPI_TOKEN`
- if Strapi is unavailable or returns a bad response, fall back to `strapi/seed.json`
- the build must not fail when Strapi is unreachable
- do not use `any`
- keep the mapping from Strapi response to domain model explicit and typed

**Changelog page**

4. `src/components/pages-view/changelog/ChangelogFilters.tsx`
Create the changelog filtering React island.

Requirements:
- Arrow function component only
- No `any`
- Use `import type` for type-only imports
- Entries are passed from Astro at build time
- No client-side fetches
- Filter entries client-side by category
- Include an `All` filter
- Keep the UI simple, readable, and aligned with the existing design system

5. `src/pages/changelog/index.astro`
Assemble the changelog page at the correct route.

Requirements:
- fetch changelog entries at build time through `src/lib/strapi.ts`
- render the page through `BaseLayout.astro`
- pass entries into the filtering island
- keep all data loading on the server/build side
- preserve the route `/changelog/`

SEO must be wired through `BaseLayout.astro` and preserve the existing project constraints.
Use:
- title: `Changelog | Hypernode`
- canonical: `https://www.hypernode.com/changelog/`
- hreflang: EN and NL

**Design and implementation constraints**

- Do not change the route `/changelog/`
- Do not add client-side API calls
- Keep data fetching at build time only
- Use Astro for static page assembly and React only for the filtering interaction
- Keep the implementation typed end to end
- Use Tailwind utility classes only
- Reuse existing layout and UI patterns where practical
- Do not move SEO logic out of `BaseLayout.astro`
- Do not change unrelated routes or pages

**Validation**

At the end:
- run `npm run lint`
- run `npm run build`
- report what was implemented
- mention any intentional exceptions or known tooling false positives only if relevant