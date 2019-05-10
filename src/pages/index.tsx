import React from 'react'
import { useTranslation } from 'react-i18next'

import Hero from '../components/Hero'
import HomeCard from '../components/HomeCard'
import Layout from '../components/Layout'
import getIndexContent from '../Services/GetPageDescription'

interface Props {
  initialData: {
    agaetis_desc_title: string
    agaetis_desc: string
    agaetis_desc_img: string
    ideas_desc_title: string
    ideas_desc: string
    ideas_desc_img: string
    solutions_desc_title: string
    solutions_desc: string
    solutions_desc_img: string
    jobs_desc_title: string
    jobs_desc: string
    jobs_desc_img: string
  }
}

Index.getInitialProps = async () => {
  const { acf: initialData } = await getIndexContent(13)
  return { initialData }
}

function Index({ initialData }: Props) {
  const { t } = useTranslation()
  return (
    <Layout headerProps={{ invertColors: true, className: 'header md:absolute md:mx-auto' }}>
      <>
        <Hero />
        <div className="px-2 md:px-6">
          <HomeCard
            className="md:flex-row"
            title={initialData.agaetis_desc_title}
            description={initialData.agaetis_desc}
            href="/agaetis"
            buttonContent={t('index.learnmore-btn')}
            descBlockClass="md:pr-6"
            imgUrl={initialData.agaetis_desc_img}
          />
          <HomeCard
            className="md:flex-row-reverse py-4 bg-grey"
            title={initialData.ideas_desc_title}
            description={initialData.ideas_desc}
            href="/ideas"
            buttonContent={t('index.learnmore-btn')}
            descBlockClass="md:pl-6"
            imgUrl={initialData.ideas_desc_img}
          />
          <HomeCard
            className="md:flex-row"
            title={initialData.solutions_desc_title}
            description={initialData.solutions_desc}
            href="/solutions"
            buttonContent={t('index.learnmore-btn')}
            descBlockClass="md:pr-6"
            imgUrl={initialData.solutions_desc_img}
          />
          <HomeCard
            className="md:flex-row-reverse py-4 bg-grey"
            title={initialData.jobs_desc_title}
            description={initialData.jobs_desc}
            href="/jobs"
            buttonContent={t('index.learnmore-btn')}
            descBlockClass="md:pl-6"
            imgUrl={initialData.jobs_desc_img}
          />
        </div>
      </>
    </Layout>
  )
}

export default Index
