import React from 'react'
import { useTranslation } from 'react-i18next'

import Hero from '../components/Hero'
import HomeCard from '../components/HomeCard'
import Layout from '../components/Layout'

export default function Index() {
  const { t } = useTranslation()
  return (
    <Layout headerProps={{ invertColors: true, className: 'header md:absolute md:mx-auto' }}>
      <>
        <Hero />
        <HomeCard
          className="flex flex-col md:flex-row my-6 md:my-12 md:max-w-md md:p-6 mx-auto"
          title={t('index.whoarewe')}
          description={t('index.whoarewe-desc')}
          href="/agaetis"
          buttonContent={t('index.learnmore-btn')}
          descBlockClass="max-w-xs mx-4 md:mx-0 md:pr-12 self-center"
          imgClass="agaetis-img"
        />
        <HomeCard
          className="flex flex-col md:flex-row-reverse my-6 md:my-12 md:max-w-md py-4 md:p-6 mx-auto bg-grey"
          title={t('index.ideas')}
          description={t('index.ideas-desc')}
          href="/ideas"
          buttonContent={t('index.learnmore-btn')}
          descBlockClass="max-w-xs mx-4 md:mx-0 md:pl-12 self-center"
          imgClass="ideas-img"
        />
        <HomeCard
          className="flex flex-col md:flex-row my-6 md:my-12 md:max-w-md md:p-6 mx-auto"
          title={t('index.solutions')}
          description={t('index.solutions-desc')}
          href="/solutions"
          buttonContent={t('index.learnmore-btn')}
          descBlockClass="max-w-xs mx-4 md:mx-0 md:pr-12 self-center"
          imgClass="solutions-img"
        />
        <HomeCard
          className="flex flex-col md:flex-row-reverse my-6 md:my-12 md:max-w-md py-4 md:p-6 mx-auto bg-grey"
          title={t('index.join-us')}
          description={t('index.join-us-desc')}
          href="/jobs"
          buttonContent={t('index.learnmore-btn')}
          descBlockClass="max-w-xs mx-4 md:mx-0 md:pl-12 self-center"
          imgClass="join-us-img"
        />
      </>
    </Layout>
  )
}
