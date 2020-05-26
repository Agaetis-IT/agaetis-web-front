import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'

import Button from './Button'
import './NavigationMenu.css'

interface Props {
  invertColors?: boolean
}

export default function NavigationMenu({ invertColors }: Props) {
  const { t } = useTranslation()
  const pages = [
    [t('navigation.agaetis-name'), t('navigation.agaetis-href')],
    [t('navigation.ideas-name'), t('navigation.ideas-href')],
    [t('navigation.solutions-name'), t('navigation.solutions-href')],
    [t('navigation.jobs-name'), t('navigation.jobs-href')],
    [t('navigation.offers-name'), t('navigation.offers-href')],
  ]
  return (
    <div className="block bg-orange md:bg-transparent flex-grow md:flex-no-grow md:flex md-flex-no-shrink md:items-center md:w-auto p-4 md:p-0 nav-menu">
      <div className="text-xs font-medium md:flex-grow">
        {pages.map((page) => (
          <Link key={page[0]} href={page[1]}>
            <Button
              className={clsx(
                { 'md:text-black': !invertColors },
                'block md:inline-block p-2 py-3 md:p-3 md:px-4 text-xs font-semibold text-white'
              )}
            >
              {page[0]}
            </Button>
          </Link>
        ))}
      </div>
      <div className="hidden md:inline md:ml-14">
        <Link href="/contact">
          <Button className="block md:inline-block px-6 py-3 leading-none rounded-full uppercase mt-4 md:mt-0 bg-orange text-white text-xs font-semibold">
            {t('navigation.contact')}
          </Button>
        </Link>
      </div>
      <div className="inline md:hidden text-xs font-medium md:flex-grow">
        <Link href="/contact">
          <Button className="block md:inline-block block md:mt-0 md:mr-16 md:ml-1 p-2 py-3 md:p-0 text-white text-xs font-semibold">
            {t('navigation.contact')}
          </Button>
        </Link>
      </div>
    </div>
  )
}
