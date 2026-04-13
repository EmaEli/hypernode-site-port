import type { ReactNode } from 'react'

import { getPrice } from '../../../lib/pricing'

import {
  BUY_LINK_CLASS,
  BuyIcon,
  FEATURES_BUTTON_CLASS,
  CELL_CLASS,
  CENTERED_CELL_CLASS,
  HEADER_CELL_CLASS,
  TABLE_COLUMNS,
  formatPlanPrice,
  getLabelClassName,
} from './pricingUtils'

import type { BillingPeriod, Currency, Plan } from '../../../types/pricing'

export interface PricingDesktopTableProps {
  billingPeriod: BillingPeriod
  currency: Currency
  onOpenFeatures: (plan: Plan) => void
  plans: Plan[]
  priceHeader: ReactNode
}

const PricingDesktopTable = ({
  billingPeriod,
  currency,
  onOpenFeatures,
  plans,
  priceHeader,
}: PricingDesktopTableProps) => {
  return (
    <table className="min-w-full border-collapse">
      <thead>
        <tr className="border-b border-slate-200">
          {TABLE_COLUMNS.map(column => (
            <th key={column} scope="col" className={HEADER_CELL_CLASS}>
              {column}
            </th>
          ))}
          <th scope="col" className={`${HEADER_CELL_CLASS} min-w-[220px]`}>
            {priceHeader}
          </th>
          <th scope="col" className={HEADER_CELL_CLASS}>
            Buy
          </th>
        </tr>
      </thead>
      <tbody>
        {plans.map(plan => {
          const price = getPrice(plan, plan.environment, currency, billingPeriod)

          return (
            <tr key={plan.id} className="border-b border-slate-200 last:border-b-0">
              <td className={`${CELL_CLASS} min-w-[300px]`}>
                <div className="flex flex-col">
                  <div className="flex min-h-6 items-center gap-2">
                    <span className="text-base font-bold text-brand-blue-dark">{plan.name}</span>
                    {plan.label && (
                      <div className="flex flex-1 items-center justify-center self-stretch">
                        <span className={getLabelClassName(plan.label)}>{plan.label}</span>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    className={FEATURES_BUTTON_CLASS}
                    onClick={() => onOpenFeatures(plan)}
                  >
                    features
                  </button>
                </div>
              </td>
              <td className={CENTERED_CELL_CLASS}>{plan.cpu}</td>
              <td className={CENTERED_CELL_CLASS}>{plan.ssdGb} GB</td>
              <td className={CENTERED_CELL_CLASS}>{plan.ramGb} GB</td>
              <td className={`${CENTERED_CELL_CLASS} whitespace-nowrap text-base font-bold text-brand-blue-dark`}>
                {formatPlanPrice(price, currency)}
              </td>
              <td className={CENTERED_CELL_CLASS}>
                <a href={plan.orderUrl} className={BUY_LINK_CLASS} aria-label={`Buy ${plan.name}`}>
                  <BuyIcon />
                </a>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default PricingDesktopTable