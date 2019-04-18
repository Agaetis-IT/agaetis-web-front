import React from 'react'
import Button from '../components/Button'
export default function Navigation() {
  return (
    <nav className="flex items-center justify-center">
      <div className="flex items-center flex-no-shrink text-white mr-16">
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
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 text-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="block lg:flex lg:items-center lg:w-auto">
        <div className="text-xs">
          <a href="#responsive-header" className="block lg:inline-block text-white lg:mt-0 mr-4">
            Agaetis
          </a>
          <a href="#responsive-header" className="block lg:inline-block text-white lg:mt-0 mr-4 ml-1">
            Idées
          </a>
          <a href="#responsive-header" className="block lg:inline-block text-white lg:mt-0 mr-4 ml-1">
            Solutions
          </a>
          <a href="#responsive-header" className="block lg:inline-block text-white lg:mt-0 mr-16 ml-1">
            Jobs
          </a>
        </div>
        <Button color="agaetis">Contact</Button>
        <div className="text-xs ml-4">
          <a href="#responsive-header" className="block lg:inline-block text-white lg:mt-0 mr-2">
            EN
          </a>
          <a href="#responsive-header" className="block lg:inline-block text-white lg:mt-0 mr">
            FR
          </a>
        </div>
      </div>
    </nav>
  )
}
