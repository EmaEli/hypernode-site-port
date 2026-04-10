import { useEffect, useMemo, useState } from 'react'

import { formatPrice, getPrice } from '../../lib/pricing'

import type {
  BillingPeriod,
  Currency,
  Environment,
  Plan,
  PlanLabel,
  PricingDataset,
  PricingGroup,
  PricingProvider,
  ProviderId,
} from '../../types/pricing'

export interface PricingTableProps {
  dataset: PricingDataset
  cloudTitle: string
  cloudDescription: string
  cloudHighlight: string
  dedicatedTitle: string
  dedicatedDescription: string
}

const PRICING_ENVIRONMENT_EVENT = 'pricing:environment-change'

const TABLE_COLUMNS = ['Name', 'CPUs', 'SSD storage', 'RAM']

const CURRENCY_OPTIONS: Currency[] = ['EUR', 'GBP']

const CLOUD_BILLING_OPTIONS: BillingPeriod[] = ['monthly', 'daily']

const DEDICATED_BILLING_OPTIONS: BillingPeriod[] = ['monthly', 'yearly']

const BUY_LINK_CLASS =
  'inline-flex items-center justify-center text-brand-blue-dark transition-colors duration-300 hover:text-brand-orange focus:outline-2 focus:outline-offset-2 focus:outline-brand-orange'

const MOBILE_BUY_LINK_CLASS =
  'mt-auto inline-flex self-end items-center justify-center text-brand-blue-dark no-underline transition-colors duration-300 hover:text-brand-orange focus:outline-2 focus:outline-offset-2 focus:outline-brand-orange'

const HEADER_CELL_CLASS = 'px-4 py-1.5 text-left text-xs font-bold uppercase tracking-[0.18em] text-brand-blue-dark/70'

const CELL_CLASS = 'px-4 py-2 align-top text-sm leading-5 text-brand-blue'

const CENTERED_CELL_CLASS = 'px-2 py-2 align-middle text-center text-sm leading-5 text-brand-blue'

const MOBILE_SPEC_TERM_CLASS =
  'text-ui-metric font-bold text-brand-blue-dark/55'

const MOBILE_SPEC_VALUE_CLASS = 'text-base font-bold text-brand-blue-dark'

const getBillingOptions = (group: PricingGroup) =>
  group === 'cloud' ? CLOUD_BILLING_OPTIONS : DEDICATED_BILLING_OPTIONS

const getLabelClassName = (label: PlanLabel) => {
  if (label === 'most popular') {
    return 'inline-flex rounded-[5px] bg-brand-orange px-1.5 py-0 text-ui-xs font-bold uppercase tracking-[0.12em] text-white'
  }

  return 'inline-flex rounded-[5px] border border-brand-green bg-white px-1.5 py-0 text-ui-xs font-bold text-brand-green'
}

const normalizeEnvironment = (event: Event): Environment => {
  if (!(event instanceof CustomEvent)) {
    return 'production'
  }

  const nextEnvironment = event.detail?.environment

  return nextEnvironment === 'development' ? 'development' : 'production'
}

