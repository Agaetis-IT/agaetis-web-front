import Head from 'next/head'

import ContactSection from '../components/ContactSection'
import Error from './_error'
import Layout from '../components/Layout'
import SolutionsCarousel from '../components/SolutionsCarousel'

import { getSolutionsPageContent } from '../services/wordpressService'
import { compareWhyUsSection, convertContentAPItoContent, SolutionsContent } from '../types/SolutionsContent'
import clsx from 'clsx'

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
        <title>Agaetis - Nos solutions</title>
        <meta property="og:title" content="Agaetis - Nos solutions" />
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
        <div className="pt-0 md:pt-17">
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
            {pageContent.phases.map((phase, index) => (
              <div key={index} className="mx-1 md:mx-2 mb-8 p-4 md:p-8 bg-white rounded-3xl shadow-md">
                <h3 className="text-orange-500 font-bold text-lg md:text-2xl mb-4">{phase.header}</h3>
                <div className="flex flex-col xl:flex-row xl:items-center">
                  <img
                    className="object-contain xl:w-3/5 xl:max-h-100 hidden xs:block"
                    alt={phase.header}
                    src={phase.solutionImage}
                  />
                  <div className="flex flex-col sm:flex-row xl:flex-col">
                    <div className="mb-8 sm:w-1/2 sm:mr-4 sm:mb-0 xl:w-full xl:mr-0 xl:mb-8">
                      <h4 className="text-gray-800 italic uppercase font-bold">{pageContent.needTitle}</h4>
                      <p className="text-xs text-justify">{phase.needContent}</p>
                    </div>
                    <div className="sm:w-1/2 sm:ml-4 xl:w-full xl:ml-0">
                      <h4 className="text-gray-800 italic uppercase font-bold">{pageContent.responseTitle}</h4>
                      <p className="text-xs text-justify">{phase.responseContent}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              backgroundImage: `url("${pageContent.whyUs.background}")`,
              backgroundPosition: 'top',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
            className="p-6 md:p-16 lg:px-32 xl:px-48"
          >
            <div
              style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
              className="p-4 rounded-lg backdrop-filter backdrop-blur-sm mb-8"
            >
              <h2 className="text-lg font-bold mb-4 text-white">{pageContent.whyUs.title}</h2>
              <div className="flex flex-col md:flex-row justify-around p-8">
                {pageContent.whyUs.sections.sort(compareWhyUsSection).map((section, index) => (
                  <div
                    key={section.index}
                    className={clsx(
                      'text-center md:py-0 p-6 w-full md:w-1/3',
                      index && 'border-white md:border-l md:border-t-0 border-t'
                    )}
                  >
                    <img className="w-24 h-24 mx-auto text-center mb-4" src={section.icon} alt={section.title} />
                    <div>
                      <h3 className="uppercase text-sm font-bold leading-normal text-white">{section.title}</h3>
                      <p className="text-sm leading-normal text-white">{section.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
              className="p-4 rounded-lg backdrop-filter backdrop-blur-sm"
            >
              <h2 className="text-lg font-bold mb-4 text-white text-center">{pageContent.partnersTitle}</h2>
              <SolutionsCarousel partners={pageContent.partners} />
            </div>
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
