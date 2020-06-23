import React from 'react'
import { NextPageContext } from 'next'
import { convertAPItoOffersContent, OffersContent } from '../types/OffersContent'
import { getOfferContent } from '../Services/wordpressService'
import Error from './_error'
import Head from 'next/head'
import publicRuntimeConfig from '../config/env.config'
import Layout from '../components/Layout'

interface Context extends NextPageContext {
  query: { slug: string }
}

interface Props {
  pageContent: OffersContent
  errorCode?: number
}

export default function offer({ pageContent, errorCode }: Props) {
  if (!!errorCode) {
    return <Error statusCode={404} />
  }
  return (
    <>
      <Head>
        <title>Agaetis : {pageContent.title}</title>
        <meta property="og:title" content={`Agaetis : ${pageContent.title}`} />
        <meta property="og:image" content={`${publicRuntimeConfig.NEXT_APP_SITE_URL}/favicon.ico`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={pageContent.paragraph} />
        <meta name="description" content={pageContent.paragraph} />
        <link rel="canonical" href={`${publicRuntimeConfig.NEXT_APP_SITE_URL}${pageContent.slug}`} />
      </Head>
      <Layout>
        <div className="md:max-w-md mx-auto p-0 md:px-8">
          <div className="text-xs px-4 md:px-0">
            <span>
              <a className="text-underline text-black" href="/">
                Accueil
              </a>
              {' > '}
              <a className="text-underline text-black" href="/offers">
                Offres
              </a>
              {' > '}
              <b>{pageContent.title}</b>{' '}
            </span>
            <h1 className="text-center text-2xl py-8 md:pb-0 md:mt-12">{pageContent.title}</h1>
            <p
              className="md:max-w-md mx-auto text-center px-4 md:py-6 md:px-0 text-sm leading-normal"
              dangerouslySetInnerHTML={{ __html: pageContent.paragraph }}
            ></p>
          </div>
        </div>
      </Layout>
    </>
  )
}

offer.getInitialProps = async ({ query }: Context) => {
  // tslint:disable-next-line
  const { [0]: data } = await Promise.all([getOfferContent(query.slug!)])
  const pageContent = await convertAPItoOffersContent({ ...data.acf, slug: data.slug })
  return {
    pageContent,
    errorCode: !!data.acf ? undefined : 404,
  }
}
