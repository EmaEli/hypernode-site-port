export type ChangelogCategory =
  | 'API'
  | 'Autoscaling'
  | 'Cluster'
  | 'ControlPanel'
  | 'HypernodeDeploy'
  | 'MageReport'
  | 'Platform'
  | 'All'

export const CATEGORY_TABS: { value: ChangelogCategory; label: string }[] = [
  { value: 'All', label: 'All' },
  { value: 'API', label: 'API' },
  { value: 'Autoscaling', label: 'Autoscaling' },
  { value: 'Cluster', label: 'Cluster' },
  { value: 'ControlPanel', label: 'Control panel' },
  { value: 'HypernodeDeploy', label: 'Hypernode Deploy' },
  { value: 'MageReport', label: 'MageReport' },
  { value: 'Platform', label: 'Platform' },
]

export const CATEGORY_TO_URL: Partial<Record<ChangelogCategory, string>> = {
  API: 'api', Autoscaling: 'autoscaling', Cluster: 'cluster',
  ControlPanel: 'controlpanel', HypernodeDeploy: 'hypernodedeploy',
  MageReport: 'magereport', Platform: 'platform',
}

export const URL_TO_CATEGORY = Object.fromEntries(
  Object.entries(CATEGORY_TO_URL).map(([cat, slug]) => [slug, cat as ChangelogCategory])
) as Record<string, ChangelogCategory>

export interface ChangelogEntry {
  id: number
  title: string
  slug: string
  date: string
  category: Exclude<ChangelogCategory, 'All'>
  summary: string
  href: string
  version?: string
}

export interface ChangelogFilters {
  category?: Exclude<ChangelogCategory, 'All'>
  year?: number
  search?: string
}

export interface ChangelogPageResult {
  entries: ChangelogEntry[]
  pagination: {
    page: number
    pageSize: number
    total: number
    pageCount: number
  }
}

export interface StrapiChangelogEntry {
  id: number
  documentId?: string
  title: string
  slug: string
  date: string
  category: string
  summary: string
  href?: string
  version?: string
}

export interface StrapiPagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface StrapiListResponse<T> {
  data: T[]
  meta?: {
    pagination?: StrapiPagination
  }
}