import { useDeferredValue, useMemo, useState } from 'react'

import type { ChangelogCategory, ChangelogEntry } from '../../types/changelog'

export interface ChangelogFiltersProps {
  entries: ChangelogEntry[]
}

interface CategoryTab {
  value: ChangelogCategory
  label: string
}

const CATEGORY_TABS: CategoryTab[] = [
  { value: 'All', label: 'All' },
  { value: 'API', label: 'API' },
  { value: 'Autoscaling', label: 'Autoscaling' },
  { value: 'Cluster', label: 'Cluster' },
  { value: 'ControlPanel', label: 'Control panel' },
  { value: 'HypernodeDeploy', label: 'Hypernode Deploy' },
  { value: 'MageReport', label: 'MageReport' },
  { value: 'Platform', label: 'Platform' },
]

const YEAR_OPTIONS = Array.from({ length: 17 }, (_, index) => 2026 - index)

const formatCategoryLabel = (category: Exclude<ChangelogEntry['category'], 'All'>): string => {
  const activeCategory = CATEGORY_TABS.find(tab => tab.value === category)

  return activeCategory?.label ?? category
}

const matchesSearch = (entry: ChangelogEntry, query: string): boolean => {
  if (!query) {
    return true
  }

  const normalizedQuery = query.toLowerCase()

  return `${entry.title} ${entry.summary}`.toLowerCase().includes(normalizedQuery)
}

const matchesYear = (entry: ChangelogEntry, year: string): boolean => {
  if (year === 'all') {
    return true
  }

  return entry.date.startsWith(year)
}

const matchesCategory = (entry: ChangelogEntry, category: ChangelogCategory): boolean => {
  if (category === 'All') {
    return true
  }

  return entry.category === category
}

const formatDate = (value: string): string => {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}

const ChangelogFilters = ({ entries }: ChangelogFiltersProps) => {
  const [activeCategory, setActiveCategory] = useState<ChangelogCategory>('All')
  const [selectedYear, setSelectedYear] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const deferredSearchQuery = useDeferredValue(searchQuery)

  const filteredEntries = useMemo(() => {
    return entries.filter(entry => {
      return (
        matchesCategory(entry, activeCategory) &&
        matchesYear(entry, selectedYear) &&
        matchesSearch(entry, deferredSearchQuery)
      )
    })
  }, [activeCategory, deferredSearchQuery, entries, selectedYear])

  return (
    <section className="pb-20 md:pb-24">
      <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft md:p-8">
        <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-end">
          <label className="flex flex-col gap-2 text-sm font-bold text-brand-blue-dark" htmlFor="changelog-year">
            Year
            <select
              id="changelog-year"
              value={selectedYear}
              onChange={event => setSelectedYear(event.target.value)}
              className="h-12 rounded-full border border-slate-300 bg-white px-4 text-base font-medium text-brand-blue-dark focus:outline-2 focus:outline-offset-2 focus:outline-brand-orange"
            >
              <option value="all">All years</option>
              {YEAR_OPTIONS.map(year => (
                <option key={year} value={String(year)}>
                  {year}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-brand-blue-dark" htmlFor="changelog-search">
            Search changelog
            <input
              id="changelog-search"
              type="search"
              value={searchQuery}
              onChange={event => setSearchQuery(event.target.value)}
              placeholder="Search releases, features, or updates"
              className="h-12 rounded-full border border-slate-300 bg-white px-4 text-base font-medium text-brand-blue-dark placeholder:text-slate-400 focus:outline-2 focus:outline-offset-2 focus:outline-brand-orange"
            />
          </label>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-200 pt-6">
          {CATEGORY_TABS.map(tab => {
            const isActive = tab.value === activeCategory

            return (
              <button
                key={tab.value}
                type="button"
                className={`rounded-full border px-4 py-2 text-sm font-bold transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-brand-orange ${
                  isActive
                    ? 'border-brand-blue bg-brand-blue text-white'
                    : 'border-slate-300 bg-white text-brand-blue-dark hover:border-brand-blue hover:text-brand-blue'
                }`}
                onClick={() => setActiveCategory(tab.value)}
                aria-pressed={isActive}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-8 space-y-5">
        {filteredEntries.length > 0 ? (
          filteredEntries.map(entry => (
            <article
              key={entry.id}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-panel-hover md:p-8"
            >
              <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-brand-blue">
                <span>{formatDate(entry.date)}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" aria-hidden="true" />
                <span>{formatCategoryLabel(entry.category)}</span>
                {entry.version ? (
                  <>
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" aria-hidden="true" />
                    <span>Version {entry.version}</span>
                  </>
                ) : null}
              </div>

              <h2 className="mt-4 text-3xl leading-tight md:text-[34px] md:leading-[1.15]">
                <a
                  href={entry.href}
                  className="text-brand-blue no-underline transition-colors duration-200 hover:text-brand-orange hover:no-underline focus:outline-2 focus:outline-offset-4 focus:outline-brand-orange"
                  target="_blank"
                  rel="noreferrer"
                >
                  {entry.title}
                </a>
              </h2>

              <p className="mt-4 max-w-3xl text-copy text-brand-blue">{entry.summary}</p>

              <div className="mt-6">
                <a
                  href={entry.href}
                  className="inline-flex items-center justify-center rounded-full border border-brand-orange px-5 py-2.5 text-sm font-bold text-brand-orange transition-colors duration-200 hover:bg-brand-orange hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-brand-orange"
                  target="_blank"
                  rel="noreferrer"
                >
                  Read more
                </a>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center text-brand-blue">
            <h2 className="text-2xl">No changelog entries match the current filters.</h2>
            <p className="mt-3 text-copy">Try another year, clear the search, or switch to a different category tab.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ChangelogFilters