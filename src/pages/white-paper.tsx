import { NextContext } from 'next'
import React from 'react'

import WhitePaperForm from '../components/form/WhitePaperForm'
import Layout from '../components/Layout'
import { getWhitePaperContent } from '../Services/wordpressService'
import WhitePaper from '../types/WhitePaper'

import Error from './_error'

function handleSubmit() {
  // TODO: Send white paper by mail
  alert('ok')
}

interface Props {
  pageContent?: WhitePaper
  errorCode?: number
}

whitePaper.getInitialProps = async ({ query }: NextContext) => {
  // tslint:disable-next-line
  const data = await getWhitePaperContent(query.slug!)
  if (!!data.acf) {
    return {
      pageContent: data.acf,
    }
  }
  return { errorCode: 404 }
}

export default function whitePaper({ pageContent, errorCode }: Props) {
  if (!pageContent) {
    return <Error statusCode={errorCode!} />
  }
  return (
    <Layout>
      <>
        <div className="md:max-w-md mx-auto p-0 md:px-8">
          <div className="text-xs px-4 md:px-0">
            <span className="text-underline">
              <a href="/">Accueil</a>
            </span>{' '}
            > <b>{pageContent.title}</b>
          </div>
          <h1 className="text-center text-2xl py-8 md:pb-0">{pageContent.title}</h1>
          <p className="md:max-w-md mx-auto text-center px-4 md:py-6 md:px-0 text-xs leading-normal">
            {pageContent.description}
          </p>
        </div>
        <img className="md:max-w-md flex shadow-xl justify-center mx-auto my-4 p-0" src={pageContent.image} />
        <div className="md:max-w-md mx-auto mb-8 px-4">
          <div className=" md:px-12 flex flex-col justify-center">
            <WhitePaperForm handleNextStep={handleSubmit} />
          </div>
        </div>

        <div className=" blue-underline my-4" />
      </>
    </Layout>
  )
}
