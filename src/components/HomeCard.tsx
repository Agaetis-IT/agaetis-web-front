import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

import Button from './Button'
import styles from '../styles/HomeCard.module.css'

interface Props {
  href: string
  title: string
  description: string
  buttonContent: string
  imgUrl: string
  reverse?: boolean
}

export default function HomeCard({ href, title, description, buttonContent, imgUrl, reverse }: Props) {
  return (
    <div
      className={clsx(
        'flex flex-col my-6 md:my-12 justify-center md:justify-end sm:p-4 md:p-6 lg:p-12 mx-auto md:max-full',
        reverse ? 'sm:flex-row-reverse bg-gray-400' : 'sm:flex-row'
      )}
    >
      <div
        className={clsx(
          'sm:max-w-full self-center p-8 px-4 sm:p-4 sm:mr-0 sm:pr-0 sm:px-2',
          reverse ? 'md:pl-8 lg:pl-16' : 'md:pr-8 lg:pr-16',
          !reverse ? styles.cardVisible : styles.cardVisibleReverse
        )}
      >
        <Link href={href}>
          <a title={href}>
            <h2 className="pb-4 text-black">{title}</h2>
          </a>
        </Link>
        <p className={clsx('text-sm leading-normal text-justify')}>{description}</p>
        <Link href={href}>
          <Button className="w-40 block mx-auto md:mx-0 text-center px-6 py-2 leading-none rounded-full uppercase mt-4 mb-6 md:mb-0 text-xs font-semibold">
            {buttonContent}
          </Button>
        </Link>
      </div>
      <img
        className={`${styles.homeImgMobile} ${styles.homeImg} ${styles.imgShadow} self-center mx-auto md:mx-0`}
        src={imgUrl}
        alt={imgUrl}
      />
    </div>
  )
}
