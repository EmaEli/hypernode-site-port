Follow PLAN.md and execute only PHASE 3 — Shared Shell.

Create exactly these files, nothing more:

**UI primitives — `src/components/ui/`**

1. `Button.astro` — three variants via a `variant` prop: `primary` (brand orange fill), `secondary` (outline), `ghost` (no border). Also accept `href?: string` (renders as `<a>`) and `type?: string` (renders as `<button>`). Export a `ButtonProps` interface.

2. `Badge.astro` — small label chip for category/feature labels. Accept `label: string` and optional `variant` prop. Export a `BadgeProps` interface.

3. `Tag.astro` — changelog category tag. Accept `label: string`. Export a `TagProps` interface.

4. `Icon.astro` — thin wrapper for inline SVG icons. Accept `name: string` and optional `size?: number` (default 24). The component renders a placeholder `<span>` for now — actual SVG wiring happens in Milestone 4 when icons are needed. Export an `IconProps` interface.

**Layout components — `src/layouts/`**

5. `TopBar.astro` — slim bar above the navbar. Render a login link and the NL language toggle (`<a href="https://www.hypernode.com/nl/">NL</a>`). No props needed.

6. `Navbar.astro` — main navigation bar. Static HTML only — no React, no client-side JS. Links: Why Hypernode, Products, Plans & prices (`/en/plans-and-prices/`), Partners, Resources. Right side: NL toggle (same as TopBar) and the "Free hosting consult" CTA rendered as:
   `<a href="https://www.hypernode.com/en/free-hosting-consult/">Free hosting consult</a>`
   Include a hamburger icon placeholder for mobile — static only (no toggle logic). Use `aria-label` on the hamburger button.

7. `footer/Footer.astro` — five link columns: Applications, Services, Support & Resources, Partners, About Hypernode. Each column has a heading and 4–6 placeholder `<a href="#">` links for now. Below the columns: copyright line, social icons as icon-only `<a>` links with `aria-label`, and a "Need help?" contact line. No props needed.

**Shared section components — `src/components/ui/blocks/`**

8. `SectionHeader.astro` — centered eyebrow + h2 + subtitle. Props: `eyebrow?: string`, `title: string`, `subtitle?: string`. Export a `SectionHeaderProps` interface.

9. `FeatureBlock.astro` — image + text block with optional CTA. Props: `image: ImageMetadata`, `imageAlt: string`, `eyebrow?: string`, `title: string`, `body?: string`, `cta?: { label: string; href: string }`, `imagePosition?: 'left' | 'right'` (default `'right'`), `variant?: 'light' | 'dark'` (default `'light'`). Use Astro's `<Image />` component. Export a `FeatureBlockProps` interface.

10. `IconGrid.astro` — icon + title + body grid. Props: `title?: string`, `items: IconGridItem[]`, `columns?: 3 | 6` (default `3`). Export `IconGridItem` and `IconGridProps` interfaces.

Rules:
- All components use Tailwind utility classes only — no inline styles, no custom CSS classes
- Use semantic HTML elements where appropriate (`<nav>`, `<header>`, `<footer>`, `<section>`)
- Every interactive element must have a visible focus state (do not remove `outline`)
- Icon-only buttons must have `aria-label`
- Mobile-first: components must not break at 375px
- Do NOT add `client:*` directives — these are all static Astro components
- Do NOT implement real page content (no homepage sections, no pricing data, no changelog entries)
- Do NOT touch `astro.config.mjs`, `tsconfig.json`, `eslint.config.js`, or any existing file outside `src/components/`

At the end, confirm what was created and what is intentionally deferred to later milestones.
