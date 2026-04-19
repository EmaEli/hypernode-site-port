import { getPrice } from '../../../lib/pricing'

import {
  BUY_LINK_CLASS,
  BuyIcon,
  CELL_CLASS,
  CENTERED_CELL_CLASS,
  HEADER_CELL_CLASS,
  TABLE_COLUMNS,
  formatPlanPrice,
  getLabelClassName,
} from './pricingUtils'
import Button from '../../ui/primitives/Button'
import PricingControls from './PricingControls'

import type { BillingPeriod, Currency, Plan, PricingGroup } from '../../../types/pricing'

export interface PricingDesktopTableProps {
  billingPeriod: BillingPeriod
  currency: Currency
  group: PricingGroup
  onBillingChange: (value: BillingPeriod) => void
  onCurrencyChange: (value: Currency) => void
  onOpenFeatures: (plan: Plan) => void
  plans: Plan[]
}

const PricingDesktopTable = ({
  billingPeriod,
  currency,
  group,
  onBillingChange,
  onCurrencyChange,
  onOpenFeatures,
  plans,
}: PricingDesktopTableProps) => {
  return (
    <div className="mt-5 hidden overflow-x-auto lg:block">
    <table className="min-w-full border-collapse">
      <thead>
        <tr className="border-b border-slate-200">
          {TABLE_COLUMNS.map(column => (
            <th key={column} scope="col" className={HEADER_CELL_CLASS}>
              {column}
            </th>
          ))}
          <th scope="col" className={`${HEADER_CELL_CLASS} min-w-[220px]`}>
            <PricingControls
              billingPeriod={billingPeriod}
              currency={currency}
              group={group}
              onBillingChange={onBillingChange}
              onCurrencyChange={onCurrencyChange}
            />
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
                  <Button variant="link" onClick={() => onOpenFeatures(plan)}>
                    features
                  </Button>
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
    </div>
  )
}

export default PricingDesktopTable