import React from 'react'
import clsx from 'clsx'
import './TagCard.css'

interface Props {
  name: string
  category: string
  slug: string
  description: string
  className?: string
}

export default function TagCard({ name, category, slug, description, className }: Props) {
  return (
    <div className={clsx('bg-light-grey p-4', className)}>
      <div className="flex flex-col">
        <div className="tag-idea-category bg-orange text-white">{category}</div>
        <a href={`/${slug}`} dangerouslySetInnerHTML={{ __html: name }} className="text-black font-semibold my-4"></a>
      </div>

      <p dangerouslySetInnerHTML={{ __html: description }} className="text-sm leading-normal"></p>
    </div>
  )
}
