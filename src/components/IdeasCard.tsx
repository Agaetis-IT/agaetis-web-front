import Link from 'next/link'
import React from 'react'
import { createMarkup } from '../Services/textUtilities'
import publicRuntimeConfig from '../config/env.config'

interface Props {
  title: string
  slug: string
  description: string
  image?: string
}

function getBackgroundStyle(image?: string) {
  return {
    background: image
      ? `url("${image}")`
      : `url("${publicRuntimeConfig.NEXT_APP_SITE_URL}/static/images/blog-post-placeholder.jpg")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }
}

export default function IdeasCard({ slug, title, image, description }: Props) {
  return (
    <Link href={`/${slug}`}>
      <a className="text-black w-full">
        <div className="bg-white flex">
          <div style={getBackgroundStyle(image)} className="w-3/10"></div>
          <div className="py-6 px-8 h-ideas-lg w-7/10">
            <div className="h-1/3">
              <h3 dangerouslySetInnerHTML={createMarkup(title)} className="font-semibold text-xs md:text-base" />
            </div>
            <div className="h-1/2">
              <div
                className="overflow-hidden"
                style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}
              >
                <p className="text-xs text-justify leading-normal">{description}</p>
              </div>
            </div>
            <div className="h-1/6 text-orange text-xs font-semibold">
              <p className="mt-4">
                {'>'} <u>Lire l'article</u>
              </p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}
