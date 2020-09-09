import Head from 'next/head'
import React from 'react'

import Layout from '../components/Layout'
import SoluceTab from '../components/SoluceTab'
import publicRuntimeConfig from '../config/env.config'
import { getSolutionsPageContent } from '../Services/wordpressService'
import { SolutionsContent } from '../types/SolutionsContent'

import './solutions.css'

interface Props {
  pageContent: SolutionsContent
}

function solutions({ pageContent }: Props) {
  return (
    <>
      <Head>
        <title>Agaetis : nos solutions</title>
        <meta property="og:title" content="Agaetis : nos solutions" />
        <meta property="og:image" content={`${publicRuntimeConfig.NEXT_APP_SITE_URL}/favicon.ico`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Chaque client a des besoins propres, nous leur apportons des solutions sur mesure"
        />
        <meta
          name="description"
          content="Chaque client a des besoins propres, nous leur apportons des solutions sur mesure"
        />
        <link rel="canonical" href={`${publicRuntimeConfig.NEXT_APP_SITE_URL}/sectors`} />
      </Head>
      <Layout invertColors={false}>
        <>
          <div className="md:max-w-md mx-auto p-0 md:px-8">
            <div className="text-xs px-4 md:px-0">
              <span>
                <a className="text-underline text-black" href="/">
                  Accueil
                </a>
                {' > '}
                <b>Secteurs</b>
              </span>
            </div>
            <h1 className="text-center text-3xl py-8 md:pb-0 md:mt-12">{pageContent.title}</h1>
            <p className="md:max-w-md mx-auto text-center px-4 md:py-6 md:px-0 text-sm leading-normal">
              {pageContent.description}
            </p>
          </div>
          <SoluceTab tabs={pageContent.tabs} />
        </>
      </Layout>
    </>
  )
}

solutions.getInitialProps = async () => {
  const pageContent = await getSolutionsPageContent()
  return { pageContent }
}

export default solutions
