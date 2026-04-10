import type { BillingPeriod, Currency, Environment, Plan } from '../types/pricing'

const DAYS_IN_YEAR = 365
const MONTHS_IN_YEAR = 12

export const getPrice = (
  plan: Plan,
  environment: Environment,
  currency: Currency,
  billingPeriod: BillingPeriod,
): number | null => {
  if (plan.environment !== environment) {
    return null
  }

  if (billingPeriod === 'yearly') {
    return plan.yearlyPrice?.[currency] ?? null
  }

  if (billingPeriod === 'daily') {
    const monthlyPrice = plan.monthlyPrice[currency]

    return Math.round((monthlyPrice * MONTHS_IN_YEAR) / DAYS_IN_YEAR)
  }

  return plan.monthlyPrice[currency]
}

export const formatPrice = (priceInCents: number): string => {
  let formattedPrice = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
  })
    .format(priceInCents / 100)
    .replace(/[,\.]/g, match => (match === ',' ? '.' : ','))

  if (formattedPrice.endsWith(',00')) {
    formattedPrice = formattedPrice.slice(0, -3)
  }

  return formattedPrice
}
