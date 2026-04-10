Follow PLAN.md and execute only MILESTONE 5 — Plans & Prices.

Implement the full pricing page for `/en/plans-and-prices/`.

Create or update only the files needed for this milestone:

**Pricing domain**

1. `src/types/pricing.ts`
Define and export the pricing domain types, including:
- `Plan`
- `Currency`
- `Environment`
- `BillingPeriod`
- `PricingGroup`
- any small supporting types needed for providers, labels, or feature groups

2. `src/lib/pricing-data.json`
Store all pricing data locally. No client-side fetches are allowed. The data must include:
- cloud and dedicated plans
- CPU, RAM, SSD
- EUR and GBP prices
- billing options
- optional labels such as `most popular` and `Near zero downtime scaling`
- order links
- feature group mapping

3. `src/lib/pricing.ts`
Export a helper `getPrice(plan, env, currency, billingPeriod)`.
Support:
- Cloud: `Monthly` and `Daily`
- Dedicated: `Monthly` and `Yearly`

**Static pricing content**

4. `src/content/pages/pricing/content.ts`
Add the static content used by the pricing page, including:
- hero copy
- sidebar copy
- section intros
- FAQ content

The hero content must be:
- title: `Pricing Table`
- subtitle: `Explore Our Tailored Hosting Solutions: Dedicated and Cloud Plans for Every Need.`
- note: `All prices are excluding VAT.`

**Astro blocks and page assembly**

5. `src/components/ui/blocks/PricingHero.astro`
Static hero block for the pricing page.

6. `src/components/ui/blocks/PricingSidebar.astro`
Sticky left sidebar with:
- a `Production / Development` environment switch
- two stacked navigation cards:
	- `Cloud hosting plans`
	- `Dedicated hosting plans`
- consultation copy and CTA

The sidebar links must smoothly scroll to the corresponding pricing sections.

7. `src/components/pages/PricingPage.astro`
Assemble the full page with:
- hero
- sidebar + pricing table layout
- FAQ section

8. `src/pages/en/plans-and-prices/index.astro`
Wire the page to the correct route and set SEO via `BaseLayout.astro`.

SEO must be:
- title: `Plans & Prices — Managed eCommerce Hosting | Hypernode`
- canonical: `https://www.hypernode.com/en/plans-and-prices/`
- hreflang: EN and NL

**React islands**

9. `src/components/islands/PricingTable.tsx`
Create the interactive pricing table as a React island using `client:load`.

Requirements:
- Arrow function component only
- No `any`
- Use `import type` for type-only imports
- All data passed from Astro at build time
- No client-side fetches

Interactions:
- environment toggle: `Production / Development`
- currency toggle: `EUR / GBP`
- billing toggle

Pricing structure:
- Cloud
	- `Combell OpenStack`
	- `Amazon Web Services`
- Dedicated
	- `Dedicated plans`
	- `Dedicated plans - Enterprise`

Billing rules:
- Cloud uses `Monthly / Daily`
- Dedicated uses `Monthly / Yearly`
- When `GBP` is selected, billing stays locked to `Monthly`
- `Enterprise Dedicated` in `Development` should render an empty table body with headers only

Table requirements:
- columns: `Name`, `CPUs`, `SSD storage`, `RAM`, `Price`, `Buy`
- `Name` remains left-aligned
- all other data cells are centered horizontally and vertically
- rows are compact and separated by lines
- buy action is a play-circle icon without a surrounding button box
- labels such as `most popular` and `Near zero downtime scaling` appear next to the plan name
- `features` appears as a small text button under the plan name

Feature modal requirements:
- compact width and padding
- reduced font size
- tighter spacing in the feature list

10. `src/components/islands/FAQAccordion.tsx`
Create the FAQ section as a React island using `client:visible`.

Requirements:
- hardcoded FAQ content from `content.ts`
- max width limited to `770px`
- no boxed cards around each item
- only separator lines between entries
- arrow icon without a bordered circle
- keep smooth arrow rotation animation
- keep smooth content reveal/hide animation

**Project constraints**

- Never change the route `/en/plans-and-prices/`
- Do not add client-side API calls
- Keep all pricing data local and typed
- Use Astro for static assembly and React only where interactivity is required
- Use Tailwind utility classes only
- Use project brand tokens, not hardcoded colors in markup
- Keep the page content width centralized through the shared container token in `src/styles/global.css`
- General page content max width must remain centralized and reusable
- FAQ width is the only special-case width override

**Design expectations**

- The page is two-column on desktop
- Left sidebar max width: about `250px`
- Right column contains the cloud and dedicated pricing sections
- Navigation between `Cloud hosting` and `Dedicated hosting` must visibly animate scrolling
- The pricing table should feel denser and more editorial, not like oversized cards
- FAQ should feel lightweight, not boxed

**Do not**

- Do not change unrelated routes
- Do not add new framework dependencies unless absolutely necessary
- Do not move SEO logic out of `BaseLayout.astro`
- Do not use plain `img` tags where Astro assets are already in use
- Do not fetch pricing data on the client

**Validation**

At the end:
- run `npm run lint`
- run `npm run build`
- report what was implemented
- mention any intentional exceptions or known tooling false positives only if relevant
