import type { CompanyLogo, HomepageFeatureSection, HomepageGridItem, Testimonial } from '../../../types/homepage'
import fairphoneLogo from '../../../assets/images/homepage/company-logos/fairphone.svg'
import intersportTwinsportLogo from '../../../assets/images/homepage/company-logos/intersport-twinsport.png'
import nikkieLogo from '../../../assets/images/homepage/company-logos/nikkie.png'
import partnerLogo from '../../../assets/images/homepage/company-logos/logo.svg'
import pmeLogo from '../../../assets/images/homepage/company-logos/pme.svg'
import hyvaLogo from '../../../assets/images/homepage/testimonials/hyva-logo.png'
import refinedLogo from '../../../assets/images/homepage/testimonials/refined-logo.png'
import rowanPhoto from '../../../assets/images/homepage/testimonials/rowan.jpg'
import tjittePhoto from '../../../assets/images/homepage/testimonials/tjitte.jpg'
import willemPhoto from '../../../assets/images/homepage/testimonials/willem.jpg'
import youweLogo from '../../../assets/images/homepage/testimonials/youwe.svg'

export const heroContent = {
  title: 'Reliable Managed Ecommerce Hosting',
  subtitle:
    "Full automation, 24/7 premium support, and top developer tooling. Expertise in dedicated, cloud, and cluster hosting with Magento, Shopware, and WooCommerce and more CMS'.",
  primaryCta: {
    label: 'Start 14-day free trial',
    href: 'https://my.hypernode.com/register/',
  },
  secondaryCta: {
    label: 'Get free hosting consult',
    href: 'https://www.hypernode.com/en/free-hosting-consult/',
  },
} as const

export const homepageFeatureSections: HomepageFeatureSection[] = [
  {
    imageKey: 'hypernodeInsights',
    imageAlt: 'Hypernode Insights dashboard preview',
    tagline: 'Discover Powerful Analytics',
    title: 'NEW: Hypernode Insights',
    body: [
      'No more endless dashboards or guesswork: just clarity, context, and confidence in every decision.',
      'With real-time monitoring, performance insights, and historical trends, you get a complete overview of your store’s infrastructure and application performance, from server health to storefront behavior, all in one unified dashboard.',
      'Free to use until July 2026.',
    ],
    cta: {
      label: 'Read more',
      href: 'https://www.hypernode.com/en/hypernode-insights/',
    },
    imagePosition: 'right',
  },
  {
    imageKey: 'hostingSolutions',
    imageAlt: 'People collaborating around a managed hosting screen',
    title: 'Discover our managed hosting solutions',
    body: [
      'Our hosting platform meets the needs and requirements of webshops, agencies, and developers. Whether you’re a small boutique, a digital agency working with multiple clients, or a skilled developer, our solutions are tailored to elevate your online presence and drive results.',
      'In the past 25+ years, our managed e-Commerce hosting platform has earned the trust of over 200 agencies and 2500+ customers. Rely on optimal performance, security, stability, and renowned excellent support.',
    ],
    imagePosition: 'left',
  },
  {
    imageKey: 'cloudHosting',
    imageAlt: 'Illustration representing cloud hosting',
    title: 'Cloud hosting',
    body: [
      'With our managed cloud hosting, you can rely on our scalable, flexible and secure infrastructure.',
      'Experience the flexibility of super fast up-and downgrades. Launch your Hypernode from anywhere in the world. And be assured that you always have the fastest server at your disposal.',
    ],
    cta: {
      label: 'More about cloud hosting',
      href: 'https://www.hypernode.com/en/cloud-hosting/',
    },
    imagePosition: 'right',
  },
  {
    imageKey: 'dedicatedHosting',
    imageAlt: 'Illustration representing dedicated hosting',
    title: 'Dedicated Hosting',
    body: [
      'With our managed dedicated hosting, you have access to all server resources. This guarantees maximum performance of your shop.',
      'Experience the speed of our powerful bare metal servers. Enjoy full control over your server environment. And benefit from your optimal server configuration.',
    ],
    cta: {
      label: 'More about dedicated hosting',
      href: 'https://www.hypernode.com/en/dedicated-hosting/',
    },
    imagePosition: 'left',
  },
  {
    imageKey: 'clusterHosting',
    imageAlt: 'Illustration representing cluster hosting',
    title: 'Cluster Hosting',
    body: [
      'Experience the synergy of multiple servers working together to host your website seamlessly with cluster hosting. Enjoy unparalleled reliability and performance.',
      'Benefit from a resilient and scalable hosting solution tailored to your needs.',
    ],
    cta: {
      label: 'More about cluster hosting',
      href: 'https://www.hypernode.com/en/cluster-hosting/',
    },
    imagePosition: 'right',
  },
  {
    imageKey: 'greenHosting',
    imageAlt: 'Illustration representing green hosting',
    title: 'Go for Green Hosting',
    body: [
      'Reduce your online ecological footprint by choosing eco-friendly hosting.',
      'Hypernode hosting is 100% green. Is your hosting provider too?',
    ],
    cta: {
      label: 'Do the green check!',
      href: 'https://www.thegreenwebfoundation.org/',
    },
    imagePosition: 'left',
  },
  {
    imageKey: 'support',
    imageAlt: 'Support illustration with headphones',
    title: 'Praised for our proactive support',
    body: [
      'When you have a problem, you want to be helped immediately and when you have a question, you just want a quick answer. Preferably from someone who immediately understands what you are up against and already has the solution in his pocket.',
      'With our team of support engineers, Magento developers and solution architects, we have everything we need to meet this requirement. In fact, 86% of our customers have rated our support as excellent.',
    ],
    cta: {
      label: 'Discover our support',
      href: 'https://www.hypernode.com/en/support/',
    },
    imagePosition: 'right',
  },
  {
    imageKey: 'worldwideCoverage',
    imageAlt: 'World map illustration showing worldwide coverage',
    title: 'Hypernode provides worldwide coverage',
    body: [
      'Our infrastructure is data centre independent. This ensures that our platform can be connected to any data centre location in a split second, enabling us to provide customers around the world with lightning-fast scalable hosting.',
      'So, want to start your hosting from the UK, Germany or the US? No problem. Get your node booted from anywhere in the world, with just one click.',
    ],
    imagePosition: 'left',
  },
]

