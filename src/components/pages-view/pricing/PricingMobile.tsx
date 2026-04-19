import { getPrice } from '../../../lib/pricing'
import PricingControls from './PricingControls'
import PricingMobileCard from './PricingMobileCard'

import type {
  BillingPeriod,
  Currency,
  Environment,
  Plan,
  PricingProvider,
} from '../../../types/pricing'

export interface PricingMobileProps {
  billingPeriod: BillingPeriod
  currency: Currency
  environment: Environment
  onBillingChange: (value: BillingPeriod) => void
  onCurrencyChange: (value: Currency) => void
  onOpenFeatures: (plan: Plan) => void
  provider: PricingProvider
}

const PricingMobile = ({
  billingPeriod,
  currency,
  environment,
  onBillingChange,
  onCurrencyChange,
  onOpenFeatures,
  provider,
}: PricingMobileProps) => {
  const plans = provider.plans.filter(plan => plan.environment === environment)

  return (
    <div className="lg:hidden">
      <PricingControls
        billingPeriod={billingPeriod}
        currency={currency}
        group={provider.group}
        onBillingChange={onBillingChange}
        onCurrencyChange={onCurrencyChange}
      />

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {plans.map(plan => (
          <PricingMobileCard
            key={plan.id}
            billingPeriod={billingPeriod}
            currency={currency}
            onOpenFeatures={onOpenFeatures}
            plan={plan}
            price={getPrice(plan, environment, currency, billingPeriod)}
          />
        ))}
      </div>
    </div>
  )
}

export default PricingMobile
