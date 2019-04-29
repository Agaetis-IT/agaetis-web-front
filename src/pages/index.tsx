import React from 'react'
import { useTranslation } from 'react-i18next'

import Hero from '../components/Hero'
import HomeCard from '../components/HomeCard'
import Layout from '../components/Layout'

import './index.css'

export default function Index() {
  const { t } = useTranslation()
  return (
    <Layout headerProps={{ invertColors: true, className: 'header md:absolute md:mx-auto' }}>
      <>
        <Hero />
        <div>
          <HomeCard
            className="flex flex-col md:flex-row my-6 md:my-12 md:max-w-md md:p-4 mx-auto"
            title={t('index.whoarewe')}
            description={t('index.whoarewe-desc')}
            href="/agaetis"
            buttonContent={t('index.learnmore-btn')}
            descBlockClass="max-w-xs mx-4 md:mx-0 pl-2 md:pr-12 self-center"
            imgClass="agaetis-img"
          />
          <HomeCard
            className="flex flex-col md:flex-row-reverse my-6 md:my-12 md:max-w-md py-4 md:p-4 mx-auto bg-grey"
            title={t('index.ideas')}
            description={t('index.ideas-desc')}
            href="/ideas"
            buttonContent={t('index.learnmore-btn')}
            descBlockClass="max-w-xs mx-4 md:mx-0 pl-2 md:pl-12 self-center"
            imgClass="ideas-img"
          />
        </div>
      </>
    </Layout>
  )
}
