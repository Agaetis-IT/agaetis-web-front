import React from 'react'
import { useTranslation } from 'react-i18next'

import Hero from '../components/Hero'
import HomeCard from '../components/HomeCard'
import Layout from '../components/Layout'
import { getIndexContent } from '../Services/wordpressService'
import IndexContent from '../types/IndexContent'

interface Props {
  pageContent: IndexContent
}

Index.getInitialProps = async () => {
  const pageContent = await getIndexContent()
  return { pageContent }
}

function Index({ pageContent: pageContent }: Props) {
  const { t } = useTranslation()
  return (
    <Layout headerProps={{ invertColors: true, className: 'header md:absolute md:mx-auto' }}>
      <>
        <Hero />
        <div className="px-2 md:px-6">
          <HomeCard
            className="md:flex-row"
            title={pageContent.agaetis_desc_title}
            description={pageContent.agaetis_desc}
            href="/agaetis"
            buttonContent={t('index.learnmore-btn')}
            descBlockClass="md:pr-6"
            imgUrl={pageContent.agaetis_desc_img}
          />
          <HomeCard
            className="md:flex-row-reverse py-4 bg-grey"
            title={pageContent.ideas_desc_title}
            description={pageContent.ideas_desc}
            href="/ideas"
            buttonContent={t('index.learnmore-btn')}
            descBlockClass="md:pl-6"
            imgUrl={pageContent.ideas_desc_img}
          />
          <HomeCard
            className="md:flex-row"
            title={pageContent.solutions_desc_title}
            description={pageContent.solutions_desc}
            href="/solutions"
            buttonContent={t('index.learnmore-btn')}
            descBlockClass="md:pr-6"
            imgUrl={pageContent.solutions_desc_img}
          />
          <HomeCard
            className="md:flex-row-reverse py-4 bg-grey"
            title={pageContent.jobs_desc_title}
            description={pageContent.jobs_desc}
            href="/jobs"
            buttonContent={t('index.learnmore-btn')}
            descBlockClass="md:pl-6"
            imgUrl={pageContent.jobs_desc_img}
          />
        </div>
      </>
    </Layout>
  )
}

export default Index
