import clsx from 'clsx'
import React from 'react'

interface Props {
  href?: string
<<<<<<< i18n
  children: string
  component?: React.ReactType
=======
  children?: string | React.ReactElement
>>>>>>> :sparkles: Add Footer menu
  className?: string
  onClick?(e: React.MouseEvent): void
}

<<<<<<< i18n
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
    <ComponentProp href={href} onClick={onClick} className={clsx(className, 'block md:inline-block cursor-pointer')}>
=======
export default function Button({ href, children, onClick, className }: Props) {
  const Component = !href ? 'button' : 'a'
  const baseComponent = (
    <Component href={href} onClick={onClick} className={clsx('block md:inline-block text-xs', className)}>
>>>>>>> :sparkles: Add Footer menu
      {children}
    </ComponentProp>
  )
}
