const INPUT_CLASS =
  'w-full rounded-2xl border border-white/25 bg-white px-4 py-3 text-brand-blue outline-none transition focus:border-brand-sky focus:ring-2 focus:ring-brand-sky/40 aria-[invalid=true]:border-red-400 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-400/40'

export interface FormFieldProps {
  id: string
  name?: string
  type?: 'text' | 'email' | 'tel'
  placeholder?: string
  inputMode?: 'text' | 'email' | 'tel' | 'url'
  autoComplete?: string
  required?: boolean
  error?: string
}

const FormField = ({
  id,
  name,
  type = 'text',
  placeholder,
  inputMode = 'text',
  autoComplete,
  required = false,
  error,
}: FormFieldProps) => (
  <div>
    <input
      id={id}
      name={name ?? id}
      type={type}
      placeholder={placeholder}
      inputMode={inputMode}
      autoComplete={autoComplete}
      required={required || undefined}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={INPUT_CLASS}
    />
    {error && (
      <p id={`${id}-error`} role="alert" className="mt-1 text-sm text-red-300">
        {error}
      </p>
    )}
  </div>
)

export default FormField
