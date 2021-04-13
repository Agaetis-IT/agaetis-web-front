import App from 'next/app'
import Head from 'next/head'
import React from 'react'

import initReactGA, { trackUrl } from '../analytics/analytics'
import initBugsnag, { getBugsnagClient } from '../bugsnag/bugsnag'
import publicRuntimeConfig from '../config/env.config'
import '../index.css'
import 'react-lazy-load-image-component/src/effects/blur.css'
import ServiceWorkerManager from '../components/ServiceWorkerManager'
import LoadingComponent from '../components/LoadingComponent'

initBugsnag()
declare global {
  interface Window {
    GoogleAnalyticsObject: string
    CRISP_WEBSITE_ID: string
    $crisp: []
    workbox: {
      active: Promise<any>
      messageSW: (param: { action: string }) => void
      addEventListener: (listener: string, cb: () => void) => void
    }
  }
}

interface Context {
  Component: any
  ctx: any
}

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }: Context) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  ErrorBoundary = getBugsnagClient().getPlugin('react')

  componentDidMount() {
    const cookies = localStorage.getItem('cookies')
    if (cookies && JSON.parse(cookies)) {
      if (!window.GoogleAnalyticsObject) {
        initReactGA()
      }
      trackUrl()
    }
    window.$crisp = []
    window.CRISP_WEBSITE_ID = 'b8ecab4b-de6b-4c95-aa6b-be6f4cc09135'
    ;(function () {
      const d = document
      const s = d.createElement('script')

      s.src = 'https://client.crisp.chat/l.js'
      s.async = true
      d.getElementsByTagName('head')[0].appendChild(s)
    })()
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <this.ErrorBoundary>
          <ServiceWorkerManager />
          <Head>
            <title>Agaetis</title>
            <meta name="keywords" content="Agaetis, Data science, Web development, Digital Twin" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="Language" content="fr" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@AgaetisIT" />
            <link rel="shortcut icon" type="image/ico" href={`${publicRuntimeConfig.NEXT_APP_SITE_URL}/favicon.ico`} />
            <link rel="preconnect" href="https://wordpress.agaetis.fr" />
            <link rel="manifest" href="/manifest.json" />
            <meta name="theme-color" content="#ff7f40" />
            <link rel="apple-touch-icon" href="/logo-agaetis-carre-apple.png" />
          </Head>

          <LoadingComponent color="#ff7f40" startPosition={0.25} stopDelayMs={50} height={3} />
          <Component {...pageProps} />
        </this.ErrorBoundary>
      </>
    )
  }
}
