import './Header.css'

import React, { useEffect, useState } from 'react'

import { LazyLoadImage } from 'react-lazy-load-image-component'
import Link from 'next/link'
import NavigationMenu from './NavigationMenu'
import clsx from 'clsx'
import logoAgaetisDesktop from '../public/images/logo-agaetis-hor-white-rgb-150.png'
import logoAgaetisMobile from '../public/images/logo-agaetis-hor-p164-rgb-150.png'

interface Props {
  invertColors: boolean
  className?: string
}

function getHeaderClass(invertColors: boolean, position: number) {
  let classname = ''
  if (invertColors) {
    if (position > 200) {
      classname += 'headerWhite'
    } else {
      classname += 'hidden'
    }
  } else {
    if (position > 200) {
      classname += 'headerWhite'
    } else {
      classname += 'hidden'
    }
  }
  return classname
}

export default function Header({ invertColors, className }: Props) {
  const [isMenuOpen, setMenuOpen] = useState(false)
  function handleToggleMenu(): void {
    setMenuOpen(!isMenuOpen)
  }
  const [scrollPos, setScrollPos] = useState(0)
  const [scrollDir, setScrollDir] = useState('DOWN')
  const [position, setPosition] = useState(0)

  useEffect(() => {
    if (window) {
      setPosition(window.scrollY)
    }
    const handleScroll = () => {
      setPosition(window.scrollY)
      if (document.body.getBoundingClientRect().top > scrollPos) {
        setScrollDir('UP')
      } else {
        setScrollDir('DOWN')
      }
      setScrollPos(document.body.getBoundingClientRect().top)
    }
    if (window && document) {
      window.addEventListener('scroll', handleScroll)
    }
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [setPosition, setScrollDir, setScrollPos, scrollPos, scrollDir, position])

  return (
    <>
      <header className={clsx('p-3 md:py-16 header-1', 'header md:absolute md:mx-auto', className)}>
        <nav className="flex flex-col md:flex-row item-start md:items-center flex-wrap justify-between lg:justify-center">
          {/*Site logo + Hamburger icon */}

          <div className="flex items-center flex-no-shrink text-orange md:text-white">
            <Link href="/">
              <a className="ml-auto mr-auto md:ml-0  flex items-center">
                {
                  // eslint-disable-next-line
                  // @ts-ignore-next-line
                  <LazyLoadImage
                    effect="blur"
                    className={clsx({ 'md:inline': invertColors && position < 200 }, 'logoAgaetis hidden')}
                    src={logoAgaetisDesktop}
                    alt="logo agaetis"
                  ></LazyLoadImage>
                }
                {
                  // eslint-disable-next-line
                  // @ts-ignore-next-line
                  <LazyLoadImage
                    effect="blur"
                    className={clsx(
                      invertColors && position < 200 ? 'md:hidden' : 'inline',
                      position > 200 ? 'logoSticky' : 'logoAgaetis'
                    )}
                    src={logoAgaetisMobile}
                    alt="logo agaetis"
                  ></LazyLoadImage>
                }
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
          <div id="main_nav" className={clsx({ 'hidden md:inline': !isMenuOpen }, 'w-100 mx-auto md:mx-12 lg:mx-auto')}>
            <NavigationMenu invertColors={invertColors} position={position} />
          </div>
        </nav>
      </header>
      <header
        className={clsx(
          'p-3 md:py-16',
          'header md:absolute md:mx-auto',
          className,
          getHeaderClass(!!invertColors, position),
          invertColors && position < 400 && scrollDir == 'UP' ? 'animation-up' : '',
          invertColors && position > 100 && position < 1000 && scrollDir == 'DOWN' ? 'animation-down' : '',
          !invertColors && position < 400 && scrollDir == 'UP' ? 'animation-up' : '',
          !invertColors && position > 100 && position < 800 && scrollDir == 'DOWN' ? 'animation-down' : ''
        )}
      >
        <nav className="flex flex-col md:flex-row item-start md:items-center flex-wrap justify-between lg:justify-center">
          {/*Site logo + Hamburger icon */}

          <div className="flex items-center flex-no-shrink text-orange md:text-white">
            <Link href="/">
              <a className="ml-auto mr-auto md:ml-0  flex items-center">
                <img
                  className={clsx({ 'md:inline': invertColors && position < 200 }, 'logoAgaetis hidden')}
                  src={logoAgaetisDesktop}
                  alt="logo agaetis"
                />
                <img
                  className={clsx(
                    invertColors && position < 200 ? 'md:hidden' : 'inline',
                    position > 200 ? 'logoSticky' : 'logoAgaetis'
                  )}
                  src={logoAgaetisMobile}
                  alt="logo agaetis"
                />
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
          <div id="main_nav" className={clsx({ 'hidden md:inline': !isMenuOpen }, 'w-100 mx-auto md:mx-12 lg:mx-auto')}>
            <NavigationMenu invertColors={invertColors && position < 200} position={position} />
          </div>
        </nav>
      </header>
    </>
  )
}
