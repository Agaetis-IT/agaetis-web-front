import { NextPageContext } from 'next'
import React, { useState } from 'react'
import ContactForm from '../components/ContactForm'
import ContactSection from '../components/ContactSection'
import Error from './_error'
import Layout from '../components/Layout'
import Particles from '../static/images/particles-3.svg'
import send from '../Services/contactService'
import { getLandingPageContent } from '../Services/wordpressService'
import { convertAPItoLandingPageContent, LandingPage } from '../types/OffersContent'
import { FormInput } from '../yup/ContactFormValidation'

import './landingpage.css'
import SnackBar from '../components/SnackBar'

interface Context extends NextPageContext {
  query: { slug: string }
}

interface Props {
  pageContent: LandingPage
  errorCode?: number
}

export default function Landingpage({ pageContent, errorCode }: Props) {
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
            className="bg-light-grey p-6 md:p-12 md:p-16 xl:px-32 shadow-none md:shadow-top"
          >
            <h1>{pageContent.title}</h1>
            <div
              className="xl:mt-20 landingpage-content"
              dangerouslySetInnerHTML={{ __html: pageContent.content }}
            ></div>
          </div>
        </div>
        <ContactForm title="Une question ? Contactez-nous !" handleSubmit={handleSubmit} isSubmited={isSubmited} />
        {isOpenenedModal && (
          <SnackBar message={isError ? "Erreur pendant l'envoi du message" : 'Message envoyé'} isError={isError} />
        )}
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
