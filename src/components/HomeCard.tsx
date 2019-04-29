import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

import Button from './Button'
import './HomeCard.css'

interface Props {
  className?: string
  href: string
  title: string
  description: string
  descBlockClass: string
  buttonContent: string
  imgClass: string
}

export default function HomeCard({ className, title, description, buttonContent, descBlockClass, imgClass }: Props) {
  return (
    <div className={className}>
      <div className={descBlockClass}>
        <h2 className="pb-4">{title}</h2>
        <p className="text-xss leading-tight">{description}</p>
        <Link href="/agaetis">
          <Button
            href="/agaetis"
            className="px-6 py-2 leading-none rounded-full uppercase mt-4 mb-6 md:mb-0 bg-orange text-white text-xs font-semibold inline-block"
          >
            {buttonContent}
          </Button>
        </Link>
      </div>
      <div className={clsx(imgClass, 'home-img mx-auto md:mx-0')} />
    </div>
  )
}
