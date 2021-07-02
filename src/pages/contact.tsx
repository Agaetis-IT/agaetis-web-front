/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react'
import Head from 'next/head'

import ContactForm from '../components/ContactForm'
import ContactSection from '../components/ContactSection'
import Error from './_error'
import Layout from '../components/Layout'
import SnackBar from '../components/SnackBar'

import ContactContent from '../types/ContactContent'
import { FormInput } from '../yup/ContactFormValidation'
import { getContactPageContent } from '../services/wordpressService'
import send from '../services/contactService'

interface Props {
  pageContent: ContactContent
  errorCode?: number
}

export default function contact({ pageContent, errorCode }: Props) {
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

  if (errorCode) {
    return <Error statusCode={errorCode} />
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
      <Layout>
        <div className="pt-0 md:pt-25">
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

export async function getStaticProps() {
  try {
    return {
      props: {
        pageContent: await getContactPageContent(),
      },
      revalidate: +process.env.NEXT_PUBLIC_REVALIDATION_DELAY,
    }
  } catch (error) {
    return {
      props: {
        errorCode: 500,
      },
      revalidate: +process.env.NEXT_PUBLIC_REVALIDATION_DELAY,
    }
  }
}
