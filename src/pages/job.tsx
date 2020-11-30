/* eslint-disable react-hooks/rules-of-hooks */
import { NextPageContext } from 'next'
import Head from 'next/head'
import React, { useMemo, useState } from 'react'

import Button from '../components/Button'
import Layout from '../components/Layout'
import JobCard from '../components/JobCard'
import OfferSection from '../components/OfferSection'
import publicRuntimeConfig from '../config/env.config'
import { getAllJobs, getJobContent } from '../Services/wordpressService'
import JobContent, { convertJobContentAPItoContent, JobContentLite } from '../types/JobContent'
import Logo from '../static/icons/Agaetis - Ico logo - Orange.png'

import Error from './_error'
import './job.css'
import ContactSection from '../components/ContactSection'

interface Props {
  pageContent: JobContent
  allJobs: JobContentLite[]
  errorCode?: number
}

interface Context extends NextPageContext {
  query: { slug: string }
}

function job({ pageContent, allJobs, errorCode }: Props) {
  const [isMoreOffersToggled, setIsMoreOffersToggled] = useState(false)
  if (!!errorCode) {
    return <Error statusCode={404} />
  }
  const offers = useMemo(
    () =>
      allJobs.map((offer) => (
        <JobCard
          key={offer.acf.intitule_job}
          title={offer.acf.intitule_job}
          description={offer.acf.description}
          href={'/jobs/' + offer.slug}
          className="bg-white hover:bg-orange-light md:max-w-lg p-4 my-2 self-center"
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
        <title>Agaetis : {pageContent.title}</title>
        <meta property="og:title" content={`Agaetis : ${pageContent.title}`} />
        <meta property="og:image" content={`${publicRuntimeConfig.NEXT_APP_SITE_URL}/favicon.ico`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={pageContent.description} />
        <meta name="description" content={pageContent.description} />
        <link rel="canonical" href={`${publicRuntimeConfig.NEXT_APP_SITE_URL}${pageContent.slug}`} />
      </Head>
      <Layout invertColors={false}>
        <>
          <div className="md:max-w-md mx-auto p-0 md:px-8">
            <div className="text-xs px-4 md:px-0">
              <span>
                <a className="text-underline text-black" href="/">
                  Accueil
                </a>
                {' > '}
                <a className="text-underline text-black" href="/jobs">
                  Jobs
                </a>
                {' > '}
                <b>{pageContent.title}</b>{' '}
              </span>
            </div>
            <h1 className="text-center text-2xl py-8 md:pb-0 md:mt-12">{pageContent.title}</h1>
            <p
              className="md:max-w-md mx-auto text-center px-4 md:py-6 md:px-0 text-sm leading-normal"
              dangerouslySetInnerHTML={{ __html: pageContent.description }}
            ></p>
          </div>
          <div
            style={{
              background: pageContent.image ? 'url(' + pageContent.image + ')' : 'black',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
            className="bg-black mt-8 md:my-8 md:mx-8 py-36"
          />
          <div className="w-full md:max-w-lg mx-auto p-8 text-sm leading-normal text-justify">
            <img src={Logo} className="bg-img-left-job" alt="logo agaetis"></img>
            <img src={Logo} className="bg-img-right-job" alt="logo agaetis"></img>
            <p className="mb-5 job-desc" dangerouslySetInnerHTML={{ __html: pageContent.offre_description }}></p>
            <p className="mb-3">
              <b>Missions</b>
            </p>
            <ul className="pl-4 job-list">
              {pageContent.offre_list
                .filter((point) => point !== '')
                .map((point) => (
                  <li key={point} className="mb-3">
                    {point}
                  </li>
                ))}
            </ul>
            <p className="mt-5 mb-3">
              <b>Profil</b>
            </p>
            <p className="mb-3">{pageContent.profile_description}</p>
            <p className="mb-3">Salaire: {pageContent.offre_salary}</p>
            <p className="mb-3">Connaissances souhaitées :</p>
            <ul className="pl-4 job-list">
              {pageContent.offre_profile
                .filter((point) => point !== '')
                .map((point) => (
                  <li key={point} className="mb-3" dangerouslySetInnerHTML={{ __html: point }}></li>
                ))}
            </ul>
            <p className="mb-3">{pageContent.offre_last_paragraph}</p>
            <Button
              href="/contact"
              className="w-32 flex flex-row justify-center uppercase rounded-full bg-orange text-xss py-2 px-6 text-white font-semibold mx-auto mt-4 md:mt-8"
            >
              Postuler
            </Button>
          </div>
          <div className="flex flex-col bg-light-grey py-12 px-4 md:p-12">
            <h2 className="text-center mb-8" dangerouslySetInnerHTML={{ __html: 'Nos offres' }} />
            <div className="flex flex-col md:mb-8">
              {offers.slice(0, 1)}
              {isMoreOffersToggled && offers.slice(1)}
            </div>
            {offers.length > 1 && (
              <Button
                onClick={toggleMoreOffers}
                className="flex flex-row justify-center uppercase rounded-full bg-orange text-xss py-2 px-6 text-white font-semibold mx-auto"
              >
                {isMoreOffersToggled ? "Voir moins d'offres" : "Voir plus d'offres"}
              </Button>
            )}
          </div>
          <OfferSection footerText={pageContent.contact_text} />
          <ContactSection></ContactSection>
        </>
      </Layout>
    </>
  )
}

job.getInitialProps = async ({ query }: Context) => {
  // tslint:disable-next-line
  const { [0]: data, [1]: allJobs } = await Promise.all([getJobContent(query.slug!), getAllJobs()])
  const pageContent = await convertJobContentAPItoContent({ ...data.acf, slug: data.slug })
  return {
    pageContent,
    allJobs: allJobs.filter((offer: JobContentLite) => {
      return offer.slug !== pageContent.slug
    }),
    errorCode: !!data.acf ? undefined : 404,
  }
}

export default job
