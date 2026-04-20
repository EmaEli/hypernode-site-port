const LABEL_CLS = 'flex flex-col gap-2 text-sm font-bold text-brand-blue-dark'
const INPUT_CLS =
  'h-12 w-full rounded-full border border-slate-300 bg-white px-4 text-base font-medium text-brand-blue-dark placeholder:text-slate-400 focus-ring'

export interface SearchFieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

const SearchField = ({ id, label, value, onChange, placeholder, className }: SearchFieldProps) => (
  <label htmlFor={id} className={[LABEL_CLS, className].filter(Boolean).join(' ')}>
    {label}
    <input
      id={id}
      type="search"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className={INPUT_CLS}
    />
  </label>
)

export default SearchField
