import Head from 'next/head'
import React from 'react'
import { useTranslation } from 'react-i18next'

import ContactSection from '../components/ContactSection'
import Hero from '../components/Hero'
import HomeCard from '../components/HomeCard'
import Layout from '../components/Layout'
import publicRuntimeConfig from '../config/env.config'
import { getIndexContent } from '../Services/wordpressService'
import IndexContent from '../types/IndexContent'

interface Props {
  pageContent: IndexContent
}

function Index({ pageContent: pageContent }: Props) {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>Agaetis</title>
        <meta property="og:description" content={pageContent.agaetis_desc} />
        <meta name="description" content={pageContent.agaetis_desc} />
        <link rel="canonical" href={`${publicRuntimeConfig.NEXT_APP_SITE_URL}/`} />
      </Head>
      <Layout invertColors={true}>
        <>
          <Hero
            hero={pageContent.hero_img}
            valeurs={pageContent.hero_valeurs.split(' ')}
            subtitle={pageContent.hero_subtitle}
          />
          <div className="sm:px-0 md:px-6 xl:px-32">
            <HomeCard
              title={pageContent.agaetis_desc_title}
              description={pageContent.agaetis_desc}
              href="/agaetis"
              buttonContent={t('index.learnmore-btn')}
              imgUrl={pageContent.agaetis_desc_img}
            />
            <HomeCard
              title={pageContent.ideas_desc_title}
              description={pageContent.ideas_desc}
              href="/ideas"
              buttonContent={t('index.learnmore-btn')}
              imgUrl={pageContent.ideas_desc_img}
              reverse
            />
            <HomeCard
              title={pageContent.solutions_desc_title}
              description={pageContent.solutions_desc}
              href="/solutions"
              buttonContent={t('index.learnmore-btn')}
              imgUrl={pageContent.solutions_desc_img}
            />
            <HomeCard
              title={pageContent.jobs_desc_title}
              description={pageContent.jobs_desc}
              href="/jobs"
              buttonContent={t('index.learnmore-btn')}
              imgUrl={pageContent.jobs_desc_img}
              reverse
            />
          </div>
          <ContactSection />
        </>
      </Layout>
    </>
  )
}

Index.getInitialProps = async () => {
  const pageContent = await getIndexContent()
  return { pageContent }
}

export default Index
