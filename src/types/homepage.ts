import type { ImageMetadata } from 'astro'

export type HomepageImageKey =
  | 'hypernodeInsights'
  | 'hostingSolutions'
  | 'cloudHosting'
  | 'dedicatedHosting'
  | 'clusterHosting'
  | 'greenHosting'
  | 'support'
  | 'worldwideCoverage'
  | 'enterpriseMonitoring'
  | 'controlPanel'
  | 'serverUpdates'
  | 'relyOnMagento'
  | 'fasterThanFast'
  | 'scaleWheneverYouWant'
  | 'developersFavourite'
  | 'offeringAllHostingTypes'
  | 'agenciesTrustUs'

export interface HomepageCallToAction {
  label: string
  href: string
}

export interface HomepageHeroContent {
  title: string
  subtitle: string
  primaryCta: HomepageCallToAction
  secondaryCta: HomepageCallToAction
}

export interface HomepageContactSection {
  title: string
  subtitle: string
  submitLabel: string
  newsHref: string
  privacyPolicyHref: string
}

export type HomepageMoreFeaturesCta = HomepageCallToAction

export interface CompanyLogo {
  image: ImageMetadata
  alt: string
}

export interface HomepageFeatureSection {
  imageKey: HomepageImageKey
  imageAlt: string
  tagline?: string
  title: string
  body: string[]
  cta?: HomepageCallToAction
  imagePosition?: 'left' | 'right'
  variant?: 'light' | 'dark'
}

export interface HomepageGridItem {
  imageKey: HomepageImageKey
  imageAlt: string
  title: string
  body: string
  href?: string
}

export interface Testimonial {
  quote: string
  author: string
  role: string
  logo: ImageMetadata
  logoAlt: string
  photo: ImageMetadata
  photoAlt: string
}
