import {
  BuyIcon,
  FEATURES_BUTTON_CLASS,
  MOBILE_BUY_LINK_CLASS,
  MOBILE_SPEC_TERM_CLASS,
  MOBILE_SPEC_VALUE_CLASS,
  formatBillingLabel,
  formatPlanPrice,
  getLabelClassName,
} from './pricingUtils'

import type { BillingPeriod, Currency, Plan } from '../../../types/pricing'

interface PlanNameBlockProps {
  plan: Plan
  onOpenFeatures: (plan: Plan) => void
}

const PlanNameBlock = ({ plan, onOpenFeatures }: PlanNameBlockProps) => {
  return (
    <div className="min-w-0">
      <h4>{plan.name}</h4>
      <button type="button" className={`mt-0.5 ${FEATURES_BUTTON_CLASS}`} onClick={() => onOpenFeatures(plan)}>
        features
      </button>
      {plan.label && (
        <div className="mt-1.5">
          <span className={getLabelClassName(plan.label)}>{plan.label}</span>
        </div>
      )}
    </div>
  )
}

export interface PricingMobileCardProps {
  billingPeriod: BillingPeriod
  currency: Currency
  onOpenFeatures: (plan: Plan) => void
  plan: Plan
  price: number | null
}

const PricingMobileCard = ({
  billingPeriod,
  currency,
  onOpenFeatures,
  plan,
  price,
}: PricingMobileCardProps) => {
  return (
    <article className="flex h-full flex-col rounded-panel border border-slate-200 bg-white p-4 shadow-soft">
      <div className="-mx-4 -mt-4 rounded-t-panel bg-sky-50/70 px-4 py-4">
        <div className="flex items-start justify-between gap-4">
          <PlanNameBlock plan={plan} onOpenFeatures={onOpenFeatures} />

          <div className="shrink-0 text-right">
            <p className="text-2xl font-bold leading-none text-brand-blue-dark">
              {formatPlanPrice(price, currency)}
            </p>
            <p className="mt-1 text-ui-xs font-bold uppercase tracking-[0.18em] text-brand-blue-dark/60">
              {formatBillingLabel(billingPeriod)}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200" />

      <div className="mt-4 flex items-end justify-between gap-4">
        <dl className="grid flex-1 grid-cols-[auto_auto] gap-x-5 gap-y-0.5">
          <div className="contents">
            <dt className={MOBILE_SPEC_TERM_CLASS}>CPUs</dt>
            <dd className={MOBILE_SPEC_VALUE_CLASS}>{plan.cpu}</dd>
          </div>
          <div className="contents">
            <dt className={MOBILE_SPEC_TERM_CLASS}>SSD storage</dt>
            <dd className={MOBILE_SPEC_VALUE_CLASS}>{plan.ssdGb} GB</dd>
          </div>
          <div className="contents">
            <dt className={MOBILE_SPEC_TERM_CLASS}>RAM</dt>
            <dd className={MOBILE_SPEC_VALUE_CLASS}>{plan.ramGb} GB</dd>
          </div>
        </dl>
      </div>

      <a href={plan.orderUrl} className={MOBILE_BUY_LINK_CLASS} aria-label={`Buy ${plan.name}`}>
        <BuyIcon className="h-7 w-7" />
      </a>
    </article>
  )
}

export default PricingMobileCard