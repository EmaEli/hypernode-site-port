import { formatPrice } from '../../../lib/pricing'

import type { Currency, PlanLabel } from '../../../types/pricing'

export const TABLE_COLUMNS = ['Name', 'CPUs', 'SSD storage', 'RAM']

export const BUY_LINK_CLASS =
  'inline-flex items-center justify-center text-brand-blue-dark transition-colors duration-300 hover:text-brand-orange focus:outline-2 focus:outline-offset-2 focus:outline-brand-orange'

export const MOBILE_BUY_LINK_CLASS =
  'mt-auto inline-flex self-end items-center justify-center text-brand-blue-dark no-underline transition-colors duration-300 hover:text-brand-orange focus:outline-2 focus:outline-offset-2 focus:outline-brand-orange'

export const HEADER_CELL_CLASS =
  'px-4 py-1.5 text-left text-xs font-bold uppercase tracking-[0.18em] text-brand-blue-dark/70'

export const CELL_CLASS = 'px-4 py-2 align-top text-sm leading-5 text-brand-blue'

export const CENTERED_CELL_CLASS =
  'px-2 py-2 align-middle text-center text-sm leading-5 text-brand-blue'

export const FEATURES_BUTTON_CLASS =
  'w-fit text-ui-sm font-bold text-brand-orange underline-offset-4 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-brand-orange'

export const MOBILE_SPEC_TERM_CLASS = 'text-ui-metric font-bold text-brand-blue-dark/55'

export const MOBILE_SPEC_VALUE_CLASS = 'text-base font-bold text-brand-blue-dark'

export const getLabelClassName = (label: PlanLabel) => {
  if (label === 'most popular') {
    return 'inline-flex rounded-[5px] bg-brand-orange px-1.5 py-0 text-ui-xs font-bold uppercase tracking-[0.12em] text-white'
  }

  return 'inline-flex rounded-[5px] border border-brand-green bg-white px-1.5 py-0 text-ui-xs font-bold text-brand-green'
}

export const formatBillingLabel = (billingPeriod: 'monthly' | 'daily' | 'yearly') => {
  if (billingPeriod === 'daily') {
    return 'Daily'
  }

  if (billingPeriod === 'yearly') {
    return 'Yearly'
  }

  return 'Monthly'
}

export const formatPlanPrice = (price: number | null, currency: Currency) => {
  if (price === null) {
    return '-'
  }

  return `${currency === 'EUR' ? '€' : '£'} ${formatPrice(price)}`
}

export const BuyIcon = ({ className = 'h-7 w-7' }: { className?: string }) => {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden="true">
      <path d="M12 2.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19Zm0 1.5a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm-1.5 4.2 6 3.8-6 3.8V8.2Z" />
    </svg>
  )
}