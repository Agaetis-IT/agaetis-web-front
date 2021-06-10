import Head from 'next/head'
import Link from 'next/link'
import ContactSection from '../components/ContactSection'

import Layout from '../components/Layout'
import SoluceTab from '../components/SoluceTab'
import { getSolutionsPageContent } from '../services/wordpressService'
import { SolutionsContent } from '../types/SolutionsContent'

interface Props {
  pageContent: SolutionsContent
}

function solutions({ pageContent }: Props) {
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
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/sectors`} />
      </Head>
      <Layout invertColors={false}>
        <div className="mx-auto px-0">
          <div className="p-0 md:p-12 lg:px-24 lg:p-16 pb-0">
            <div className="md:max-w-md mx-auto p-0 md:px-8 mt-0 md:mt-20">
              <div className="text-xs leading-normal px-4 md:px-0">
                <span>
                  <Link href="/">
                    <a className="underline text-black">Accueil</a>
                  </Link>
                  {' > '}
                  <b>Solutions</b>
                </span>
              </div>
              <h1 className="text-center text-3xl font-bold leading-normal py-8 md:pb-0 md:mt-12">{pageContent.title}</h1>
              <p className="md:max-w-md mx-auto text-center px-4 md:py-6 md:px-0 text-sm leading-normal">
                {pageContent.description}
              </p>
            </div>
          </div>
          <SoluceTab tabs={pageContent.tabs} />
          <ContactSection/>
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  return { 
    props: {
      pageContent: JSON.parse(JSON.stringify(await getSolutionsPageContent())),
    },
    revalidate: 30,
  }
}

export default solutions