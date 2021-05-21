import Head from 'next/head'
import Link from 'next/link'
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
          <div className="md:max-w-md flex flex-col mx-auto">
            <div className="text-xs leading-normal px-4 mt-32">
              <span>
                <Link href="/">
                  <a className="underline">Accueil</a>
                </Link>

                {' > '}
                <b>Page introuvable</b>
              </span>
            </div>
          </div>
          <div className="my-8 flex flex-col mx-auto bg-orange-500 text-white text-center p-20">
            <h1 className="text-4xl leading-normal font-semibold">
              Page introuvable ({statusCode ? statusCode : 404})
            </h1>
            <h2 className="text-sm leading-normal font-normal my-6">La page que vous cherchez n'existe pas ou plus</h2>
            <Button
              href="/"
              className="flex flex-row justify-center bg-black text-white py-3 uppercase rounded-full text-xss leading-normal font-semibold w-48 mx-auto"
            >
              Retourner à l'accueil
            </Button>
          </div>
        </>
      </Layout>
    </>
  )
}
