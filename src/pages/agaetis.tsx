import clsx from 'clsx'
import Head from 'next/head'
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

agaetis.getInitialProps = async () => {
  const pageContent = await getAgaetisContent()
  return { pageContent: convertAgaetisAPItoContent(pageContent) }
}

export default function agaetis({ pageContent }: Props) {
  return (
    <>
      <Head>
        <title>Agaetis : histoire et vision</title>
        <meta property="og:description" content={"Présentation d'Agaetis, de son histoire et de sa vision"} />
        <meta name="description" content={"Présentation d'Agaetis, de son histoire et de sa vision"} />
        <link rel="canonical" href={`${publicRuntimeConfig.NEXT_APP_SITE_URL}/agaetis`} />
      </Head>
      <Layout headerProps={{ invertColors: false }}>
        <div className="mx-auto px-0">
          <div className="md:max-w-md mx-auto text-xs px-4 md:px-8 ">
            <span>
              <a className="text-underline text-black" href="/">
                Accueil
              </a>{' '}
              > <b>Agaetis</b>
            </span>
          </div>
          <div className="md:max-w-md mx-auto md:px-8">
            <h1 className="text-center text-2xl py-8 md:pb-0">{pageContent.title}</h1>
            <p className=" text-center px-4 md:py-6 md:px-0 text-xs leading-normal">{pageContent.paragraph}</p>
          </div>
          <div className="md:max-w-md mx-auto md:py-8">
            {pageContent.questions.map(question => (
              <AgaetisCard
                key={question.index}
                className={clsx('md:flex-row', { 'bg-light-grey': question.index % 2 === 1 })}
                title={question.intitule}
                description={question.reponse}
              />
            ))}
          </div>
          <div className="mb-8 md:mb-16">
            <h2 className="text-center mt-12 mb-8">{pageContent.chiffres_title}</h2>
            <div className="md:max-w-md mx-auto md:px-8 flex flex-col md:flex-row justify-around bg-light-grey p-8">
              {pageContent.chiffres.map(chiffre => (
                <div key={chiffre.title} className="text-center my-6 md:my-0 mx-2">
                  <h3 className="uppercase text-xs ">{chiffre.title}</h3>
                  <h3 className="text-4xl text-orange my-2 md:my-4">{chiffre.data}</h3>
                  <p className="text-xs">{chiffre.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <ContactSection />
        </div>
      </Layout>
    </>
  )
}
