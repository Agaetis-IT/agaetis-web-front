import Head from 'next/head'
import React from 'react'

import Button from '../components/Button'
import Layout from '../components/Layout'

interface Props {
  statusCode: number
}

export default function Error({ statusCode }: Props) {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
        <title>Agaetis : Erreur 404</title>
      </Head>
      <Layout invertColors={false}>
        <>
          <div className="md:max-w-md flex flex-col mx-auto ">
            <div className=" text-xs px-4">
              <span>
                <a className="text-underline" href="/">
                  Accueil
                </a>{' '}
                > <b>Page introuvable</b>
              </span>
            </div>
          </div>
          <div className="my-8 flex flex-col mx-auto bg-orange text-white text-center p-20">
            <h1 className="text-4xl font-semibold ">Page introuvable ({statusCode ? statusCode : 404})</h1>
            <h2 className="text-sm font-normal my-6">La page que vous cherchez n'existe pas ou plus</h2>
            <Button
              href="/"
              className="flex flex-row justify-center bg-black text-white py-3 uppercase rounded-full text-xss font-semibold w-48 mx-auto"
            >
              Retourner à l'accueil
            </Button>
          </div>
        </>
      </Layout>
    </>
  )
}
