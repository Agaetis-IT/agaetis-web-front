import OffersContent, { OfferDesc, convertAPItoOffersContent } from '../types/OffersContent'
import React, { useState } from 'react'
import { getAllOffers, getOffersPageContent } from '../Services/wordpressService'

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
import Plus from '../static/icons/squared_plus.svg'

/* eslint-disable react-hooks/rules-of-hooks */

interface Props {
  pageContent: OffersContent
  allOffers: OfferDesc[]
}

export default function offers({ pageContent, allOffers }: Props) {
  const [selectedOffer, setSelectedOffer] = useState(0)
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

      <Layout invertColors={true}>
        <div className="mx-auto px-0">
          <div
            style={{
              backgroundImage: `url("${Mask}")`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
            className="bg-orange p-0 md:p-12 lg:px-24 lg:p-16"
          >
            <h1 className="text-white text-2xl mt-20">{pageContent.title}</h1>
            <p className="text-white py-8 leading-normal text-sm">{pageContent.paragraph}</p>
            <div className="mx-auto bg-white p-8">
              <div className="flex flex-row items-center">
                <img src={allOffers[selectedOffer].offers_image2} className="block h-16"></img>
                <h2 className="text-orange ml-8">{allOffers[selectedOffer].title}</h2>
              </div>
              <p
                className="leading-normal text-sm py-8 text-justify"
                dangerouslySetInnerHTML={{ __html: allOffers[selectedOffer].offers_description }}
              ></p>
              <Button className="text-sm block text-orange font-semibold mx-auto">
                <div className="flex flex-row items-center">
                  En savoir plus <img src={Plus} className="ml-4 h-6"></img>
                </div>
              </Button>
            </div>
            <div className="flex flex-row justify-between pt-8">
              {allOffers.map((offre, index) => (
                <div
                  className="bg-white flex flex-col p-8 cursor-pointer w-1/6 text-center"
                  onClick={() => {
                    setSelectedOffer(index)
                  }}
                  key={offre.title}
                >
                  <img src={offre.offers_image1}></img>
                  <h2 className="text-sm">{offre.title}</h2>
                </div>
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
    (offer: {
      acf: {
        title: string
        paragraph: string
        offers_description: string
        offers_image1: string
        offers_image2: string
      }
      slug: string
    }) => {
      return { ...offer.acf, slug: offer.slug }
    }
  )
  return { pageContent, allOffers }
}
