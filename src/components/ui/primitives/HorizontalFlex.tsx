import type { ReactNode } from 'react'
import type { FlexAlign, FlexGap, FlexJustify, FlexWrap } from '../../../types/uitypes'

const ALIGN_MAP: Record<FlexAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
}

const JUSTIFY_MAP: Record<FlexJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
}

const WRAP_MAP: Record<FlexWrap, string> = {
  nowrap: 'flex-nowrap',
  wrap: 'flex-wrap',
  'wrap-reverse': 'flex-wrap-reverse',
}

type Tag = 'div' | 'section' | 'article' | 'header' | 'footer' | 'nav' | 'ul' | 'li' | 'span'

export interface HorizontalFlexProps {
  children?: ReactNode
  align?: FlexAlign
  justify?: FlexJustify
  wrap?: FlexWrap
  gap?: FlexGap
  gapX?: FlexGap
  gapY?: FlexGap
  inline?: boolean
  as?: Tag
  className?: string
}

const HorizontalFlex = ({
  children,
  align,
  justify,
  wrap,
  gap,
  gapX,
  gapY,
  inline = false,
  as: Tag = 'div',
  className,
}: HorizontalFlexProps) => {
  const classes = [
    inline ? 'inline-flex' : 'flex',
    'flex-row',
    align ? ALIGN_MAP[align] : '',
    justify ? JUSTIFY_MAP[justify] : '',
    wrap ? WRAP_MAP[wrap] : '',
    gap ? `gap-${gap}` : '',
    !gap && gapX ? `gap-x-${gapX}` : '',
    !gap && gapY ? `gap-y-${gapY}` : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return <Tag className={classes}>{children}</Tag>
}

export default HorizontalFlex
