import { useDeferredValue, useEffect, useRef, useState } from 'react'

import Button from '../../ui/primitives/Button'
import RoundedCard from '../../ui/primitives/RoundedCard'
import ErrorBoundary from '../../ui/primitives/ErrorBoundary'
import ErrorMessage from '../../ui/primitives/ErrorMessage'
import Pagination from '../../ui/primitives/Pagination'
import SearchField from '../../ui/primitives/SearchField'
import SelectField from '../../ui/primitives/SelectField'
import { fetchChangelogPage, PAGE_SIZE } from '../../../lib/strapi'
import { CATEGORY_TABS, CATEGORY_TO_URL, URL_TO_CATEGORY } from '../../../types/changelog'
import type { ChangelogCategory, ChangelogEntry } from '../../../types/changelog'
import { ChangelogCard, EmptyState } from './ChangelogCard'
import HorizontalFlex from '../../ui/primitives/HorizontalFlex'

const CURRENT_YEAR = new Date().getFullYear()
const YEAR_OPTIONS = [
  { value: 'all', label: 'All years' },
  ...Array.from({ length: CURRENT_YEAR - 2009 }, (_, i) => ({ value: String(CURRENT_YEAR - i), label: String(CURRENT_YEAR - i) })),
]

const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL

const syncUrl = (category: ChangelogCategory, year: string, search: string, page: number) => {
  const p = new URLSearchParams()
  if (category !== 'All') p.set('category', CATEGORY_TO_URL[category] ?? '')
  if (year !== 'all') p.set('year', year)
  if (search) p.set('q', search)
  if (page > 1) p.set('page', String(page))
  const qs = p.toString()
  window.history.pushState({}, '', qs ? `?${qs}` : window.location.pathname)
}

export interface ChangelogFiltersProps {
  initialEntries: ChangelogEntry[]
  initialTotal: number
}

const ChangelogFilters = ({ initialEntries, initialTotal }: ChangelogFiltersProps) => {
  const [activeCategory, setActiveCategory] = useState<ChangelogCategory>('All')
  const [selectedYear, setSelectedYear] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const deferredSearch = useDeferredValue(searchQuery)
  const [currentPage, setCurrentPage] = useState(1)

  const [entries, setEntries] = useState(initialEntries)
  const [total, setTotal] = useState(initialTotal)
  const [isLoading, setIsLoading] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)

  const isMounted = useRef(false)

  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    const cat = p.get('category')
    const year = p.get('year')
    const q = p.get('q')
    const page = parseInt(p.get('page') ?? '1', 10)

    if (cat && URL_TO_CATEGORY[cat]) setActiveCategory(URL_TO_CATEGORY[cat])
    if (year) setSelectedYear(year)
    if (q) setSearchQuery(q)
    if (page > 1) setCurrentPage(page)
  }, [])

  // Fetch / filter on every state change
  useEffect(() => {
    if (!isMounted.current) { isMounted.current = true; return }

    syncUrl(activeCategory, selectedYear, deferredSearch, currentPage)

    if (!STRAPI_URL) {
      const filtered = initialEntries.filter(e =>
        (activeCategory === 'All' || e.category === activeCategory) &&
        (selectedYear === 'all' || e.date.startsWith(selectedYear)) &&
        (!deferredSearch || `${e.title} ${e.summary}`.toLowerCase().includes(deferredSearch.toLowerCase()))
      )
      const start = (currentPage - 1) * PAGE_SIZE
      setEntries(filtered.slice(start, start + PAGE_SIZE))
      setTotal(filtered.length)
      return
    }

    const controller = new AbortController()
    setIsLoading(true)
    setFetchError(null)

    fetchChangelogPage(
      {
        category: activeCategory !== 'All' ? activeCategory : undefined,
        year: selectedYear !== 'all' ? parseInt(selectedYear, 10) : undefined,
        search: deferredSearch || undefined,
      },
      currentPage,
      controller.signal,
    )
      .then(result => { setEntries(result.entries); setTotal(result.pagination.total) })
      .catch(err => { if ((err as Error).name !== 'AbortError') setFetchError('Could not load changelog entries. Please try again.') })
      .finally(() => setIsLoading(false))

    return () => controller.abort()
  }, [activeCategory, selectedYear, deferredSearch, currentPage, initialEntries])

  const handleCategoryChange = (category: ChangelogCategory) => { setActiveCategory(category); setCurrentPage(1) }
  const handleYearChange = (year: string) => { setSelectedYear(year); setCurrentPage(1) }
  const handleSearchChange = (value: string) => { setSearchQuery(value); setCurrentPage(1) }

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <section className="space-y-8 pb-20 md:pb-24">
      <RoundedCard padding="md">
        <HorizontalFlex gap="4" align="end">
          <SelectField id="changelog-year" label="Year" value={selectedYear} onChange={handleYearChange} options={YEAR_OPTIONS} className="shrink-0" />

          <SearchField
            id="changelog-search"
            label="Search changelog"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search releases, features, or updates"
            className="grow"
          />
        </HorizontalFlex>

        <HorizontalFlex gap="4" className="mt-4 pt-4 border-t border-slate-200">
          {CATEGORY_TABS.map(tab => (
            <Button
              key={tab.value}
              variant={tab.value === activeCategory ? 'active' : 'inactive'}
              onClick={() => handleCategoryChange(tab.value)}
              aria-pressed={tab.value === activeCategory}
            >
              {tab.label}
            </Button>
          ))}
        </HorizontalFlex>
      </RoundedCard>

      {fetchError && <ErrorMessage rounded message={fetchError} />}

      <div className={`space-y-5 transition-opacity duration-200 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
        {entries.length > 0
          ? entries.map(entry => <ChangelogCard key={entry.id} entry={entry} />)
          : !isLoading && <EmptyState />}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        disabled={isLoading}
      />
    </section>
  )
}

export default (props: ChangelogFiltersProps) => (
  <ErrorBoundary fallback={<ErrorMessage rounded message="The changelog could not be loaded. Please refresh the page." />}>
    <ChangelogFilters {...props} />
  </ErrorBoundary>
)
