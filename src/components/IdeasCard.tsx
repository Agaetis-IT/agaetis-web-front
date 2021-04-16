import Link from 'next/link'
import React from 'react'
import { createMarkup } from '../Services/textUtilities'

import './IdeasCard.css'

interface Props {
  title: string
  slug: string
  description: string
  image?: string
}

function getBackgroundStyle(image?: string) {
  if (!image) return {}

  return {
    background: `url("${image}")`,
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
          <div style={getBackgroundStyle(image)} className="w-1/4"></div>
          <div className="py-4 px-8 h-48 w-3/4">
            <div className="h-1/3">
              <h3 dangerouslySetInnerHTML={createMarkup(title)} className="font-semibold text-xs py-2 text-base" />
            </div>
            <div className="h-2/3">
              <p className="text-xs text-justify leading-normal">{description}</p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}
