import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

interface Props {
  id: number
  title: string
  category: string
  children: string
  className?: string
  slug: string
}

function getBgColor(id: number) {
  return id === 1 || id === 2 || id === 6 ? 'bg-grey' : id === 4 ? 'bg-teal text-white' : id === 5 ? 'bg-pink' : ''
}

function createMarkup(content: string) {
  return { __html: content }
}

export default function IdeasCard({ slug, id, title, category, children }: Props) {
  return (
    <div className={clsx(getBgColor(id), 'md:w-ideas md:mx-1 p-4 my-2 md:h-ideas')}>
      <div className={clsx({ 'text-blue': id !== 4 }, 'font-semibold text-xss')}>{category}</div>
      <Link href={'/ideas/' + slug}>
        <a href={'/ideas/' + slug}>
          <h3 dangerouslySetInnerHTML={createMarkup(title)} className="font-semibold text-xs py-4 text-base" />
        </a>
      </Link>
      <p className="text-cgu text-justify leading-tight">{children}</p>
    </div>
  )
}
