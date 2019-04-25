import React from 'react'

import Button from './Button'

const links = ['FAQ', 'Cookies', 'Données personnelles', 'Plan du site']
export default function BottomNav() {
  return (
    <nav className="flex flex-col md:flex-row text-center justify-center">
      {links.map(link => (
        <Button href="#" key={link} className="text-black p-2 underline md:no-underline md:mr-8">
          {link}
        </Button>
      ))}
    </nav>
  )
}
