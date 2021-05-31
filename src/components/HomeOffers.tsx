import React, { useState } from 'react'
import Button from './Button'

import styles from '../styles/HomeOffers.module.css'
const arrowR = '/images/right-arrow.svg'
import clsx from 'clsx'
import { OfferDesc } from '../types/OffersContent'
import Link from 'next/link'
import Image from 'next/image'

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
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 p-0 md:p-12 lg:px-24 lg:p-16">
        <h2 className="mt-8 mb-4 md:my-0 text-orange-500 text-center md:text-left">{title}</h2>
        <ul className="md:my-12 p-0 list-none">
          {offers.map((offer, index) => (
            <li key={index} className="my-0 md:my-6" id={`offer-${index}`}>
              <div className="p-4 md:p-0">
                <span className="flex flex-row justify-between">
                  <Button onClick={() => handleOfferChange(index)}>
                    <h4 className="text-orange-500 text-sm leading-normal uppercase">{offer.title}</h4>
                  </Button>
                  <Button
                    className="block md:hidden text-orange-500 mx-2"
                    onClick={() => {
                      handleOfferChange(index)
                    }}
                  >
                    <Image
                      src={arrowR}
                      alt="arrow"
                      className={clsx(index === selectedOffer ? styles.offerSelectedArrow : styles.offerArrow)}
                      width={10}
                      height={10}
                      quality={100}
                    />
                  </Button>
                </span>

                <p className="text-xs leading-normal my-1">{offer.short_desc}</p>
              </div>
              {index !== selectedOffer && (
                <hr className="block md:hidden border-b border-solid border-gray-500 opacity-50 mx-4" />
              )}
              <div className={clsx('relative md:hidden w-full md:w-1/2', index === selectedOffer ? 'block' : 'hidden')}>
                <div className="absolute bg-gray-800 top-0 left-0 right-0 bottom-0 z-back">
                  <Image src={offers[selectedOffer].image} layout="fill" objectFit="cover" quality={100}/>
                </div>
                <div className="p-4">
                  <div style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} className="p-4">
                    <ul className="p-0 list-none">
                      {offers.map((offer, index) => (
                        <li key={index} className={clsx({ hidden: selectedOffer != index }, 'my-4')}>
                          <h3 className="text-orange-500">{offer.title}</h3>
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
                                className="flex flex-row justify-center w-40 bg-orange-500 text-white mx-auto rounded-full px-4 py-2 mt-4"
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
            </li>
          ))}
        </ul>
      </div>
      <div className="relative hidden md:block w-full md:w-1/2">
        <div className="absolute bg-gray-800 top-0 left-0 right-0 bottom-0 z-back">
          <Image src={offers[selectedOffer].image} layout="fill" objectFit="cover" quality={100}/>
        </div>
        <div className="md:p-12 lg:p-16">
          <div style={{ backgroundColor: 'rgba(0,0,0,0.3)' }} className="p-4">
            <ul className="p-0 list-none">
              {offers.map((offer, index) => (
                <li key={index} className={clsx({ hidden: selectedOffer != index }, 'my-4')}>
                  <h3 className="text-orange-500">{offer.title}</h3>
                  <p className="text-sm leading-normal text-justify text-white py-8 pb-4">{offer.offers_description}</p>
                  {offers[selectedOffer].related_landingpage && (
                    <Link
                      href={`/landingpages/${
                        offers[selectedOffer].related_landingpage!.split('/')[
                          offers[selectedOffer].related_landingpage!.split('/').length - 2
                        ]
                      }`}
                    >
                      <Button
                        className="flex flex-row justify-center w-40 bg-orange-500 text-white mx-auto rounded-full px-4 py-2 mt-4"
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
    </div>
  )
}
