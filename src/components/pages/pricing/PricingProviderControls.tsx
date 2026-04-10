import PricingToggle, { CURRENCY_OPTIONS, getBillingOptions } from './PricingToggle'

import type { BillingPeriod, Currency, PricingGroup } from '../../../types/pricing'

export interface PricingProviderControlsProps {
  billingPeriod: BillingPeriod
  currency: Currency
  group: PricingGroup
  onBillingChange: (value: BillingPeriod) => void
  onCurrencyChange: (value: Currency) => void
}

const PricingProviderControls = ({
  billingPeriod,
  currency,
  group,
  onBillingChange,
  onCurrencyChange,
}: PricingProviderControlsProps) => {
  return (
    <div className="rounded-card bg-slate-50 px-4 py-3 shadow-soft">
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        <div>
          <span className="sr-only">Currency</span>
          <PricingToggle
            activeValue={currency}
            options={CURRENCY_OPTIONS}
            onChange={value => onCurrencyChange(value as Currency)}
            orientation="vertical"
          />
        </div>
        <div>
          <span className="sr-only">Billing period</span>
          <PricingToggle
            activeValue={billingPeriod}
            options={getBillingOptions(group)}
            disabled={currency === 'GBP'}
            onChange={value => onBillingChange(value as BillingPeriod)}
          />
        </div>
      </div>
    </div>
  )
}

export default PricingProviderControls