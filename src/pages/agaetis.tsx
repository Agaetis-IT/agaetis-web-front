import clsx from 'clsx'
import Head from 'next/head'

import AgaetisCard from '../components/AgaetisCard'
import ContactSection from '../components/ContactSection'
import Layout from '../components/Layout'
import { getAgaetisContent } from '../services/wordpressService'
import { AgaetisContent, convertAgaetisAPItoContent } from '../types/AgaetisContent'

const Particles = '/images/particles-3.svg'

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
        <div className="pt-0 md:pt-28">
          <div
            style={{
              backgroundImage: `url("${pageContent.background}")`,
              backgroundPosition: 'top',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
            className="py-4 md:p-16 lg:px-32 xl:px-48"
          >
            <h1 className="px-4 md:py-6 md:px-0 text-2xl font-bold leading-normal text-orange-500">{pageContent.title}</h1>
            <h2 className="px-4 md:py-6 md:px-0 text-md leading-normal">{pageContent.paragraph}</h2>
          </div>
          <div
            style={{
              backgroundImage: `url("${Particles}")`,
              backgroundPosition: 'top',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            }}
            className="py-4 md:p-16 lg:px-32 xl:px-48 bg-gray-400"
          >
            <div className="md:max-w-full mx-auto mt-8 md:mt-0 md:px-6 xl:px-32">
              {pageContent.questions.map((question) => (
                <AgaetisCard
                  key={question.index}
                  className={clsx('md:flex-row', { 'bg-gray-600': question.index % 2 === 1 })}
                  title={question.question}
                  description={question.answer}
                />
              ))}
            </div>
            <div className="mb-8 md:mb-16 md:px-8">
              <h2 className="text-md font-bold text-center mt-12 mb-8">{pageContent.numbersTitle}</h2>
              <div className="md:max-w-full mx-auto md:px-8 flex flex-col md:flex-row justify-around bg-gray-600 p-8">
                {pageContent.numbers.map((number) => (
                  <div key={number.index} className="text-center my-6 md:my-0 px-4">
                    <h3 className="uppercase text-sm font-bold leading-normal">{number.title}</h3>
                    <h3 className="text-5xl font-bold leading-normal text-orange-500 my-2 md:my-4">{number.data}</h3>
                    <p className="text-sm leading-normal">{number.desc}</p>
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
