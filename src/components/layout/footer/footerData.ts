export interface FooterLinkItem {
  href: string
  label: string
  title?: string
}

export interface FooterLinkGroup {
  heading: string
  links: FooterLinkItem[]
}

export const LINK_CLASS =
  'text-gray-300 hover:text-brand-orange transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-brand-orange'

export const COLUMN_HEADING_CLASS = 'text-[15px] leading-[22px] font-bold uppercase tracking-wider text-white mb-4'
export const COLUMN_LIST_CLASS = 'space-y-2 text-sm list-none p-0'
export const SOCIAL_LINK_CLASS = 'text-white/50 hover:text-brand-sky transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-white'
export const FOOTER_SECTION_HEADING_CLASS = 'font-sans text-[15px] leading-[22px] font-bold text-white'
export const FOOTER_POST_LINK_CLASS = 'block truncate text-sm leading-6 text-gray-300 hover:text-brand-sky transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-white'
export const SUB_FOOTER_LINK_CLASS = 'text-gray-300 hover:text-brand-sky transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-white'

export const socialLinks: FooterLinkItem[] = [
  {
    href: 'https://www.facebook.com/Hypernodecom',
    label: 'Hypernode on Facebook',
    title: 'simple-icons:facebook',
  },
  {
    href: 'https://twitter.com/Hypernode_com',
    label: 'Hypernode on X (Twitter)',
    title: 'simple-icons:x',
  },
  {
    href: 'https://www.linkedin.com/company/hypernodecom',
    label: 'Hypernode on LinkedIn',
    title: 'simple-icons:linkedin',
  },
  {
    href: 'https://www.instagram.com/hypernode_com',
    label: 'Hypernode on Instagram',
    title: 'simple-icons:instagram',
  },
  {
    href: 'https://github.com/ByteInternet',
    label: 'Hypernode on GitHub',
    title: 'simple-icons:github',
  },
]

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    heading: 'Applications',
    links: [
      { href: 'https://www.hypernode.com/en/magento-hosting/', label: 'Magento' },
      { href: 'https://www.hypernode.com/en/shopware-hosting/', label: 'Shopware' },
      { href: 'https://www.hypernode.com/en/woocommerce-hosting/', label: 'WooCommerce' },
      { href: 'https://www.hypernode.com/en/akeneo-hosting/', label: 'Akeneo' },
      { href: 'https://www.hypernode.com/en/adobe-commerce-hosting/', label: 'Adobe Commerce' },
      { href: 'https://www.hypernode.com/en/laravel-hosting/', label: 'Laravel' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { href: 'https://www.hypernode.com/en/brancher/', label: 'Brancher nodes' },
      { href: 'https://www.hypernode.com/en/managed-ssl-certificates/', label: 'SSL' },
      { href: 'https://www.magereport.com/', label: 'MageReport' },
      { href: 'https://www.hypernode.com/en/php-extended-support/', label: 'PHP extended support' },
    ],
  },
  {
    heading: 'Support & Resources',
    links: [
      { href: 'https://emergency.hypernode.com/', label: 'Emergency Support' },
      { href: 'https://www.hypernode.com/en/support/', label: 'Support' },
      { href: 'https://docs.hypernode.com/', label: 'Docs' },
      { href: '/changelog/', label: 'Changelog' },
      { href: 'https://www.hypernode-status.com/', label: 'Hypernode status' },
    ],
  },
  {
    heading: 'Hypernode Partners',
    links: [
      { href: 'https://www.hypernode.com/en/our-partners/', label: 'Our partners' },
      { href: 'https://www.hypernode.com/en/hyva-themes', label: 'Hyvä Themes' },
      { href: 'https://www.hypernode.com/en/agencies/', label: 'For agencies' },
    ],
  },
  {
    heading: 'About Hypernode',
    links: [
      { href: 'https://www.hypernode.com/en/contact/', label: 'Contact' },
      { href: 'https://www.hypernode.com/en/careers/', label: 'Team & careers' },
      { href: 'https://www.hypernode.com/en/blog/', label: 'Blog' },
      { href: 'https://www.hypernode.com/en/people-planet-profit/', label: 'Social Responsibility' },
      { href: 'https://www.hypernode.com/en/join-feedback-group/', label: 'Join Beta Group' },
    ],
  },
]

export const latestReleases: FooterLinkItem[] = [
  {
    href: 'https://changelog.hypernode.com/?p=68930',
    label: 'Release 10770: MySQL Config Profile...',
    title: 'Release 10770: MySQL Config Profile 2026.1',
  },
  {
    href: 'https://changelog.hypernode.com/?p=68926',
    label: 'Hypernode Deploy v4.8.0',
    title: 'Hypernode Deploy v4.8.0',
  },
  {
    href: 'https://changelog.hypernode.com/?p=68921',
    label: 'Release 10755: Varnish and HAProxy ...',
    title: 'Release 10755: Varnish and HAProxy utilities',
  },
  {
    href: 'https://changelog.hypernode.com/?p=68910',
    label: 'Release 10703: Stricter WAF',
    title: 'Release 10703: Stricter WAF',
  },
  {
    href: 'https://changelog.hypernode.com/?p=68893',
    label: 'Release 10647: Two-factor Authentic...',
    title: 'Release 10647: Two-factor Authentication',
  },
]

export const latestBlogs: FooterLinkItem[] = [
  {
    href: 'https://www.hypernode.com/en/hypernode-deploy-v4-8-0/',
    label: 'Hypernode Deploy v4.8.0: A Big Step Forward for St...',
    title: 'Hypernode Deploy v4.8.0: A Big Step Forward for Static Content Deployment',
  },
  {
    href: 'https://www.hypernode.com/en/common-magento-security-vulnerabilities/',
    label: '7 Common Magento Security Vulnerabilities',
    title: '7 Common Magento Security Vulnerabilities',
  },
  {
    href: 'https://www.hypernode.com/en/third-party-magento-extensions/',
    label: 'The Wild West of Third-Party Magento Extensions',
    title: 'The Wild West of Third-Party Magento Extensions',
  },
  {
    href: 'https://www.hypernode.com/en/us-software-risk-eu-ecommerce/',
    label: 'Why U.S. Software is a Risk for EU E-commerce Comp...',
    title: 'Why U.S. Software is a Risk for EU E-commerce Companies',
  },
  {
    href: 'https://www.hypernode.com/en/improve-website-performance/',
    label: 'How to Improve Your Website Performance',
    title: 'How to Improve Your Website Performance',
  },
]

export const supportLinks: FooterLinkItem[] = [
  { href: 'mailto:support@hypernode.com', label: 'support@hypernode.com' },
  { href: 'tel:+442036085274', label: '+44 20 3608 5274' },
  { href: 'tel:+31205216226', label: '+31 20 521 6226' },
]

export const legalLinks: FooterLinkItem[] = [
  { href: 'https://assets.hypernode.com/docs/pp/latest', label: 'Privacy Policy' },
  { href: 'https://assets.hypernode.com/docs/aup/latest', label: 'Acceptable Use Policy' },
  { href: 'https://assets.hypernode.com/docs/tc/latest', label: 'Terms & Conditions' },
  { href: 'https://assets.hypernode.com/docs/rd/latest', label: 'Responsible Disclosure Policy' },
  { href: 'https://www.hypernode.com/en/cookie-policy/', label: 'Cookie Policy' },
]