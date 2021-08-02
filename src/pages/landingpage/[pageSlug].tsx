import ContactForm from '../../components/ContactForm'
import ContactSection from '../../components/ContactSection'
import Error from '../_error'
import Layout from '../../components/Layout'

import { convertAPItoLandingPageContent, LandingPage } from '../../types/OffersContent'
import { getAllLandingPages, getLandingPageContent } from '../../services/wordpressService'
import LandingPageAPI from '../../models/LandingPageAPI'

import styles from '../../styles/landingpage.module.css'
const Particles = '/images/particles-3.svg'

interface Props {
  pageContent: LandingPage
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

export default function Landingpage({ pageContent, errorCode }: Props) {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return (
    <Layout>
      <div className="pt-0md:pt-17">
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

    if (!data.acf) {
      return {
        notFound: true,
        revalidate: +process.env.NEXT_PUBLIC_REVALIDATION_DELAY,
      }
    }

    const pageContent = convertAPItoLandingPageContent({ ...data })

    return {
      props: {
        pageContent,
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
