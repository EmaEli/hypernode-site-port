export type ChangelogCategory =
  | 'API'
  | 'Autoscaling'
  | 'Cluster'
  | 'ControlPanel'
  | 'HypernodeDeploy'
  | 'MageReport'
  | 'Platform'
  | 'All'

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