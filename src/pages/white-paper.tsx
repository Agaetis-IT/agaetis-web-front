/* eslint-disable react-hooks/rules-of-hooks */
import { NextPageContext } from 'next'
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
import Logo from '../public/icons/Agaetis - Ico logo - Orange.png'

import Error from './_error'

interface Props {
  pageContent?: WhitePaper
  errorCode?: number
}

interface Context extends NextPageContext {
  query: { slug: string }
}

export default function whitePaper({ pageContent, errorCode }: Props) {
  const [isOpenenedModal, setOpenModal] = useState(false)
  const [isError, setIsError] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  function handleOpenModal(error: boolean) {
    setIsError(error)
    setOpenModal(true)
    setIsLoading(false)
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
      } catch {
        handleOpenModal(true)
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
        <meta property="og:title" content={`Agaetis : ${pageContent.title}`} />
        <meta property="og:image" content={`${publicRuntimeConfig.NEXT_APP_SITE_URL}/favicon.ico`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={pageContent.description} />
        <meta name="description" content={pageContent.description} />
        <link rel="canonical" href={`${publicRuntimeConfig.NEXT_APP_SITE_URL}/${pageContent.slug}`} />
      </Head>
      <Layout invertColors={false}>
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
          <img className="md:max-w-lg flex shadow-xl justify-center mx-auto my-4 p-0" src={pageContent.image} />
          <div className="md:max-w-lg mx-auto mb-8 px-4">
            <img src={Logo} className="bg-img-left-wp"></img>
            <img src={Logo} className="bg-img-right-wp"></img>
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

whitePaper.getInitialProps = async ({ query }: Context) => {
  // tslint:disable-next-line
  const data = await getWhitePaperContent(query.slug!)
  if (!!data.acf) {
    return {
      pageContent: { ...data.acf, slug: data.slug },
    }
  }
  return { errorCode: 404 }
}
