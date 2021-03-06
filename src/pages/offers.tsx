import OffersContent, { OfferDesc, convertAPItoOffersContent, OfferLeaf } from '../types/OffersContent'
import React, { useState } from 'react'
import { getAllOffers, getCategoryOffers, getOffersPageContent } from '../Services/wordpressService'

import Button from '../components/Button'
import ContactFormFooter from '../components/ContactFormFooter'
import Head from 'next/head'
import Layout from '../components/Layout'
import publicRuntimeConfig from '../config/env.config'
import { FooterFormInput } from '../yup/ContactFormValidation'
import { footerSend } from '../Services/contactService'
import ContactMessage from '../components/ContactMessage'
import ContactSection from '../components/ContactSection'
import Mask from '../static/images/hero_mask.svg'
import Plus from '../static/icons/squared_plus_white.svg'
import clsx from 'clsx'
import Link from 'next/link'

/* eslint-disable react-hooks/rules-of-hooks */

function getRotation(selected: boolean, wasSelected: boolean) {
  if (selected) {
    return 'rotate45'
  }
  if (wasSelected) {
    return 'rotate0-45'
  }
  return ''
}

interface Props {
  pageContent: OffersContent
  allOffers: OfferDesc[]
}

export default function offers({ pageContent, allOffers }: Props) {
  const [selectedOffer, setSelectedOffer] = useState(0)
  const [wasSelected, setWasSelected] = useState(0)
  const [isOpenenedModal, setOpenModal] = useState(false)
  const [isError, setIsError] = useState(true)
  const [isSubmited, setIsSubmited] = useState(false)

  function handleOpenModal(error: boolean) {
    setIsError(error)
    setOpenModal(true)
    setIsSubmited(false)
    setTimeout(() => {
      setOpenModal(false)
    }, 3000)
  }

  async function handleSubmit(data: FooterFormInput) {
    try {
      setIsSubmited(true)
      await footerSend(data.firstname, data.lastname, data.mail, data.message, data.phone, new Date())
      handleOpenModal(false)
    } catch {
      handleOpenModal(true)
    }
  }
  return (
    <>
      <Head>
        <title>Agaetis : nos offres</title>
        <meta property="og:description" content={"Présentation d'Agaetis, de son histoire et de sa vision"} />
        <meta name="description" content={"Présentation d'Agaetis, de son histoire et de sa vision"} />
        <link rel="canonical" href={`${publicRuntimeConfig.NEXT_APP_SITE_URL}/agaetis`} />
      </Head>

      <Layout invertColors={false}>
        <div className="mx-auto pt-0 md:pt-28">
          <div
            style={{
              backgroundImage: `url("${Mask}")`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
            className="bg-black-light md:bg-orange p-0 md:p-12 lg:px-24 lg:p-16 shadow-none md:shadow-top"
          >
            <div className="hidden md:block">
              <h1 className="text-white text-2xl pb-2 white-underline-thin">{pageContent.title}</h1>
              <p className="text-white py-8 leading-normal text-sm">{pageContent.paragraph}</p>
              <div className="mx-auto p-8">
                <div className="flex flex-row items-center">
                  <img src={allOffers[selectedOffer].offers_image1} className="block h-16"></img>
                  <h2 className="ml-8 text-white">{allOffers[selectedOffer].title}</h2>
                </div>
                <p
                  className="leading-normal text-sm py-8 text-justify text-white"
                  dangerouslySetInnerHTML={{ __html: allOffers[selectedOffer].offers_description }}
                ></p>
                <Button
                  className="text-sm flex flex-row justify-center font-semibold text-white"
                  href={`/offers/${allOffers[selectedOffer].slug}?offer=${allOffers[selectedOffer].childrens[0].post_name}`}
                >
                  <div className="flex flex-row items-center">
                    En savoir plus <img src={Plus} className="ml-4 h-6" />
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
                      setWasSelected(selectedOffer)
                      setSelectedOffer(index)
                    }}
                  >
                    <img src={offre.offers_image1} className="h-8 md:h-24"></img>
                    <h2 className="text-sm">{offre.title}</h2>
                    <div
                      className={clsx(
                        'inline-block md:hidden offer-icon',
                        getRotation(selectedOffer === index, wasSelected === index)
                      )}
                    >
                      <span>+</span>
                    </div>
                  </div>
                  <div
                    className={clsx('block md:hidden px-8 text-white text-sm', {
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
          <ContactFormFooter handleSubmit={handleSubmit} isSubmited={isSubmited} />
          {isOpenenedModal && <ContactMessage error={isError}></ContactMessage>}
          <ContactSection />
        </div>
      </Layout>
    </>
  )
}

offers.getInitialProps = async () => {
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
  return { pageContent, allOffers: allOffersChildrens }
}
