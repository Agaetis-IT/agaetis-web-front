import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'

import styles from '../styles/CheckBox.module.css'

type Props = {
  name: string
  label: string
  boxClassName?: string
  labelClassName?: string
  required?: boolean
  wrapperClassName?: string
}

export default function CheckBox({ name, label, boxClassName, labelClassName, wrapperClassName, required }: Props) {
  const { register, formState } = useFormContext()

  return (
    <div className={clsx('flex flex-col', wrapperClassName)}>
      <div className="flex">
        <label
          htmlFor={name}
          className={clsx(
            styles.checkContainer,
            'relative cursor-pointer select-none flex items-center',
            labelClassName
          )}
        >
          <input
            {...register(name)}
            className="absolute opacity-0 cursor-pointer h-0 w-0"
            id={name}
            name={name}
            type="checkbox"
            required={required}
          />
          <span className={clsx(styles.checkmark, 'absolute left-0 bg-white rounded-md', boxClassName)} />
          {label}
        </label>
      </div>
      {formState.errors[name] && <p className="text-xs leading-normal text-red-500 text-center pt-2">{formState.errors[name].message}</p>}
    </div>
  )
}
