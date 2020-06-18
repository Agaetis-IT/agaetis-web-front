import Head from 'next/head'
import React from 'react'

import ContactTab from '../components/ContactForm'
import Layout from '../components/Layout'
import publicRuntimeConfig from '../config/env.config'
import { getContactPageContent } from '../Services/wordpressService'
import ContactContentApi from '../types/ContactContentApi'
import Logo from '../public/icons/Agaetis - Ico logo - Orange.png'

import './contact.css'

interface Props {
  pageContent: ContactContentApi
}

export default function contact({ pageContent }: Props) {
  return (
    <>
      <Head>
        <title>Agaetis : contactez-nous</title>

        <meta property="og:title" content="Agaetis : contactez-nous" />
        <meta property="og:image" content={`${publicRuntimeConfig.NEXT_APP_SITE_URL}/favicon.ico`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Pour un projet, une candidature ou même pour un café, on peut en parler !"
        />
        <meta name="description" content="Pour un projet, une candidature ou même pour un café, on peut en parler !" />
        <link rel="canonical" href={`${publicRuntimeConfig.NEXT_APP_SITE_URL}/contact`} />
      </Head>
      <Layout headerProps={{ invertColors: false }}>
        <>
          <div className="md:max-w-md mx-auto p-0 md:px-4 mb-8">
            <div className=" text-xs px-4">
              <span>
                <a className="text-underline text-black" href="/">
                  Accueil
                </a>{' '}
                > <b>Contact</b>
              </span>
            </div>
            <h1
              className="text-center text-2xl md:px-8 py-8 md:pb-0 md:mt-12"
              dangerouslySetInnerHTML={{ __html: pageContent.title }}
            />
            <p
              className="md:max-w-md mx-auto text-center px-4 md:p-6 mb-8 text-sm leading-normal"
              dangerouslySetInnerHTML={{ __html: pageContent.paragraph }}
            />
          </div>
          <div className="md:max-w-lg mx-auto p-0 md:px-4 mb-8">
            <img src={Logo} className="bg-img-left-contact"></img>
            <img src={Logo} className="bg-img-right-contact"></img>
            <ContactTab />
          </div>
        </>
      </Layout>
    </>
  )
}

contact.getInitialProps = async () => {
  // tslint:disable-next-line
  const data = await getContactPageContent()
  return {
    pageContent: data,
  }
}
