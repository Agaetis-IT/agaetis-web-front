import clsx from 'clsx'

interface Props {
  href?: string
  htmlFor?: string
  component?: React.ElementType
  children?: string | React.ReactElement
  className?: string
  type?: string
  disabled?: boolean
  onClick?(e: React.MouseEvent): void
}

export default function Button({ href, htmlFor, children, component, onClick, className, type, disabled }: Props) {
  const ComponentProp = component || (href ? 'a' : 'button')

  return (
    <ComponentProp
      href={href}
      title={href}
      htmlFor={htmlFor}
      onClick={!disabled ? onClick : undefined}
      type={type}
      className={clsx(disabled ? 'cursor-default' : 'cursor-pointer', className)}
    >
      {children}
    </ComponentProp>
  )
}
