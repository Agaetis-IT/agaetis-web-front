import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

import './IdeasCard.css'

interface Props {
  id: number
  title: string
  categories: string[]
  children: string | React.ReactElement
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

export default function IdeasCard({ slug, id, title, categories, children, className, image }: Props) {
  return (
    <div style={getStyle(id, image)} className={clsx(className)}>
      <div className="top">
        <div className={clsx({ 'text-blue': id !== 6 }, 'font-semibold text-xss')}>
          {categories.map((cat: string) => cat + ' ')}
        </div>
        <Link href={`/${escape(slug)}`}>
          <a className={clsx(id !== 6 ? 'text-black' : 'text-white')}>
            <h3 dangerouslySetInnerHTML={createMarkup(title)} className="font-semibold text-xs py-4 text-base" />
          </a>
        </Link>
      </div>
      <div className="bottom">
        <div className="text-xs text-justify leading-normal h-auto">{children}</div>
      </div>
    </div>
  )
}
