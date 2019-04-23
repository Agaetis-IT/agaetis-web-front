import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

interface Props {
  href?: string
  children: string
  className?: string
  onClick?(e: React.MouseEvent): void
}

export default function Button({ href, children, onClick, className }: Props) {
  const Component = !href ? 'button' : 'a'
  const baseComponent = (
    <Component href={href} onClick={onClick} className={clsx(className, 'block md:inline-block')}>
      {children}
    </Component>
  )

  if (!href) {
    return baseComponent
  } else {
    return <Link href={href}>{baseComponent}</Link>
  }
}
