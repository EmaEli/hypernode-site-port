export interface SegmentedToggleOption<Option extends string> {
  label: string
  value: Option
}

export interface SegmentedToggleProps<Option extends string> {
  options: SegmentedToggleOption<Option>[]
  value: Option
  onChange: (value: Option) => void
  ariaLabel: string
}

const CONTAINER_CLASS =
  'inline-flex rounded-full bg-white p-0.5 shadow-inner ring-1 ring-slate-200'

const BUTTON_CLASS =
  'rounded-full px-3.5 py-2 text-ui-sm font-bold transition-all focus:outline-2 focus:outline-offset-2 focus:outline-brand-orange'

const SegmentedToggle = <Option extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: SegmentedToggleProps<Option>) => {
  return (
    <div className={CONTAINER_CLASS}
role="group"
aria-label={ariaLabel}>
      {options.map(option => {
        const isActive = option.value === value

        return (
          <button
            key={option.value}
            type="button"
            className={`${BUTTON_CLASS} ${
              isActive
                ? 'bg-brand-orange text-white shadow-soft'
                : 'text-brand-blue-dark hover:text-brand-orange'
            }`}
            onClick={() => onChange(option.value)}
            aria-pressed={isActive}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export default SegmentedToggle