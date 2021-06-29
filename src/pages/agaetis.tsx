import clsx from 'clsx'
import Head from 'next/head'

import AgaetisCard from '../components/AgaetisCard'
import ContactSection from '../components/ContactSection'
import Error from './_error'
import Layout from '../components/Layout'

import { AgaetisContent, convertAgaetisAPItoContent } from '../types/AgaetisContent'
import { getAgaetisContent } from '../services/wordpressService'

import commonStyles from '../styles/Common.module.css'
import styles from '../styles/agaetis.module.css'
const Particles = '/images/particles-3.svg'

interface Props {
  pageContent: AgaetisContent
  errorCode?: number
}

export default function agaetis({ pageContent, errorCode }: Props) {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return (
    <>
      <Head>
        <title>Agaetis : histoire et vision</title>
        <meta property="og:title" content="Agaetis : histoire et vision" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/favicon.ico`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={"Présentation d'Agaetis, de son histoire et de sa vision"} />
        <meta name="description" content={"Présentation d'Agaetis, de son histoire et de sa vision"} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/agaetis`} />
      </Head>
      <Layout invertColors={false} displayedPage={'/agaetis'}>
        <div className="pt-0 md:pt-28">
          <div
            style={{
              backgroundImage: `url("${pageContent.background}")`,
              backgroundPosition: 'top',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
            className="p-6 md:p-16 lg:px-32 xl:px-48"
          >
            <h1 className={`py-2 md:py-6 text-2xl font-bold leading-normal text-orange-500 ${styles.headerText}`}>{pageContent.title}</h1>
            <h2 className={`py-2 md:py-6 text-md leading-normal text-white ${styles.headerText}`}>{pageContent.paragraph}</h2>
          </div>
          <div
            style={{
              backgroundImage: `url("${Particles}")`,
              backgroundPosition: 'top',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            }}
            className="p-6 md:p-16 lg:px-32 xl:px-48 bg-gray-400"
          >
            {pageContent.questions.map((question) => (
              <AgaetisCard
                key={question.index}
                title={question.question}
                description={question.answer}
              />
            ))}
          </div>
          <div
            style={{
              backgroundImage: `url("${pageContent.numbersBackground}")`,
              backgroundPosition: 'top',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
            className="p-6 md:p-16 lg:px-32 xl:px-48"
          >
            <div
              style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
              className={`p-4 ${commonStyles.round8} ${styles.backgroundBlur}`}
            >
              <h2 className="text-lg font-bold mb-4 text-white">{pageContent.numbersTitle}</h2>
              <div className="flex flex-col md:flex-row justify-around p-8">
                {pageContent.numbers.map((number, index) => (
                  <div key={number.index} className={clsx('text-center md:py-0 p-6', index && 'border-white md:border-l md:border-t-0 border-t')}>
                    <h3 className="uppercase text-sm font-bold leading-normal text-white">{number.title}</h3>
                    <h3 className="text-5xl font-bold leading-normal text-orange-500 my-2 md:my-4">{number.data}</h3>
                    <p className="text-sm leading-normal text-white">{number.desc}</p>
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
        pageContent: JSON.parse(JSON.stringify(convertAgaetisAPItoContent(await getAgaetisContent())))
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
