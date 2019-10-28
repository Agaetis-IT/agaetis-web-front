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
  imgUrl: string
}

export default function HomeCard({
  className,
  href,
  title,
  description,
  buttonContent,
  descBlockClass,
  imgUrl,
}: Props) {
  return (
    <div className={clsx('flex flex-col my-6 md:my-12 justify-between md:p-8 mx-auto md:max-w-md', className)}>
      <div className={clsx('md:max-w-xs mx-4 md:mx-0 self-center', descBlockClass)}>
        <Link href={href}>
          <a href={href} title={href}>
            <h2 className="pb-4 text-black">{title}</h2>
          </a>
        </Link>
        <p className="text-xs leading-normal text-justify justify-fix">{description}</p>
        <Link href={href}>
          <Button
            href={href}
            className="w-32 md:w-40 block mx-auto md:mx-0 text-center px-6 py-2 leading-none rounded-full uppercase mt-4 mb-6 md:mb-0 bg-orange text-white text-xs font-semibold"
          >
            {buttonContent}
          </Button>
        </Link>
      </div>
      <img className="home-img mx-auto md:mx-0" src={imgUrl} alt={imgUrl} />
    </div>
  )
}
