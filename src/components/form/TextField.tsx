import clsx from 'clsx'
import { ErrorMessage, Field } from 'formik'
import React from 'react'

interface Props {
  name: string
  isInvalid: boolean
  placeholder: string
  label: string
  className: string
  inputClassName?: string
}

export default function TextField({ name, isInvalid, placeholder, label, className, inputClassName }: Props) {
  return (
    <div className={className}>
      <label htmlFor={name} className="text-xs font-semibold">
        {label}
      </label>
      <Field
        name={name}
        type="text"
        placeholder={isInvalid ? '' : placeholder}
        className={clsx(isInvalid ? 'bg-red-light ' : '', 'h-8 px-2 my-2 text-xs outline-none', inputClassName)}
      />
      <ErrorMessage name={name} component="div" className="text-cgu font-semibold text-red" />
    </div>
  )
}
