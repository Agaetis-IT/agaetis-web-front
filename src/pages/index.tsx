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
        <div className="p-3">
          <HomeCard
            className="md:flex-row"
            title={t('index.whoarewe')}
            description={t('index.whoarewe-desc')}
            href="/agaetis"
            buttonContent={t('index.learnmore-btn')}
            descBlockClass="md:pr-6"
            imgClass="agaetis-img"
          />
          <HomeCard
            className="md:flex-row-reverse py-4 bg-grey"
            title={t('index.ideas')}
            description={t('index.ideas-desc')}
            href="/ideas"
            buttonContent={t('index.learnmore-btn')}
            descBlockClass="md:pl-6"
            imgClass="ideas-img"
          />
          <HomeCard
            className="md:flex-row"
            title={t('index.solutions')}
            description={t('index.solutions-desc')}
            href="/solutions"
            buttonContent={t('index.learnmore-btn')}
            descBlockClass="md:pr-10"
            imgClass="solutions-img"
          />
          <HomeCard
            className="md:flex-row-reverse py-4 bg-grey"
            title={t('index.join-us')}
            description={t('index.join-us-desc')}
            href="/jobs"
            buttonContent={t('index.learnmore-btn')}
            descBlockClass="md:pl-10"
            imgClass="join-us-img"
          />
        </div>
      </>
    </Layout>
  )
}
