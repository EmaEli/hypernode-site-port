import { z } from 'zod'

const BILLING_PERIOD = z.enum(['monthly', 'daily', 'yearly'])
const CURRENCY_RECORD = z.object({ EUR: z.number(), GBP: z.number() })
const FEATURE_GROUP_ID = z.enum(['A', 'B', 'C', 'D', 'E', 'F', 'G'])
const PLAN_LABEL = z.enum(['most popular', 'Near zero downtime scaling']).optional()

const PlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  environment: z.enum(['production', 'development']),
  cpu: z.number().positive(),
  ramGb: z.number().positive(),
  ssdGb: z.number().positive(),
  monthlyPrice: CURRENCY_RECORD,
  yearlyPrice: CURRENCY_RECORD.optional(),
  orderUrl: z.string().url(),
  featureGroup: FEATURE_GROUP_ID,
  label: PLAN_LABEL,
})

const PricingProviderSchema = z.object({
  id: z.enum(['combell', 'aws', 'standard', 'enterprise']),
  group: z.enum(['cloud', 'dedicated']),
  title: z.string(),
  billingOptions: z.array(BILLING_PERIOD),
  plans: z.array(PlanSchema),
})

export const PricingDatasetSchema = z.object({
  featureGroups: z.record(FEATURE_GROUP_ID, z.array(z.string())),
  providers: z.array(PricingProviderSchema),
})
