import Head from 'next/head'

import Button from '../components/Button'
import ContactSection from '../components/ContactSection'
import Layout from '../components/Layout'

const Mask = '/images/hero_mask.svg'

export default function Custom404() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
        <title>Agaetis - Erreur 404</title>
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
            <h1 className="text-4xl leading-normal font-semibold">Page introuvable (HTTP 404)</h1>
            <h2 className="text-sm leading-normal font-normal my-6">La page que vous cherchez n'existe pas ou plus</h2>
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
