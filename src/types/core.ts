export interface FaqItem {
  question: string
  answer: string
}

export interface NavbarLink {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

export interface FooterLinkItem {
  href: string
  label: string
  title?: string
}

export interface FooterLinkGroup {
  heading: string
  links: FooterLinkItem[]
}
