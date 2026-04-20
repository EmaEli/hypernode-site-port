import { CLOUD_BILLING_OPTIONS, DEDICATED_BILLING_OPTIONS } from '../../../types/pricing'
import type { BillingPeriod, Currency, PricingGroup } from '../../../types/pricing'

export const getBillingOptions = (group: PricingGroup) =>
  group === 'cloud' ? CLOUD_BILLING_OPTIONS : DEDICATED_BILLING_OPTIONS

export interface PricingToggleProps {
  activeValue: BillingPeriod | Currency
  options: Array<BillingPeriod | Currency>
  onChange: (value: BillingPeriod | Currency) => void
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
}

const PricingToggle = ({
  activeValue,
  options,
  onChange,
  disabled = false,
  orientation = 'horizontal',
}: PricingToggleProps) => {
  return (
    <div
      className={
        orientation === 'vertical'
          ? 'flex flex-col items-start gap-2'
          : 'flex flex-row flex-wrap items-center gap-x-3 gap-y-2'
      }
    >
      {options.map(option => {
        const isActive = option === activeValue

        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`inline-flex items-center gap-2 text-ui-xs font-bold uppercase tracking-[0.18em] focus-ring ${
              disabled ? 'cursor-not-allowed text-brand-blue-dark/35' : 'text-brand-blue-dark/75'
            }`}
            aria-pressed={isActive}
            disabled={disabled}
          >
            <span
              className={`inline-block h-3.5 w-3.5 rounded-full border transition-colors ${
                isActive
                  ? 'border-brand-orange bg-brand-orange'
                  : disabled
                    ? 'border-slate-200 bg-slate-100'
                    : 'border-slate-300 bg-white'
              }`}
              aria-hidden="true"
            />
            <span>{option}</span>
          </button>
        )
      })}
    </div>
  )
}

export default PricingToggle