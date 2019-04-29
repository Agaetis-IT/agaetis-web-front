import React from 'react'

import Hero from '../components/Hero'
import Layout from '../components/Layout'

import './index.css'

export default function Index() {
  return (
    <Layout headerProps={{ invertColors: true, className: 'header md:absolute md:mx-auto' }}>
      <Hero />
    </Layout>
  )
}