export const reliabilityItems: HomepageGridItem[] = [
  {
    imageKey: 'relyOnMagento',
    imageAlt: 'Magento knowledge icon',
    title: 'Rely on Magento knowledge',
    body: 'Our expertise in Magento is the foundation for the bridge we build between Magento hosting and your application.',
    href: 'https://www.hypernode.com/en/magento-hosting/',
  },
  {
    imageKey: 'fasterThanFast',
    imageAlt: 'Performance icon',
    title: 'Faster than fast',
    body: 'We have a continuous drive within our team to keep on discovering additional fractions of speed. Check our performance features.',
    href: 'https://www.hypernode.com/en/performance-features/',
  },
  {
    imageKey: 'scaleWheneverYouWant',
    imageAlt: 'Scaling icon',
    title: 'Scale whenever you want',
    body: 'Up- or downgrade your hosting plan at any time, and automatically. Use our Control Panel, and make sure you never pay too much.',
    href: 'https://www.hypernode.com/en/features/',
  },
  {
    imageKey: 'developersFavourite',
    imageAlt: 'Developer friendly icon',
    title: "Developers' favourite hosting",
    body: 'We are developers, we breathe development and we think like developers. You see it, feel it and will always notice it.',
    href: 'https://www.hypernode.com/en/developers',
  },
  {
    imageKey: 'offeringAllHostingTypes',
    imageAlt: 'Multiple hosting types icon',
    title: 'Offering all hosting types',
    body: "Choose between cloud-, dedicated-, or cluster hosting. We're always able to offer the right solution for every customer at a fair price.",
    href: 'https://www.hypernode.com/en/plans-and-prices/',
  },
  {
    imageKey: 'agenciesTrustUs',
    imageAlt: 'Agencies trust us icon',
    title: '200+ agencies trust us',
    body: 'With over 200 active partnerships, you can rest assured that our expertise in knowing exactly what to do is unparalleled.',
    href: 'https://www.hypernode.com/en/agencies/',
  },
]

export const platformItems: HomepageGridItem[] = [
  {
    imageKey: 'enterpriseMonitoring',
    imageAlt: 'Enterprise monitoring illustration',
    title: 'Enterprise monitoring',
    body: 'With our excellent monitoring, we resolve issues before they arise. Thanks to auto-healing, we can react proactively and protect uptime.',
  },
  {
    imageKey: 'controlPanel',
    imageAlt: 'Advanced Control Panel screenshot',
    title: 'Advanced Control Panel',
    body: 'Our hosting Control Panel is packed with valuable features, from centralized logging and user management to notifications and flexible scaling options.',
  },
  {
    imageKey: 'serverUpdates',
    imageAlt: 'Server updates illustration',
    title: 'Your server always up to date',
    body: 'We apply patches, perform updates, introduce new features, and roll out high-level security fixes across servers within hours.',
  },
]

export const companyLogos: CompanyLogo[] = [
  {
    image: intersportTwinsportLogo,
    alt: 'Intersport Twinsport logo',
  },
  {
    image: nikkieLogo,
    alt: 'NIKKIE logo',
  },
  {
    image: pmeLogo,
    alt: 'PME Legend logo',
  },
  {
    image: partnerLogo,
    alt: 'Customer logo',
  },
  {
    image: fairphoneLogo,
    alt: 'Fairphone logo',
  },
]

export const testimonials: Testimonial[] = [
  {
    quote: 'Hypernode is very well thought out and the support team is friendly and very capable.',
    author: 'Tjitte Folkertsma',
    role: 'CSO',
    logo: youweLogo,
    logoAlt: 'Youwe logo',
    photo: tjittePhoto,
    photoAlt: 'Tjitte Folkertsma',
  },
  {
    quote: 'Hypernode has been a trusted partner of Hÿva since the beginning.',
    author: 'Willem Wigman',
    role: 'Founder & CEO',
    logo: hyvaLogo,
    logoAlt: 'Hÿva logo',
    photo: willemPhoto,
    photoAlt: 'Willem Wigman',
  },
  {
    quote:
      'Their commitment to the Magento community, along with their expertise and customer-centric approach, make them a top choice for hosting Magento websites.',
    author: 'Rowan Burgess',
    role: 'Founder',
    logo: refinedLogo,
    logoAlt: 'Refined logo',
    photo: rowanPhoto,
    photoAlt: 'Rowan Burgess',
  },
]

export const contactSection = {
  title: 'Would you like to receive more information about our hosting solutions?',
  subtitle: 'Get in contact with one of our experts!',
  submitLabel: 'Submit',
  newsHref: 'https://www.hypernode.com/blog/',
  privacyPolicyHref: 'https://www.hypernode.com/assets/documents/Privacy-Policy-Hypernode.pdf',
} as const

export const moreFeaturesCta = {
  label: "Check out all our platforms' features",
  href: 'https://www.hypernode.com/en/features/',
} as const