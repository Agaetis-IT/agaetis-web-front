import clsx from 'clsx'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

import AgaetisCard from '../components/AgaetisCard'
import ContactSection from '../components/ContactSection'
import Layout from '../components/Layout'
import publicRuntimeConfig from '../config/env.config'
import { getAgaetisContent } from '../Services/wordpressService'
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
        <meta property="og:image" content={`${publicRuntimeConfig.NEXT_APP_SITE_URL}/favicon.ico`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={"Présentation d'Agaetis, de son histoire et de sa vision"} />
        <meta name="description" content={"Présentation d'Agaetis, de son histoire et de sa vision"} />
        <link rel="canonical" href={`${publicRuntimeConfig.NEXT_APP_SITE_URL}/agaetis`} />
      </Head>
      <Layout invertColors={false}>
        <div className="mx-auto px-0">
          <div className=" p-0 md:p-12 lg:px-24 lg:p-16 pb-0">
            <div className="md:max-w-md mx-auto p-0 md:px-8 mt-0 md:mt-20">
              <div className="text-xs px-4 md:px-0 ">
                <span>
                  <Link href="/">
                    <a className="text-underline text-black">Accueil</a>
                  </Link>
                  {' > '}
                  <b>Agaetis</b>
                </span>
              </div>
              <div className="md:max-w-md mx-auto md:px-8">
                <h1 className="text-center text-3xl py-8 md:pb-0 md:mt-12">{pageContent.title}</h1>
                <p className=" text-center px-4 md:py-6 md:px-0 text-sm leading-normal">{pageContent.paragraph}</p>
              </div>
            </div>
            <div className="md:max-w-full mx-auto mt-8 md:mt-0 md:px-6 xl:px-32">
              {pageContent.questions.map((question) => (
                <AgaetisCard
                  key={question.index}
                  className={clsx('md:flex-row', { 'bg-light-grey': question.index % 2 === 1 })}
                  title={question.intitule}
                  description={question.reponse}
                />
              ))}
            </div>
            <div className="mb-8 md:mb-16 md:px-8">
              <h2 className="text-center mt-12 mb-8">{pageContent.chiffres_title}</h2>
              <div className="md:max-w-full mx-auto md:px-8 flex flex-col md:flex-row justify-around bg-light-grey p-8">
                {pageContent.chiffres.map((chiffre) => (
                  <div key={chiffre.title} className="text-center my-6 md:my-0 px-4">
                    <h3 className="uppercase text-sm ">{chiffre.title}</h3>
                    <h3 className="text-5xl text-orange my-2 md:my-4">{chiffre.data}</h3>
                    <p className="text-sm">{chiffre.desc}</p>
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

agaetis.getInitialProps = async () => {
  const pageContent = await getAgaetisContent()
  return { pageContent: convertAgaetisAPItoContent(pageContent) }
}
