import Head from 'next/head'

import ContactSection from '../components/ContactSection'
import Error from './_error'
import Layout from '../components/Layout'
import SolutionTab from '../components/SolutionTab'

import { getSolutionsPageContent } from '../services/wordpressService'
import { SolutionsContent } from '../types/SolutionsContent'

interface Props {
  pageContent: SolutionsContent
  errorCode?: number
}

function solutions({ pageContent, errorCode }: Props) {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

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
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/solutions`} />
      </Head>
      <Layout displayedPage={'/solutions'}>
        <div className="mx-auto px-0">
          <div className="p-0 md:p-12 lg:px-24 lg:p-16 pb-0">
            <div className="p-0 md:px-8 mt-0 md:mt-20">
              <h2 className="text-center px-4 md:py-6 md:px-0 text-md leading-normal">
                {pageContent.description}
              </h2>
            </div>
          </div>
          <SolutionTab tabs={pageContent.tabs} />
          <ContactSection />
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  try {
    return { 
      props: {
        pageContent: JSON.parse(JSON.stringify(await getSolutionsPageContent())),
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

export default solutions
