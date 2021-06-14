import Head from 'next/head'

import Button from '../components/Button'
import ContactSection from '../components/ContactSection'
import Layout from '../components/Layout'

export default function Custom500() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
        <title>Agaetis : Erreur 500</title>
      </Head>
      <Layout invertColors={false}>
        <div className="pt-0 md:pt-28">
          <div className="shadow-md mb-8 py-8 flex flex-col bg-orange-500 text-white text-center">
            <h1 className="text-4xl leading-normal font-semibold">
              Erreur serveur (HTTP 500)
            </h1>
            <h2 className="text-sm leading-normal font-normal my-6">Le serveur ne répond plus, veuillez réessayer dans un moment</h2>
            <Button
              href="/"
              className="flex flex-row justify-center bg-black text-white py-3 uppercase rounded-full text-xss leading-normal font-semibold w-48 mx-auto"
            >
              Retourner à l'accueil
            </Button>
          </div>
          <ContactSection/>
        </div>
      </Layout>
    </>
  )
}
