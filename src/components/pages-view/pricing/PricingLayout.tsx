import { useMemo } from 'react'

import pricingContent from '../../../lib/pricing-content.json'
import SectionAnchorIntro from '../../ui/blocks/SectionAnchorIntro'
import VerticalFlex from '../../ui/primitives/VerticalFlex'
import PricingProviderPanel from './PricingProviderPanel'

import type {
  BillingPeriod,
  Currency,
  Environment,
  Plan,
  PricingDataset,
  PricingGroup,
  PricingProvider,
  ProviderId,
} from '../../../types/pricing'

export interface PricingLayoutProps {
  dataset: PricingDataset
  environment: Environment
  currency: Currency
  cloudBilling: BillingPeriod
  dedicatedBilling: BillingPeriod
  onCurrencyChange: (value: Currency) => void
  onBillingChange: (group: PricingGroup, value: BillingPeriod) => void
  onOpenFeatures: (plan: Plan) => void
}

const PricingLayout = ({
  dataset,
  environment,
  currency,
  cloudBilling,
  dedicatedBilling,
  onCurrencyChange,
  onBillingChange,
  onOpenFeatures,
}: PricingLayoutProps) => {
  const { cloudSection, dedicatedSection } = pricingContent
  const providersById = useMemo(() => {
    return dataset.providers.reduce<Record<ProviderId, PricingProvider>>((providers, provider) => {
      providers[provider.id] = provider
      return providers
    }, {} as Record<ProviderId, PricingProvider>)
  }, [dataset.providers])

  const cloudProviders = [providersById.combell, providersById.aws]
  const dedicatedProviders = [providersById.standard, providersById.enterprise]

  return (
    <VerticalFlex gap="12">
      <VerticalFlex as="section" gap="8">
        <SectionAnchorIntro
          id="cloud-hosting-pricing"
          title={cloudSection.title}
          description={cloudSection.description}
          highlight={cloudSection.highlight}
        />

        <VerticalFlex gap="6">
          {cloudProviders.map(provider => (
            <PricingProviderPanel
              key={provider.id}
              billingPeriod={cloudBilling}
              currency={currency}
              environment={environment}
              onBillingChange={value => onBillingChange(provider.group, value)}
              onCurrencyChange={onCurrencyChange}
              onOpenFeatures={onOpenFeatures}
              provider={provider}
            />
          ))}
        </VerticalFlex>
      </VerticalFlex>

      <VerticalFlex as="section" gap="8">
        <SectionAnchorIntro
          id="dedicated-hosting-pricing"
          title={dedicatedSection.title}
          description={dedicatedSection.description}
        />

        <VerticalFlex gap="6">
          {dedicatedProviders.map(provider => (
            <PricingProviderPanel
              key={provider.id}
              billingPeriod={dedicatedBilling}
              currency={currency}
              environment={environment}
              onBillingChange={value => onBillingChange(provider.group, value)}
              onCurrencyChange={onCurrencyChange}
              onOpenFeatures={onOpenFeatures}
              provider={provider}
            />
          ))}
        </VerticalFlex>
      </VerticalFlex>
    </VerticalFlex>
  )
}

export default PricingLayout
