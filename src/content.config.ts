import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const HOMEPAGE_IMAGE_KEYS = [
  'hypernodeInsights',
  'hostingSolutions',
  'cloudHosting',
  'dedicatedHosting',
  'clusterHosting',
  'greenHosting',
  'support',
  'worldwideCoverage',
  'enterpriseMonitoring',
  'controlPanel',
  'serverUpdates',
  'relyOnMagento',
  'fasterThanFast',
  'scaleWheneverYouWant',
  'developersFavourite',
  'offeringAllHostingTypes',
  'agenciesTrustUs',
] as const

const COMPANY_LOGO_KEYS = [
  'intersportTwinsport',
  'nikkie',
  'pme',
  'partner',
  'fairphone',
] as const

const TESTIMONIAL_LOGO_KEYS = ['youwe', 'hyva', 'refined'] as const
const TESTIMONIAL_PHOTO_KEYS = ['tjitte', 'willem', 'rowan'] as const

const featureBlockSchema = z.object({
  imageKey: z.enum(HOMEPAGE_IMAGE_KEYS),
  imageAlt: z.string(),
  tagline: z.string().optional(),
  title: z.string(),
  body: z.array(z.string()),
  cta: z
    .object({
      label: z.string(),
      href: z.string().url(),
    })
    .optional(),
  imagePosition: z.enum(['left', 'right']).optional(),
  variant: z.enum(['light', 'dark']).optional(),
})

const homepage = defineCollection({
  loader: glob({ base: './src/content/homepage', pattern: '**/*.{md,mdx}', entryType: 'content' }),
  schema: z.object({
    heroContent: z.object({
      title: z.string(),
      subtitle: z.string(),
      primaryCta: z.object({
        label: z.string(),
        href: z.string().url(),
      }),
      secondaryCta: z.object({
        label: z.string(),
        href: z.string().url(),
      }),
    }),
    featureSectionsIntro: z.array(featureBlockSchema),
    featureSectionsHostingTypes: z.array(featureBlockSchema),
    featureSectionsGreen: z.array(featureBlockSchema),
    featureSectionsTrust: z.array(featureBlockSchema),
    reliabilityItems: z.array(
      z.object({
        imageKey: z.enum(HOMEPAGE_IMAGE_KEYS),
        imageAlt: z.string(),
        title: z.string(),
        body: z.string(),
        href: z.string().url().optional(),
      }),
    ),
    platformItems: z.array(
      z.object({
        imageKey: z.enum(HOMEPAGE_IMAGE_KEYS),
        imageAlt: z.string(),
        title: z.string(),
        body: z.string(),
        href: z.string().url().optional(),
      }),
    ),
    companyLogos: z.array(
      z.object({
        imageKey: z.enum(COMPANY_LOGO_KEYS),
        alt: z.string(),
      }),
    ),
    testimonials: z.array(
      z.object({
        quote: z.string(),
        author: z.string(),
        role: z.string(),
        logoKey: z.enum(TESTIMONIAL_LOGO_KEYS),
        logoAlt: z.string(),
        photoKey: z.enum(TESTIMONIAL_PHOTO_KEYS),
        photoAlt: z.string(),
      }),
    ),
    contactSection: z.object({
      title: z.string(),
      subtitle: z.string(),
      submitLabel: z.string(),
      newsHref: z.string().url(),
      privacyPolicyHref: z.string().url(),
    }),
    moreFeaturesCta: z.object({
      label: z.string(),
      href: z.string().url(),
    }),
  }),
})

const pricing = defineCollection({
  loader: glob({ base: './src/content/pricing', pattern: '**/*.{md,mdx}', entryType: 'content' }),
  schema: z.object({
    pricingHeroContent: z.object({
      title: z.string(),
      subtitle: z.string(),
      note: z.string(),
    }),
    pricingSidebarContent: z.object({
      cloudLabel: z.string(),
      dedicatedLabel: z.string(),
      consultationText: z.string(),
      consultationCta: z.object({
        href: z.string().url(),
        label: z.string(),
      }),
    }),
    pricingSectionContent: z.object({
      cloud: z.object({
        title: z.string(),
        description: z.string(),
        highlight: z.string(),
      }),
      dedicated: z.object({
        title: z.string(),
        description: z.string(),
      }),
    }),
    pricingFaqItems: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      }),
    ),
  }),
})

export const collections = {
  homepage,
  pricing,
}