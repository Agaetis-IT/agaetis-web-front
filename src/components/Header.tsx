import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import './Header.css'
import NavigationMenu from './NavigationMenu'

export default function Header() {
  const navMenu = useNavMenu()

  const width = useWindowWidth()
  return (
    <header className="md:bg-black p-0 md:p-8">
      <nav className="flex flex-col md:flex-row item-start md:items-center flex-wrap justify-between md:justify-center">
        {/*Site logo + Hamburger icon */}

        <div className="flex items-center flex-no-shrink text-orange md:text-white mb-1 md:mb-0">
          <Link href="/">
            <a className="ml-auto mr-auto md:ml-0 md:mr-10 flex items-center">
              <img
                className="logoAgaetis hidden md:inline"
                src={require('../static/assets/logo-agaetis-hor-white-rgb-150.png')}
              />
              <img
                className="logoAgaetis inline md:hidden"
                src={require('../static/assets/logo-agaetis-hor-p164-rgb-150.png')}
              />
            </a>
          </Link>
          <button
            className="md:hidden px-3 py-2 font-semibold text-orange m-0 float-right flex flex-col items-center focus:border-black"
            onClick={navMenu.onClick}
          >
            <svg className="fill-current h-5 w-5" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title className="text-black">Menu</title>
              <path d="M0 0h20v2H0V3zm0 8h20v2H0V9zm0 8h20v2H0v-2z" />
            </svg>
            <span className="uppercase text-black text-xxs pt-1">Menu</span>
          </button>
        </div>
        <div className={navMenu.navState && width < 800 ? 'hidden' : ''}>
          <NavigationMenu />
        </div>
      </nav>
    </header>
  )
}

function useNavMenu() {
  const [navState, setNavState] = useState(true)
  function handleToggleMenu(e: React.MouseEvent): void {
    e.preventDefault()
    setNavState(!navState)
  }
  return { navState, onClick: handleToggleMenu }
}

function useWindowWidth() {
  if (typeof window !== 'undefined') {
    const [width, setWidth] = useState(window.innerWidth)
    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth)
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    })
    return width
  }
  return 800
}
