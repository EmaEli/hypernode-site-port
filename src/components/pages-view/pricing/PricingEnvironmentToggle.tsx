import VerticalFlex from '../../ui/primitives/VerticalFlex'

import { ENVIRONMENT_OPTIONS } from '../../../types/pricing'
import type { Environment } from '../../../types/pricing'

const BUTTON_CLASS =
  'rounded-full px-3.5 py-2 text-ui-sm font-bold transition-all focus-ring'

interface PricingEnvironmentToggleProps {
  value: Environment
  onChange: (value: Environment) => void
}

const PricingEnvironmentToggle = ({ value, onChange }: PricingEnvironmentToggleProps) => {
  return (
    <VerticalFlex gap="4">
      <p className="mt-1 text-xs text-center font-bold uppercase tracking-[0.24em] text-brand-blue-dark/65">
        Environment
      </p>

      <div className="rounded-full p-0.5 shadow-inner ring-1 ring-slate-200" role="group" aria-label="Environment">
        {ENVIRONMENT_OPTIONS.map(option => {
          const isActive = option.value === value

          return (
            <button
              key={option.value}
              type="button"
              className={`${BUTTON_CLASS} ${
                isActive
                  ? 'bg-brand-orange text-white shadow-soft'
                  : 'text-brand-blue-dark hover:text-brand-orange'
              }`}
              onClick={() => onChange(option.value)}
              aria-pressed={isActive}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </VerticalFlex>
  )
}

export default PricingEnvironmentToggle
