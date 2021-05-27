import { NextPageContext } from 'next'
import React, { useState } from 'react'
import ContactForm from '../components/ContactForm'
import ContactSection from '../components/ContactSection'
import Error from './_error'
import Layout from '../components/Layout'
const Particles = '/images/particles-3.svg'
import { getLandingPageContent } from '../services/wordpressService'
import { convertAPItoLandingPageContent, LandingPage } from '../types/OffersContent'
import { FormInput } from '../yup/ContactFormValidation'

import styles from '../styles/landingpage.module.css'
import SnackBar from '../components/SnackBar'
import send from '../services/contactService'

interface Context extends NextPageContext {
  query: { slug: string }
}

interface Props {
  pageContent: LandingPage
  errorCode?: number
}

export default function Landingpage({ pageContent, errorCode }: Props) {
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

  if (!!errorCode) {
    return <Error statusCode={404} />
  }
  return (
    <Layout invertColors={false}>
      <>
        <div className="pt-0 md:pt-28">
          <div
            style={{
              backgroundImage: `url("${Particles}")`,
              backgroundRepeat: 'no-repeat',
            }}
            className="bg-gray-400 p-6 md:p-12 md:p-16 xl:px-32 shadow-none md:shadow-md"
          >
            <h1>{pageContent.title}</h1>
            <div
              className={`xl:mt-20 ${styles.landingpageContent}`}
              dangerouslySetInnerHTML={{ __html: pageContent.content }}
            ></div>
          </div>
        </div>
        <ContactForm title="Une question ? Contactez-nous !" handleSubmit={handleSubmit} isSubmited={isSubmited} />
        <SnackBar
          message={modalOpenWithError ? "Erreur pendant l'envoi du message" : 'Message envoyé'}
          isError={modalOpenWithError}
          open={modalOpenWithError}
          onClose={handleCloseModal}
        />
        <ContactSection />
      </>
    </Layout>
  )
}

Landingpage.getInitialProps = async ({ query }: Context) => {
  // tslint:disable-next-line
  const { [0]: data } = await Promise.all([getLandingPageContent(query.slug!)])
  const pageContent = convertAPItoLandingPageContent({ ...data })
  return {
    pageContent,
    errorCode: !!data.acf ? undefined : 404,
  }
}
