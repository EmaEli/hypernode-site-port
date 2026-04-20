import { Icon } from '@iconify/react'
import { formatPrice } from '../../../lib/pricing'

import type { Currency, PlanLabel } from '../../../types/pricing'

export const TABLE_COLUMNS = ['Name', 'CPUs', 'SSD storage', 'RAM']

export const BUY_LINK_CLASS =
  'inline-flex items-center justify-center text-brand-blue-dark transition-colors duration-300 hover:text-brand-orange focus-ring'

export const MOBILE_BUY_LINK_CLASS =
  'mt-auto inline-flex self-end items-center justify-center text-brand-blue-dark no-underline transition-colors duration-300 hover:text-brand-orange focus-ring'

export const HEADER_CELL_CLASS =
  'px-4 py-1.5 text-left text-xs font-bold uppercase tracking-[0.18em] text-brand-blue-dark/70'

export const CELL_CLASS = 'px-4 py-2 align-top text-sm leading-5 text-brand-blue'

export const CENTERED_CELL_CLASS =
  'px-2 py-2 align-middle text-center text-sm leading-5 text-brand-blue'


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
  return <Icon icon="heroicons:play-circle-20-solid"
className={className}
aria-hidden="true" />
}