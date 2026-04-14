import type { ChangelogCategory, ChangelogEntry, StrapiChangelogEntry, StrapiListResponse } from '../types/changelog'

const CHANGELOG_ENDPOINT = '/api/changelog-entries'

const categoryMap: Record<string, Exclude<ChangelogCategory, 'All'>> = {
  api: 'API',
  autoscaling: 'Autoscaling',
  cluster: 'Cluster',
  controlpanel: 'ControlPanel',
  'control panel': 'ControlPanel',
  hypernodedeploy: 'HypernodeDeploy',
  'hypernode deploy': 'HypernodeDeploy',
  magereport: 'MageReport',
  platform: 'Platform',
}

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null
}

const isString = (value: unknown): value is string => typeof value === 'string'

const isNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value)

const normalizeCategory = (value: string): Exclude<ChangelogCategory, 'All'> => {
  const normalizedValue = value.trim().toLowerCase()
  const mappedCategory = categoryMap[normalizedValue]

  if (!mappedCategory) {
    throw new Error(`Unsupported changelog category: ${value}`)
  }

  return mappedCategory
}

const toChangelogEntry = (value: unknown): ChangelogEntry => {
  if (!isRecord(value)) {
    throw new Error('Invalid changelog entry payload')
  }

  const { id, title, slug, date, category, summary, href, version } = value

  if (!isNumber(id) || !isString(title) || !isString(slug) || !isString(date) || !isString(category) || !isString(summary)) {
    throw new Error('Incomplete changelog entry payload')
  }

  return {
    id,
    title,
    slug,
    date,
    category: normalizeCategory(category),
    summary,
    href: isString(href) && href.length > 0 ? href : `/changelog/#${slug}`,
    version: isString(version) ? version : undefined,
  }
}

const parseSeedEntries = async (): Promise<ChangelogEntry[]> => {
  const seedModule = await import('../../strapi/seed.json')
  const seedPayload = seedModule.default

  if (!Array.isArray(seedPayload)) {
    throw new Error('Seed changelog payload must be an array')
  }

  return seedPayload.map(toChangelogEntry).sort((leftEntry, rightEntry) => rightEntry.date.localeCompare(leftEntry.date))
}

const readStrapiEntries = (payload: unknown): ChangelogEntry[] => {
  if (!isRecord(payload) || !Array.isArray(payload.data)) {
    throw new Error('Invalid Strapi changelog response')
  }

  return payload.data
    .map(rawEntry => toChangelogEntry(rawEntry))
    .sort((leftEntry, rightEntry) => rightEntry.date.localeCompare(leftEntry.date))
}

export const getChangelogEntries = async (): Promise<ChangelogEntry[]> => {
  const strapiUrl = import.meta.env.PUBLIC_STRAPI_URL
  const strapiToken = import.meta.env.PUBLIC_STRAPI_TOKEN

  if (!strapiUrl) {
    return parseSeedEntries()
  }

  try {
    const response = await fetch(`${strapiUrl}${CHANGELOG_ENDPOINT}`, {
      headers: {
        ...(strapiToken ? { Authorization: `Bearer ${strapiToken}` } : {}),
      },
    })

    if (!response.ok) {
      throw new Error(`Strapi request failed with status ${response.status}`)
    }

    const payload = (await response.json()) as StrapiListResponse<StrapiChangelogEntry>

    return readStrapiEntries(payload)
  } catch (error) {
    console.warn('Strapi unavailable, falling back to local changelog seed data.', error)

    return parseSeedEntries()
  }
}