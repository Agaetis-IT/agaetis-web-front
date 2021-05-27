import clsx from 'clsx'
import React from 'react'

import styles from '../styles/HomeCard.module.css'

interface Props {
  className?: string
  title: string
  description: string
  descBlockClass?: string
  imgShadow?: boolean
  imgUrl?: string
}

export default function AgaetisCard({ className, title, description, imgShadow, descBlockClass, imgUrl }: Props) {
  return (
    <div className={clsx('flex flex-col md:my-12 justify-between p-8 mx-auto md:max-w-full', className)}>
      <div className={clsx('md:mx-0 self-center', imgUrl ? 'md:max-w-xs' : 'md:max-w-full', descBlockClass)}>
        <h2 className="pb-4 text-black">{title}</h2>

        <p className="text-sm leading-normal text-justify">{description}</p>
      </div>
      {imgUrl && (
        <img
          className={clsx(
            imgShadow ? styles.imgShadow : '',
            styles.homeImgMobile,
            styles.homeImg,
            'mx-auto md:mx-0 mt-6 md:mt-0'
          )}
          src={imgUrl}
          alt={imgUrl}
        />
      )}
    </div>
  )
}
