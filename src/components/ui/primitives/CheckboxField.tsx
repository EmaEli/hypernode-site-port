import type { ReactNode } from 'react'

const CHECKBOX_CLASS =
  'mt-1 h-5 w-5 shrink-0 rounded border border-white/20 bg-white text-brand-orange focus:ring-2 focus:ring-brand-sky/40'

export interface CheckboxFieldProps {
  id: string
  name: string
  required?: boolean
  error?: string
  children: ReactNode
}

const CheckboxField = ({ id, name, required = false, error, children }: CheckboxFieldProps) => {
  return (
    <div>
      <label htmlFor={id} className="flex items-start gap-3 text-white">
        <input
          id={id}
          name={name}
          type="checkbox"
          value="true"
          required={required || undefined}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={CHECKBOX_CLASS}
        />
        <span>{children}</span>
      </label>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 ml-8 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  )
}

export default CheckboxField
