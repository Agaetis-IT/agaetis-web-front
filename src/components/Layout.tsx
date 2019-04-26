import React from 'react'

import '../i18n'
import '../index.css'

import Footer from './Footer'
import Header from './Header'

interface Props {
  isHome: boolean
  children?: string | React.ReactElement
}

export default function Layout({ isHome, children }: Props) {
  return (
    <div className="p-3 md:p-6">
      <Header isHome={isHome} />
      {children}
      <Footer />
    </div>
  )
}
