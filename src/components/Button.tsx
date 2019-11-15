import clsx from 'clsx'
import React from 'react'

interface Props {
  href?: string
  htmlFor?: string
  component?: React.ReactType
  children?: string | React.ReactElement
  className?: string
  type?: string
  styleType?: string
  onClick?(e: React.MouseEvent): void
}

const tabClassNames = 'text-xs uppercase text-center py-4 md:inline border border-white font-semibold self-center'

export default function Button({ href, htmlFor, children, component, onClick, className, type, styleType }: Props) {
  let ComponentProp
  if (component) {
    ComponentProp = component
  } else if (href) {
    ComponentProp = 'a'
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
      className={clsx({ [tabClassNames]: styleType === 'tab' }, className, 'cursor-pointer')}
    >
      {children}
    </ComponentProp>
  )
}
