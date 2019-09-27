import React from 'react'

import Button from '../components/Button'
import JobsCarousel from '../components/JobsCarousel'
import Layout from '../components/Layout'
import OfferCard from '../components/OfferCard'
import OfferSection from '../components/OfferSection'
import JobsMini from '../images/Jobs_miniature.png'
import { getJobsPageContent } from '../Services/wordpressService'
import { JobsContent } from '../types/JobsContent'

interface Props {
  pageContent: JobsContent
}

jobs.getInitialProps = async () => {
  const pageContent = await getJobsPageContent()
  return { pageContent }
}

const offers = [
  {
    index: 0,
    title: 'Intitulé du poste #1',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis autre irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    index: 1,
    title: 'Intitulé du poste #2',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis autre irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    index: 2,
    title: 'Intitulé du poste #3',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis autre irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
]

export default function jobs({ pageContent }: Props) {
  return (
    <Layout>
      <>
        <div className="md:max-w-md mx-auto p-0 md:px-8">
          <div className="text-xs px-4 md:px-0">
            <span className="text-underline">Accueil</span> > <span className="text-underline">Jobs</span>
          </div>
          <h1 className="text-center text-2xl py-8" dangerouslySetInnerHTML={{ __html: pageContent.title }} />
          <p
            className="md:max-w-md mx-auto text-center px-4 md:py-6 md:px-0 text-xs leading-normal"
            dangerouslySetInnerHTML={{ __html: pageContent.description }}
          />
          <img className="mx-auto md:mx-0 shadow-xl m-4 w-full" src={JobsMini} alt="miniature" />
          <JobsCarousel slideMax={2} slides={pageContent.slides} />
        </div>
        <div className="flex flex-col bg-black text-white text-center p-12 px-4 md:px-4 my-8">
          <h2 className="" dangerouslySetInnerHTML={{ __html: pageContent.we_are_agaetis_title }} />
          <p
            className="md:max-w-md pt-8 md:p-8 md:pb-0 self-center text-xs leading-normal"
            dangerouslySetInnerHTML={{ __html: pageContent.we_are_agaetis_paragraph }}
          />
        </div>
        <div className="w-full md:max-w-md mx-auto p-0 md:px-8">
          <h2
            className="text-center mb-8 md:mb-0"
            dangerouslySetInnerHTML={{ __html: pageContent.joinUsSection.title }}
          />
          <p
            className="md:max-w-md mx-auto text-center px-4 md:py-6 md:px-0 text-xs leading-normal mb-8"
            dangerouslySetInnerHTML={{ __html: pageContent.joinUsSection.description }}
          />
          <div className="flex flex-col md:flex-row">
            {pageContent.joinUsSection.steps.map(step => (
              <div className="flex flex-col justify-center w-full md:mx-2 px-8 md:px-0 md:w-1/3" key={step.index}>
                <div className="text-center text-white text-lg flex flex-row justify-center leading-none self-center items-center w-8 h-8 bg-red-light rounded-full  my-2">
                  <span>{step.index}</span>
                </div>
                <h3 className="uppercase text-center md:text-left text-lg font-semibold my-2">{step.title}</h3>
                <p className="text-center leading-normal text-xss my-2">{step.description}</p>
              </div>
            ))}
          </div>
          <hr className="Footer-separator my-8" />
          <h2 className="text-center mb-8" dangerouslySetInnerHTML={{ __html: pageContent.profilesSection.title }} />
          <div className="flex flex-col md:flex-row">
            {pageContent.profilesSection.profiles.map(profile => (
              <div className="text-center flex flex-col mx-2 md:w-1/4 h-48" key={profile.index}>
                <img className="w-16 h-auto self-center" src={profile.img} />
                <h3 className="uppercase text-lg font-semibold my-2">{profile.title}</h3>
                <p className="text-center leading-normal text-xss my-2">{profile.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col bg-grey py-12 px-4 md:p-12 mt-8">
          <h2 className="text-center mb-8" dangerouslySetInnerHTML={{ __html: pageContent.offers_title }} />
          <div className="flex flex-col">
            {offers.map(offer => (
              <OfferCard
                key={offer.index}
                title={offer.title}
                description={offer.description}
                href="/job"
                className="bg-white md:max-w-md p-4 my-2 self-center"
              />
            ))}
          </div>
          <Button className="flex flex-row justify-center uppercase rounded-full bg-orange text-xss py-2 px-6 text-white font-semibold mx-auto mt-4">
            {pageContent.offers_button}
          </Button>
        </div>
        <OfferSection />
      </>
    </Layout>
  )
}
