import clsx from 'clsx'
import i18next from 'i18next'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'

import Button from './Button'
import './NavigationMenu.css'

function isLanguageSelected(language: string) {
  return i18next.languages[0] === language
}

interface Props {
  invertColors?: boolean
}

export default function NavigationMenu({ invertColors }: Props) {
  const { t, i18n } = useTranslation()
  const pages = [
    [t('navigation.agaetis-name'), t('navigation.agaetis-href')],
    [t('navigation.ideas-name'), t('navigation.ideas-href')],
    [t('navigation.solutions-name'), t('navigation.solutions-href')],
    [t('navigation.jobs-name'), t('navigation.jobs-href')],
  ]
  function onLanguageChange(language: string) {
    return (e: React.MouseEvent) => {
      e.preventDefault()
      i18n.changeLanguage(language)
    }
  }
  return (
    <div className="block bg-orange md:bg-transparent flex-grow md:flex-no-grow md:flex md-flex-no-shrink md:items-center md:w-auto p-4 md:p-0 nav-menu">
      <div className="text-xs font-medium md:flex-grow">
        {pages.map(page => (
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
      {/*Languages selection */}
      <div
        className={clsx(
          invertColors ? 'text-white' : 'text-black',
          'text-xs md:mx-4 flex flex-row items-center p-2 md:p-0 '
        )}
      >
        <Button
          className={clsx(
            isLanguageSelected('en') ? 'Button-language--active' : { 'md:text-white': invertColors },
            'mr-1 text-xss text-black'
          )}
          disabled
          onClick={onLanguageChange('en')}
        >
          EN
        </Button>
        <span className="mr-1 hidden md:inline align-middle leading-none text-xss"> - </span>
        <span className="text-black mr-1 block md:hidden align-middle leading-none text-xss">|</span>
        <Button
          className={clsx(
            isLanguageSelected('fr') ? 'Button-language--active' : { 'md:text-white': invertColors },
            'text-xss text-black md:mr-2'
          )}
          onClick={onLanguageChange('fr')}
        >
          FR
        </Button>
      </div>
    </div>
  )
}
