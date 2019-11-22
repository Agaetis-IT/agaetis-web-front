import clsx from 'clsx'
import React from 'react'

import './HomeCard.css'

interface Props {
  className?: string
  title: string
  description: string
  descBlockClass: string
  imgShadow?: boolean
  imgUrl: string
}

export default function AgaetisCard({ className, title, description, imgShadow, descBlockClass, imgUrl }: Props) {
  return (
    <div className={clsx('flex flex-col my-6 md:my-12 justify-between md:p-8 mx-auto md:max-w-lg', className)}>
      <div className={clsx('md:max-w-xs mx-4 md:mx-0 self-center', descBlockClass)}>
        <h2 className="w-40 pb-4 text-black">{title}</h2>

        <p className="text-xs leading-normal text-justify justify-fix">{description}</p>
      </div>
      <img
        className={clsx({ 'img-shadow': imgShadow }, 'home-img self-center mx-auto md:mx-0 mt-4')}
        src={imgUrl}
        alt={imgUrl}
      />
    </div>
  )
}
