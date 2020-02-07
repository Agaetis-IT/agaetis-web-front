import App, { Container } from 'next/app'
import Head from 'next/head'
import React from 'react'

import '../index.css'

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }
  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <title>Agaetis</title>
          <meta property="og:description" content={"Agaetis' official website"} />
          <meta name="keywords" content="Agaetis, Data science, Web development, Digital Twin" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <Container>
          <Component {...pageProps} />
        </Container>
      </>
    )
  }
}
