import React, { useState } from 'react'
import Button from './Button'

import './HomeOffers.css'
import './Common.css'
import arrowR from '../static/images/right-arrow.svg'
import test from '../static/icons/cyber-secu.png'
import clsx from 'clsx'
import { OfferDesc } from '../types/OffersContent'
import Link from 'next/link'

interface Props {
  title: string
  offers: OfferDesc[]
}

export default function HomeOffers({ title, offers }: Props) {
  const [selectedOffer, setSelectedOffer] = useState(0)
  const [isOpennedOffer, setIsOpennedOffer] = useState(false)

  const handleOfferChange = (index: number) => {
    selectedOffer !== index ? setIsOpennedOffer(true) : setIsOpennedOffer(!isOpennedOffer)
    setSelectedOffer(index)
  }

  return (
    <div className="flex flex-col md:flex-row my-8 bg-grey-darker md:bg-white md:my-0 shadow-md">
      <div className="home-offers-left p-4 md:p-12 lg:px-24 lg:p-16">
        <h2 className="mt-2 md:mt-0 text-white md:text-orange font-bold text-center md:text-left">{title}</h2>
        <div className="md:mt-12">
          {offers.map((offer, index) => (
            <div key={index} className="my-6" id={`offer-${index}`}>
              <Button onClick={() => handleOfferChange(index)} className="w-full">
                <div
                  className={clsx(
                    'flex items-center justify-between bg-white shadow-md md:shadow-none h-20 offer-header',
                    index === selectedOffer && isOpennedOffer ? 'offer-header-open' : 'offer-header-close'
                  )}
                >
                  <img src={test} alt="icon" className="absolute bg-white h-20 w-20 shadow-md md:hidden rounded-full" />
                  <div className="w-9/10 ml-22 md:ml-0 py-2 md:p-0">
                    <h4 className="text-grey-darker md:text-orange text-xs md:text-sm font-bold uppercase text-left">
                      {offer.title}
                    </h4>
                    <p className="text-cgu md:text-xs italic my-1 text-grey md:text-black text-left">
                      {offer.short_desc}
                    </p>
                  </div>
                  <span
                    className={clsx(
                      'hidden md:block w-1/10 m-4',
                      index === selectedOffer ? 'text-orange font-bold text-xl' : 'text-grey'
                    )}
                  >
                    {'>'}
                  </span>
                  <img
                    style={{ width: 10, height: 10 }}
                    src={arrowR}
                    alt="arrow"
                    className={clsx(
                      'm-4 md:hidden',
                      index === selectedOffer && isOpennedOffer ? 'offer-selected-arrow' : 'offer-arrow'
                    )}
                  />
                </div>
              </Button>
              <div
                style={{
                  backgroundImage: `url(${offer.image})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
                className={clsx(
                  'md:hidden offer-flyout ml-10',
                  index === selectedOffer && isOpennedOffer ? 'block offer-flyout-open' : 'offer-flyout-close'
                )}
              >
                <div style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} className="m-4 p-4 round8 background-blur">
                  <p className="text-sm leading-normal text-justify text-white">{offer.offers_description}</p>
                  {offer.related_landingpage && (
                    <Link
                      href={`/landingpages/${
                        offer.related_landingpage!.split('/')[offer.related_landingpage!.split('/').length - 2]
                      }`}
                    >
                      <Button
                        className="flex flex-row justify-center bg-white text-orange uppercase mx-auto rounded-full px-6 py-2 mt-8 shadow-md font-semibold text-xs w-48"
                        href={`/landingpages/${
                          offer.related_landingpage!.split('/')[offer.related_landingpage!.split('/').length - 2]
                        }`}
                      >
                        En savoir plus
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(${offers[selectedOffer].image})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
        className="hidden md:block bg-grey-darker home-offers-right md:p-12 lg:p-16 "
      >
        <div style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} className="p-4 round8 background-blur">
          <ul>
            {offers.map((offer, index) => (
              <li key={index} className={clsx({ hidden: selectedOffer != index })}>
                <p className="text-sm leading-normal text-justify text-white">{offer.offers_description}</p>
                {offers[selectedOffer].related_landingpage && (
                  <Link
                    href={`/landingpages/${
                      offers[selectedOffer].related_landingpage!.split('/')[
                        offers[selectedOffer].related_landingpage!.split('/').length - 2
                      ]
                    }`}
                  >
                    <Button
                      className="flex flex-row justify-center bg-white text-orange uppercase mx-auto rounded-full px-6 py-2 mt-8 shadow-md font-semibold text-xs w-48"
                      href={`/landingpages/${
                        offers[selectedOffer].related_landingpage!.split('/')[
                          offers[selectedOffer].related_landingpage!.split('/').length - 2
                        ]
                      }`}
                    >
                      En savoir plus
                    </Button>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
