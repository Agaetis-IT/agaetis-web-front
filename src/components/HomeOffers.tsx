import { useState } from 'react'
import clsx from 'clsx'
import Link from 'next/link'

import Button from './Button'

import { Offer } from '../models/IndexAPI'

const arrowR = '/images/right-arrow.svg'

interface Props {
  title: string
  offers: Offer[]
}

export default function HomeOffers({ title, offers }: Props) {
  const [selectedOffer, setSelectedOffer] = useState(0)
  const [isOpenedOffer, setIsOpenedOffer] = useState(false)

  const handleOfferChange = (index: number) => {
    setIsOpenedOffer((isOpened) => (selectedOffer !== index ? true : !isOpened))
    setSelectedOffer(index)
  }

  return (
    <div className="flex flex-col md:flex-row my-8 bg-gray-800 md:bg-white md:my-0 shadow-md">
      <div className="w-full md:w-1/2 p-4 md:p-12 lg:px-24 lg:p-16">
        <h2 className="mt-2 md:mt-0 text-white md:text-orange-500 font-bold text-2xl text-center md:text-left">
          {title}
        </h2>
        <div className="md:mt-12">
          {offers.map((offer, index) => {
            const relatedPages = offer.relatedLandingPage?.split('/')

            return (
              <div key={index} className="my-6" id={`offer-${index}`}>
                <Button onClick={() => handleOfferChange(index)} className="w-full">
                  <div
                    className={clsx(
                      `flex items-center justify-between bg-white md:rounded-lg shadow-md md:shadow-none h-20 overflow-hidden transition-all duration-500`,
                      index === selectedOffer && isOpenedOffer
                        ? 'rounded-tr-lg rounded-tl-6xl rounded-bl-6xl'
                        : 'rounded-r-lg rounded-l-6xl',
                      index === selectedOffer && 'bg-gray-200'
                    )}
                  >
                    <div className="absolute bg-white h-20 w-20 shadow-md md:hidden rounded-full">
                      <img
                        src={offer.icon}
                        title={`Offre ${offer.title}`}
                        alt={`Offre ${offer.title}`}
                        className="rounded-full"
                        width={80}
                        height={80}
                        loading="lazy"
                      />
                    </div>
                    <div className="w-9/10 ml-22 md:ml-0 py-2 md:py-0 md:pl-6">
                      <h3 className="text-gray-800 md:text-orange-500 text-xs md:text-sm leading-normal uppercase text-left font-bold">
                        {offer.title}
                      </h3>
                      <p className="text-cgu md:text-xs italic text-gray-500 md:text-black text-left leading-tight my-1">
                        {offer.shortDescription}
                      </p>
                    </div>
                    <span
                      className={clsx(
                        'hidden md:block w-1/10 m-4 transition-all duration-250',
                        index === selectedOffer ? 'text-orange-500 font-bold text-xl' : 'text-gray-500'
                      )}
                    >
                      {'>'}
                    </span>
                    <img
                      src={arrowR}
                      className={clsx(
                        'm-4 block md:hidden transform transition-all duration-500',
                        index === selectedOffer && isOpenedOffer ? '-rotate-90' : 'rotate-90'
                      )}
                      width={10}
                      height={10}
                      alt="Flèche"
                      loading="lazy"
                    />
                  </div>
                </Button>
                <div
                  className={clsx(
                    'block bg-gray-800 md:hidden relative overflow-hidden transition-all duration-500 rounded-b-lg ml-10',
                    index === selectedOffer && isOpenedOffer ? 'max-h-150' : 'max-h-0'
                  )}
                >
                  <img
                    className="absolute object-cover h-full w-full object-top"
                    src={offer.image}
                    title={offer.title}
                    alt={offer.title}
                    width={800}
                    height={600}
                    loading="lazy"
                  />
                  <div
                    style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
                    className="p-4 m-4 rounded-lg backdrop-filter backdrop-blur-sm"
                  >
                    <p className="text-sm leading-normal text-justify text-white">{offer.description}</p>
                    {offer.relatedLandingPage && (
                      <Link href={`/landingpages/${relatedPages[relatedPages.length - 2]}`} passHref>
                        <Button
                          className="flex flex-row justify-center w-48 bg-white hover:bg-gray-200 text-orange-500 uppercase mx-auto rounded-full px-6 py-2 mt-8 shadow-md font-semibold text-xs leading-tight hover:shadow-lg transition-all duration-250"
                          href={`/landingpages/${relatedPages[relatedPages.length - 2]}`}
                        >
                          En savoir plus
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="relative hidden md:block bg-gray-800 w-full md:w-1/2">
        <img
          className="absolute object-cover h-full w-full object-center"
          src={offers[selectedOffer].image}
          title={offers[selectedOffer].title}
          alt={offers[selectedOffer].title}
          width={2000}
          height={2000}
          loading="lazy"
        />
        <div
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          className="p-4 md:m-12 lg:m-16 rounded-lg backdrop-filter backdrop-blur-sm"
        >
          {offers.map((offer, index) => {
            const relatedPages = offer.relatedLandingPage?.split('/')

            return (
              <div key={index} className={clsx({ hidden: selectedOffer != index })}>
                <p className="text-sm leading-normal text-justify text-white">{offer.description}</p>
                {offer.relatedLandingPage && (
                  <Link href={`/landingpages/${relatedPages[relatedPages.length - 2]}`} passHref>
                    <Button
                      className="flex flex-row justify-center w-48 text-orange-500 bg-white hover:bg-gray-200 uppercase mx-auto rounded-full px-6 py-2 mt-8 shadow-md font-semibold text-xs leading-tight hover:shadow-lg transition-all duration-250"
                      href={`/landingpages/${relatedPages[relatedPages.length - 2]}`}
                    >
                      En savoir plus
                    </Button>
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
