import clsx from 'clsx'
import Link from 'next/link'

import Button from './Button'

import commonStyles from '../styles/Common.module.css'
import styles from '../styles/NavigationMenu.module.css'

interface Props {
  isHamburger?: boolean
  displayedPage?: string
}

export default function NavigationMenu({ isHamburger, displayedPage }: Props) {
  const pages = [
    ['Agaetis', '/agaetis'],
    ['Solutions', '/solutions'],
    ['Jobs', 'https://agaetis.welcomekit.co/'],
    ['Blog', '/blog'],
  ]

  return (
    <div
      className={clsx('block bg-white md:flex flex-shrink-0 md:items-center p-4 md:p-0 z-1000 left-0 right-0 absolute md:relative mt-6 md:mt-0')}
    >
      <div className="text-xs font-medium leading-normal">
        {pages.map((page) => (
          <Link key={page[0]} href={page[1]}>
            <Button
              href={page[1]}
              className={clsx(
                `text-black ${styles.menuLinkBlackUnderline}`,
                  displayedPage === page[1] && `${styles.menuLinkUnderlineSelected}`,
                `block md:inline-block p-2 py-3 md:p-3 md:px-6 xl:px-8 text-base font-black leading-normal ${commonStyles.smoothTransition}`
              )}
            >
              {page[0]}
            </Button>
          </Link>
        ))}
      </div>
      <div className="md:ml-12 lg:mr-20 xl:mr-32 text-base leading-normal font-medium flex justify-center">
        <Link href="/contact">
          <Button
            href="/contact"
            className={`bg-white hover:bg-gray-200 text-orange-500 inline-block px-6 py-2 font-bold leading-none rounded-full uppercase text-base shadow-md hover:shadow-lg ${commonStyles.smoothTransition}`}
          >
            Contact
          </Button>
        </Link>
      </div>
    </div>
  )
}
