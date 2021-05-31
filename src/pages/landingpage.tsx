import { NextPageContext } from 'next'
import { useState } from 'react'
import ContactForm from '../components/ContactForm'
import ContactSection from '../components/ContactSection'
import Error from './_error'
import Layout from '../components/Layout'
const Particles = '/images/particles-3.svg'
import { getLandingPageContent } from '../services/wordpressService'
import { convertAPItoLandingPageContent, LandingPage } from '../types/OffersContent'
import { FormInput } from '../yup/ContactFormValidation'
import Image from 'next/image'

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
        <div className="relative pt-0 md:pt-28">
          <div className="absolute mt-0 md:mt-28 bg-gray-400 top-0 left-0 right-0 bottom-0 z-back">
            <Image src={Particles} layout="responsive" height={960} width={1920} quality={100}/>
          </div>
          <div className="p-6 md:p-16 xl:px-32">
            <h1>{pageContent.title}</h1>
            <div
              className={`xl:mt-20 ${styles.landingpageContent}`}
              dangerouslySetInnerHTML={{ __html: pageContent.content }}
            />
          </div>
          <ContactForm title="Une question ? Contactez-nous !" handleSubmit={handleSubmit} isSubmited={isSubmited} />
          <SnackBar
            message={modalOpenWithError ? "Erreur pendant l'envoi du message" : 'Message envoyé'}
            isError={modalOpenWithError}
            open={modalOpenWithError}
            onClose={handleCloseModal}
          />
          <ContactSection />
        </div>
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
