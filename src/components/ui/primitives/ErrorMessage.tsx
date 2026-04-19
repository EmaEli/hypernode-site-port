export interface ErrorMessageProps {
  message: string
  rounded?: boolean
}

const ErrorMessage = ({ message, rounded = false }: ErrorMessageProps) => (
  <p className={`surface-muted px-6 py-10 text-center text-brand-blue ${rounded ? 'rounded-2xl' : ''}`}>
    {message}
  </p>
)

export default ErrorMessage
