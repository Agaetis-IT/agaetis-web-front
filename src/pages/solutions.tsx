import Head from 'next/head'
import Link from 'next/link'
import ContactSection from '../components/ContactSection'

import Layout from '../components/Layout'
import SoluceTab from '../components/SoluceTab'
import { getSolutionsPageContent } from '../services/wordpressService'
import { SolutionsContent } from '../types/SolutionsContent'

interface Props {
  pageContent: SolutionsContent
}

function solutions({ pageContent }: Props) {
  return (
    <>
      <Head>
        <title>Agaetis : secteurs d'activités</title>
        <meta property="og:title" content="Agaetis : solutions" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/favicon.ico`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Chaque client a des besoins propres, nous leur apportons des solutions sur mesure"
        />
        <meta
          name="description"
          content="Chaque client a des besoins propres, nous leur apportons des solutions sur mesure"
        />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/sectors`} />
      </Head>
      <Layout invertColors={false} displayedPage={'/solutions'}>
        <div className="mx-auto px-0">
          <div className="p-0 md:p-12 lg:px-24 lg:p-16 pb-0">
            <div className="p-0 md:px-8 mt-0 md:mt-20">
              <h2 className="text-center px-4 md:py-6 md:px-0 text-md leading-normal">
                {pageContent.description}
              </h2>
            </div>
          </div>
          <SoluceTab tabs={pageContent.tabs} />
          <ContactSection />
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      pageContent: JSON.parse(JSON.stringify(await getSolutionsPageContent())),
    },
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATION_DELAY,
  }
}

export default solutions