const PriceToggle = ({
  activeValue,
  options,
  onChange,
  disabled = false,
  orientation = 'horizontal',
}: {
  activeValue: BillingPeriod | Currency
  options: Array<BillingPeriod | Currency>
  onChange: (value: BillingPeriod | Currency) => void
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
}) => {
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
            className={`inline-flex items-center gap-2 text-ui-xs font-bold uppercase tracking-[0.18em] focus:outline-2 focus:outline-offset-2 focus:outline-brand-orange ${
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

const BuyIcon = ({ className = 'h-7 w-7' }: { className?: string }) => {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden="true">
      <path d="M12 2.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19Zm0 1.5a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm-1.5 4.2 6 3.8-6 3.8V8.2Z" />
    </svg>
  )
}

const formatBillingLabel = (billingPeriod: BillingPeriod) => {
  if (billingPeriod === 'daily') {
    return 'Daily'
  }

  if (billingPeriod === 'yearly') {
    return 'Yearly'
  }

  return 'Monthly'
}

const PricingTable = ({
  dataset,
  cloudTitle,
  cloudDescription,
  cloudHighlight,
  dedicatedTitle,
  dedicatedDescription,
}: PricingTableProps) => {
  const [environment, setEnvironment] = useState<Environment>('production')
  const [currency, setCurrency] = useState<Currency>('EUR')
  const [cloudBilling, setCloudBilling] = useState<BillingPeriod>('monthly')
  const [dedicatedBilling, setDedicatedBilling] = useState<BillingPeriod>('monthly')
  const [activeModalPlan, setActiveModalPlan] = useState<Plan | null>(null)

  useEffect(() => {
    const handleEnvironmentChange = (event: Event) => {
      setEnvironment(normalizeEnvironment(event))
    }

    window.addEventListener(PRICING_ENVIRONMENT_EVENT, handleEnvironmentChange)

    return () => {
      window.removeEventListener(PRICING_ENVIRONMENT_EVENT, handleEnvironmentChange)
    }
  }, [])

  useEffect(() => {
    if (currency === 'GBP') {
      setCloudBilling('monthly')
      setDedicatedBilling('monthly')
    }
  }, [currency])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveModalPlan(null)
      }
    }

    if (activeModalPlan) {
      document.documentElement.style.overflow = 'hidden'
      window.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [activeModalPlan])

  const providersById = useMemo(() => {
    return dataset.providers.reduce<Record<ProviderId, PricingProvider>>((providers, provider) => {
      providers[provider.id] = provider
      return providers
    }, {} as Record<ProviderId, PricingProvider>)
  }, [dataset.providers])

  const cloudProviders = [providersById.combell, providersById.aws]
  const dedicatedProviders = [providersById.standard, providersById.enterprise]

  const getVisiblePlans = (provider: PricingProvider) => {
    return provider.plans.filter(plan => plan.environment === environment)
  }

  const renderSectionHeader = (
    id: string,
    title: string,
    description: string,
    highlight?: string,
  ) => {
    return (
      <header id={id} className="scroll-mt-32">
        <h2>{title}</h2>
        <p className="mt-5 max-w-4xl text-base leading-8 text-brand-blue">{description}</p>
        {highlight && (
          <p className="mt-4 max-w-4xl text-base font-bold leading-8 text-brand-blue-dark">
            {highlight}
          </p>
        )}
      </header>
    )
  }

  const renderPlanTable = (provider: PricingProvider) => {
    const billingPeriod = provider.group === 'cloud' ? cloudBilling : dedicatedBilling
    const plans = getVisiblePlans(provider)
    const isEmpty = plans.length === 0

    const renderProviderControls = () => {
      return (
        <div className="rounded-card bg-slate-50 px-4 py-3 shadow-soft">
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <div>
              <span className="sr-only">Currency</span>
              <PriceToggle
                activeValue={currency}
                options={CURRENCY_OPTIONS}
                onChange={value => setCurrency(value as Currency)}
                orientation="vertical"
              />
            </div>
            <div>
              <span className="sr-only">Billing period</span>
              <PriceToggle
                activeValue={billingPeriod}
                options={getBillingOptions(provider.group)}
                disabled={currency === 'GBP'}
                onChange={value => {
                  if (provider.group === 'cloud') {
                    setCloudBilling(value as BillingPeriod)
                    return
                  }

                  setDedicatedBilling(value as BillingPeriod)
                }}
              />
            </div>
          </div>
        </div>
      )
    }

    const renderPlanCard = (plan: Plan) => {
      const price = getPrice(plan, environment, currency, billingPeriod)

      return (
        <article key={plan.id} className="flex h-full flex-col rounded-panel border border-slate-200 bg-white p-4 shadow-soft">
          <div className="-mx-4 -mt-4 rounded-t-panel bg-sky-50/70 px-4 py-4">
            <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h4 className="text-xl font-bold leading-7 text-brand-blue-dark">{plan.name}</h4>
              <button
                type="button"
                className="mt-0.5 w-fit text-ui-sm font-bold text-brand-orange underline-offset-4 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-brand-orange"
                onClick={() => setActiveModalPlan(plan)}
              >
                features
              </button>
              {plan.label && <div className="mt-1.5"><span className={getLabelClassName(plan.label)}>{plan.label}</span></div>}
            </div>

            <div className="shrink-0 text-right">
              <p className="text-2xl font-bold leading-none text-brand-blue-dark">
                {price === null ? '-' : `${currency === 'EUR' ? '€' : '£'} ${formatPrice(price)}`}
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

    return (
      <section key={provider.id} className="rounded-shell border border-slate-200 bg-white p-4 shadow-soft md:p-6">
        <div>
          <h3 className="text-[22px] font-bold leading-7 text-brand-blue-dark">{provider.title}</h3>
          <p className="mt-2 text-sm leading-6 text-brand-blue-dark/70">
            {environment === 'development' ? 'Development pricing' : 'Production pricing'}
          </p>
        </div>

        <div className="mt-5 lg:hidden">{renderProviderControls()}</div>

        <div className="mt-5 space-y-4 lg:hidden">
          {!isEmpty && plans.map(plan => renderPlanCard(plan))}
        </div>

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
                  {renderProviderControls()}
                </th>
                <th scope="col" className={HEADER_CELL_CLASS}>
                  Buy
                </th>
              </tr>
            </thead>
            <tbody>
              {!isEmpty &&
                plans.map(plan => {
                  const price = getPrice(plan, environment, currency, billingPeriod)

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
                            className="w-fit text-ui-sm font-bold text-brand-orange underline-offset-4 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-brand-orange"
                            onClick={() => setActiveModalPlan(plan)}
                          >
                            features
                          </button>
                        </div>
                      </td>
                      <td className={CENTERED_CELL_CLASS}>{plan.cpu}</td>
                      <td className={CENTERED_CELL_CLASS}>{plan.ssdGb} GB</td>
                      <td className={CENTERED_CELL_CLASS}>{plan.ramGb} GB</td>
                      <td className={`${CENTERED_CELL_CLASS} whitespace-nowrap text-base font-bold text-brand-blue-dark`}>
                        {price === null ? '-' : `${currency === 'EUR' ? '€' : '£'} ${formatPrice(price)}`}
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
      </section>
    )
  }

  return (
    <div className="space-y-12">
      <section className="space-y-8">
        {renderSectionHeader('cloud-hosting-pricing', cloudTitle, cloudDescription, cloudHighlight)}
        <div className="space-y-6">{cloudProviders.map(provider => renderPlanTable(provider))}</div>
      </section>

      <section className="space-y-8">
        {renderSectionHeader('dedicated-hosting-pricing', dedicatedTitle, dedicatedDescription)}
        <div className="space-y-6">{dedicatedProviders.map(provider => renderPlanTable(provider))}</div>
      </section>

      {activeModalPlan && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-brand-blue-dark/75 px-4 py-8"
          role="presentation"
          onClick={() => setActiveModalPlan(null)}
        >
          <div
            className="w-full max-w-lg rounded-panel bg-white px-5 py-4 shadow-raised md:px-6 md:py-5"
            role="dialog"
            aria-modal="true"
            aria-labelledby="pricing-feature-dialog-title"
            onClick={event => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">

              <h3 id="pricing-feature-dialog-title" className="mt-2 text-[24px] leading-8">
                {activeModalPlan.name}
              </h3>

              <button
                type="button"
                onClick={() => setActiveModalPlan(null)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-brand-blue-dark transition hover:border-brand-orange hover:text-brand-orange focus:outline-2 focus:outline-offset-2 focus:outline-brand-orange"
                aria-label="Close features modal"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                  <path d="m13.06 12 4.72-4.72-1.06-1.06L12 10.94 7.28 6.22 6.22 7.28 10.94 12l-4.72 4.72 1.06 1.06L12 13.06l4.72 4.72 1.06-1.06L13.06 12Z" />
                </svg>
              </button>
            </div>

            <ul className="mt-4 space-y-1.5">
              {dataset.featureGroups[activeModalPlan.featureGroup].map(feature => (
                <li key={feature} className="flex gap-2 text-sm leading-5.5 text-brand-blue">
                  <span className="mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-brand-orange" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default PricingTable
