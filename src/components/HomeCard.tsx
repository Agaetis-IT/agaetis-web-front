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
    <div className={clsx('flex flex-col my-6 md:my-12 justify-between md:p-8 mx-auto md:max-w-md', className)}>
      <div className={clsx('md:max-w-xs mx-4 md:mx-0 self-center', descBlockClass)}>
        <h2 className="pb-4">{title}</h2>
        <p className="text-xs leading-normal text-justify justify-fix">{description}</p>
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
