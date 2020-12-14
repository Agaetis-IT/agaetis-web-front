import React from 'react'
import { NextPageContext } from 'next'
import { convertAPItoOffersContent, OfferContent } from '../types/OffersContent'
import { getOfferContent } from '../Services/wordpressService'
import Error from './_error'
import Head from 'next/head'
import publicRuntimeConfig from '../config/env.config'
import Layout from '../components/Layout'
import Mask from '../static/images/hero_mask.svg'

interface Context extends NextPageContext {
  query: { slug: string }
}

interface Props {
  pageContent: OfferContent
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
      <Layout invertColors={true}>
        <div className="mx-auto px-0">
          <div
            style={{
              backgroundImage: `url("${Mask}")`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
            className="bg-orange p-0 md:p-12 lg:px-24 lg:p-16"
          >
            <h1 className="text-white text-2xl mt-20">{pageContent.title}</h1>
            <p className="text-white py-8 leading-normal text-sm">{pageContent.paragraph}</p>
          </div>
        </div>
      </Layout>
    </>
  )
}

offer.getInitialProps = async ({ query }: Context) => {
  // tslint:disable-next-line
  const { [0]: data } = await Promise.all([getOfferContent(query.slug!)])
  const pageContent = convertAPItoOffersContent({ ...data.acf, slug: data.slug })
  return {
    pageContent,
    errorCode: !!data.acf ? undefined : 404,
  }
}
