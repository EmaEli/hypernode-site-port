import type { ReactNode } from 'react'

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'active' | 'inactive'
  size?: 'default' | 'large'
  href?: string
  type?: 'button' | 'submit' | 'reset'
  className?: string
  target?: string
  rel?: string
  onClick?: () => void
  'aria-pressed'?: boolean
  children: ReactNode
}

const SIZE_MODIFIER: Record<NonNullable<ButtonProps['size']>, string> = {
  default: 'px-6 py-2',
  large: 'px-8 h-[60px]',
}

const BASE_CLASS =
  'inline-flex items-center justify-center rounded-full text-ui-button font-bold transition-all duration-300 focus:outline-2 focus:outline-offset-2'

const VARIANT_MODIFIER: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'border border-transparent bg-brand-orange text-white hover:bg-white hover:text-brand-orange hover:border-brand-orange focus:outline-brand-orange',
  secondary:
    'border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white focus:outline-brand-blue',
  ghost:
    'text-brand-blue underline-offset-4 hover:underline focus:outline-brand-blue',
  active:
    'bg-brand-orange text-white shadow-soft',
  inactive:
    'text-brand-blue-dark hover:text-brand-orange',
}

const Button = ({
  variant = 'primary',
  size = 'default',
  href,
  type = 'button',
  className,
  target,
  rel,
  onClick,
  'aria-pressed': ariaPressed,
  children,
}: ButtonProps) => {
  const buttonClass = [BASE_CLASS, SIZE_MODIFIER[size], VARIANT_MODIFIER[variant], className]
    .filter(Boolean)
    .join(' ')

  if (href) {
    return (
      <a
        href={href}
        className={buttonClass}
        target={target}
        rel={rel}
        onClick={onClick}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      aria-pressed={ariaPressed}
    >
      {children}
    </button>
  )
}

export default Button
