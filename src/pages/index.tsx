import Head from 'next/head'
import React from 'react'

import ContactSection from '../components/ContactSection'
import Hero from '../components/Hero'
import Layout from '../components/Layout'
import publicRuntimeConfig from '../config/env.config'
import { getAllOffers, getIndexContent } from '../Services/wordpressService'
import IndexContent, { convertIndexContentAPItoContentAPI } from '../types/IndexContent'
import HomeOffers from '../components/HomeOffers'
import HomeSectors from '../components/HomeSectors'
import HomeConvictions from '../components/HomeConvictions'

import HomeJoinUs from '../components/HomeJoinUs'
import HomeExpertises from '../components/HomeExpertises'
import { compareOffer, OfferDesc } from '../types/OffersContent'
import OfferAPI from '../models/OfferAPI'

interface Props {
  pageContent: IndexContent
  offers: OfferDesc[]
}

export default function Index({ pageContent, offers }: Props) {
  return (
    <>
      <Head>
        <title>Agaetis</title>

        <meta property="og:title" content="Agaetis" />
        <meta property="og:image" content={`${publicRuntimeConfig.NEXT_APP_SITE_URL}/favicon.ico`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={pageContent.hero_subtitle} />
        <meta name="description" content={pageContent.hero_subtitle} />
        <link rel="canonical" href={`${publicRuntimeConfig.NEXT_APP_SITE_URL}/`} />
      </Head>
      <Layout invertColors={true}>
        <>
          <Hero
            hero={pageContent.hero_image}
            values={pageContent.hero_valeurs.split(' ')}
            subtitle={pageContent.hero_subtitle}
          />
          <div className="sm:px-0">
            {offers && <HomeOffers offers={offers} title={pageContent.offres_title} />}
            <HomeSectors sectors={pageContent.secteurs} title={pageContent.secteurs_title} />
            <HomeExpertises
              expertisesTitle={pageContent.expertises_title}
              expertisesImageDesktop={pageContent.expertises_image_desktop}
              expertisesImageMobile={pageContent.expertises_image_mobile}
              expertises={pageContent.expertises}
            />
            <HomeConvictions convictions={pageContent.convictions} title={pageContent.convictions_title} />
            <HomeJoinUs
              joinUsAgaetisTitle={pageContent.joinUs_agaetis_title}
              joinUsAgaetisDesc={pageContent.joinUs_agaetis_desc}
              joinUsCarreerTitle={pageContent.joinUs_carreer_title}
              joinUsCarreerDesc={pageContent.joinUs_carreer_desc}
              joinUsHuman={pageContent.joinUs_human}
              joinUsImageDesktop={pageContent.joinUs_image_desktop}
              joinUsImageMobile1={pageContent.joinUs_image_mobile_1}
              joinUsImageMobile2={pageContent.joinUs_image_mobile_2}
            />
          </div>
          <ContactSection />
        </>
      </Layout>
    </>
  )
}

Index.getInitialProps = async () => {
  const { [0]: data, [1]: allOffersData } = await Promise.all([getIndexContent(), getAllOffers()])
  const pageContent = convertIndexContentAPItoContentAPI(data)

  return { pageContent, offers: allOffersData.map((offer: OfferAPI) => offer.acf).sort(compareOffer) }
}
