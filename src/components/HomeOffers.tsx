import React, { useState } from 'react'
import Button from './Button'

import './HomeOffers.css'
import './Common.css'
import arrowR from '../static/images/right-arrow.svg'
import clsx from 'clsx'
import { OfferDesc } from '../types/OffersContent'
import Link from 'next/link'

interface Props {
  title: string
  offers: OfferDesc[]
}

export default function HomeOffers({ title, offers }: Props) {
  const [selectedOffer, setSelectedOffer] = useState(0)
  const handleOfferChange = (index: number) => {
    setSelectedOffer(index)

    if (window && document && document.body.getBoundingClientRect().width < 800) {
      window.setTimeout(() => {
        if (document.getElementById(`offer-${index}`)) {
          document.getElementById(`offer-${index}`)!.scrollIntoView({ behavior: 'smooth' })
        }
      })
    }
  }
  return (
    <div className="flex flex-col md:flex-row py-8 md:py-0">
      <div className="home-offers-left p-0 md:p-12 lg:px-24 lg:p-16">
        <h2 className="mt-8 mb-4 md:my-0 text-orange font-bold text-center md:text-left">{title}</h2>
        <div className="md:my-12">
          {offers.map((offer, index) => (
            <div key={index} className="my-0 md:my-6" id={`offer-${index}`}>
              <div className="p-4 md:p-0">
                <Button onClick={() => handleOfferChange(index)} className="w-full">
                  <div className="flex items-center">
                    <div className="w-9/10">
                      <h4 className="text-orange text-sm font-bold uppercase text-left">{offer.title}</h4>
                      <p className="text-xs italic my-1 text-grey md:text-black text-left">{offer.short_desc}</p>
                    </div>
                    <span
                      className={clsx(
                        'w-1/10',
                        index === selectedOffer ? 'text-orange font-bold text-xl' : 'text-grey'
                      )}
                    >
                      {'>'}
                    </span>
                  </div>
                </Button>
                <Button
                  className="block md:hidden text-grey-darker font-bold mx-2"
                  onClick={() => {
                    handleOfferChange(index)
                  }}
                >
                  <span className="flex flex-row justify-between">
                    <img
                      style={{ width: 10, height: 10 }}
                      src={arrowR}
                      alt="arrow"
                      className={clsx(index === selectedOffer ? 'offer-selected-arrow' : 'offer-arrow')}
                    />
                    <p className="text-xs italic my-1 text-grey md:text-black">{offer.short_desc}</p>
                  </span>
                </Button>
              </div>
              {index !== selectedOffer && <hr className="block md:hidden separator mx-4" />}

              <div
                style={{
                  backgroundImage: `url(${offers[selectedOffer].image})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
                className={clsx('md:hidden home-offers-right p-4', index === selectedOffer ? 'block' : 'hidden')}
              >
                <div style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} className="p-4">
                  <ul>
                    {offers.map((offer, index) => (
                      <li key={index} className={clsx({ hidden: selectedOffer != index }, 'my-4')}>
                        <h3 className="text-orange">{offer.title}</h3>
                        <p className="text-sm leading-normal text-justify text-white py-8">
                          {offer.offers_description}
                        </p>
                        {offers[selectedOffer].related_landingpage && (
                          <Link
                            href={`/landingpages/${
                              offers[selectedOffer].related_landingpage!.split('/')[
                                offers[selectedOffer].related_landingpage!.split('/').length - 2
                              ]
                            }`}
                          >
                            <Button
                              className="flex flex-row justify-center w-40 bg-orange text-white mx-auto rounded-full px-4 py-2 mt-4"
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
