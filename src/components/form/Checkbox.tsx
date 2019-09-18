import { ErrorMessage, Field } from 'formik'
import React from 'react'

interface Props {
  name: string
  label: string
  className: string
}

export default function Checkbox({ className, label, name }: Props) {
  return (
    <div className={className}>
      <div className="flex flex-row">
        <Field className="block" component="input" type="checkbox" name={name} />
        <label className="block text-cgu ml-1" htmlFor={name}>
          {label}
        </label>
      </div>

      <ErrorMessage name={name} component="div" className="text-cgu font-semibold text-red" />
    </div>
  )
}
