import React, { useEffect } from 'react'

import initReactGA, { trackUrl } from '../analytics/analytics'
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
  useEffect(() => {
    const cookies = localStorage.getItem('cookies')
    if (!cookies || JSON.parse(cookies)) {
      trackUrl()
      if (!window.GoogleAnalyticsObject) {
        initReactGA()
      }
    }
  }, [])
  return (
    <div className=" md:p-0  md:mb-0">
      <Header {...headerProps} />
      <div className="mt-1 md:mt-0">{children}</div>
      <Footer />
      <Cookies className="cookie-fixed" />
    </div>
  )
}
