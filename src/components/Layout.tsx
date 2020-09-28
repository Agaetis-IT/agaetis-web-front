import '../config/yupConfig'
import '../i18n'
import './Common.css'

import Cookies from './Cookies'
import Header from './Header'
import React from 'react'
import clsx from 'clsx'

interface Props {
  invertColors: boolean
  children?: string | React.ReactElement
}

export default function Layout({ invertColors, children }: Props) {
  return (
    <div className=" md:p-0  md:mb-0">
      <Header invertColors={invertColors} />
      <div className={clsx('mt-1 md:mt-0', { 'md:pt-48': !invertColors })}>
        <div>{children}</div>
      </div>

      <Cookies className="cookie-fixed" />
    </div>
  )
}
