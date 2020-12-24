/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { NextPageContext } from 'next'
import {
  convertAPItoOfferleaf,
  convertAPItoOffersContent,
  OfferContent,
  OfferLeafContent,
} from '../types/OffersContent'
import { getCategoryOffers, getIdeaByCategory, getOfferContent, getOfferLeaf } from '../Services/wordpressService'
import Back from '../static/icons/Btn_Retour.svg'
import Error from './_error'
import Head from 'next/head'
import publicRuntimeConfig from '../config/env.config'
import Layout from '../components/Layout'
import Particles from '../static/images/particles-2.svg'
import { useState } from 'react'
import Button from '../components/Button'
import clsx from 'clsx'
import RelatedArticlesSection from '../components/RelatedArticlesSection'

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
            <div className="bg-white p-8">
              <Button href="/offers">
                <div className="flex flex-row items-center mb-8">
                  <img className="mr-4" src={Back} />
                  <span className="text-orange">Retour aux catégories d'offres</span>
                </div>
              </Button>

              <div className="flex flex-col lg:flex-row">
                <div className="w-2/5 border-orange-right">
                  {offers !== undefined &&
                    offers.map((offer, index) => (
                      <Button
                        key={offer.title}
                        onClick={() => {
                          setSelectedOffer(index)
                        }}
                        className={clsx(
                          'block border-2 border-orange bg-transparent rounded-full my-8 mx-auto w-3/4 py-2 text-sm',
                          { 'text-white bg-orange': selectedOffer === index }
                        )}
                      >
                        <div dangerouslySetInnerHTML={{ __html: offer.title }}></div>
                      </Button>
                    ))}
                </div>
                <div className="w-3/5 my-8 pl-8">
                  <h2
                    className="text-2xl text-orange mb-8"
                    dangerouslySetInnerHTML={{ __html: offers[selectedOffer].title }}
                  ></h2>
                  <div
                    className="text-sm"
                    dangerouslySetInnerHTML={{ __html: offers[selectedOffer].description }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <RelatedArticlesSection
              className="p-0 md:p-12 lg:px-24 lg:p-16"
              posts={offers[selectedOffer].posts}
            ></RelatedArticlesSection>
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
      const { [0]: children, [1]: posts } = await Promise.all([
        getOfferLeaf(query.slug, offer.post_name),
        getIdeaByCategory(`_offer-${escape(offer.post_name)}`),
      ])
      console.log(posts)
      return convertAPItoOfferleaf(children, posts)
    }
  )
  const offerChildrens = await Promise.all(allOffers)
  return {
    pageContent,
    errorCode: !!data.acf ? undefined : 404,
    offers: offerChildrens,
  }
}
