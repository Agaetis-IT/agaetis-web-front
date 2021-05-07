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
import send from '../Services/contactService'
import SnackBar from '../components/SnackBar'

interface Props {
  pageContent: ContactContent
}

export default function contact({ pageContent }: Props) {
  const [isOpenenedModal, setOpenModal] = useState(false)
  const [isError, setIsError] = useState(true)
  const [isSubmited, setIsSubmited] = useState(false)

  function handleOpenModal(error: boolean) {
    setIsError(error)
    setOpenModal(true)
    setIsSubmited(false)
    setTimeout(() => {
      setOpenModal(false)
    }, 3000)
  }

  async function handleSubmit(data: FormInput) {
    try {
      setIsSubmited(true)
      await send(
        data.firstname,
        data.lastname,
        data.mail,
        data.subject,
        data.message,
        data.phone,
        new Date(),
        data.captcha,
        data.attachments
      )
      handleOpenModal(false)
    } catch {
      handleOpenModal(true)
    }
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
          {isOpenenedModal && (
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
