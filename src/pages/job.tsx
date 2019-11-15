import { NextContext } from 'next'
import React, { useMemo, useState } from 'react'

import Button from '../components/Button'
import Layout from '../components/Layout'
import OfferCard from '../components/OfferCard'
import OfferSection from '../components/OfferSection'
import { getAllJobs, getJobContent } from '../Services/wordpressService'
import JobContent, { convertJobContentAPItoContent, JobContentLite } from '../types/JobContent'

import './job.css'

interface Props {
  pageContent: JobContent
  allJobs: JobContentLite[]
}

job.getInitialProps = async ({ query }: NextContext) => {
  // tslint:disable-next-line
  const data = await getJobContent(query.slug!)
  const pageContent = convertJobContentAPItoContent({ ...data.acf, slug: data.slug })
  const allJobs = await getAllJobs()
  return {
    pageContent,
    allJobs: allJobs.filter((offer: JobContentLite) => {
      return offer.slug !== pageContent.slug
    }),
  }
}

export default function job({ pageContent, allJobs }: Props) {
  const [isMoreOffersToggled, setIsMoreOffersToggled] = useState(false)
  const offers = useMemo(
    () =>
      allJobs.map(offer => (
        <OfferCard
          key={offer.acf.intitule_job}
          title={offer.acf.intitule_job}
          description={offer.acf.description}
          href={'/jobs/' + offer.slug}
          className="bg-white md:max-w-md p-4 my-2 self-center"
        />
      )),
    allJobs
  )

  function toggleMoreOffers() {
    setIsMoreOffersToggled(!isMoreOffersToggled)
  }
  return (
    <Layout>
      <>
        <div className="md:max-w-md mx-auto p-0 md:px-8">
          <div className="text-xs px-4 md:px-0">
            <span className="text-underline">Accueil</span> > <span className="text-underline">Jobs</span> >{' '}
            <span className="text-underline">{pageContent.title}</span>
          </div>
          <h1 className="text-center text-2xl py-8 md:pb-0">{pageContent.title}</h1>
          <p className="md:max-w-md mx-auto text-center px-4 md:py-6 md:px-0 text-xs leading-normal">
            {pageContent.description}
          </p>
        </div>
        <div
          style={{
            background: pageContent.image ? 'url(' + pageContent.image + ')' : 'black',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          className="bg-black mt-8 md:mt-0 md:mx-8 p-24"
        >
          <Button className="flex flex-row justify-center uppercase rounded-full bg-orange text-xss py-2 px-6 text-white font-semibold mx-auto ">
            Postuler
          </Button>
        </div>
        <div className="w-full md:max-w-md mx-auto p-8 text-xs leading-normal text-justify">
          <p className="mb-3">{pageContent.offre_description}</p>
          <ul className="pl-4">
            {pageContent.offre_list
              .filter(point => point !== '')
              .map(point => (
                <li key={point} className="mb-3">
                  {point}
                </li>
              ))}
          </ul>
          <p className="mb-3">{pageContent.offre_last_paragraph}</p>
          <Button className="flex flex-row justify-center uppercase rounded-full bg-orange text-xss py-2 px-6 text-white font-semibold mx-auto ">
            Postuler
          </Button>
        </div>
        <div className="flex flex-col bg-grey py-12 px-4 md:p-12">
          <h2 className="text-center mb-8" dangerouslySetInnerHTML={{ __html: 'Nos offres' }} />
          <div className="flex flex-col">
            {offers.slice(0, 1)}
            {isMoreOffersToggled && offers.slice(1)}
          </div>
          <Button
            onClick={toggleMoreOffers}
            className="flex flex-row justify-center uppercase rounded-full bg-orange text-xss py-2 px-6 text-white font-semibold mx-auto mt-4"
          >
            {isMoreOffersToggled ? 'Voir moins' : "Voir plus d'offres"}
          </Button>
        </div>
        <OfferSection />
      </>
    </Layout>
  )
}
