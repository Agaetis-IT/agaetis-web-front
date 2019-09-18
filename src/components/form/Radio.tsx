import clsx from 'clsx'
import { Field } from 'formik'
import React from 'react'

interface Props {
  name: string
  id: string
  isSelected: boolean
  className: string
  value: string
  label: string
}

export default function Radio({ name, id, isSelected, className, value, label }: Props) {
  return (
    <div className={clsx(className)}>
      <Field component="input" type="radio" name={name} id={id} value={value} className="hidden" />

      <label
        className={clsx(
          isSelected ? 'border-orange text-orange' : 'border-blue text-blue',
          'border bg-transparent rounded w-40 text-center py-2 align-middle block mx-auto md:mx-4 cursor-pointer font-semibold text-xss uppercase radio'
        )}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  )
}
