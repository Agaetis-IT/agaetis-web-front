/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react'
import { NextPageContext } from 'next'
import { convertAPItoOfferleaf, OfferContent, OfferLeafContent } from '../types/OffersContent'
import { getCategoryOffers, getIdeasByCategory, getOfferContent, getOfferLeaf } from '../Services/wordpressService'
import Back from '../static/icons/Btn_Retour.svg'
import Error from './_error'
import Head from 'next/head'
import publicRuntimeConfig from '../config/env.config'
import Layout from '../components/Layout'
import Particles from '../static/images/particles-2.svg'
import { useState } from 'react'
import Button from '../components/Button'
import clsx from 'clsx'
import RelatedArticlesSection from '../components/RelatedArticlesSection'
import Link from 'next/link'
import ContactFormFooter from '../components/ContactFormFooter'
import ContactMessage from '../components/ContactMessage'
import ContactSection from '../components/ContactSection'
import { FooterFormInput } from '../yup/ContactFormValidation'
import send from '../Services/contactService'
import { useRouter } from 'next/router'
import PartnerList from '../components/PartnerList'

interface Context extends NextPageContext {
  query: { slug: string }
  params: { offer: string }
}

interface Props {
  pageContent: OfferContent
  errorCode?: number
  offers: OfferLeafContent[]
}

