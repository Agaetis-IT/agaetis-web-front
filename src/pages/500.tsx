import Head from 'next/head'

import Button from '../components/Button'
import ContactSection from '../components/ContactSection'
import Layout from '../components/Layout'

const Mask = '/images/hero_mask.svg'

export default function Custom500() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
        <title>Agaetis - Erreur 500</title>
      </Head>
      <Layout>
        <div className="pt-0 md:pt-25 min-h-screen flex flex-col bg-orange-500">
          <div
            style={{
              backgroundImage: `url("${Mask}")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'bottom',
              backgroundSize: '100%',
            }}
            className="py-20 flex flex-col flex-auto flex-shrink-0 text-white text-center"
          >
            <h1 className="text-4xl leading-normal font-semibold">Erreur interne au serveur (HTTP 500)</h1>
            <h2 className="text-sm leading-normal font-normal my-6">
              Une erreur s'est produite sur le serveur, veuillez réessayer ultérieurement
            </h2>
            <Button
              href="/"
              className="flex flex-row justify-center bg-black hover:bg-gray-800 text-white py-2 uppercase rounded-full text-xss leading-tight font-semibold w-48 mx-auto shadow-md hover:shadow-lg transition-all duration-250"
            >
              Retourner à l'accueil
            </Button>
          </div>
          <div className="flex-shrink-0 w-full">
            <ContactSection />
          </div>
        </div>
      </Layout>
    </>
  )
}
