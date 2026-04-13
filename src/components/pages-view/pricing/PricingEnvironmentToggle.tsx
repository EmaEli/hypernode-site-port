import { useEffect, useState } from 'react'

import SegmentedToggle from '../../ui/primitives/SegmentedToggle'

import type { Environment } from '../../../types/pricing'

export const PRICING_ENVIRONMENT_EVENT = 'pricing:environment-change'

const ENVIRONMENT_OPTIONS = [
  { label: 'Production', value: 'production' },
  { label: 'Development', value: 'development' },
] satisfies Array<{ label: string; value: Environment }>

const PricingEnvironmentToggle = () => {
  const [environment, setEnvironment] = useState<Environment>('production')

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent(PRICING_ENVIRONMENT_EVENT, {
        detail: { environment },
      }),
    )
  }, [environment])

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-blue-dark/65">
        Environment
      </p>
      <div className="mt-3">
        <SegmentedToggle
          options={ENVIRONMENT_OPTIONS}
          value={environment}
          onChange={setEnvironment}
          ariaLabel="Environment"
        />
      </div>
    </div>
  )
}

export default PricingEnvironmentToggle