export default function offer({ pageContent, errorCode, offers }: Props): React.ReactElement {
  const [selectedOffer, setSelectedOffer] = useState(0)
  const [isOpenenedModal, setOpenModal] = useState(false)
  const [isError, setIsError] = useState(true)
  const [isSubmited, setIsSubmited] = useState(false)
  const router = useRouter()

  function handleOpenModal(error: boolean) {
    setIsError(error)
    setOpenModal(true)
    setIsSubmited(false)
    setTimeout(() => {
      setOpenModal(false)
    }, 3000)
  }

  useEffect(() => {
    const offerId = offers.findIndex((offer) => offer.slug === router.query.offer)
    if (offerId !== -1) {
      setSelectedOffer(offerId)
    }
  }, [offers, router.query.offer])

  async function handleSubmit(data: FooterFormInput) {
    try {
      setIsSubmited(true)
      await send(
        data.firstname,
        data.lastname,
        data.mail,
        data.subject,
        data.message,
        data.phone,
        new Date(),
        data.captcha,
        data.attachments
      )
      handleOpenModal(false)
    } catch {
      handleOpenModal(true)
    }
  }
  if (!!errorCode) {
    return <Error statusCode={404} />
  }
  return (
    <>
      <Head>
        <title>Agaetis : {pageContent.title}</title>
        <meta property="og:title" content={`Agaetis : ${pageContent.title}`} />
        <meta property="og:image" content={`${publicRuntimeConfig.NEXT_APP_SITE_URL}/favicon.ico`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={pageContent.paragraph} />
        <meta name="description" content={pageContent.paragraph} />
        <link rel="canonical" href={`${publicRuntimeConfig.NEXT_APP_SITE_URL}${pageContent.slug}`} />
      </Head>
      <Layout invertColors={false}>
        <div className="mx-auto pt-0 md:pt-28">
          <div
            style={{
              backgroundImage: `url("${Particles}")`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
            className="bg-black-light p-0 md:p-12 lg:px-24 lg:p-16 hidden lg:block shadow-none md:shadow-top"
          >
            <div className="flex flex-row items-center ">
              <img src={pageContent.offers_image1} className="block h-16"></img>
              <h1 className="text-white text-2xl ml-8">{pageContent.title}</h1>
            </div>
            <p className="text-white py-8 leading-normal text-sm">{pageContent.paragraph}</p>
            <div className="bg-white p-8">
              <Link href="/offers">
                <Button>
                  <div className="flex flex-row items-center mb-8">
                    <img className="mr-4" src={Back} />
                    <span className="text-orange">Retour aux catégories d'offres</span>
                  </div>
                </Button>
              </Link>

              <div className="flex flex-col lg:flex-row">
                <div className="w-2/5 border-orange border-r">
                  {offers !== undefined &&
                    offers.map((offer, index) => (
                      <Button
                        key={offer.title}
                        onClick={() => {
                          setSelectedOffer(index)
                        }}
                        className={clsx(
                          'block border border-orange bg-transparent rounded-full my-8 mx-auto w-3/4 py-2 text-sm',
                          { 'text-white bg-orange': selectedOffer === index }
                        )}
                      >
                        <div dangerouslySetInnerHTML={{ __html: offer.title }}></div>
                      </Button>
                    ))}
                </div>
                <div className="w-3/5 my-8 pl-8">
                  <h2
                    className="text-2xl text-orange mb-8"
                    dangerouslySetInnerHTML={{ __html: offers[selectedOffer].title }}
                  ></h2>
                  <div
                    className="text-sm"
                    dangerouslySetInnerHTML={{ __html: offers[selectedOffer].description }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="block lg:hidden">
            <div className="bg-light-grey p-4">
              <Link href="/offers">
                <Button>
                  <div className="flex flex-row items-center mb-8">
                    <img className="mr-4 h-8" src={Back} />
                    <span className="text-orange">Retour aux catégories d'offres</span>
                  </div>
                </Button>
              </Link>
              <div className="flex flex-row items-center mt-0 md:mt-20">
                <img src={pageContent.offers_image1} className="block h-12"></img>
                <h1 className="text-black text-2xl ml-8">{pageContent.title}</h1>
              </div>
              <div>
                {offers !== undefined &&
                  offers.map((offer, index) => (
                    <Button
                      key={offer.title}
                      onClick={() => {
                        setSelectedOffer(index)
                      }}
                      className={clsx(
                        'block border border-orange bg-transparent rounded-full my-8 mx-auto w-full py-2 text-sm',
                        { 'text-white bg-orange': selectedOffer === index }
                      )}
                    >
                      <div dangerouslySetInnerHTML={{ __html: offer.title }}></div>
                    </Button>
                  ))}
              </div>
            </div>
            <div className="bg-black-light p-4">
              <div>
                <h2
                  className="text-2xl text-white mb-8"
                  dangerouslySetInnerHTML={{ __html: offers[selectedOffer].title }}
                ></h2>
                <div
                  className="text-sm text-justify text-white"
                  dangerouslySetInnerHTML={{ __html: offers[selectedOffer].description }}
                ></div>
              </div>
            </div>
          </div>
          {offers[selectedOffer].partners.length > 0 && (
            <PartnerList partners={offers[selectedOffer].partners} className=" p-4 md:p-12 lg:px-24 lg:p-16 " />
          )}
          {offers[selectedOffer].posts.length > 0 && (
            <RelatedArticlesSection
              className="bg-light-grey p-4 md:p-12 lg:px-24 lg:p-16 pb-2"
              posts={offers[selectedOffer].posts}
            />
          )}

          <ContactFormFooter
            title="Une question ? Contactez-nous !"
            handleSubmit={handleSubmit}
            isSubmited={isSubmited}
          />
          {isOpenenedModal && <ContactMessage error={isError}></ContactMessage>}
          <ContactSection />
        </div>
      </Layout>
    </>
  )
}

offer.getInitialProps = async ({ query }: Context) => {
  // tslint:disable-next-line
  const { [0]: data, [1]: offers } = await Promise.all([getOfferContent(query.slug!), getCategoryOffers(query.slug)])
  const pageContent = { ...data.acf, slug: data.slug }
  const allOffers = offers.map(
    async (offer: {
      acf: {
        title: string
        paragraph: string
        offers_description: string
      }
      post_name: string
    }) => {
      const { [0]: children, [1]: posts } = await Promise.all([
        getOfferLeaf(query.slug, offer.post_name),
        getIdeasByCategory(`_offer-${escape(offer.post_name)}`),
      ])
      return convertAPItoOfferleaf(children, posts.data)
    }
  )
  const offerChildrens = await Promise.all(allOffers)
  return {
    pageContent,
    errorCode: !!data.acf ? undefined : 404,
    offers: offerChildrens,
  }
}
