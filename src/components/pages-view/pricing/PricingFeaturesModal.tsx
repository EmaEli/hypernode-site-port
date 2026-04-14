import { Icon } from '@iconify/react'
import type { Plan, PricingDataset } from '../../../types/pricing'

export interface PricingFeaturesModalProps {
  featureGroups: PricingDataset['featureGroups']
  plan: Plan
  onClose: () => void
}

const PricingFeaturesModal = ({ featureGroups, plan, onClose }: PricingFeaturesModalProps) => {
  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-brand-blue-dark/75 px-4 py-8"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-panel bg-white px-5 py-4 shadow-raised md:px-6 md:py-5"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pricing-feature-dialog-title"
        onClick={event => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <h3 id="pricing-feature-dialog-title"
className="mt-2">
            {plan.name}
          </h3>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-brand-blue-dark transition hover:border-brand-orange hover:text-brand-orange focus:outline-2 focus:outline-offset-2 focus:outline-brand-orange"
            aria-label="Close features modal"
          >
            <Icon icon="heroicons:x-mark-20-solid"
className="h-4 w-4"
aria-hidden="true" />
          </button>
        </div>

        <ul className="mt-4 space-y-1.5">
          {featureGroups[plan.featureGroup].map(feature => (
            <li key={feature}
className="flex gap-2 text-sm leading-5.5 text-brand-blue">
              <span className="mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-brand-orange"
aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PricingFeaturesModal