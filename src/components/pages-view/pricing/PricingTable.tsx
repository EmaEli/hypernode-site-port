import { useEffect, useMemo, useState } from 'react'

import PricingFeaturesModal from './PricingFeaturesModal'
import PricingProviderSection from './PricingProviderSection'
import PricingSectionHeader from './PricingSectionHeader'
import { PRICING_ENVIRONMENT_EVENT } from './PricingEnvironmentToggle'

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

export interface PricingTableProps {
  dataset: PricingDataset
  cloudTitle: string
  cloudDescription: string
  cloudHighlight: string
  dedicatedTitle: string
  dedicatedDescription: string
}

const normalizeEnvironment = (event: Event): Environment => {
  if (!(event instanceof CustomEvent)) {
    return 'production'
  }

  const nextEnvironment = event.detail?.environment

  return nextEnvironment === 'development' ? 'development' : 'production'
}

const PricingTable = ({
  dataset,
  cloudTitle,
  cloudDescription,
  cloudHighlight,
  dedicatedTitle,
  dedicatedDescription,
}: PricingTableProps) => {
  const [environment, setEnvironment] = useState<Environment>('production')
  const [currency, setCurrency] = useState<Currency>('EUR')
  const [cloudBilling, setCloudBilling] = useState<BillingPeriod>('monthly')
  const [dedicatedBilling, setDedicatedBilling] = useState<BillingPeriod>('monthly')
  const [activeModalPlan, setActiveModalPlan] = useState<Plan | null>(null)

  useEffect(() => {
    const handleEnvironmentChange = (event: Event) => {
      setEnvironment(normalizeEnvironment(event))
    }

    window.addEventListener(PRICING_ENVIRONMENT_EVENT, handleEnvironmentChange)

    return () => {
      window.removeEventListener(PRICING_ENVIRONMENT_EVENT, handleEnvironmentChange)
    }
  }, [])

  useEffect(() => {
    if (currency === 'GBP') {
      setCloudBilling('monthly')
      setDedicatedBilling('monthly')
    }
  }, [currency])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveModalPlan(null)
      }
    }

    if (activeModalPlan) {
      document.documentElement.style.overflow = 'hidden'
      window.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [activeModalPlan])

  const providersById = useMemo(() => {
    return dataset.providers.reduce<Record<ProviderId, PricingProvider>>((providers, provider) => {
      providers[provider.id] = provider
      return providers
    }, {} as Record<ProviderId, PricingProvider>)
  }, [dataset.providers])

  const cloudProviders = [providersById.combell, providersById.aws]
  const dedicatedProviders = [providersById.standard, providersById.enterprise]

  const handleBillingChange = (group: PricingGroup, value: BillingPeriod) => {
    if (group === 'cloud') {
      setCloudBilling(value)
      return
    }

    setDedicatedBilling(value)
  }

  return (
    <div className="space-y-12">
      <section className="space-y-8">
        <PricingSectionHeader
          id="cloud-hosting-pricing"
          title={cloudTitle}
          description={cloudDescription}
          highlight={cloudHighlight}
        />
        <div className="space-y-6">
          {cloudProviders.map(provider => (
            <PricingProviderSection
              key={provider.id}
              billingPeriod={cloudBilling}
              currency={currency}
              environment={environment}
              onBillingChange={value => handleBillingChange(provider.group, value)}
              onCurrencyChange={setCurrency}
              onOpenFeatures={setActiveModalPlan}
              provider={provider}
            />
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <PricingSectionHeader
          id="dedicated-hosting-pricing"
          title={dedicatedTitle}
          description={dedicatedDescription}
        />
        <div className="space-y-6">
          {dedicatedProviders.map(provider => (
            <PricingProviderSection
              key={provider.id}
              billingPeriod={dedicatedBilling}
              currency={currency}
              environment={environment}
              onBillingChange={value => handleBillingChange(provider.group, value)}
              onCurrencyChange={setCurrency}
              onOpenFeatures={setActiveModalPlan}
              provider={provider}
            />
          ))}
        </div>
      </section>

      {activeModalPlan && (
        <PricingFeaturesModal
          featureGroups={dataset.featureGroups}
          plan={activeModalPlan}
          onClose={() => setActiveModalPlan(null)}
        />
      )}
    </div>
  )
}

export default PricingTable