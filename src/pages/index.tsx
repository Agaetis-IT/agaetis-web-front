import Head from 'next/head'

import ContactSection from '../components/ContactSection'
import Error from './_error'
import Hero from '../components/Hero'
import HomeConvictions from '../components/HomeConvictions'
import HomeExpertises from '../components/HomeExpertises'
import HomeJoinUs from '../components/HomeJoinUs'
import HomeOffers from '../components/HomeOffers'
import HomeSectors from '../components/HomeSectors'
import Layout from '../components/Layout'

import getIndexContent from '../services/wordpressService'
import IndexAPI from '../models/IndexAPI'

interface Props {
  pageContent: IndexAPI
  errorCode?: number
}

export default function Index({ pageContent, errorCode }: Props) {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return (
    <>
      <Head>
        <title>Agaetis</title>
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}/`} />
        <meta property="og:title" content="Agaetis" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/favicon.ico`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={pageContent.heroSubtitle} />
        <meta name="description" content={pageContent.heroSubtitle} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/`} />
      </Head>
      <Layout otherColorClass="bg-orange-500">
        <>
          <Hero
            hero={pageContent.heroImage}
            quote={pageContent.heroQuote}
            values={pageContent.heroValues.split(' ')}
            subtitle={pageContent.heroSubtitle}
          />
          <div className="sm:px-0">
            {pageContent.offers && <HomeOffers offers={pageContent.offers} title={pageContent.offersTitle} />}
            <HomeSectors sectors={pageContent.sectors} title={pageContent.sectorsTitle} />
            <HomeExpertises
              expertisesTitle={pageContent.expertisesTitle}
              expertisesImageDesktop={pageContent.expertisesImageDesktop}
              expertisesImageMobile={pageContent.expertisesImageMobile}
              expertises={pageContent.expertises}
            />
            <HomeConvictions convictions={pageContent.convictions} title={pageContent.convictionsTitle} />
            <HomeJoinUs joinUs={pageContent.joinUs} />
          </div>
          <ContactSection />
        </>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  try {
    const data = await getIndexContent()

    return {
      props: {
        pageContent: data,
      },
      revalidate: +process.env.NEXT_PUBLIC_REVALIDATION_DELAY,
    }
  } catch (error) {
    return {
      props: {
        errorCode: 500,
      },
      revalidate: +process.env.NEXT_PUBLIC_REVALIDATION_DELAY,
    }
  }
}
