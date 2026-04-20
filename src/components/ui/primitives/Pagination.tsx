import { Icon } from '@iconify/react'

import Button from './Button'

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  disabled?: boolean
}

const PAGE_BTN_BASE =
  'inline-flex h-9 min-w-9 items-center justify-center rounded-full border text-sm font-bold transition-colors duration-200 focus-ring disabled:cursor-not-allowed disabled:opacity-40'
const PAGE_BTN_ACTIVE = 'border-brand-blue bg-brand-blue text-white'
const PAGE_BTN_INACTIVE =
  'border-slate-300 bg-white text-brand-blue-dark hover:border-brand-blue hover:text-brand-blue'

const getPageNumbers = (current: number, total: number): (number | 'ellipsis')[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages: (number | 'ellipsis')[] = [1]
  const rangeStart = Math.max(2, current - 2)
  const rangeEnd = Math.min(total - 1, current + 2)

  if (rangeStart > 2) pages.push('ellipsis')
  for (let i = rangeStart; i <= rangeEnd; i++) pages.push(i)
  if (rangeEnd < total - 1) pages.push('ellipsis')
  pages.push(total)

  return pages
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
}: PaginationProps) => {
  if (totalPages <= 1) return null

  const pages = getPageNumbers(currentPage, totalPages)

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex items-center justify-center gap-2"
    >
      <Button
        variant="secondary"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={disabled || currentPage <= 1}
        aria-label="Previous page"
      >
        <Icon icon="heroicons:arrow-left-16-solid" className="size-4" aria-hidden="true" />
        Prev
      </Button>

      <div className="flex items-center gap-1">
        {pages.map((page, index) =>
          page === 'ellipsis' ? (
            <span
              key={`ellipsis-${index}`}
              className="flex h-9 w-6 items-center justify-center text-sm text-brand-blue"
              aria-hidden="true"
            >
              …
            </span>
          ) : (
            <button
              key={page}
              type="button"
              className={`${PAGE_BTN_BASE} px-3 ${page === currentPage ? PAGE_BTN_ACTIVE : PAGE_BTN_INACTIVE}`}
              onClick={() => onPageChange(page)}
              disabled={disabled}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          ),
        )}
      </div>

      <Button
        variant="secondary"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={disabled || currentPage >= totalPages}
        aria-label="Next page"
      >
        Next
        <Icon icon="heroicons:arrow-right-16-solid" className="size-4" aria-hidden="true" />
      </Button>
    </nav>
  )
}

export default Pagination
