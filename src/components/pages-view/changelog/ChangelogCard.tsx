import RoundedCard from '../../ui/primitives/RoundedCard'
import type { ChangelogEntry } from '../../../types/changelog'
import HorizontalFlex from '../../ui/primitives/HorizontalFlex'
import Button from '../../ui/primitives/Button'

const CATEGORY_LABELS: Partial<Record<string, string>> = {
  ControlPanel: 'Control panel',
  HypernodeDeploy: 'Hypernode Deploy',
}
const formatCategory = (category: string) => CATEGORY_LABELS[category] ?? category

const dateFormatter = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
const formatDate = (value: string) => dateFormatter.format(new Date(value))


export const ChangelogCard = ({ entry }: { entry: ChangelogEntry }) => (
  <RoundedCard as="article" padding="md" className="transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-panel-hover">
    <HorizontalFlex gap="4" className="font-semibold text-brand-blue">
      <span>{formatDate(entry.date)}</span>
      <span className="bullet-dot" aria-hidden="true" />
      <span>{formatCategory(entry.category)}</span>
      {entry.version && (
        <>
          <span className="bullet-dot" aria-hidden="true" />
          <span>Version {entry.version}</span>
        </>
      )}
    </HorizontalFlex>

    <h3 className="mt-4">
      <a
        href={entry.href}
        className="link-hover"
        target="_blank"
        rel="noreferrer"
      >
        {entry.title}
      </a>
    </h3>

    <p className="my-3 text-copy text-brand-blue">{entry.summary}</p>

    <Button variant="outline" href={entry.href} target="_blank" rel="noreferrer">
      Read more
    </Button>
  </RoundedCard>
)

export const EmptyState = () => (
  <RoundedCard className="surface-muted py-12 text-center text-brand-blue">
    <h3>No changelog entries match the current filters.</h3>
    <p className="mt-3 text-copy">Try another year, clear the search, or switch to a different category tab.</p>
  </RoundedCard>
)
