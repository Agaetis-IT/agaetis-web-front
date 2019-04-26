import clsx from 'clsx'
import Link from 'next/link'
import React, { useState } from 'react'

import logoAgaetisMobile from '../images/logo-agaetis-hor-p164-rgb-150.png'
import logoAgaetisDesktop from '../images/logo-agaetis-hor-white-rgb-150.png'

import './Header.css'
import NavigationMenu from './NavigationMenu'

interface Props {
  invertColors?: boolean
  className?: string
}

export type HeaderProps = Props

export default function Header({ invertColors, className }: Props) {
  const [isMenuOpen, setMenuOpen] = useState(false)
  function handleToggleMenu(): void {
    setMenuOpen(!isMenuOpen)
  }

  return (
    <header className={clsx({ 'md:bg-black': invertColors }, 'p-0 md:p-8', className)}>
      <nav className="flex flex-col md:flex-row item-start md:items-center flex-wrap justify-between md:justify-center">
        {/*Site logo + Hamburger icon */}

        <div className="flex items-center flex-no-shrink text-orange md:text-white mb-1 md:mb-0">
          <Link href="/">
            <a className="ml-auto mr-auto md:ml-0 md:mr-10 flex items-center">
              <img className={clsx({ 'md:inline': invertColors }, 'logoAgaetis hidden')} src={logoAgaetisDesktop} />
              <img className={clsx(invertColors ? 'md:hidden' : 'inline', 'logoAgaetis')} src={logoAgaetisMobile} />
            </a>
          </Link>
          <button
            className="md:hidden px-3 py-2 font-semibold text-orange m-0 float-right flex flex-col items-center focus:border-black"
            onClick={handleToggleMenu}
          >
            <svg className="fill-current h-5 w-5" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title className="text-black">Menu</title>
              <path d="M0 0h20v2H0V3zm0 8h20v2H0V9zm0 8h20v2H0v-2z" />
            </svg>
            <span className="uppercase text-black text-xxs pt-1">Menu</span>
          </button>
        </div>
        <div id="main_nav" className={clsx({ 'hidden md:inline': !isMenuOpen })}>
          <NavigationMenu invertColors={invertColors} />
        </div>
      </nav>
    </header>
  )
}
