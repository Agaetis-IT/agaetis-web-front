import Head from 'next/head'

import ContactSection from '../components/ContactSection'
import Error from './_error'
import Layout from '../components/Layout'

import { getMentionsLegalesContent } from '../services/wordpressService'
import LegalContent from '../types/LegalContent'

import styles from '../styles/personal-data.module.css'
const Particles = '/images/particles-3.svg'

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
        <title>Agaetis - Mentions légales</title>
        <meta property="og:title" content="Agaetis - Mentions légales" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/favicon.ico`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={pageContent.content} />
        <meta name="description" content={pageContent.content} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/mentions-legales`} />
      </Head>
      <Layout>
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
            <h1
              className="mx-1 md:mx-2 text-2xl leading-normal mb-14 font-bold text-orange-500"
              dangerouslySetInnerHTML={{ __html: pageContent.title }}
            />
            <div
              className={`mx-1 md:mx-2 text-justify text-sm leading-normal ${styles.personalData}`}
              dangerouslySetInnerHTML={{ __html: pageContent.content }}
            />
          </div>
          <ContactSection />
        </div>
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
