import React from 'react'

import '../config/yupConfig'
import '../i18n'

import './Common.css'
import Cookies from './Cookies'
import Footer from './Footer'
import Header, { HeaderProps } from './Header'

interface Props {
  headerProps?: HeaderProps
  children?: string | React.ReactElement
}

export default function Layout({ headerProps, children }: Props) {
  return (
    <div className=" md:p-0  md:mb-0">
      <Header {...headerProps} />
      <div className="mt-1 md:mt-0">{children}</div>
      <Footer />
      <Cookies className="cookie-fixed" />
    </div>
  )
}
