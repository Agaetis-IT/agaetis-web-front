import Head from 'next/head'

import ContactForm from '../../components/ContactForm'
import ContactSection from '../../components/ContactSection'
import Error from '../_error'
import Layout from '../../components/Layout'

import { convertAPItoLandingPageContent, LandingPage } from '../../types/LandingPageContent'
import { getAllLandingPages, getLandingPageContent } from '../../services/wordpressService'
import LandingPageAPI from '../../models/LandingPageAPI'

import styles from '../../styles/landingpage.module.css'
const Particles = '/images/particles-3.svg'

interface Props {
  pageContent: LandingPage
  pageSlug: string
  errorCode?: number
}

function setStyles(htmlString: string) {
  return htmlString.replace(/(?<=<.*class=")[^">]*(?=.*>)/g, (classes) => {
    return classes
      .split(' ')
      .map((cl) => (styles[cl] ? styles[cl] : cl))
      .join(' ')
  })
}

export default function Landingpage({ pageContent, pageSlug, errorCode }: Props) {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return (
    <>
      <Head>
        <title>Agaetis - Offre {pageContent.title}</title>
        <meta property="og:title" content={`Agaetis - Offre ${pageContent.title}`} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}/landingpage/${pageSlug}`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/favicon.ico`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={`Découvrez notre offre ${pageContent.title}`} />
        <meta name="description" content={`Découvrez notre offre ${pageContent.title}`} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/landingpage/${pageSlug}`} />
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
            className="p-6 md:p-16 xl:px-32 bg-gray-400"
          >
            <h1 className="font-bold text-4xl">{pageContent.title}</h1>
            <div
              className={`xl:mt-20 ${styles.landingpageContent}`}
              dangerouslySetInnerHTML={{ __html: setStyles(pageContent.content) }}
            />
          </div>
          <ContactForm title="Une question ? Contactez-nous !" />
          <ContactSection />
        </div>
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  const pages = await getAllLandingPages()

  return {
    paths: pages.map((page: LandingPageAPI) => ({
      params: {
        pageSlug: page.slug,
      },
    })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  try {
    const data = await getLandingPageContent(params.pageSlug)

    if (data === '{"errorCode":404}') {
      return {
        notFound: true,
        revalidate: +process.env.NEXT_PUBLIC_REVALIDATION_DELAY,
      }
    }

    const pageContent = convertAPItoLandingPageContent({ ...data })

    return {
      props: {
        pageContent,
        pageSlug: params.pageSlug,
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
