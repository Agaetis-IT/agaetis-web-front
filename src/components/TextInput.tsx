import React from 'react'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'

type Props = {
  name: string
  label: string
  className?: string
  required?: boolean
  type: 'textarea' | 'input'
  wrapperClassName?: string
}

function TextInput({ name, label, className, wrapperClassName, type, required }: Props) {
  const { register, errors } = useFormContext()

  const Component = type

  return (
    <div className={clsx('flex flex-col', wrapperClassName)}>
      <Component name={name} placeholder={label} ref={register()} className={className} required={required} />
      {errors[name] && <p className="text-xs text-red text-center pt-2">{errors[name].message}</p>}
    </div>
  )
}

export default TextInput
