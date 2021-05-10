/* eslint-disable react-hooks/rules-of-hooks */
import Head from 'next/head'
import React, { useState } from 'react'

import Layout from '../components/Layout'
import publicRuntimeConfig from '../config/env.config'
import { getContactPageContent } from '../Services/wordpressService'
import ContactContent from '../types/ContactContent'

import './contact.css'
import ContactSection from '../components/ContactSection'
import ContactForm from '../components/ContactForm'
import { FormInput } from '../yup/ContactFormValidation'
import SnackBar from '../components/SnackBar'
import handleMailSending from '../Services/contactService'

interface Props {
  pageContent: ContactContent
}

export default function contact({ pageContent }: Props) {
  const [isOpenenedMessage, setIsOpennedMessage] = useState(false)
  const [isError, setIsError] = useState(true)
  const [isSubmited, setIsSubmited] = useState(false)

  function handleOpenMessage(error: boolean) {
    setIsError(error)
    setIsOpennedMessage(true)
    setIsSubmited(false)
    setTimeout(() => {
      setIsOpennedMessage(false)
    }, 3000)
  }

  async function handleSubmit(data: FormInput) {
    handleMailSending(data, setIsSubmited, handleOpenMessage)
  }

  return (
    <>
      <Head>
        <title>Agaetis : contactez-nous</title>

        <meta property="og:title" content="Agaetis : contactez-nous" />
        <meta property="og:image" content={`${publicRuntimeConfig.NEXT_APP_SITE_URL}/favicon.ico`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Un projet, une idée ? Discutons-en !" />
        <meta name="description" content="Un projet, une idée ? Discutons-en !" />
        <link rel="canonical" href={`${publicRuntimeConfig.NEXT_APP_SITE_URL}/contact`} />
      </Head>
      <Layout invertColors={false}>
        <div className="pt-0 md:pt-28">
          <ContactForm
            title={pageContent.title}
            subText={pageContent.paragraph}
            handleSubmit={handleSubmit}
            isSubmited={isSubmited}
          />
          {isOpenenedMessage && (
            <SnackBar message={isError ? "Erreur pendant l'envoi du message" : 'Message envoyé'} isError={isError} />
          )}
          <ContactSection />
        </div>
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
