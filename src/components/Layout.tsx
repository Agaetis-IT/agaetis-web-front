import React from 'react'

import '../index.css'

import Header from './Header'

interface Props {
  children?: string
}

export default function Layout({ children }: Props) {
  return (
    <div className="p-3 md:p-6">
      <Header />
      {children}
    </div>
  )
}
