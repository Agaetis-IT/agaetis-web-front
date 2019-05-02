import axios from 'axios'
import React from 'react'
import { useTranslation } from 'react-i18next'

import Hero from '../components/Hero'
import HomeCard from '../components/HomeCard'
import Layout from '../components/Layout'

interface Props {
  initialData: any
}

Index.getInitialProps = async () => {
  const fetchData = await axios.get('http://localhost/blogAgaetis/wp-json/wp/v2/pages/13')
  const initialData = await fetchData.data
  return { initialData }
}

function Index({ initialData }: Props) {
  const { t } = useTranslation()
  return (
    <Layout headerProps={{ invertColors: true, className: 'header md:absolute md:mx-auto' }}>
      <>
        <Hero />
        <div className="p-3">
          <HomeCard
            className="md:flex-row"
            title={initialData.acf.agaetis_desc_title}
            description={initialData.acf.agaetis_desc}
            href="/agaetis"
            buttonContent={t('index.learnmore-btn')}
            descBlockClass="md:pr-6"
            imgUrl={initialData.acf.agaetis_desc_img}
          />
          <HomeCard
            className="md:flex-row-reverse py-4 bg-grey"
            title={initialData.acf.ideas_desc_title}
            description={initialData.acf.ideas_desc}
            href="/ideas"
            buttonContent={t('index.learnmore-btn')}
            descBlockClass="md:pl-6"
            imgUrl={initialData.acf.ideas_desc_img}
          />
          <HomeCard
            className="md:flex-row"
            title={initialData.acf.solutions_desc_title}
            description={initialData.acf.solutions_desc}
            href="/solutions"
            buttonContent={t('index.learnmore-btn')}
            descBlockClass="md:pr-10"
            imgUrl={initialData.acf.solutions_desc_img}
          />
          <HomeCard
            className="md:flex-row-reverse py-4 bg-grey"
            title={initialData.acf.jobs_desc_title}
            description={initialData.acf.jobs_desc}
            href="/jobs"
            buttonContent={t('index.learnmore-btn')}
            descBlockClass="md:pl-10"
            imgUrl={initialData.acf.jobs_desc_img}
          />
        </div>
      </>
    </Layout>
  )
}

export default Index
