import clsx from 'clsx'
import React from 'react'

interface Props {
  id: number
  title?: string
  category?: string
  children?: string
  className?: string
}

function getBgColor(id: number) {
  return id === 1 || id === 2 || id === 6 ? 'bg-grey' : id === 4 ? 'bg-teal text-white' : id === 5 ? 'bg-pink' : ''
}

export default function IdeasCard({ id, title, category, children }: Props) {
  return (
    <div className={clsx(getBgColor(id), 'md:w-ideas md:mx-1 p-4 my-2 md:h-ideas')}>
      <div className={clsx({ 'text-blue': id !== 4 }, 'font-semibold text-xss')}>{category}</div>
      <h3 className="font-semibold text-xs py-4 text-base">{title}</h3>
      <p className="text-cgu text-justify leading-tight">{children}</p>
    </div>
  )
}
