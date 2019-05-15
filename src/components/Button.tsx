import clsx from 'clsx'
import React from 'react'

interface Props {
  href?: string
  htmlFor?: string
  component?: React.ReactType
  children?: string | React.ReactElement
  className?: string
  type?: string
  onClick?(e: React.MouseEvent): void
}
export default function Button({ href, htmlFor, children, component, onClick, className, type }: Props) {
  let ComponentProp
  if (component) {
    ComponentProp = component
  } else if (href) {
    ComponentProp = 'a'
  } else if (htmlFor) {
    ComponentProp = 'label'
  } else {
    ComponentProp = 'button'
  }

  return (
    <ComponentProp
      href={href}
      title={href}
      htmlFor={htmlFor}
      onClick={onClick}
      type={type}
      className={clsx(className, 'cursor-pointer')}
    >
      {children}
    </ComponentProp>
  )
}
