Follow PLAN.md and execute only MILESTONE 4 — Homepage.

Implement the full homepage for `/en/`.

Create or update only the files needed for this milestone:

**Homepage domain**

1. `src/types/homepage.ts`
Define and export the homepage domain types used by this page, including the image keys, feature sections, grid items, CTAs, company logos, and testimonials.

2. `src/content/pages/homepage/content.ts`
Store the static homepage content in a typed content module. This file should include:
- hero content
- homepage feature sections
- reliability grid items
- platform grid items
- company logos
- testimonials
- contact section copy
- CTA for the “More about our managed hosting platform” section

**Assets**

3. Download and use local homepage assets from the original site under `src/assets/images/homepage/`.
Do not link directly to WordPress image URLs in the final page.

The homepage implementation should use the local images for:
- Hypernode Insights
- hosting solutions
- cloud hosting
- dedicated hosting
- cluster hosting
- enterprise monitoring
- control panel
- server updates
- green hosting
- support
- worldwide coverage
- company logos
- testimonial logos and photos

**Astro page assembly**

4. `src/components/pages-view/homepage/Homepage.astro`
Assemble the complete homepage with the correct section order and map content data to local Astro blocks.

The homepage should include these sections in order:
- Hero
- Hypernode Insights feature block
- Discover our managed hosting solutions feature block
- Reliability grid section
- Company logo strip
- Cloud hosting feature block
- Dedicated hosting feature block
- Cluster hosting feature block
- Platform features grid section
- Green hosting feature block
- Testimonials section
- Support feature block
- Worldwide coverage feature block
- Final contact section with lead form

5. `src/pages/en/index.astro`
Wire the page using `BaseLayout.astro` and render `<Homepage />`.

SEO must be:
- title: `Hosting Provider for eCommerce & Online stores | Hypernode`
- canonical: `https://www.hypernode.com/en/`
- hreflang: EN and NL

**Static Astro blocks**

6. Use or create the Astro blocks needed for homepage composition under the current real structure:
- `src/components/ui/blocks/HeroImage.astro`
- `src/components/ui/blocks/FeatureBlock.astro`
- `src/components/ui/blocks/IconGridSection.astro`
- `src/components/ui/blocks/CompanyLogoStrip.astro`
- `src/components/ui/blocks/TestimonialsSection.astro`
- `src/components/ui/blocks/TestimonialsGrid.astro`
- `src/components/ui/blocks/FormSection.astro`

These should stay static Astro components unless interactivity is actually needed.

**Homepage React island**

7. `src/components/islands/TestimonialsCarousel.tsx`
Create the homepage testimonial carousel as a React island.

Requirements:
- Arrow function component only
- No `any`
- `import type` for type-only imports
- receive testimonial data as props from Astro
- keep it lightweight and client-side only where necessary

**Lead form**

8. `src/components/pages-view/homepage/HomepageLeadForm.astro`
Render the homepage contact form as static Astro markup.

Requirements:
- preserve the expected field names
- preserve the consent copy and related links
- do not replace the form with a CTA-only section
- keep it easy to wire to a backend or CRM later

**Content expectations**

Hero:
- H1 and supporting subtitle
- primary CTA: trial/signup
- secondary CTA: free hosting consult

Feature sections:
- use alternating image positions where appropriate
- support CTA links when present

Reliability section:
- 6 items

Platform section:
- 3 items

Testimonials:
- use real testimonial quotes, author names, roles, and logos

Final contact section:
- use the provided title/subtitle copy
- include the lead form, not a button-only CTA

**Project constraints**

- Never change the `/en/` URL
- Do not hardcode SEO tags outside `BaseLayout.astro`
- Use local assets only
- Use Astro’s image pipeline where applicable
- No client-side fetches
- Use Astro by default and React only for the testimonial carousel
- Keep styling in Tailwind utility classes only
- Use project brand tokens
- Keep the general content width aligned with the project’s shared width token in `src/styles/global.css`

**Do not**

- Do not change unrelated routes
- Do not move the homepage lead form out of the page
- Do not replace the final contact section with a marketing CTA
- Do not use plain remote WordPress image URLs in the final homepage
- Do not introduce pricing or changelog-specific logic in this milestone

**Validation**

At the end:
- run `npm run lint`
- run `npm run build`
- report what was implemented
- mention any intentionally deferred work only if relevant