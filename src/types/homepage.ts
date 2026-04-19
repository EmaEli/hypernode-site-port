import type { ImageMetadata } from 'astro'

export interface CompanyLogo {
  image: ImageMetadata
  alt: string
}

export interface HomepageCallToAction {
  href: string
  label: string
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
