/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { NextPageContext } from 'next'
import {
  convertAPItoOfferleaf,
  convertAPItoOffersContent,
  OfferContent,
  OfferLeafContent,
} from '../types/OffersContent'
import { getCategoryOffers, getOfferContent, getOfferLeaf } from '../Services/wordpressService'
import Error from './_error'
import Head from 'next/head'
import publicRuntimeConfig from '../config/env.config'
import Layout from '../components/Layout'
import Particles from '../static/images/particles-2.svg'
import { useState } from 'react'
import Button from '../components/Button'

interface Context extends NextPageContext {
  query: { slug: string }
}

interface Props {
  pageContent: OfferContent
  errorCode?: number
  offers: OfferLeafContent[]
}

export default function offer({ pageContent, errorCode, offers }: Props): React.ReactElement {
  const [selectedOffer, setSelectedOffer] = useState(0)
  if (!!errorCode) {
    return <Error statusCode={404} />
  }
  console.log(offers)
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
              backgroundImage: `url("${Particles}")`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
            className="bg-black-light p-0 md:p-12 lg:px-24 lg:p-16"
          >
            <h1 className="text-white text-2xl mt-0 md:mt-20">{pageContent.title}</h1>
            <p className="text-white py-8 leading-normal text-sm">{pageContent.paragraph}</p>
            <div className="flex flex-col lg:flex-row bg-white p-8">
              <div className="w-1/2 border-right">
                {offers !== undefined &&
                  offers.map((offer, index) => (
                    <Button
                      key={offer.title}
                      onClick={() => {
                        setSelectedOffer(index)
                      }}
                      className="block border-2 border-orange bg-transparent rounded-full my-8 mx-auto w-1/2 py-2 text-sm"
                    >
                      <div dangerouslySetInnerHTML={{ __html: offer.title }}></div>
                    </Button>
                  ))}
              </div>
              <div
                className="w-1/2 my-8 "
                dangerouslySetInnerHTML={{ __html: offers[selectedOffer].description }}
              ></div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

offer.getInitialProps = async ({ query }: Context) => {
  // tslint:disable-next-line
  const { [0]: data, [1]: offers } = await Promise.all([getOfferContent(query.slug!), getCategoryOffers(query.slug)])
  const pageContent = convertAPItoOffersContent({ ...data.acf, slug: data.slug })
  const allOffers = offers.map(
    async (offer: {
      acf: {
        title: string
        paragraph: string
        offers_description: string
        offers_image1: string
        offers_image2: string
      }
      post_name: string
    }) => {
      const children = await getOfferLeaf(query.slug, offer.post_name)
      return convertAPItoOfferleaf(children)
    }
  )
  const offerChildrens = await Promise.all(allOffers)
  return {
    pageContent,
    errorCode: !!data.acf ? undefined : 404,
    offers: offerChildrens,
  }
}
