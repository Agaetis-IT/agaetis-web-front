import React from 'react'
import Header from './Header'
import '../styles/index.css'
export default function Layout(props: any) {
  return (
    <div className="p-3 md:p-6">
      <Header />
      {props.children}
    </div>
  )
}
