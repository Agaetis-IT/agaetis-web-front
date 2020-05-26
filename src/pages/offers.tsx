/* eslint-disable react-hooks/rules-of-hooks */
import React, { useMemo } from 'react'
import Head from 'next/head'
import publicRuntimeConfig from '../config/env.config'
import Layout from '../components/Layout'
import ContactSection from '../components/ContactSection'
import { getOffersPageContent, getAllOffers } from '../Services/wordpressService'
import OffersDesc, { OffersContent, convertAPItoOffersContent } from '../types/OffersContent'
import OfferCard from '../components/OfferCard'

interface Props {
  pageContent: OffersContent
  allOffers: OffersDesc[]
}

export default function offers({ pageContent, allOffers }: Props) {
  const offers = useMemo(
    () =>
      allOffers.map((offer: OffersDesc) => (
        <OfferCard key={offer.title} title={offer.title} desc={offer.offers_description} image={offer.offers_image} />
      )),
    [allOffers]
  )

  return (
    <>
      <Head>
        <title>Agaetis : nos offres</title>
        <meta property="og:description" content={"Présentation d'Agaetis, de son histoire et de sa vision"} />
        <meta name="description" content={"Présentation d'Agaetis, de son histoire et de sa vision"} />
        <link rel="canonical" href={`${publicRuntimeConfig.NEXT_APP_SITE_URL}/agaetis`} />
      </Head>
      <Layout headerProps={{ invertColors: false }}>
        <div className="mx-auto px-0">
          <div className="md:max-w-md mx-auto text-xs px-4 md:px-8 ">
            <span>
              <a className="text-underline text-black" href="/">
                Accueil
              </a>{' '}
              > <b>Offres</b>
            </span>
          </div>
          <div className="md:max-w-md mx-auto md:px-8">
            <h1 className="text-center text-2xl py-8 md:pb-0 md:mt-12">{pageContent.title}</h1>
            <p className=" text-center px-4 md:py-6 md:px-0 text-xs leading-normal">{pageContent.paragraph}</p>

            <div>{offers}</div>
          </div>
          <ContactSection />
        </div>
      </Layout>
    </>
  )
}

offers.getInitialProps = async () => {
  const data = await getOffersPageContent()
  const pageContent = convertAPItoOffersContent(data)
  const allOffersData = await getAllOffers()
  const allOffers = allOffersData.map((offer) => offer.acf)
  return { pageContent, allOffers }
}
