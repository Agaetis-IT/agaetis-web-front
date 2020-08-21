import Head from 'next/head'
import React from 'react'

import ContactSection from '../components/ContactSection'
import Hero from '../components/Hero'
import Layout from '../components/Layout'
import publicRuntimeConfig from '../config/env.config'
import { getIndexContent } from '../Services/wordpressService'
import { IndexContentV2, convertIndexContentAPItoContentAPI } from '../types/IndexContent'
import HomeOffers from '../components/HomeOffers'
import HomeSectors from '../components/HomeSectors'
import HomeConvictions from '../components/HomeConvictions'

import HomeJoinUs from '../components/HomeJoinUs'
import HomeExpertises from '../components/HomeExpertises'

interface Props {
  pageContent: IndexContentV2
}

function Index({ pageContent: pageContent }: Props) {
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
            valeurs={pageContent.hero_valeurs.split(' ')}
            subtitle={pageContent.hero_subtitle}
          />
          <div className="sm:px-0">
            <HomeOffers offers={pageContent.offres} title={pageContent.offres_title}></HomeOffers>
            <HomeSectors sectors={pageContent.secteurs} title={pageContent.secteurs_title}></HomeSectors>
            <HomeExpertises></HomeExpertises>
            <HomeConvictions
              convictions={pageContent.convictions}
              title={pageContent.convictions_title}
            ></HomeConvictions>
            <HomeJoinUs></HomeJoinUs>
          </div>
          <ContactSection />
        </>
      </Layout>
    </>
  )
}

Index.getInitialProps = async () => {
  const data = await getIndexContent()
  const pageContent = convertIndexContentAPItoContentAPI(data)
  return { pageContent }
}

export default Index
