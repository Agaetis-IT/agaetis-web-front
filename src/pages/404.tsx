import Head from 'next/head'

import Button from '../components/Button'
import ContactSection from '../components/ContactSection'
import Layout from '../components/Layout'
import Image from 'next/image'
const Mask = '/images/hero_mask.svg'

export default function Custom404() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
        <title>Agaetis : Erreur 404</title>
      </Head>
      <Layout invertColors={true}>
        <div className="pt-0 md:pt-28 min-h-screen flex flex-col bg-orange-500">
          <div className="relative mb-8 py-20 flex flex-col flex-auto flex-shrink-0 text-white text-center">
            <div className="absolute bg-orange-500 top-0 left-0 right-0 bottom-0 z-back">
              <div className="absolute bottom-0 left-0 right-0">
                <Image src={Mask} layout="responsive" alt="" height={960} width={1920} quality={100}/>
              </div>
            </div>
            <h1 className="text-4xl leading-normal font-semibold">
              Page introuvable (HTTP 404)
            </h1>
            <h2 className="text-sm leading-normal font-normal my-6">La page que vous cherchez n'existe pas ou plus</h2>
            <Button
              href="/"
              className="flex flex-row justify-center bg-black text-white py-2 uppercase rounded-full text-xss leading-tight font-semibold w-48 mx-auto"
            >
              Retourner à l'accueil
            </Button>
          </div>
          <div className="flex-shrink-0 w-full">
            <ContactSection/>
          </div>
        </div>
      </Layout>
    </>
  )
}
