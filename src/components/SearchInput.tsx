import React, { useEffect, useState } from 'react'

interface Props {
  handleChange: (value: string) => void
  defaultValue?: string
}

export default function SearchInput({ handleChange, defaultValue }: Props) {
  const [value, setValue] = useState(defaultValue)

  const onChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string
    setValue(value)
    handleChange(value)
  }

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  return (
    <div className="w-full md:w-1/2 mr-auto px-4 flex flex-row items-center shadow-md border-2 border-orange bg-light-grey rounded-full w-full">
      <input
        className="bg-light-grey w-full text-xs py-2 text-orange font-semibold leading-tight"
        type="text"
        id="search-input"
        placeholder="Rechercher"
        value={value}
        onChange={onChange}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke=" #ff7f40"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="6.5" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </div>
  )
}
