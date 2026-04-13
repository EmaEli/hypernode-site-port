import { getPrice } from '../../../lib/pricing'
import PricingDesktopTable from './PricingDesktopTable'
import PricingMobileCard from './PricingMobileCard'
import PricingProviderControls from './PricingProviderControls'

import type {
  BillingPeriod,
  Currency,
  Environment,
  Plan,
  PricingProvider,
} from '../../../types/pricing'

export interface PricingProviderSectionProps {
  billingPeriod: BillingPeriod
  currency: Currency
  environment: Environment
  onBillingChange: (value: BillingPeriod) => void
  onCurrencyChange: (value: Currency) => void
  onOpenFeatures: (plan: Plan) => void
  provider: PricingProvider
}

const PricingProviderSection = ({
  billingPeriod,
  currency,
  environment,
  onBillingChange,
  onCurrencyChange,
  onOpenFeatures,
  provider,
}: PricingProviderSectionProps) => {
  const plans = provider.plans.filter(plan => plan.environment === environment)

  return (
    <section className="rounded-shell border border-slate-200 bg-white p-4 shadow-soft md:p-6">
      <div>
        <h3 className="text-[22px] font-bold leading-7 text-brand-blue-dark">{provider.title}</h3>
        <p className="mt-2 text-sm leading-6 text-brand-blue-dark/70">
          {environment === 'development' ? 'Development pricing' : 'Production pricing'}
        </p>
      </div>

      <div className="mt-5 lg:hidden">
        <PricingProviderControls
          billingPeriod={billingPeriod}
          currency={currency}
          group={provider.group}
          onBillingChange={onBillingChange}
          onCurrencyChange={onCurrencyChange}
        />
      </div>

      <div className="mt-5 space-y-4 lg:hidden">
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

      <div className="mt-5 hidden overflow-x-auto lg:block">
        <PricingDesktopTable
          billingPeriod={billingPeriod}
          currency={currency}
          onOpenFeatures={onOpenFeatures}
          plans={plans}
          priceHeader={
            <PricingProviderControls
              billingPeriod={billingPeriod}
              currency={currency}
              group={provider.group}
              onBillingChange={onBillingChange}
              onCurrencyChange={onCurrencyChange}
            />
          }
        />
      </div>
    </section>
  )
}

export default PricingProviderSection