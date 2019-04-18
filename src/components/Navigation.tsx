import Button from './Button'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Navigation() {
  const [pages, setPages] = useState(['Agaetis', 'Idées', 'Solutions', 'Jobs'])
  return (
    <nav className="flex flex-col md:flex-row item-start md:items-center flex-wrap justify-between md:justify-center">
      {/*Site logo + Hamburger icon */}
      <div className="flex items-center flex-no-shrink text-agaetis md:text-white mb-1 md:mb-0">
        <div className="ml-auto mr-auto md:ml-0 md:mr-16 flex items-center">
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
        </div>
        <button className="md:hidden px-3 py-2 font-semibold text-agaetis m-0 float-right flex flex-col items-center">
          <svg className="fill-current h-5 w-5" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title className="text-black">Menu</title>
            <path d="M0 0h20v2H0V3zm0 8h20v2H0V9zm0 8h20v2H0v-2z" />
          </svg>
          <span className="uppercase text-black text-xxs pt-1">Menu</span>
        </button>
      </div>
      {/*Main menu + button + language */}
      <div className="block bg-agaetis md:bg-transparent sm:flex-grow md:flex-no-grow md:flex md:items-center md:w-auto p-4 md:p-0">
        <div className="text-xs font-medium md:flex-grow">
          {pages.map(page => {
            return (
              <Link key={page} href="#responsive-header">
                <a className="block md:inline-block text-white p-2 md:p-3">{page}</a>
              </Link>
            )
          })}
        </div>
        {/* if md/lg screen => Button else => simple link*/}
        <div className="hidden md:inline md:ml-16">
          <Button color="agaetis" url="#">
            Contact
          </Button>
        </div>
        <div className="inline md:hidden text-xs font-medium md:flex-grow">
          <Link href="#">
            <a className="block md:inline-block text-white md:mt-0 md:mr-16 md:ml-1 p-2 md:p-0">Contact</a>
          </Link>
        </div>
        {/*Languages selection */}
        <div className="text-xs md:ml-4 flex flex-row">
          <Link href="#">
            <a className="block md:inline-block text-white md:mt-0 mr-1 p-2 pr-0 md:p-0">EN</a>
          </Link>
          <span className="text-white mr-1 hidden md:inline align-middle leading-none">-</span>
          <span className="text-white mr-1 pr-1 pl-1 pt-2 inline md:hidden align-middle leading-none">|</span>
          <Link href="#">
            <a className="block md:inline-block text-white md:mt-0 pt-2 md:pt-0 pb-2 md:pb-0">FR</a>
          </Link>
        </div>
      </div>
    </nav>
  )
}
