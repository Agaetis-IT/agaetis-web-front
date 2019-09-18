import React from 'react'

interface Props {
  title: string
  category: string
  children: string
}

export default function IdeasCard({ title, category, children }: Props) {
  return (
    <div className="w-1/3 p-6">
      <div className="text-blue font-semibold text-xss">{category}</div>
      <h3 className="font-semibold text-xs py-2 text-base">{title}</h3>
      <p className="text-cgu text-justify">{children}</p>
    </div>
  )
}
