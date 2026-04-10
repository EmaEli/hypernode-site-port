export type Currency = 'EUR' | 'GBP'

export type Environment = 'production' | 'development'

export type BillingPeriod = 'monthly' | 'daily' | 'yearly'

export type PricingGroup = 'cloud' | 'dedicated'

export type FeatureGroupId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'

export type PlanLabel = 'most popular' | 'Near zero downtime scaling'

export type ProviderId = 'combell' | 'aws' | 'standard' | 'enterprise'

export interface PriceByCurrency {
  EUR: number
  GBP: number
}

export interface Plan {
  id: string
  name: string
  environment: Environment
  cpu: number
  ramGb: number
  ssdGb: number
  monthlyPrice: PriceByCurrency
  yearlyPrice?: PriceByCurrency
  orderUrl: string
  featureGroup: FeatureGroupId
  label?: PlanLabel
}

export interface PricingProvider {
  id: ProviderId
  group: PricingGroup
  title: string
  billingOptions: BillingPeriod[]
  plans: Plan[]
}

export interface PricingDataset {
  featureGroups: Record<FeatureGroupId, string[]>
  providers: PricingProvider[]
}

export interface PricingFaqItem {
  question: string
  answer: string
}
