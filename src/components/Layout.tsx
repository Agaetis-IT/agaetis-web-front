import React from 'react'

import '../i18n'
import '../index.css'

import Footer from './Footer'
import Header, { HeaderProps } from './Header'

interface Props {
  headerProps?: HeaderProps
  children?: string | React.ReactElement
}

export default function Layout({ headerProps, children }: Props) {
  return (
    <div className=" md:p-0">
      <Header {...headerProps} />
      {children}
      <Footer />
    </div>
  )
}
