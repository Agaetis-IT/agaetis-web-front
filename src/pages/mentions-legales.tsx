import Head from 'next/head'

import ContactSection from '../components/ContactSection'
import Error from './_error'
import Layout from '../components/Layout'

import { getMentionsLegalesContent } from '../services/wordpressService'
import LegalContent from '../types/LegalContent'

import styles from '../styles/personal-data.module.css'

interface Props {
  pageContent: LegalContent
  errorCode?: number
}

export default function mentionsLegales({ pageContent, errorCode }: Props) {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return (
    <>
      <Head>
        <title>Agaetis : mentions légales</title>
        <meta property="og:title" content="Agaetis : mentions légales" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/favicon.ico`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={pageContent.content} />
        <meta name="description" content={pageContent.content} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/mentions-legales`} />
      </Head>
      <Layout>
        <>
          <div className="mx-auto px-0">
            <div className="p-0 md:p-12 lg:px-24 lg:p-16 pb-0">
              <div className="md:max-w-md mx-auto p-0 md:px-8 mt-0 md:mt-20">
                <div className="text-xs leading-normal px-4 md:px-0">
                  <h1
                    className="text-center text-2xl font-bold leading-normal py-8 md:pb-0 md:mt-12"
                    dangerouslySetInnerHTML={{ __html: pageContent.title }}
                  />
                </div>
                <div
                  className={`md:max-w-md mx-auto text-justify px-4 md:py-6 md:px-0 md:mt-8 text-sm leading-normal ${styles.personalData}`}
                  dangerouslySetInnerHTML={{ __html: pageContent.content }}
                />
              </div>
            </div>
          </div>
          <ContactSection />
        </>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  try {
    const data = await getMentionsLegalesContent()

    return {
      props: {
        pageContent: {
          title: data.title.rendered,
          content: data.content.rendered,
        },
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
