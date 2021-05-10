import React from 'react'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'

import './CheckBox.css'

type Props = {
  name: string
  label: string
  boxClassName?: string
  labelClassName?: string
  required?: boolean
  wrapperClassName?: string
}

export default function CheckBox({ name, label, boxClassName, labelClassName, wrapperClassName, required }: Props) {
  const { register, errors, trigger, formState } = useFormContext()

  const triggerValidation = () => {
    if (formState.isDirty) {
      // eslint-disable-next-line
      // @ts-ignore
      return trigger(name)
    }
  }

  return (
    <div className={clsx('flex flex-col', wrapperClassName)}>
      <div className="flex">
        <label htmlFor={name} className={clsx('check-container flex items-center', labelClassName)}>
          <input
            id={name}
            name={name}
            type="checkbox"
            ref={register()}
            onChange={triggerValidation}
            required={required}
          />
          <span className={clsx('checkmark', boxClassName)} />
          {label}
        </label>
      </div>
      {errors[name] && <p className="text-xs text-red text-center pt-2">{errors[name].message}</p>}
    </div>
  )
}
