import { useDeferredValue, useMemo, useState } from 'react'

import ErrorBoundary from '../../ui/primitives/ErrorBoundary'
import type { ChangelogCategory, ChangelogEntry } from '../../../types/changelog'

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

const focusRing = 'focus:outline-2 focus:outline-offset-2 focus:outline-brand-orange'
const fieldClass = 'h-12 rounded-full border border-slate-300 bg-white px-4 text-base font-medium text-brand-blue-dark'
const labelClass = 'flex flex-col gap-2 text-sm font-bold text-brand-blue-dark'
const filterButtonActiveClass = 'border-brand-blue bg-brand-blue text-white'
const filterButtonInactiveClass = 'border-slate-300 bg-white text-brand-blue-dark hover:border-brand-blue hover:text-brand-blue'
const filterButtonBaseClass = `rounded-full border px-4 py-2 text-sm font-bold transition-colors duration-200 ${focusRing}`
const bulletClass = 'h-1.5 w-1.5 rounded-full bg-brand-orange'

const formatCategoryLabel = (category: ChangelogEntry['category']): string =>
  CATEGORY_TABS.find(tab => tab.value === category)?.label ?? category

const matchesSearch = (entry: ChangelogEntry, query: string): boolean => {
  if (!query) return true
  return `${entry.title} ${entry.summary}`.toLowerCase().includes(query.toLowerCase())
}

const matchesYear = (entry: ChangelogEntry, year: string): boolean =>
  year === 'all' || entry.date.startsWith(year)

const matchesCategory = (entry: ChangelogEntry, category: ChangelogCategory): boolean =>
  category === 'All' || entry.category === category

const formatDate = (value: string): string =>
  new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value))

// — Subcomponents —

interface ChangelogCardProps {
  entry: ChangelogEntry
}

const ChangelogCard = ({ entry }: ChangelogCardProps) => (
  <article className="rounded-[28px] border border-slate-200 bg-white pad-card-xl shadow-soft transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-panel-hover">
    <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-brand-blue">
      <span>{formatDate(entry.date)}</span>
      <span
        className={bulletClass}
        aria-hidden="true"
      />
      <span>{formatCategoryLabel(entry.category)}</span>
      {entry.version ? (
        <>
          <span
            className={bulletClass}
            aria-hidden="true"
          />
          <span>Version {entry.version}</span>
        </>
      ) : null}
    </div>

    <h2 className="mt-4">
      <a
        href={entry.href}
        className={`text-brand-blue no-underline transition-colors duration-200 hover:text-brand-orange hover:no-underline focus:outline-2 focus:outline-offset-4 focus:outline-brand-orange`}
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
        className={`inline-flex items-center justify-center rounded-full border border-brand-orange px-5 py-2.5 text-sm font-bold text-brand-orange transition-colors duration-200 hover:bg-brand-orange hover:text-white ${focusRing}`}
        target="_blank"
        rel="noreferrer"
      >
        Read more
      </a>
    </div>
  </article>
)

const EmptyState = () => (
  <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center text-brand-blue">
    <h2>No changelog entries match the current filters.</h2>
    <p className="mt-3 text-copy">Try another year, clear the search, or switch to a different category tab.</p>
  </div>
)

// — Main component —

const ChangelogFilters = ({ entries }: ChangelogFiltersProps) => {
  const [activeCategory, setActiveCategory] = useState<ChangelogCategory>('All')
  const [selectedYear, setSelectedYear] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const deferredSearchQuery = useDeferredValue(searchQuery)

  const filteredEntries = useMemo(
    () => entries.filter(entry =>
      matchesCategory(entry, activeCategory) &&
      matchesYear(entry, selectedYear) &&
      matchesSearch(entry, deferredSearchQuery)
    ),
    [activeCategory, deferredSearchQuery, entries, selectedYear],
  )

  const yearOptions = useMemo(
    () => Array.from(new Set(entries.map(entry => Number.parseInt(entry.date.slice(0, 4), 10))))
      .filter(year => Number.isFinite(year))
      .sort((a, b) => b - a),
    [entries],
  )

  return (
    <section className="pb-20 md:pb-24">
      <div className="rounded-[28px] border border-slate-200 bg-white pad-card-lg shadow-soft">
        <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-end">
          <label
            htmlFor="changelog-year"
            className={labelClass}
          >
            Year
            <select
              id="changelog-year"
              value={selectedYear}
              onChange={event => setSelectedYear(event.target.value)}
              className={`${fieldClass} ${focusRing}`}
            >
              <option value="all">All years</option>
              {yearOptions.map(year => (
                <option
                  key={year}
                  value={String(year)}
                >{year}</option>
              ))}
            </select>
          </label>

          <label
            htmlFor="changelog-search"
            className={labelClass}
          >
            Search changelog
            <input
              id="changelog-search"
              type="search"
              value={searchQuery}
              onChange={event => setSearchQuery(event.target.value)}
              placeholder="Search releases, features, or updates"
              className={`${fieldClass} placeholder:text-slate-400 ${focusRing}`}
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
                className={`${filterButtonBaseClass} ${isActive ? filterButtonActiveClass : filterButtonInactiveClass}`}
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
        {filteredEntries.length > 0
          ? filteredEntries.map(entry => (
            <ChangelogCard
              key={entry.id}
              entry={entry}
            />
          ))
          : <EmptyState />}
      </div>
    </section>
  )
}

const ChangelogFiltersWithBoundary = (props: ChangelogFiltersProps) => (
  <ErrorBoundary
    fallback={
      <p className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-10 text-center text-brand-blue">
        The changelog could not be loaded. Please refresh the page.
      </p>
    }
  >
    <ChangelogFilters {...props} />
  </ErrorBoundary>
)

export default ChangelogFiltersWithBoundary