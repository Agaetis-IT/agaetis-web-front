import { useState } from 'react'
import Button from './Button'

import styles from '../styles/HomeOffers.module.css'
import commonStyles from '../styles/Common.module.css'
const arrowR = '/images/right-arrow.svg'
import clsx from 'clsx'
import { OfferDesc } from '../types/OffersContent'
import Link from 'next/link'

interface Props {
  title: string
  offers: OfferDesc[]
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
        <h2 className="mt-2 md:mt-0 text-white md:text-orange-500 font-bold text-2xl text-center md:text-left">{title}</h2>
        <div className="md:mt-12">
          {offers.map((offer, index) => (
            <div key={index} className="my-6" id={`offer-${index}`}>
              <Button onClick={() => handleOfferChange(index)} className="w-full">
                <div
                  className={clsx(
                    `flex items-center justify-between bg-white shadow-md md:shadow-none h-20 ${styles.offerHeader}`,
                    index === selectedOffer && isOpenedOffer ? styles.offerHeaderOpen : styles.offerHeaderClose
                  )}
                >
                  <div className="absolute bg-white h-20 w-20 shadow-md md:hidden rounded-full">
                    <img
                      src={offer.offers_image1}
                      alt="Offer Icon"
                      className="rounded-full"
                    />
                  </div>
                  <div className="w-9/10 ml-22 md:ml-0 py-2 md:p-0">
                    <h4 className="text-gray-800 md:text-orange-500 text-xs md:text-sm leading-normal uppercase text-left font-bold">
                      {offer.title}
                    </h4>
                    <p className="text-cgu md:text-xs italic text-gray-500 md:text-black text-left leading-tight my-1">
                      {offer.short_desc}
                    </p>
                  </div>
                  <span
                    className={clsx(
                      'hidden md:block w-1/10 m-4',
                      index === selectedOffer ? 'text-orange-500 font-bold text-xl' : 'text-gray-500'
                    )}
                  >
                    {'>'}
                  </span>
                  <img
                    src={arrowR}
                    alt=""
                    className={clsx('m-4 block md:hidden',
                      index === selectedOffer && isOpenedOffer ? styles.offerSelectedArrow : styles.offerArrow
                    )}
                    width={10}
                    height={10}
                  />
                </div>
              </Button>
              <div
                style={{
                  backgroundImage: `url(${offer.image})`,
                  backgroundPosition: 'top',
                  backgroundSize: 'cover',
                }}
                className={clsx(
                  `bg-gray-800 md:hidden ${styles.offerFlyout} ml-10`,
                  index === selectedOffer && isOpenedOffer ? `block ${styles.offerFlyoutOpen}` : styles.offerFlyoutClose
                )}
              >
                <div style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} className={`p-4 m-4 ${commonStyles.round8} ${styles.backgroundBlur}`}>
                  <p className="text-sm leading-normal text-justify text-white">
                    {offer.offers_description}
                  </p>
                  {offer.related_landingpage && (
                    <Link
                      href={`/landingpages/${
                        offer.related_landingpage!.split('/')[
                          offer.related_landingpage!.split('/').length - 2
                        ]
                      }`}
                    >
                      <Button
                        className="flex flex-row justify-center w-48 bg-white text-orange-500 uppercase mx-auto rounded-full px-6 py-2 mt-8 shadow-md font-semibold text-xs leading-tight"
                        href={`/landingpages/${
                          offer.related_landingpage!.split('/')[
                            offer.related_landingpage!.split('/').length - 2
                          ]
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
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
        className="relative hidden md:block bg-gray-800 w-full md:w-1/2 md:p-12 lg:p-16"
      >
        <div style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} className={`p-4 ${commonStyles.round8} ${styles.backgroundBlur}`}>
          {offers.map((offer, index) => (
            <div key={index} className={clsx({ hidden: selectedOffer != index })}>
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
                    className="flex flex-row justify-center w-48 text-orange-500 bg-white uppercase mx-auto rounded-full px-6 py-2 mt-8 shadow-md font-semibold text-xs leading-tight"
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
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
