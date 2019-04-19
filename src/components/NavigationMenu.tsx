import Link from 'next/link'
import React from 'react'

import Button from './Button'
import { Color } from './common'

export default function NavigationMenu() {
  const pages = ['Agaetis', 'Idées', 'Solutions', 'Jobs']
  const btnColor: Color = 'agaetis'
  return (
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
      <div className="hidden md:inline md:ml-16">
        <Button color={btnColor} href="#">
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
  )
}
