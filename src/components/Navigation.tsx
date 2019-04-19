import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import NavigationMenu from './NavigationMenu'

export default function Navigation() {
  const navMenu = useNavMenu()

  const width = useWindowWidth()

  return (
    <nav className="flex flex-col md:flex-row item-start md:items-center flex-wrap justify-between md:justify-center">
      {/*Site logo + Hamburger icon */}
      <div className="flex items-center flex-no-shrink text-orange md:text-white mb-1 md:mb-0">
        <div className="logo" />
        <Link href="/">
          <a className="text-orange md:text-white ml-auto mr-auto md:ml-0 md:mr-16 flex items-center">
            <svg
              className="fill-current h-8 w-8 mr-2"
              width="54"
              height="54"
              viewBox="0 0 54 54"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
            </svg>
            <span className="text-normal leading-none">agaetis</span>
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
      <div className={navMenu.navState && width < 768 ? 'hidden' : ''}>
        <NavigationMenu />
      </div>
    </nav>
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
  return 768
}
