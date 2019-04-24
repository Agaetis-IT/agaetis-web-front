import clsx from 'clsx'
import React from 'react'

interface Props {
  href?: string
  children: string
  component?: React.ReactType
  className?: string
  onClick?(e: React.MouseEvent): void
}

export default function Button({ href, children, component, onClick, className }: Props) {
  let ComponentProp
  if (component) {
    ComponentProp = component
  } else if (href) {
    ComponentProp = 'a'
  } else {
    ComponentProp = 'button'
  }

  return (
    <ComponentProp href={href} onClick={onClick} className={clsx(className, 'block md:inline-block')}>
      {children}
    </ComponentProp>
  )
}
