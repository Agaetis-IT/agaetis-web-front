import App, { Container } from 'next/app'
import Head from 'next/head'
import React from 'react'

import initBugsnag, { getBugsnagClient } from '../bugsnag/bugsnag'
import LoadingSpinner from '../components/LoadingSpinner'
import Favicon from '../images/symbole-agaetis-p164-rgb.png'
import '../index.css'

initBugsnag()

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  ErrorBoundary = getBugsnagClient().getPlugin('react')

  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <this.ErrorBoundary>
          <Head>
            <title>Agaetis</title>
            <meta property="og:description" content={"Agaetis' official website"} />
            <meta name="keywords" content="Agaetis, Data science, Web development, Digital Twin" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="shortcut icon" type="image/png" href={Favicon} />
          </Head>
          <Container>
            <LoadingSpinner color="#ff7f40" startPosition={0.3} stopDelayMs={50} height="3" />
            <Component {...pageProps} />
          </Container>
        </this.ErrorBoundary>
      </>
    )
  }
}
