import clsx from 'clsx'
import Link from 'next/link'

import Button from './Button'

import styles from '../styles/NavigationMenu.module.css'

interface Props {
  displayedPage?: string
}

export default function NavigationMenu({ displayedPage }: Props) {
  const pages = [
    ['Agaetis', '/agaetis'],
    ['Solutions', '/solutions'],
    ['Jobs', 'https://agaetis.welcomekit.co/'],
    ['Blog', '/blog'],
  ]

  return (
    <div
      className={clsx('block shadow-md md:shadow-none bg-white md:flex flex-shrink-0 md:items-center p-4 md:p-0 z-1000 left-0 right-0 absolute md:relative')}
    >
      <div className="text-xs font-medium leading-normal">
        {pages.map((page) => (
          <Link key={page[0]} href={page[1]} passHref>
            <Button
              href={page[1]}
              className={clsx(
                `text-black block md:inline-block p-2 py-3 md:p-3 md:px-6 text-base font-black leading-normal transition-all duration-250 ${styles.menuLinkBlackUnderline}`,
                displayedPage === page[1] && `${styles.menuLinkUnderlineSelected}`
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
