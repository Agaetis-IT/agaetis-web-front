import { NextContext } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'

import ContactMessage from '../components/ContactMessage'
import WhitePaperForm from '../components/form/WhitePaperForm'
import Layout from '../components/Layout'
import publicRuntimeConfig from '../config/env.config'
import { sendWhitePaper } from '../Services/contactService'
import { getWhitePaperContent } from '../Services/wordpressService'
import WhitePaper from '../types/WhitePaper'
import { WhitepaperFormValues } from '../yup/WhitePaperFormValidation'

import Error from './_error'

interface Props {
  pageContent?: WhitePaper
  errorCode?: number
}

whitePaper.getInitialProps = async ({ query }: NextContext) => {
  // tslint:disable-next-line
  const data = await getWhitePaperContent(query.slug!)
  if (!!data.acf) {
    return {
      pageContent: { ...data.acf, slug: data.slug },
    }
  }
  return { errorCode: 404 }
}

export default function whitePaper({ pageContent, errorCode }: Props) {
  const [isOpenenedModal, setOpenModal] = useState(false)
  const [isError, setIsError] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  function handleOpenModal(error: boolean) {
    setIsError(error)
    setOpenModal(true)
    setTimeout(() => {
      setOpenModal(false)
    }, 3000)
  }

  async function handleSubmit(values: WhitepaperFormValues, title: string, file: string, token: string) {
    setIsLoading(true)
    if (values.firstName && values.lastName && values.email && values.company && values.cgu) {
      try {
        await sendWhitePaper(values.firstName + ' ' + values.lastName, values.email, new Date(), title, file, token)
        handleOpenModal(false)
        setIsLoading(false)
      } catch {
        handleOpenModal(true)
        setIsLoading(false)
      }
    } else {
      handleOpenModal(true)
    }
  }

  if (!pageContent) {
    return <Error statusCode={errorCode!} />
  }
  return (
    <>
      <Head>
        <title>Agaetis : {pageContent.title}</title>
        <meta property="og:description" content={pageContent.description} />
        <meta name="description" content={pageContent.description} />
        <link rel="canonical" href={`${publicRuntimeConfig.NEXT_APP_SITE_URL}/${pageContent.slug}`} />
      </Head>
      <Layout>
        <>
          <div className="md:max-w-md mx-auto p-0 md:px-8">
            <div className="text-xs px-4 md:px-0">
              <span className="text-underline text-black">
                <a href="/">Accueil</a>
              </span>{' '}
              > <b>{pageContent.title}</b>
            </div>
            <h1 className="text-center text-2xl py-8 md:pb-0">{pageContent.title}</h1>
            <p className="md:max-w-md mx-auto text-center px-4 md:py-6 md:px-0 text-xs leading-normal">
              {pageContent.description}
            </p>
          </div>
          <img
            className="md:max-w-md flex shadow-xl justify-center mx-auto my-4 p-0"
            src={pageContent.image}
            loading="lazy"
          />
          <div className="md:max-w-md mx-auto mb-8 px-4">
            <div className=" md:px-12 flex flex-col justify-center">
              <WhitePaperForm
                title={pageContent.title}
                file={pageContent.fichier}
                handleNextStep={handleSubmit}
                isLoading={isLoading}
              />
            </div>
          </div>
          {isOpenenedModal && <ContactMessage error={isError} />}
          <div className=" blue-underline my-4" />
        </>
      </Layout>
    </>
  )
}
