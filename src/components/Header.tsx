import { useState, useEffect } from 'react'
import clsx from 'clsx'
import Link from 'next/link'

import NavigationMenu from './NavigationMenu'

const orangeLogo = '/images/logo-agaetis-hor-p164-rgb-150.png'
const whiteLogo = '/images/logo-agaetis-hor-white-rgb-150.png'

interface Props {
  displayedPage?: string
  otherColorClass?: string
}

export default function Header({ displayedPage, otherColorClass }: Props) {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [position, setPosition] = useState(0)
  const [width, setWidth] = useState(0)

  function handleToggleMenu() {
    setMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    if (window) {
      setPosition(window.scrollY)
      setWidth(window.innerWidth)
    }

    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    const handleScroll = () => {
      setPosition(window.scrollY)
    }

    if (window && document) {
      window.addEventListener('scroll', handleScroll)
      window.addEventListener('resize', handleResize)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [setPosition, position])

  return (
    <header
      className={clsx(
        'px-4 py-2 xl:px-32 header-1 w-full md:fixed z-1000 transition-all duration-250 md:py-2',
        width > 820 && position < 500 && otherColorClass ? otherColorClass : 'bg-white shadow-md'
      )}
    >
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
                className="transition-all duration-250 md:w-32 w-40"
                src={width > 820 && position < 500 && otherColorClass ? whiteLogo : orangeLogo}
                title="Agaetis"
                alt="Logo Agaetis"
                width={1035}
                height={330}
                loading="eager"
              />
            </a>
          </Link>
          <div className="md:hidden pl-5 pr-6" />
          <div className="hidden md:block">
            <NavigationMenu displayedPage={displayedPage} otherColorClass={otherColorClass} />
          </div>
          <div className="hidden lg:block transition-all duration-250 md:w-32 w-40" />
        </div>
        <div className={clsx({ hidden: !isMenuOpen })}>
          <NavigationMenu displayedPage={displayedPage} otherColorClass={otherColorClass} />
        </div>
      </nav>
    </header>
  )
}
