import React from 'react'
import { OfferDesc } from '../types/OffersContent'
import './OfferCard.css'
import Button from './Button'
interface Props {
  offer: OfferDesc
}

export default function OfferCard({ offer }: Props) {
  return (
    <div className="flex flex-col my-8">
      <h3 className="md:my-4 hover:underline text-center md:text-left">
        <a href={`/offers/${offer.slug}`} className="text-black mb-2">
          {offer.title}
        </a>
      </h3>
      <div className="flex flex-col md:flex-row">
        <img src={offer.offers_image} className="offer-img mx-auto py-4 md:py-0" />
        <div className="px-4 flex flex-col justify-between">
          <p className="text-sm leading-normal text-justify">{offer.offers_description}</p>
          <Button
            href={`/offers/${offer.slug}`}
            className="float-right md:ml-auto text-black text-sm text-orange offer-more-btn py-2 leading-normal font-semibold"
          >
            Plus d'info
          </Button>
        </div>
      </div>
    </div>
  )
}
