Follow PLAN.md and execute only PHASE 2 — Foundations.

Create exactly these files, nothing more:

1. `src/types/seo.ts` — export `SEOProps` and `HreflangEntry` interfaces as defined in the copilot instructions and PLAN.md. Use `import type` where needed.

2. `src/layouts/BaseLayout.astro` — accept `seo: SEOProps` as a prop. Render the full `<head>` block: title, description, canonical, og:title, og:description, og:url, og:image, og:type, twitter:card, twitter:title, twitter:description, twitter:image, and hreflang links. Import `global.css`. Expose a default slot.

3. `src/pages/en/index.astro` — minimal placeholder only. Use `BaseLayout` with provisional SEO values (title: "Hosting Provider for eCommerce & Online stores | Hypernode"). Render a single `<main><h1>Homepage</h1></main>`.

4. `src/pages/en/plans-and-prices/index.astro` — same approach. Title: "Plans & Prices — Managed eCommerce Hosting | Hypernode".

5. `src/pages/changelog/index.astro` — same approach. Title: "Changelog | Hypernode".

6. `src/pages/index.astro` — replace the Astro placeholder with `return Astro.redirect('/en/', 301)`.

7. `public/robots.txt` — allow all crawlers, allow all pages.

8. `.env.example` — PUBLIC_STRAPI_URL and PUBLIC_STRAPI_TOKEN with placeholder values.

Do NOT:
- Model pricing or changelog types
- Create any component files (no ui/, layout/, shared/, islands/)
- Create strapi/ files or src/lib/ files
- Download images or create content files
- Touch astro.config.mjs, tsconfig.json, eslint.config.js

At the end, confirm what was created and what is intentionally deferred to later milestones.