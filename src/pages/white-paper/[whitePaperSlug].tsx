/* eslint-disable react-hooks/rules-of-hooks */
import Head from 'next/head'
import { useState } from 'react'

import WhitePaperForm from '../../components/form/WhitePaperForm'
import Layout from '../../components/Layout'
import { sendWhitePaper } from '../../services/contactService'
import { getAllWhitePapers, getWhitePaperContent } from '../../services/wordpressService'
import WhitePaper from '../../types/WhitePaper'
import { WhitepaperFormValues } from '../../yup/WhitePaperFormValidation'
const Logo = '../static/icons/Agaetis - Ico logo - Orange.png'

import Link from 'next/link'
import SnackBar from '../../components/SnackBar'
import Error from '../_error'

interface Props {
  pageContent?: WhitePaper
  errorCode?: number
}

export default function whitePaper({ pageContent, errorCode }: Props) {
  const [modalOpenWithError, setModalOpenWithError] = useState<boolean | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  function handleOpenModal(error: boolean) {
    setModalOpenWithError(error)
  }

  function handleCloseModal() {
    setModalOpenWithError(undefined)
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

  if (errorCode) {
    return <Error statusCode={errorCode}/>
  }

  return (
    <>
      <Head>
        <title>Agaetis : {pageContent.title}</title>
        <meta property="og:title" content={`Agaetis : ${pageContent.title}`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/favicon.ico`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={pageContent.description} />
        <meta name="description" content={pageContent.description} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/${pageContent.slug}`} />
      </Head>
      <Layout invertColors={false}>
        <>
          <div className="md:max-w-md mx-auto pt-8 md:px-8">
            <div className="text-xs leading-normal px-4 md:px-0">
              <span className="underline text-black">
                <Link href="/">
                  <a>Accueil</a>
                </Link>
              </span>
              {' > '}
              <b>{pageContent.title}</b>
            </div>
            <h1 className="text-center text-2xl leading-normal py-8 md:pb-0">{pageContent.title}</h1>
            <p className="md:max-w-md mx-auto text-center px-4 md:py-6 md:px-0 text-xs leading-normal">
              {pageContent.description}
            </p>
          </div>
          <img
            className="md:max-w-lg flex shadow-xl justify-center mx-auto my-4 p-0"
            src={pageContent.image}
            alt="header"
          />
          <div className="md:max-w-lg mx-auto mb-8 px-4">
            <img src={Logo} className="bg-img-left-wp" alt="logo agaetis" />
            <img src={Logo} className="bg-img-right-wp" alt="logo agaetis" />
            <div className=" md:px-12 flex flex-col justify-center">
              <WhitePaperForm
                title={pageContent.title}
                file={pageContent.fichier}
                handleNextStep={handleSubmit}
                isLoading={isLoading}
              />
            </div>
          </div>
          <SnackBar
            message={modalOpenWithError ? "Erreur pendant l'envoi du message" : 'Message envoyé'}
            isError={modalOpenWithError}
            open={modalOpenWithError}
            onClose={handleCloseModal}
          />
          <div className="underline my-4" />
        </>
      </Layout>
    </>
  )
}

interface WhitePaperAPI {
  slug: string
}

export async function getStaticPaths() {
  const whitePapers = await getAllWhitePapers()

  return {
    paths: whitePapers.map((whitePaper: WhitePaperAPI) => ({
      params: {
        whitePaperSlug: whitePaper.slug
      }
    })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  try {
    const data = await getWhitePaperContent(params.whitePaperSlug)

    if (!data.acf) {
      return {
        notFound: true,
        revalidate: +(process.env.NEXT_PUBLIC_REVALIDATION_DELAY),
      }
    }

    return {
      props: {
        pageContent: { ...data.acf, slug: data.slug },
      },
      revalidate: +(process.env.NEXT_PUBLIC_REVALIDATION_DELAY),
    }
  } catch (error) {
    return {
      props: {
        errorCode: 500,
      },
      revalidate: +(process.env.NEXT_PUBLIC_REVALIDATION_DELAY),
    }
  }
}
