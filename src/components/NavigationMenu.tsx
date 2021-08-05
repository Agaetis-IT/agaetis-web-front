import { useEffect, useState } from 'react'
import clsx from 'clsx'
import Link from 'next/link'

import Button from './Button'

import styles from '../styles/NavigationMenu.module.css'

interface Props {
  displayedPage?: string
  otherColorClass?: string
}

export default function NavigationMenu({ displayedPage, otherColorClass }: Props) {
  const [position, setPosition] = useState(0)
  const [width, setWidth] = useState(0)

  const pages = [
    ['Agaetis', '/agaetis'],
    ['Solutions', '/solutions'],
    ['Jobs', 'https://agaetis.welcomekit.co/'],
    ['Blog', '/blog'],
  ]

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
    <div
      className={clsx(
        'block shadow-md md:shadow-none md:flex flex-shrink-0 md:items-center p-4 md:p-0 z-1000 left-0 right-0 absolute md:relative',
        width < 820 && 'bg-white'
      )}
    >
      <div className="text-xs font-medium leading-normal">
        {pages.map((page) => (
          <Link key={page[0]} href={page[1]} passHref>
            <Button
              href={page[1]}
              className={clsx(
                `block md:inline-block p-2 py-3 md:p-3 md:px-6 text-base font-black leading-normal transition-all duration-250 ${styles.menuLinkUnderline}`,
                displayedPage === page[1] && styles.menuLinkUnderlineSelected,
                width > 820 && position < 500 && otherColorClass
                  ? `text-white ${styles.menuLinkWhiteUnderline}`
                  : `text-black ${styles.menuLinkBlackUnderline}`
              )}
            >
              {page[0]}
            </Button>
          </Link>
        ))}
      </div>
      <div className="md:ml-12 text-base leading-normal font-medium flex justify-center">
        <Link href="/contact" passHref>
          <Button
            href="/contact"
            className="bg-white hover:bg-gray-200 text-orange-500 inline-block px-6 py-2 font-bold leading-none rounded-full uppercase text-base shadow-md hover:shadow-lg transition-all duration-250"
          >
            Contact
          </Button>
        </Link>
      </div>
    </div>
  )
}
