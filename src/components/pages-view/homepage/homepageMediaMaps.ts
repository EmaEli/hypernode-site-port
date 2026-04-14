import type { ImageMetadata } from 'astro'
import type { HomepageImageKey } from '../../../types/homepage'

import fairphoneLogo from '../../../assets/images/homepage/company-logos/fairphone.svg'
import intersportTwinsportLogo from '../../../assets/images/homepage/company-logos/intersport-twinsport.png'
import nikkieLogo from '../../../assets/images/homepage/company-logos/nikkie.png'
import partnerLogo from '../../../assets/images/homepage/company-logos/logo.svg'
import pmeLogo from '../../../assets/images/homepage/company-logos/pme.svg'
import agenciesTrustUs from '../../../assets/images/homepage/agencies-trust.svg'
import cloudHosting from '../../../assets/images/homepage/cloud-hosting.svg'
import clusterHosting from '../../../assets/images/homepage/cluster-hosting.svg'
import controlPanel from '../../../assets/images/homepage/control-panel.png'
import dedicatedHosting from '../../../assets/images/homepage/dedicated-hosting.svg'
import developersFavourite from '../../../assets/images/homepage/developers-favourite.svg'
import enterpriseMonitoring from '../../../assets/images/homepage/enterprise-monitoring.svg'
import fasterThanFast from '../../../assets/images/homepage/faster-than-fast.svg'
import greenHosting from '../../../assets/images/homepage/green-hosting.svg'
import hostingSolutions from '../../../assets/images/homepage/hosting-solutions.svg'
import hyvaLogo from '../../../assets/images/homepage/testimonials/hyva-logo.png'
import hypernodeInsights from '../../../assets/images/homepage/hypernode-insights.webp'
import offeringAllHostingTypes from '../../../assets/images/homepage/offering-all-hosting-types.svg'
import refinedLogo from '../../../assets/images/homepage/testimonials/refined-logo.png'
import relyOnMagento from '../../../assets/images/homepage/rely-on-magento.svg'
import rowanPhoto from '../../../assets/images/homepage/testimonials/rowan.jpg'
import scaleWheneverYouWant from '../../../assets/images/homepage/scale-whenever-you-want.svg'
import serverUpdates from '../../../assets/images/homepage/server-updates.svg'
import support from '../../../assets/images/homepage/support.svg'
import tjittePhoto from '../../../assets/images/homepage/testimonials/tjitte.jpg'
import willemPhoto from '../../../assets/images/homepage/testimonials/willem.jpg'
import worldwideCoverage from '../../../assets/images/homepage/worldwide-coverage.svg'
import youweLogo from '../../../assets/images/homepage/testimonials/youwe.svg'

export const HOMEPAGE_IMAGE_BY_KEY: Record<HomepageImageKey, ImageMetadata> = {
  agenciesTrustUs,
  cloudHosting,
  clusterHosting,
  controlPanel,
  dedicatedHosting,
  developersFavourite,
  enterpriseMonitoring,
  fasterThanFast,
  greenHosting,
  hostingSolutions,
  hypernodeInsights,
  offeringAllHostingTypes,
  relyOnMagento,
  scaleWheneverYouWant,
  serverUpdates,
  support,
  worldwideCoverage,
}

export const HOMEPAGE_COMPANY_LOGO_BY_KEY = {
  fairphone: fairphoneLogo,
  intersportTwinsport: intersportTwinsportLogo,
  nikkie: nikkieLogo,
  partner: partnerLogo,
  pme: pmeLogo,
} as const

export const HOMEPAGE_TESTIMONIAL_ASSETS = {
  logos: {
    hyva: hyvaLogo,
    refined: refinedLogo,
    youwe: youweLogo,
  },
  photos: {
    rowan: rowanPhoto,
    tjitte: tjittePhoto,
    willem: willemPhoto,
  },
} as const
