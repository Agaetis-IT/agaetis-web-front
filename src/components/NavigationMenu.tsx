import clsx from 'clsx'
import Link from 'next/link'

import Button from './Button'
import styles from '../styles/NavigationMenu.module.css'

interface Props {
  invertColors?: boolean
  displayedPage?: string
  position: number
}

export default function NavigationMenu({ invertColors, position, displayedPage }: Props) {
  const pages = [
    ['Blog', '/blog'],
    ['Agaetis', '/agaetis'],
    ['Solutions', '/solutions'],
    ['Jobs', 'https://agaetis.welcomekit.co/'],
  ]

  return (
    <div
      className={`block bg-orange-500 md:bg-transparent flex-grow md:flex-grow-0 md:flex md-flex-shrink-0 md:items-center p-4 md:p-0 ${styles.navMenu}`}
    >
      <div className="text-xs font-medium leading-normal md:flex-grow">
        {pages.map((page) => (
          <Link key={page[0]} href={page[1]}>
            <Button
              href={page[1]}
              className={clsx(
                !invertColors || position > 200
                  ? `text-white md:text-black ${styles.menuLinkBlackUnderline}`
                  : `text-white ${styles.menuLinkWhiteUnderline}`,
                  displayedPage === page[1] && `${styles.menuLinkUnderlineSelected}`,
                'block md:inline-block p-2 py-3 md:p-3 md:px-6 xl:px-8 text-base leading-normal font-extralight'
              )}
            >
              {page[0]}
            </Button>
          </Link>
        ))}
      </div>
      <div className="hidden md:inline md:ml-14 xl:mr-8">
        <Link href="/contact">
          <Button
            href="/contact"
            className={clsx(
              !invertColors || position > 200 ? 'bg-orange-500 text-white' : 'bg-white text-orange-500',
              'block md:inline-block px-6 py-3 leading-none rounded-full uppercase mt-4 md:mt-0 text-base font-extralight shadow-md'
            )}
          >
            Contact
          </Button>
        </Link>
      </div>
      <div className="inline md:hidden text-base leading-normal font-medium md:flex-grow">
        <Link href="/contact">
          <Button
            href="/contact"
            className="block md:inline-block md:mt-0 md:mr-16 md:ml-1 p-2 py-3 md:p-0 text-white text-base leading-normal font-extralight"
          >
            Contact
          </Button>
        </Link>
      </div>
    </div>
  )
}
