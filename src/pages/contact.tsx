/* eslint-disable react-hooks/rules-of-hooks */
import Head from 'next/head'
import React, { useState } from 'react'

import Layout from '../components/Layout'
import { getContactPageContent } from '../services/wordpressService'
import ContactContent from '../types/ContactContent'

import ContactSection from '../components/ContactSection'
import ContactForm from '../components/ContactForm'
import { FormInput } from '../yup/ContactFormValidation'
import SnackBar from '../components/SnackBar'
import send from '../services/contactService'

interface Props {
  pageContent: ContactContent
}

export default function contact({ pageContent }: Props) {
  const [modalOpenWithError, setModalOpenWithError] = useState<boolean | undefined>(undefined)
  const [isSubmited, setIsSubmited] = useState(false)

  function handleOpenModal(error: boolean) {
    setModalOpenWithError(error)
    setIsSubmited(false)
  }

  function handleCloseModal() {
    setModalOpenWithError(undefined)
  }

  async function handleSubmit(data: FormInput) {
    try {
      setIsSubmited(true)
      await send(data)
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
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/favicon.ico`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Un projet, une idée ? Discutons-en !" />
        <meta name="description" content="Un projet, une idée ? Discutons-en !" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/contact`} />
      </Head>
      <Layout invertColors={false}>
        <div className="pt-0 md:pt-28">
          <ContactForm
            title={pageContent.title}
            subText={pageContent.paragraph}
            handleSubmit={handleSubmit}
            isSubmited={isSubmited}
          />
          <SnackBar
            message={modalOpenWithError ? "Erreur pendant l'envoi du message" : 'Message envoyé'}
            isError={modalOpenWithError}
            open={modalOpenWithError}
            onClose={handleCloseModal}
          />
          <ContactSection />
        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps() {
  const data = await getContactPageContent()

  return {
    props: {
      pageContent: data,
    },
  }
}
