import Head from 'next/head'

import ContactSection from '../components/ContactSection'
import Hero from '../components/Hero'
import Layout from '../components/Layout'
import { getAllOffers, getIndexContent } from '../services/wordpressService'
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

function Index({ pageContent, offers }: Props) {
  return (
    <>
      <Head>
        <title>Agaetis</title>

        <meta property="og:title" content="Agaetis" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/favicon.ico`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={pageContent.hero_subtitle} />
        <meta name="description" content={pageContent.hero_subtitle} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/`} />
      </Head>
      <Layout invertColors={true}>
        <>
          <Hero
            hero={pageContent.hero_image}
            valeurs={pageContent.hero_valeurs.split(' ')}
            subtitle={pageContent.hero_subtitle}
          />
          <div className="sm:px-0">
            {offers && <HomeOffers offers={offers} title={pageContent.offres_title}></HomeOffers>}
            <HomeSectors sectors={pageContent.secteurs} title={pageContent.secteurs_title}></HomeSectors>
            <HomeExpertises
              expertisesTitle={pageContent.expertises_title}
              expertisesImageDesktop={pageContent.expertises_image_desktop}
              expertises={pageContent.expertises}
            ></HomeExpertises>
            <HomeConvictions
              convictions={pageContent.convictions}
              title={pageContent.convictions_title}
            ></HomeConvictions>
            <HomeJoinUs
              joinUsAgaetisTitle={pageContent.joinUs_agaetis_title}
              joinUsAgaetisDesc={pageContent.joinUs_agaetis_desc}
              joinUsCareerTitle={pageContent.joinUs_carreer_title}
              joinUsCareerDesc={pageContent.joinUs_carreer_desc}
              joinUsHuman={pageContent.joinUs_human}
              joinUsImageDesktop={pageContent.joinUs_image_desktop}
              joinUsImageMobile1={pageContent.joinUs_image_mobile_1}
              joinUsImageMobile2={pageContent.joinUs_image_mobile_2}
            ></HomeJoinUs>
          </div>
          <ContactSection />
        </>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const { [0]: data, [1]: allOffersData } = await Promise.all([getIndexContent(), getAllOffers()])

  return { 
    props: {
      pageContent: JSON.parse(JSON.stringify(convertIndexContentAPItoContentAPI(data))),
      offers: allOffersData.map((offer: OfferAPI) => offer.acf).sort(compareOffer),
    },
    revalidate: 30,
  }
}

export default Index
