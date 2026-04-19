import { useEffect, useState } from 'react'

import ErrorBoundary from '../../ui/primitives/ErrorBoundary'
import ErrorMessage from '../../ui/primitives/ErrorMessage'
import PricingFeaturesModal from './PricingFeaturesModal'
import PricingSidebar from './PricingSidebar'
import PricingLayout from './PricingLayout'

import type {
  BillingPeriod,
  Currency,
  Environment,
  Plan,
  PricingDataset,
  PricingGroup,
} from '../../../types/pricing'

export interface PricingInteractiveSectionProps {
  dataset: PricingDataset
  sidebarImageSrc: string
}

const PricingSection = ({
  dataset,
  sidebarImageSrc,
}: PricingInteractiveSectionProps) => {
  const [environment, setEnvironment] = useState<Environment>('production')
  const [currency, setCurrency] = useState<Currency>('EUR')
  const [cloudBilling, setCloudBilling] = useState<BillingPeriod>('monthly')
  const [dedicatedBilling, setDedicatedBilling] = useState<BillingPeriod>('monthly')
  const [activeModalPlan, setActiveModalPlan] = useState<Plan | null>(null)

  useEffect(() => {
    if (currency === 'GBP') {
      setCloudBilling('monthly')
      setDedicatedBilling('monthly')
    }
  }, [currency])

  const handleBillingChange = (group: PricingGroup, value: BillingPeriod) => {
    if (group === 'cloud') {
      setCloudBilling(value)
    } else {
      setDedicatedBilling(value)
    }
  }

  return (
    <>
      <section className="mx-auto grid max-w-content gap-10 px-4 pb-16 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-12 lg:pb-24">
        <PricingSidebar
          imageSrc={sidebarImageSrc}
          environment={environment}
          onEnvironmentChange={setEnvironment}
        />

        <PricingLayout
          dataset={dataset}
          environment={environment}
          currency={currency}
          cloudBilling={cloudBilling}
          dedicatedBilling={dedicatedBilling}
          onCurrencyChange={setCurrency}
          onBillingChange={handleBillingChange}
          onOpenFeatures={setActiveModalPlan}
        />
      </section>

      {activeModalPlan && (
        <PricingFeaturesModal
          featureGroups={dataset.featureGroups}
          plan={activeModalPlan}
          onClose={() => setActiveModalPlan(null)}
        />
      )}
    </>
  )
}

const PricingInteractiveSectionWithBoundary = (props: PricingInteractiveSectionProps) => (
  <ErrorBoundary
    fallback={
      <ErrorMessage message="The pricing table could not be loaded. Please refresh the page." />
    }
  >
    <PricingSection {...props} />
  </ErrorBoundary>
)

export default PricingInteractiveSectionWithBoundary
