import React, { useState } from 'react'
import Button from './Button'

import { OfferDesc } from '../types/IndexContent'

import './HomeOffers.css'
import clsx from 'clsx'

import arrowR from '../public/images/right-arrow.svg'

interface Props {
  title: string
  offers: OfferDesc[]
}

export default function HomeOffers({ title, offers }: Props) {
  const [selectedOffer, setSelectedOffer] = useState(1)
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
      <div className="home-offers-left p-0 md:p-12 lg:px-24 lg:p-16">
        <h2 className="mt-8 mb-4 md:my-0 md:ml-8 text-orange text-center md:text-left">{title}</h2>
        <ul className="md:my-12">
          {offers.map((offer) => (
            <li key={offer.index} className="my-0 md:my-6" id={`offer-${offer.index}`}>
              <div className="p-4 md:p-0">
                <span className="flex flex-row justify-between">
                  <Button onClick={() => handleOfferChange(offer.index)}>
                    <h4 className="text-orange text-sm uppercase">{offer.title}</h4>
                  </Button>
                  <Button
                    className="block md:hidden text-orange mx-2"
                    onClick={() => {
                      handleOfferChange(offer.index)
                    }}
                  >
                    <img
                      style={{ width: 10, height: 10 }}
                      src={arrowR}
                      alt="arrow"
                      className={clsx(offer.index === selectedOffer ? 'offer-selected-arrow' : 'offer-arrow')}
                    />
                  </Button>
                </span>

                <p className="text-xs my-1">{offer.short_desc}</p>
              </div>
              {offer.index !== selectedOffer && <hr className="block md:hidden separator mx-4" />}

              <div
                style={{
                  backgroundImage: `url(${offers[selectedOffer - 1].image})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
                className={clsx('md:hidden home-offers-right  p-4', offer.index === selectedOffer ? 'block' : 'hidden')}
              >
                <div style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} className="p-4">
                  <ul>
                    {offers.map((offer) => (
                      <li key={offer.index} className={clsx({ hidden: selectedOffer != offer.index }, 'my-4')}>
                        <h3 className="text-orange">{offer.title}</h3>
                        <p className="text-sm leading-normal text-justify text-white py-8">{offer.desc}</p>
                        <div className="flex flex-row justify-center"></div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div
        style={{
          backgroundImage: `url(${offers[selectedOffer - 1].image})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
        className="hidden md:block  bg-grey-darker home-offers-right md:p-12 md:py-40 lg:px-16  "
      >
        <div style={{ backgroundColor: 'rgba(0,0,0,0.3)' }} className="p-8">
          <ul>
            {offers.map((offer) => (
              <li key={offer.index} className={clsx({ hidden: selectedOffer != offer.index }, 'my-8')}>
                <h3 className="text-orange">{offer.title}</h3>
                <p className="text-sm leading-normal text-justify text-white py-8 pb-4">{offer.desc}</p>
                <ul>
                  {offer.related_offers &&
                    offer.related_offers.map((o) => (
                      <li key={o} className="text-white">
                        {o}
                      </li>
                    ))}
                </ul>
                <div className="flex flex-row justify-center"></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
