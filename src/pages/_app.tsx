import React, { useEffect } from 'react'
import Bugsnag from '@bugsnag/js'
import Head from 'next/head'
import NextNProgress from 'nextjs-progressbar'

import initBugsnag from '../bugsnag/bugsnag'
import initReactGA, { trackUrl } from '../analytics/analytics'

import 'tocbot/src/scss/tocbot.scss'
import '../styles/globals.css'

declare global {
  interface Window {
    GoogleAnalyticsObject: string
    CRISP_WEBSITE_ID: string
    $crisp: []
  }
}

initBugsnag()

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
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

    navigator.serviceWorker
      .getRegistrations()
      .then((registrations) => registrations.map((registration) => registration.unregister()))
  }, [])

  const ErrorBoundary = Bugsnag.getPlugin('react')!.createErrorBoundary(React)

  return (
    <ErrorBoundary>
      <Head>
        <title>Agaetis</title>
        <meta name="keywords" content="Agaetis, Data science, Web development, Digital Twin" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="Language" content="fr" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AgaetisIT" />
        <meta name="theme-color" content="#ff7f40" />
        <link
          rel="apple-touch-icon"
          type="image/png"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/icons/agaetis-orange-logo-ico.png`}
        />
        <link rel="shortcut icon" type="image/ico" href={`${process.env.NEXT_PUBLIC_SITE_URL}/favicon.ico`} />
        <link rel="preconnect" href="https://wordpress.agaetis.fr" />
      </Head>
      <NextNProgress color="#dd6b20" startPosition={0.25} stopDelayMs={50} height={3} />
      <Component {...pageProps} />
    </ErrorBoundary>
  )
}
