const LABEL_CLS = 'flex flex-col gap-2 text-sm font-bold text-brand-blue-dark'
const SELECT_CLS =
  'h-12 rounded-full border border-slate-300 bg-white px-4 text-base font-medium text-brand-blue-dark focus-ring'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectFieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  className?: string
}

const SelectField = ({ id, label, value, onChange, options, className }: SelectFieldProps) => (
  <label htmlFor={id} className={[LABEL_CLS, className].filter(Boolean).join(' ')}>
    {label}
    <select id={id} value={value} onChange={e => onChange(e.target.value)} className={SELECT_CLS}>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </label>
)

export default SelectField
