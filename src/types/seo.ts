export interface HreflangEntry {
  lang: string
  href: string
}

export interface SEOProps {
  title: string
  description: string
  canonical: string
  ogImage?: string
  hreflang: HreflangEntry[]
}
