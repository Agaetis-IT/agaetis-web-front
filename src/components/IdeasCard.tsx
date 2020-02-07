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
  image?: string
}

function createMarkup(content: string) {
  return { __html: content }
}

function getStyle(id: number, image?: string) {
  if (id < 0 && image) {
    return {
      background: `url("${image}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }
  } else {
    return {}
  }
}

export default function IdeasCard({ slug, id, title, category, children, className, image }: Props) {
  return (
    <div style={getStyle(id, image)} className={clsx(className)}>
      <div className={clsx({ 'text-blue': id !== 6 }, 'font-semibold text-xss')}>{category}</div>
      <Link href={`/${slug}`}>
        <a className={clsx(id !== 6 ? 'text-black' : 'text-white')}>
          <h3 dangerouslySetInnerHTML={createMarkup(title)} className="font-semibold text-xs py-4 text-base" />
        </a>
      </Link>
      <p className="text-cgu text-justify leading-tight h-12 overflow-y-hidden">{children}</p>
    </div>
  )
}
