import RoundedCard from '../../ui/primitives/RoundedCard'
import PricingDesktopTable from './PricingDesktopTable'
import PricingMobile from './PricingMobile'

import type {
  BillingPeriod,
  Currency,
  Environment,
  Plan,
  PricingProvider,
} from '../../../types/pricing'

export interface PricingProviderPanelProps {
  billingPeriod: BillingPeriod
  currency: Currency
  environment: Environment
  onBillingChange: (value: BillingPeriod) => void
  onCurrencyChange: (value: Currency) => void
  onOpenFeatures: (plan: Plan) => void
  provider: PricingProvider
}

const PricingProviderPanel = ({
  billingPeriod,
  currency,
  environment,
  onBillingChange,
  onCurrencyChange,
  onOpenFeatures,
  provider,
}: PricingProviderPanelProps) => {
  const plans = provider.plans.filter(plan => plan.environment === environment)

  return (
    <RoundedCard as="section" padding="md">
      <div>
        <h3 className="text-brand-blue-dark">{provider.title}</h3>

        <p className="text-brand-blue-dark/70">
          {environment === 'development' ? 'Development pricing' : 'Production pricing'}
        </p>
      </div>

      <PricingMobile
        billingPeriod={billingPeriod}
        currency={currency}
        environment={environment}
        onBillingChange={onBillingChange}
        onCurrencyChange={onCurrencyChange}
        onOpenFeatures={onOpenFeatures}
        provider={provider}
      />

      <PricingDesktopTable
        billingPeriod={billingPeriod}
        currency={currency}
        group={provider.group}
        onBillingChange={onBillingChange}
        onCurrencyChange={onCurrencyChange}
        onOpenFeatures={onOpenFeatures}
        plans={plans}
      />
    </RoundedCard>
  )
}

export default PricingProviderPanel
