import React from 'react'

import '../config/yupConfig'

import Cookies from './Cookies'
import Header from './Header'
import clsx from 'clsx'

interface Props {
  invertColors: boolean
  children?: string | React.ReactElement
}

export default function Layout({ invertColors, children }: Props) {
  return (
    <div className="md:p-0 md:mb-0">
      <Header invertColors={invertColors} />
      <div className={clsx('mt-1 md:mt-0', { 'md:pt-30': true })}>
        <div>{children}</div>
      </div>

      <Cookies className="cookie-fixed" />
    </div>
  )
}
