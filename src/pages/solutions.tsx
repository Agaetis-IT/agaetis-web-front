import Head from 'next/head'

import ContactSection from '../components/ContactSection'
import Error from './_error'
import Layout from '../components/Layout'
import SolutionTab from '../components/SolutionTab'

import { getSolutionsPageContent } from '../services/wordpressService'
import { convertContentAPItoContent, SolutionsContent } from '../types/SolutionsContent'

const Particles = '/images/particles-3.svg'

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
        <div className="pt-0 md:pt-25">
          <div
            style={{
              backgroundImage: `url("${Particles}")`,
              backgroundPosition: 'top',
              backgroundSize: '100% auto',
              backgroundRepeat: 'no-repeat',
            }}
            className="p-6 md:p-16 lg:px-32 xl:px-48 bg-gray-400"
          >
            <h2 className="mx-1 md:mx-2 text-xl leading-normal mb-14 font-medium">{pageContent.description}</h2>
            {pageContent.phases.map((phase) => (
              <div className="mx-1 md:mx-2 mb-8 bg-white rounded-lg shadow-md">
                <h3 className="text-orange-500 font-bold text-2xl mb-4">{phase.header}</h3>
                <div className="flex flex-row">
                  <img className="object-contain w-1/3" alt={phase.header} src={phase.solutionImage} />
                  <div>
                    <h4 className="text-gray-800 italic mb-2 uppercase font-bold">{pageContent.needTitle}</h4>
                    <p className="text-sm">{phase.needContent}</p>
                    <h4 className="text-gray-800 italic mb-2 uppercase font-bold">{pageContent.responseTitle}</h4>
                    <p className="text-sm">{phase.responseContent}</p>
                  </div>
                </div>
              </div>
            ))}
            <SolutionTab content={pageContent} />
          </div>
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
        pageContent: JSON.parse(JSON.stringify(convertContentAPItoContent(await getSolutionsPageContent()))),
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
