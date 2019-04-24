import Link from 'next/link'
import React from 'react'

import Button from './Button'

const pages = ['Agaetis', 'Idées', 'Solutions', 'Jobs']
export default function NavigationMenu() {
  return (
    <div className="block bg-orange md:bg-transparent flex-grow md:flex-no-grow md:flex md:items-center md:w-auto p-4 md:p-0">
      <div className="text-xs font-medium md:flex-grow">
        {pages.map(page => (
          <Link key={page} href="#">
            <Button href="#responsive-header" className="p-2 md:p-3 text-white text-xs font-semibold">
              {page}
            </Button>
          </Link>
        ))}
      </div>
      <div className="hidden md:inline md:ml-12">
        <Link href="#">
          <Button
            href="#"
            className="px-6 py-3 leading-none rounded-full uppercase mt-4 md:mt-0 bg-orange text-white text-xs font-semibold"
          >
            Contact
          </Button>
        </Link>
      </div>
      <div className="inline md:hidden text-xs font-medium md:flex-grow">
        <Link href="#">
          <Button href="#" className="md:mt-0 md:mr-16 md:ml-1 p-2 md:p-0 text-white text-xs font-semibold">
            Contact
          </Button>
        </Link>
      </div>
      {/*Languages selection */}
      <div className="text-xs md:ml-4 flex flex-row items-center p-2 md:p-0">
        <Button href="#" className="mr-1 text-white text-xss">
          EN
        </Button>
        <span className="text-white mr-1 hidden md:inline align-middle leading-none text-xss"> - </span>
        <span className="text-white mr-1 block md:hidden align-middle leading-none text-xss">|</span>
        <Button href="#" className="text-white text-xss">
          FR
        </Button>
      </div>
    </div>
  )
}
