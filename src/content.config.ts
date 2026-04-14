import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const seoSchema = z.object({
  title: z.string(),
  description: z.string(),
})

const homepage = defineCollection({
  loader: glob({ base: './src/content/homepage', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    seo: seoSchema,
  }),
})

const pricing = defineCollection({
  loader: glob({ base: './src/content/pricing', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    seo: seoSchema,
  }),
})

export const collections = {
  homepage,
  pricing,
}
