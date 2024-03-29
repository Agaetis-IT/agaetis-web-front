import clsx from 'clsx'
import Head from 'next/head'

import AgaetisDialog from '../components/AgaetisDialog'
import ContactSection from '../components/ContactSection'
import Error from './_error'
import Layout from '../components/Layout'

import { AgaetisAPI } from '../models/AgaetisAPI'
import { getAgaetisContent } from '../services/wordpressService'

import styles from '../styles/agaetis.module.css'
const Particles = '/images/particles-3.svg'

interface Props {
  pageContent: AgaetisAPI
  errorCode?: number
}

export default function agaetis({ pageContent, errorCode }: Props) {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return (
    <>
      <Head>
        <title>Agaetis - Histoire et vision</title>
        <meta property="og:title" content="Agaetis - Histoire et vision" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}/agaetis`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/favicon.ico`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={"Présentation d'Agaetis, de son histoire et de sa vision"} />
        <meta name="description" content={"Présentation d'Agaetis, de son histoire et de sa vision"} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/agaetis`} />
      </Head>
      <Layout displayedPage={'/agaetis'}>
        <div className="pt-0 md:pt-17">
          <div
            style={{
              backgroundImage: `url("${pageContent.background}")`,
              backgroundPosition: 'top',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
            className="p-6 md:p-16 lg:px-32 xl:px-48"
          >
            <h1 className={`py-2 md:py-6 text-2xl font-bold leading-normal text-orange-500 ${styles.headerText}`}>
              {pageContent.title}
            </h1>
            <h2 className={`py-2 md:py-6 text-md leading-normal text-white ${styles.headerText}`}>
              {pageContent.paragraph}
            </h2>
          </div>
          <div
            style={{
              backgroundImage: `url("${Particles}")`,
              backgroundPosition: 'top',
              backgroundSize: '100% auto',
              backgroundRepeat: 'no-repeat',
            }}
            className="p-6 md:p-16 lg:px-32 xl:px-48 bg-gray-400"
          >
            {pageContent.questions.map((question) => (
              <AgaetisDialog key={question.question} title={question.question} description={question.answer} />
            ))}
            <div>
              <h2 className="text-2xl font-bold text-orange-500 text-center mb-4">{pageContent.videoTitle}</h2>
              <video width="576" height="324" controls className="mx-auto">
                <source src={pageContent.video} type="video/mp4" />
              </video>
            </div>
          </div>
          <div
            style={{
              backgroundImage: `url("${pageContent.numbersBack}")`,
              backgroundPosition: 'top',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
            className="p-6 md:p-16 lg:px-32 xl:px-48"
          >
            <div
              style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
              className="p-4 rounded-lg backdrop-filter backdrop-blur-sm"
            >
              <h2 className="text-lg font-bold mb-4 text-white">{pageContent.numbersTitle}</h2>
              <div className="flex flex-col md:flex-row justify-around p-8">
                {pageContent.numbers.map((number, index) => (
                  <div
                    key={number.title}
                    className={clsx(
                      'text-center md:py-0 p-6 w-full md:w-1/3',
                      index && 'border-white md:border-l md:border-t-0 border-t'
                    )}
                  >
                    <h3 className="uppercase text-sm font-bold leading-normal text-white">{number.title}</h3>
                    <h3 className="text-5xl font-bold leading-normal text-orange-500 my-2 md:my-4">{number.data}</h3>
                    <p className="text-sm leading-normal text-white">{number.description}</p>
                  </div>
                ))}
              </div>
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
        pageContent: await getAgaetisContent(),
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
