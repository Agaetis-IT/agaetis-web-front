import { useState, useEffect } from 'react'
import clsx from 'clsx'
import Link from 'next/link'

import NavigationMenu from './NavigationMenu'

const logoAgaetisOrange = '/images/logo-agaetis-hor-p164-rgb-150.png'

interface Props {
  displayedPage?: string
  className?: string
}

export default function Header({ className, displayedPage }: Props) {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [position, setPosition] = useState(0)

  function handleToggleMenu() {
    setMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    if (window) {
      setPosition(window.scrollY)
    }

    const handleScroll = () => {
      setPosition(window.scrollY)
    }

    if (window && document) {
      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [setPosition, position])

  return (
    <header className={clsx(`px-4 py-2 xl:px-32 header-1 w-full md:fixed z-1000 bg-white shadow-md transition-all duration-250`, position > 500 ? 'md:py-2' : 'md:py-6', className)}>
      <nav>
        <div className="flex items-center justify-between">
          <button
            className="md:hidden px-3 py-2 font-semibold text-orange-500 m-0 float-right flex flex-col items-center focus:border-black"
            onClick={handleToggleMenu}
          >
            <svg className="fill-current h-5 w-5" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title className="text-black">Menu</title>
              <path d="M0 0h20v2H0V3zm0 8h20v2H0V9zm0 8h10v2H0v-2z" />
            </svg>
          </button>
          <Link href="/">
            <a className="flex items-center self-center">
              <img
                className={clsx('transition-all duration-250', position > 500 && 'md:w-32', 'w-40')}
                src={logoAgaetisOrange}
                alt="Logo Agaetis"
              />
            </a>
          </Link>
          <div className="md:hidden pl-5 pr-6" />
          <div className="hidden md:block">
            <NavigationMenu displayedPage={displayedPage} />
          </div>
          <div className={clsx('hidden lg:block transition-all duration-250', position > 500 && 'md:w-32', 'w-40')} />
        </div>
        <div className={clsx({ 'hidden': !isMenuOpen })}>
          <NavigationMenu displayedPage={displayedPage} />
        </div>
      </nav>
    </header>
  )
}
