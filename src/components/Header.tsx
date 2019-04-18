import React from 'react'
import Navigation from '../components/Navigation'

export default function Header() {
  return (
    <header className="bg-black p-8">
      <div className="w-50%">
        <Navigation />
      </div>
    </header>
  )
}
