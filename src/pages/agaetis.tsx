import clsx from 'clsx'
import Head from 'next/head'
import Link from 'next/link'

import AgaetisCard from '../components/AgaetisCard'
import ContactSection from '../components/ContactSection'
import Layout from '../components/Layout'
import { getAgaetisContent } from '../services/wordpressService'
import { AgaetisContent, convertAgaetisAPItoContent } from '../types/AgaetisContent'

interface Props {
  pageContent: AgaetisContent
}

export default function agaetis({ pageContent }: Props) {
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
        <div className="mx-auto px-0">
          <div className="p-0 md:p-12 lg:px-24 lg:p-16 pb-0">
            <div className="p-0 md:px-8 mt-0 md:mt-20">
              <h2 className="text-center px-4 md:py-6 md:px-0 text-md leading-normal">{pageContent.paragraph}</h2>
            </div>
            <div className="md:max-w-full mx-auto mt-8 md:mt-0 md:px-6 xl:px-32">
              {pageContent.questions.map((question) => (
                <AgaetisCard
                  key={question.index}
                  className={clsx('md:flex-row', { 'bg-gray-400': question.index % 2 === 1 })}
                  title={question.intitule}
                  description={question.reponse}
                />
              ))}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-orange-500 text-center mb-4">{pageContent.videoTitle}</h2>
              <video width="576" height="324" controls className="mx-auto">
                <source src={pageContent.video} type="video/mp4" />
              </video>
            </div>
            <div className="mb-8 md:mb-16 md:px-8">
              <h2 className="text-center mt-12 mb-8">{pageContent.chiffres_title}</h2>
              <div className="md:max-w-full mx-auto md:px-8 flex flex-col md:flex-row justify-around bg-gray-400 p-8">
                {pageContent.chiffres.map((chiffre) => (
                  <div key={chiffre.title} className="text-center my-6 md:my-0 px-4">
                    <h3 className="uppercase text-sm font-bold leading-normal">{chiffre.title}</h3>
                    <h3 className="text-5xl font-bold leading-normal text-orange-500 my-2 md:my-4">{chiffre.data}</h3>
                    <p className="text-sm leading-normal">{chiffre.desc}</p>
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
  return {
    props: {
      pageContent: JSON.parse(JSON.stringify(convertAgaetisAPItoContent(await getAgaetisContent()))),
    },
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATION_DELAY,
  }
}
