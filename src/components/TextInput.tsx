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
  const { register, formState } = useFormContext()

  const Component = type

  return (
    <div className={clsx('flex flex-col', wrapperClassName)}>
      <Component {...register(name)} name={name} placeholder={label} className={className} required={required} />
      {formState.errors[name] && <p className="text-xs leading-normal text-red-500 text-center pt-2">{formState.errors[name].message}</p>}
    </div>
  )
}

export default TextInput
