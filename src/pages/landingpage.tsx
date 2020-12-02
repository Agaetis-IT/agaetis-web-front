import { NextPageContext } from 'next'
import React, { useState } from 'react'
import ContactFormFooter from '../components/ContactFormFooter'
import ContactMessage from '../components/ContactMessage'
import ContactSection from '../components/ContactSection'
import Error from './_error'
import Layout from '../components/Layout'
import { footerSend } from '../Services/contactService'
import { getLandingPageContent } from '../Services/wordpressService'
import { convertAPItoLandingPageContent, LandingPage } from '../types/OffersContent'
import { FooterFormInput } from '../yup/ContactFormValidation'

import './landingpage.css'

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

  async function handleSubmit(data: FooterFormInput) {
    try {
      setIsSubmited(true)
      await footerSend(data.firstname, data.lastname, data.mail, data.message, data.phone, new Date())
      handleOpenModal(false)
    } catch {
      handleOpenModal(true)
    }
  }

  if (!!errorCode) {
    return <Error statusCode={404} />
  }
  console.log(pageContent)
  return (
    <Layout invertColors={false}>
      <>
        <div className="p-0 md:p-12 md:p-16 xl:px-32">
          <div className="xl:mt-20 landingpage-content" dangerouslySetInnerHTML={{ __html: pageContent.content }}></div>
        </div>
        <ContactFormFooter handleSubmit={handleSubmit} isSubmited={isSubmited} />
        {isOpenenedModal && <ContactMessage error={isError}></ContactMessage>}
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
