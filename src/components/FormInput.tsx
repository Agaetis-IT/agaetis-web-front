import clsx from 'clsx'
import React from 'react'

interface Props {
  id: string
  type: string
  placeholder: string
  children: string
  isValid: boolean
  errorMessage?: string
  onChange(e: React.ChangeEvent): void
}

export default function FormInput({ id, type, placeholder, isValid, errorMessage, onChange, children }: Props) {
  return (
    <div className="p-2">
      <label className="block text-xss font-bold mb-2" htmlFor={id}>
        {children}
      </label>
      <input
        className={clsx(
          { 'border border-red': !isValid },
          'shadow appearance-none rounded-sm text-xs w-full py-2 px-3 text-dark-grey leading-tight'
        )}
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        required
      />
      <div className={clsx({ hidden: isValid }, 'py-2 text-red text-xss inline')}>{errorMessage}</div>
    </div>
  )
}
