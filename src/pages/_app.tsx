import App from 'next/app'
import Head from 'next/head'
import React from 'react'

import initReactGA, { trackUrl } from '../analytics/analytics'
import initBugsnag, { getBugsnagClient } from '../bugsnag/bugsnag'
import LoadingSpinner from '../components/LoadingSpinner'
import publicRuntimeConfig from '../config/env.config'
import Favicon from '../public/images/symbole-agaetis-p164-rgb.png'
import '../index.css'

initBugsnag()
declare global {
  interface Window {
    GoogleAnalyticsObject: string
  }
}

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  ErrorBoundary = getBugsnagClient().getPlugin('react')

  componentDidMount() {
    const cookies = localStorage.getItem('cookies')
    if (!cookies || JSON.parse(cookies)) {
      if (!window.GoogleAnalyticsObject) {
        initReactGA()
      }
      trackUrl()
    }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <this.ErrorBoundary>
          <Head>
            <title>Agaetis</title>
            <meta property="og:image" content={`${publicRuntimeConfig.NEXT_APP_SITE_URL}/favicon.ico`} />
            <meta name="keywords" content="Agaetis, Data science, Web development, Digital Twin" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="Language" content="fr" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <link rel="shortcut icon" type="image/png" href={Favicon} />
          </Head>

          <LoadingSpinner color="#ff7f40" startPosition={0.3} stopDelayMs={50} height="3" />
          <Component {...pageProps} />
        </this.ErrorBoundary>
      </>
    )
  }
}
