import Head from 'next/head'
import React from 'react'

import ContactTab from '../components/ContactForm'
import Layout from '../components/Layout'
import { getContactPageContent } from '../Services/wordpressService'
import ContactContentApi from '../types/ContactContentApi'

import './contact.css'

interface Props {
  pageContent: ContactContentApi
}

contact.getInitialProps = async () => {
  // tslint:disable-next-line
  const data = await getContactPageContent()
  return {
    pageContent: data,
  }
}

export default function contact({ pageContent }: Props) {
  return (
    <>
      <Head>
        <title>Agaetis : contactez-nous</title>
        <meta
          property="og:description"
          content="Pour un projet, une candidature ou même pour un café, on peut en parler !"
        />
        <link rel="canonical" href="http://www.agaetis.fr/contact" />
      </Head>
      <Layout headerProps={{ invertColors: false }}>
        <div className="md:max-w-md mx-auto p-0 md:px-4">
          <div className=" text-xs px-4">
            <span>
              <a className="text-underline text-black" href="/">
                Accueil
              </a>{' '}
              > <b>Contact</b>
            </span>
          </div>
          <h1
            className="text-center text-2xl md:px-8 py-8 md:pb-0"
            dangerouslySetInnerHTML={{ __html: pageContent.title }}
          />
          <p
            className="md:max-w-md mx-auto text-center px-4 md:p-6 mb-8 text-xs leading-normal"
            dangerouslySetInnerHTML={{ __html: pageContent.paragraph }}
          />
          <ContactTab />
        </div>
      </Layout>
    </>
  )
}
