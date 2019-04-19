import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

import { Color } from './type'

interface Props {
  href?: string
  color?: Color
  children: string
  className?: string
  onClick?(e: React.MouseEvent): void
}

function getBgClass(colorProp?: Color): string {
  switch (colorProp) {
    case 'orange':
      return 'bg-orange'
    default:
      return ''
  }
}

export default function Button({ href, color, children, onClick, className }: Props) {
  const Component = !href ? 'button' : 'a'
  const baseComponent = (
    <Component
      href={href}
      onClick={onClick}
      className={clsx(className, getBgClass(color), 'block md:inline-block text-xs text-white')}
    >
      {children}
    </Component>
  )

  if (!href) {
    return baseComponent
  } else {
    return <Link href={href}>{baseComponent}</Link>
  }
}
