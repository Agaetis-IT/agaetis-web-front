import OffersDesc, { OffersContent, convertAPItoOffersContent } from '../types/OffersContent'
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

/* eslint-disable react-hooks/rules-of-hooks */

interface Props {
  pageContent: OffersContent
  allOffers: OffersDesc[]
}

const offres = [
  { title: 'Technologie1', icon: '', description: '' },
  { title: 'Technologie2', icon: '', description: '' },
  { title: 'Technologie3', icon: '', description: '' },
  { title: 'Technologie4', icon: '', description: '' },
]

export default function offers({ pageContent }: Props) {
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
            <p className="text-white py-8 leading-normal text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora explicabo deleniti libero vel,
              exercitationem quibusdam a facilis! Officia, quidem cum quo dolore quia voluptate sunt facilis, ipsum eius
              corporis delectus!
            </p>
            <div className="mx-auto bg-white p-8">
              <h2 className="text-orange">{offres[selectedOffer].title}</h2>
              <p className="leading-normal text-sm py-8">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia natus nemo molestias beatae labore
                accusantium minima harum quod! Voluptates culpa illo vitae beatae architecto placeat, exercitationem
                incidunt! Inventore, molestias ipsa!
              </p>
              <Button className="text-sm block text-orange font-semibold mx-auto">En savoir plus</Button>
            </div>
            <div className="flex flex-row justify-evenly pt-8">
              {offres.map((offre, index) => (
                <div
                  className="bg-white flex flex-col p-8 cursor-pointer"
                  onClick={() => {
                    setSelectedOffer(index)
                  }}
                  key={offre.title}
                >
                  <img src={offre.icon}></img>
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
      acf: { title: string; paragraph: string; offers_description: string; offers_image: string }
      slug: string
    }) => {
      return { ...offer.acf, slug: offer.slug }
    }
  )
  return { pageContent, allOffers }
}
