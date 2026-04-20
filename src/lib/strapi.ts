import type { ChangelogCategory, ChangelogEntry, ChangelogFilters, ChangelogPageResult, StrapiListResponse } from '../types/changelog'
import { URL_TO_CATEGORY } from '../types/changelog'

const CHANGELOG_ENDPOINT = '/api/changelog-entries'

export const PAGE_SIZE = 10

// Strapi può inviare categorie con spazi (es. "control panel") non presenti come slug
const CATEGORY_ALIASES: Record<string, string> = {
  'control panel': 'controlpanel',
  'hypernode deploy': 'hypernodedeploy',
}

const normalizeCategory = (raw: string): Exclude<ChangelogCategory, 'All'> => {
  const key = raw.trim().toLowerCase()
  const category = URL_TO_CATEGORY[CATEGORY_ALIASES[key] ?? key]
  if (!category) throw new Error(`Unsupported changelog category: ${raw}`)
  return category as Exclude<ChangelogCategory, 'All'>
}

const toEntry = (raw: unknown): ChangelogEntry => {
  if (typeof raw !== 'object' || raw === null) throw new Error('Invalid changelog entry')
  const { id, title, slug, date, category, summary, href, version } = raw as Record<string, unknown>
  if (
    typeof id !== 'number' || !Number.isFinite(id) ||
    typeof title !== 'string' ||
    typeof slug !== 'string' ||
    typeof date !== 'string' ||
    typeof category !== 'string' ||
    typeof summary !== 'string'
  ) {
    throw new Error('Incomplete changelog entry')
  }
  return {
    id, title, slug, date, summary,
    category: normalizeCategory(category),
    href: typeof href === 'string' && href.length > 0 ? href : `/changelog/#${slug}`,
    version: typeof version === 'string' ? version : undefined,
  }
}

const parseResponse = (payload: unknown): { entries: ChangelogEntry[]; meta: StrapiListResponse<unknown>['meta'] } => {
  if (typeof payload !== 'object' || payload === null || !Array.isArray((payload as StrapiListResponse<unknown>).data)) {
    throw new Error('Invalid Strapi changelog response')
  }
  const { data, meta } = payload as StrapiListResponse<unknown>
  return { entries: data.map(toEntry), meta }
}

const buildHeaders = (token: string | undefined): HeadersInit =>
  token ? { Authorization: `Bearer ${token}` } : {}

const buildParams = (page: number, filters?: ChangelogFilters): URLSearchParams => {
  const params = new URLSearchParams({
    'pagination[page]': String(page),
    'pagination[pageSize]': String(PAGE_SIZE),
    sort: 'date:desc',
  })
  if (filters?.category) params.set('filters[category][$eq]', filters.category)
  if (filters?.year) {
    params.set('filters[date][$gte]', `${filters.year}-01-01`)
    params.set('filters[date][$lte]', `${filters.year}-12-31`)
  }
  if (filters?.search) {
    params.set('filters[$or][0][title][$containsi]', filters.search)
    params.set('filters[$or][1][summary][$containsi]', filters.search)
  }
  return params
}

const fetchStrapi = async (params: URLSearchParams, signal?: AbortSignal) => {
  const strapiUrl = import.meta.env.PUBLIC_STRAPI_URL
  const strapiToken = import.meta.env.PUBLIC_STRAPI_TOKEN
  const response = await fetch(`${strapiUrl}${CHANGELOG_ENDPOINT}?${params}`, {
    headers: buildHeaders(strapiToken),
    signal,
  })
  if (!response.ok) throw new Error(`Strapi request failed with status ${response.status}`)
  return parseResponse(await response.json())
}

const parseSeedEntries = async (): Promise<ChangelogEntry[]> => {
  const { default: seedPayload } = await import('../../strapi/seed.json')
  if (!Array.isArray(seedPayload)) throw new Error('Seed changelog payload must be an array')
  return seedPayload.map(toEntry).sort((a, b) => b.date.localeCompare(a.date))
}

// — Build-time: used by Astro to fetch the first page at build time —
export const getInitialChangelogData = async (): Promise<{ entries: ChangelogEntry[]; total: number }> => {
  if (!import.meta.env.PUBLIC_STRAPI_URL) {
    const entries = await parseSeedEntries()
    return { entries, total: entries.length }
  }
  try {
    const { entries, meta } = await fetchStrapi(buildParams(1))
    return { entries, total: meta?.pagination?.total ?? entries.length }
  } catch (error) {
    console.warn('Strapi unavailable, falling back to local changelog seed data.', error)
    const entries = await parseSeedEntries()
    return { entries, total: entries.length }
  }
}

// — Runtime: called from the browser on every filter/page change —
export const fetchChangelogPage = async (
  filters: ChangelogFilters,
  page: number,
  signal?: AbortSignal,
): Promise<ChangelogPageResult> => {
  if (!import.meta.env.PUBLIC_STRAPI_URL) {
    throw new Error('No Strapi URL configured — cannot fetch changelog page')
  }
  const { entries, meta } = await fetchStrapi(buildParams(page, filters), signal)
  return {
    entries,
    pagination: meta?.pagination ?? { page, pageSize: PAGE_SIZE, total: entries.length, pageCount: 1 },
  }
}
