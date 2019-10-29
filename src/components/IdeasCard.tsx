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

function createMarkup(content: string) {
  return { __html: content }
}

export default function IdeasCard({ slug, id, title, category, children, className }: Props) {
  return (
    <div className={clsx('md:w-1/3 p-4 my-2 md:h-ideas', className)}>
      <div className={clsx({ 'text-blue': id !== 6 }, 'font-semibold text-xss')}>{category}</div>
      <Link href={`/ideas/${slug}`} as={'/' + slug}>
        <a href={`/ideas/${slug}`} className={clsx(id !== 6 ? 'text-black' : 'text-white')}>
          <h3 dangerouslySetInnerHTML={createMarkup(title)} className="font-semibold text-xs py-4 text-base" />
        </a>
      </Link>
      <p className="text-cgu text-justify leading-tight">{children}</p>
    </div>
  )
}
