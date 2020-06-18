/* eslint-disable react-hooks/rules-of-hooks */
import Head from 'next/head'
import React, { useMemo, useState } from 'react'

import Button from '../components/Button'
import JobsCarousel from '../components/JobsCarousel'
import Layout from '../components/Layout'
import OfferCard from '../components/OfferCard'
import OfferSection from '../components/OfferSection'
import publicRuntimeConfig from '../config/env.config'
import { getAllJobs, getJobsPageContent } from '../Services/wordpressService'
import { JobContentLite } from '../types/JobContent'
import { JobsContent } from '../types/JobsContent'
import Logo from '../public/icons/Agaetis - Ico logo - Orange.png'

interface Props {
  pageContent: JobsContent
  allJobs: JobContentLite[]
}

function jobs({ pageContent, allJobs }: Props) {
  const [isMoreOffersToggled, setIsMoreOffersToggled] = useState(false)
  const offers = useMemo(
    () =>
      allJobs.map((offer) => (
        <OfferCard
          key={offer.acf.intitule_job}
          title={offer.acf.intitule_job}
          description={offer.acf.description}
          href={'/jobs/' + offer.slug}
          className="bg-white md:max-w-md p-4 my-2 self-center"
        />
      )),
    [allJobs]
  )

  function toggleMoreOffers() {
    setIsMoreOffersToggled(!isMoreOffersToggled)
  }

  return (
    <>
      <Head>
        <title>Agaetis : rejoignez-nous</title>
        <meta property="og:title" content="Agaetis : rejoignez-nous" />
        <meta property="og:image" content={`${publicRuntimeConfig.NEXT_APP_SITE_URL}/favicon.ico`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Séduits par Agaetis ? Et si vous nous rejoignez ?" />
        <meta name="description" content="Séduits par Agaetis ? Et si vous nous rejoignez ?" />
        <link rel="canonical" href={`${publicRuntimeConfig.NEXT_APP_SITE_URL}/jobs`} />
      </Head>
      <Layout>
        <>
          <div className="md:max-w-md mx-auto p-0 md:px-8">
            <div className="text-xs px-4 md:px-0">
              <span>
                <a className="text-underline text-black" href="/">
                  Accueil
                </a>{' '}
                > <b>Jobs</b>
              </span>
            </div>
          </div>
          <div className="md:max-w-lg mx-auto p-0 md:px-8">
            <img src={Logo} className="bg-img-left-jobs"></img>
            <img src={Logo} className="bg-img-right-jobs"></img>
            <h1
              className="text-center text-2xl py-8 md:mt-12 md:pb-0"
              dangerouslySetInnerHTML={{ __html: pageContent.title }}
            />
            <p
              className="md:max-w-md mx-auto text-justify md:text-center  px-4 md:py-6 md:px-0 text-sm leading-normal"
              dangerouslySetInnerHTML={{ __html: pageContent.description }}
            />
            <JobsCarousel slideMax={2} slides={pageContent.slides} />
          </div>
          <div
            style={{
              background: pageContent.we_are_agaetis_Img ? 'url(' + pageContent.we_are_agaetis_Img + ')' : 'black',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
            className="flex flex-col bg-black text-white text-center p-12 px-4 md:py-16 md my-8"
          >
            <h2 className="" dangerouslySetInnerHTML={{ __html: pageContent.we_are_agaetis_title }} />
            <p
              className="md:max-w-md pt-8 md:p-8 md:pb-0 text-justify self-center text-sm leading-normal"
              dangerouslySetInnerHTML={{ __html: pageContent.we_are_agaetis_paragraph }}
            />
          </div>
          <div className="w-full md:max-w-md mx-auto p-0 md:px-8">
            <h2
              className="text-center mb-8 md:mb-0"
              dangerouslySetInnerHTML={{ __html: pageContent.joinUsSection.title }}
            />
            <p
              className="md:max-w-md mx-auto text-justify px-4 md:py-6 md:px-0 text-sm leading-normal mb-8"
              dangerouslySetInnerHTML={{ __html: pageContent.joinUsSection.description }}
            />
            <div className="flex flex-col md:flex-row">
              {pageContent.joinUsSection.steps.map((step) => (
                <div className="flex flex-col justify-center w-full md:mx-2 px-8 md:px-0 md:w-1/3" key={step.index}>
                  <div className="text-center text-white text-lg flex flex-row justify-center leading-none self-center items-center w-8 h-8 bg-red-light rounded-full  my-2">
                    <span>{step.index}</span>
                  </div>
                  <h3 className="uppercase text-center text-lg font-semibold my-2">{step.title}</h3>
                  <p className="text-center leading-normal text-sm md:text-xss my-2">{step.description}</p>
                </div>
              ))}
            </div>
            <hr className="Footer-separator my-12" />

            <h2 className="text-center mb-8" dangerouslySetInnerHTML={{ __html: pageContent.profilesSection.title }} />
            <div className="flex flex-col md:flex-row ">
              {pageContent.profilesSection.profiles.map((profile) => (
                <div className="text-center flex flex-col md:mx-2 px-8 md:px-0 md:w-1/4 " key={profile.index}>
                  <div className="w-auto h-24 flex flex-col justify-end mb-2">
                    <img className="w-16 h-auto self-center" src={profile.img} />
                  </div>
                  <h3 className="uppercase text-lg font-semibold my-2">{profile.title}</h3>
                  <p className="text-center leading-normal text-sm md:text-xss my-2">{profile.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col bg-light-grey py-12 px-4 md:p-12 mt-12">
            <h2 className="text-center mb-8" dangerouslySetInnerHTML={{ __html: pageContent.offers_title }} />
            <div className="flex flex-col">
              {offers.slice(0, 1)}
              {isMoreOffersToggled && offers.slice(1)}
            </div>
            <Button
              onClick={toggleMoreOffers}
              className="flex flex-row justify-center uppercase rounded-full bg-orange text-xss py-2 px-6 text-white font-semibold mx-auto mt-4"
            >
              {isMoreOffersToggled ? "Voir moins d'offres" : "Voir plus d'offres"}
            </Button>
          </div>
          <OfferSection footerText={pageContent.footer_contact_text} />
        </>
      </Layout>
    </>
  )
}

jobs.getInitialProps = async () => {
  const pageContent = await getJobsPageContent()

  const allJobs = await getAllJobs()
  return { pageContent, allJobs }
}

export default jobs
