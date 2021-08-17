import Head from 'next/head'

import ContactForm from '../components/ContactForm'
import ContactSection from '../components/ContactSection'
import Error from './_error'
import Layout from '../components/Layout'

import ContactAPI from '../models/ContactAPI'
import { getContactPageContent } from '../services/wordpressService'

interface Props {
  pageContent: ContactAPI
  errorCode?: number
}

export default function contact({ pageContent, errorCode }: Props) {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return (
    <>
      <Head>
        <title>Agaetis - Contactez-nous</title>
        <meta property="og:title" content="Agaetis - Contactez-nous" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}/contact`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/favicon.ico`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Un projet, une idée ? Discutons-en !" />
        <meta name="description" content="Un projet, une idée ? Discutons-en !" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/contact`} />
      </Head>
      <Layout>
        <div className="pt-0 md:pt-17">
          <ContactForm title={pageContent.title} subText={pageContent.paragraph} isPage />
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
        pageContent: await getContactPageContent(),
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
