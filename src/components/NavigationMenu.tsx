import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'

import Button from './Button'
import './NavigationMenu.css'

interface Props {
  invertColors?: boolean
  position: number
}

export default function NavigationMenu({ invertColors, position }: Props) {
  const { t } = useTranslation()
  const pages = [
    ['Blog', '/blog'],
    ['Agaetis', '/agaetis'],
    ['Secteurs', '/sectors'],
    ['Jobs', '/jobs'],
  ]

  return (
    <div className="block bg-orange md:bg-transparent flex-grow md:flex-no-grow md:flex md-flex-no-shrink md:items-center md:w-100 p-4 md:p-0 nav-menu">
      <div className="text-xs font-medium md:flex-grow">
        {pages.map((page) => (
          <Link key={page[0]} href={page[1]}>
            <Button
              className={clsx(
                !invertColors || position > 200
                  ? 'text-white md:text-black menu-link-black-underline'
                  : 'text-white menu-link-white-underline',
                'block md:inline-block p-2 py-3 md:p-3 md:px-6 xl:px-8 text-base font-thin'
              )}
            >
              {page[0]}
            </Button>
          </Link>
        ))}
      </div>
      <div className="hidden md:inline md:ml-14 xl:mr-8">
        <Link href="/contact">
          <Button
            className={clsx(
              !invertColors || position > 200 ? 'bg-orange text-white' : 'bg-white text-orange',
              'block md:inline-block px-6 py-3 leading-none rounded-full uppercase mt-4 md:mt-0  text-base font-thin shadow-md'
            )}
          >
            {t('navigation.contact')}
          </Button>
        </Link>
      </div>
      <div className="inline md:hidden text-base font-medium md:flex-grow">
        <Link href="/contact">
          <Button className="block md:inline-block block md:mt-0 md:mr-16 md:ml-1 p-2 py-3 md:p-0 text-white text-base font-thin">
            {t('navigation.contact')}
          </Button>
        </Link>
      </div>
    </div>
  )
}
