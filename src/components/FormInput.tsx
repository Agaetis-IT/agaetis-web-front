import React from 'react'

interface Props {
  id: string
  type: string
  placeholder: string
  children: string
  onChange(e: React.ChangeEvent): void
}

export default function FormInput({ id, type, placeholder, onChange, children }: Props) {
  return (
    <div className="p-2">
      <label className="block text-xss font-bold mb-2" htmlFor={id}>
        {children}
      </label>
      <input
        className="shadow appearance-none rounded-sm text-xs w-full py-2 px-3 text-dark-grey leading-tight"
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        required
      />
    </div>
  )
}
