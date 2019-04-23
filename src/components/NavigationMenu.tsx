import clsx from 'clsx'
import i18next from 'i18next'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'

import Button from './Button'
import './Navigationmenu.css'

function isLanguageSelected(language: string) {
  return i18next.languages[0] === language
}

export default function NavigationMenu() {
  const { t, i18n } = useTranslation()
  const pages = [
    t('navigation.pages.agaetis'),
    t('navigation.pages.ideas'),
    t('navigation.pages.solutions'),
    t('navigation.pages.jobs'),
  ]
  function onLanguageChange(language: string) {
    return (e: React.MouseEvent) => {
      e.preventDefault()
      i18n.changeLanguage(language)
    }
  }
  return (
    <div className="block bg-orange md:bg-transparent flex-grow md:flex-no-grow md:flex md:items-center md:w-auto p-4 md:p-0">
      <div className="text-xs font-medium md:flex-grow">
        {pages.map(page => (
<<<<<<< i18n
          <Link key={page} href="#">
            <Button href="#responsive-header" className="p-2 md:p-3 text-white text-xs font-semibold">
              {page}
            </Button>
          </Link>
        ))}
      </div>
      <div className="hidden md:inline md:ml-12">
        <Link href="#">
          <Button
            href="#"
            className="px-6 py-3 leading-none rounded-full uppercase mt-4 md:mt-0 bg-orange text-white text-xs font-semibold"
          >
            {t('navigation.contact')}
          </Button>
        </Link>
      </div>
      <div className="inline md:hidden text-xs font-medium md:flex-grow">
        <Link href="#">
          <Button href="#" className="md:mt-0 md:mr-16 md:ml-1 p-2 md:p-0 text-white text-xs font-semibold">
            {t('navigation.contact')}
          </Button>
        </Link>
      </div>
      {/*Languages selection */}
      <div className="text-xs md:ml-4 flex flex-row items-center p-2 md:p-0">
        <Button
          href="#"
          className={clsx(
            { 'Button-language--active': isLanguageSelected('en') },
            'mr-1 text-black md:text-white text-xss'
          )}
          onClick={onLanguageChange('en')}
        >
          EN
        </Button>
        <span className="text-white mr-1 hidden md:inline align-middle leading-none text-xss"> - </span>
        <span className="text-black mr-1 block md:hidden align-middle leading-none text-xss">|</span>
        <Button
          href="#"
          className={clsx({ 'Button-language--active': isLanguageSelected('fr') }, 'text-black md:text-white text-xss')}
          onClick={onLanguageChange('fr')}
        >
=======
          <Button key={page} href="#responsive-header" className="p-2 md:p-3 text-white">
            {page}
          </Button>
        ))}
      </div>
      <div className="hidden md:inline md:ml-12">
        <Button
          href="#"
          className="px-6 py-3 leading-none rounded-full uppercase mt-4 md:mt-0 text-white bg-orange text-xs font-semibold"
        >
          Contact
        </Button>
      </div>
      <div className="inline md:hidden text-xs font-medium md:flex-grow">
        <Button href="#" className="md:mt-0 md:mr-16 md:ml-1 p-2 md:p-0 text-white text-xs font-semibold">
          Contact
        </Button>
      </div>
      {/*Languages selection */}
      <div className="text-xs md:ml-4 flex flex-row items-center p-2 md:p-0 text-white">
        <Button href="#" className="mr-1 text-white text-xss">
          EN
        </Button>
        <span className="text-white mr-1 hidden md:inline align-middle leading-none"> - </span>
        <span className="text-white mr-1 block md:hidden align-middle leading-none">|</span>
        <Button href="#" className="text-white">
>>>>>>> :sparkles: Add Footer menu
          FR
        </Button>
      </div>
    </div>
  )
}
