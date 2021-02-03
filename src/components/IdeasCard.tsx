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

function getBackgroundStyle(id: number, image?: string) {
  if (id < 0) {
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

function getStyle(id: number) {
  return id > 0 ? { backgroundColor: 'rgba(255, 255, 255, 0.8)' } : {}
}

export default function IdeasCard({ slug, id, title, categories, children, className, image }: Props) {
  return (
    <div style={getBackgroundStyle(id, image)} className={clsx(className, 'idea-card')}>
      <div style={getStyle(id)}>
        <div className="p-4 ideas-inner-content">
          <div className="top">
            <div className={clsx({ 'text-blue': id !== 6 }, 'font-semibold text-xss')}>
              {categories.map((cat: string) => cat + ' ')}
            </div>
            <Link href={`/${slug}`}>
              <a className={clsx(id !== 6 ? 'text-black' : 'text-white')}>
                <h3 dangerouslySetInnerHTML={createMarkup(title)} className="font-semibold text-xs py-4 text-base" />
              </a>
            </Link>
          </div>
          <div className="bottom">
            <div className="text-xs text-justify leading-normal h-auto">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
