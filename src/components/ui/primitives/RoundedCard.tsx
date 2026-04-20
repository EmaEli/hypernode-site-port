import type { ReactNode } from 'react'

type Padding = 'md' | 'lg' | 'xl'
type Tag = 'div' | 'section' | 'article' | 'aside'

export interface RoundedCardProps {
  children: ReactNode
  padding?: Padding
  as?: Tag
  className?: string
}

const RoundedCard = ({ children, padding = 'lg', as: Tag = 'div', className }: RoundedCardProps) => {
  const classes = ['rounded-[28px] surface-card', `pad-card-${padding}`, className]
    .filter(Boolean)
    .join(' ')

  return <Tag className={classes}>{children}</Tag>
}

export default RoundedCard
