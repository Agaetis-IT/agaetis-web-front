/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react'
import clsx from 'clsx'
import Head from 'next/head'
import Link from 'next/link'

import Button from '../components/Button'
import ContactForm from '../components/ContactForm'
import ContactSection from '../components/ContactSection'
import Error from './_error'
import Layout from '../components/Layout'

import { getAllOffers, getCategoryOffers, getOffersPageContent } from '../services/wordpressService'
import OffersContent, { OfferDesc, convertAPItoOffersContent, OfferLeaf } from '../types/OffersContent'

const Mask = '../../public/images/hero_mask.svg'
const Plus = '../../public/icons/squared_plus_white.svg'

interface Props {
  pageContent: OffersContent
  allOffers: OfferDesc[]
  errorCode?: number
}

export default function offers({ pageContent, allOffers, errorCode }: Props) {
  const [selectedOffer, setSelectedOffer] = useState(0)

  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return (
    <>
      <Head>
        <title>Agaetis - Nos offres</title>
        <meta property="og:title" content="Agaetis - Nos offres" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/favicon.ico`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Découvrez les offres d'Agaetis pour vos projets et vos besoins" />
        <meta name="description" content="Découvrez les offres d'Agaetis pour vos projets et vos besoins" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/offers`} />
      </Head>
      <Layout>
        <div className="mx-auto pt-0md:pt-17">
          <div
            style={{
              backgroundImage: `url("${Mask}")`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
            className="bg-gray-900 md:bg-orange-500 p-0 md:p-12 lg:px-24 lg:p-16 shadow-none md:shadow-md"
          >
            <div className="hidden md:block">
              <h1 className="text-white text-2xl leading-normal pb-2">{pageContent.title}</h1>
              <p className="text-white py-8 leading-normal text-sm">{pageContent.paragraph}</p>
              <div className="mx-auto p-8">
                <div className="flex flex-row items-center">
                  <img
                    src={allOffers[selectedOffer].offers_image1}
                    className="block h-16"
                    alt={allOffers[selectedOffer].title}
                  />
                  <h2 className="ml-8 text-white">{allOffers[selectedOffer].title}</h2>
                </div>
                <p
                  className="leading-normal text-sm py-8 text-justify text-white"
                  dangerouslySetInnerHTML={{ __html: allOffers[selectedOffer].offers_description }}
                />
                <Button
                  className="text-sm leading-normal flex flex-row justify-center font-semibold text-white"
                  href={`/offers/${allOffers[selectedOffer].slug}?offer=${allOffers[selectedOffer].childrens[0].post_name}`}
                >
                  <div className="flex flex-row items-center">
                    En savoir plus <img src={Plus} className="ml-4 h-6" alt="Plus" />
                  </div>
                </Button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between m-0 md:pt-8">
              {allOffers.map((offre, index) => (
                <>
                  <div
                    key={offre.title}
                    className="bg-none md:bg-white flex flex-row md:flex-col justify-between items-center text-white md:text-black p-8 cursor-pointer w-full md:w-1/6 text-center"
                    onClick={() => {
                      setSelectedOffer(index)
                    }}
                  >
                    <img src={offre.offers_image1} className="h-8 md:h-24" alt={offre.title} />
                    <h2 className="text-sm leading-normal">{offre.title}</h2>
                    <div
                      className={clsx(
                        'inline-block md:hidden transition-transform offerIcon',
                        selectedOffer === index && 'transform rotate-45'
                      )}
                    >
                      <span>+</span>
                    </div>
                  </div>
                  <div
                    className={clsx('block md:hidden px-8 text-white text-sm leading-normal', {
                      'mb-8': allOffers.length === index + 1 && selectedOffer === index,
                    })}
                  >
                    {selectedOffer === index && (
                      <div className="flex flex-col">
                        {allOffers[selectedOffer].childrens.length > 0 &&
                          allOffers[selectedOffer].childrens.map((offer: OfferLeaf) => (
                            <Link
                              key={offer.post_title}
                              href={{
                                pathname: `/offers/${allOffers[selectedOffer].slug}`,
                                query: { offer: offer.post_name },
                              }}
                              passHref
                            >
                              <p className="text-center p-4">{offer.post_title}</p>
                            </Link>
                          ))}
                      </div>
                    )}
                  </div>
                </>
              ))}
            </div>
          </div>
          <ContactForm title="Une question ? Contactez-nous !" />
          <ContactSection />
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  try {
    const { [0]: data, [1]: allOffersData } = await Promise.all([getOffersPageContent(), getAllOffers()])
    const pageContent = convertAPItoOffersContent(data)
    const allOffers = allOffersData.map(
      async (offer: {
        acf: {
          title: string
          paragraph: string
          offers_description: string
          offers_image1: string
          offers_image2: string
        }
        slug: string
      }) => {
        const childrens = await getCategoryOffers(offer.slug)
        return { ...offer.acf, slug: offer.slug, childrens }
      }
    )
    const allOffersChildrens = await Promise.all(allOffers)

    return {
      props: {
        pageContent: JSON.parse(JSON.stringify(pageContent)),
        allOffers: allOffersChildrens,
      },
      revalidate: +process.env.NEXT_PUBLIC_REVALIDATION_DELAY,
    }
  } catch (error) {
    return {
      props: {
        errorCode: 500,
      },
      revalidate: +process.env.NEXT_PUBLIC_REVALIDATION_DELAY,
    }
  }
}
