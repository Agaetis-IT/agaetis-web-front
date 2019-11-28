import React, { useEffect } from 'react'

import initReactGA, { trackUrl } from '../analytics/analytics'
import '../config/yupConfig'
import '../i18n'
import '../index.css'

import './Common.css'
import Footer from './Footer'
import Header, { HeaderProps } from './Header'

interface Props {
  headerProps?: HeaderProps
  children?: string | React.ReactElement
}

export default function Layout({ headerProps, children }: Props) {
  useEffect(() => {
    if (!window.GoogleAnalyticsObject) {
      initReactGA()
    }
    trackUrl()
  }, [])
  return (
    <div className=" md:p-0">
      <Header {...headerProps} />
      <div className="mt-1 md:mt-0">{children}</div>
      <Footer />
    </div>
  )
}
