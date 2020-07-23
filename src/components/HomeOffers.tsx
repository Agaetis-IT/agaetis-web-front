import React, { useState } from 'react'
import Button from './Button'

import './HomeOffers.css'
import clsx from 'clsx'

const offers = [
  {
    index: 0,
    title: 'Catégorie Offres 1',
    line: "Batir sa stratégie d'organisation et la direction technique adaptée à la forte croissance d'un projet",
    paragraph:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque placeat voluptatum voluptas tempora hic fuga reprehenderit, natus consequatur iure ipsam! Vitae eligendi aliquid odit hic assumenda, nihil repudiandae at rem.',
    image: '',
  },
  {
    index: 1,
    title: 'Catégorie Offres 2',
    line: "Batir sa stratégie d'organisation et la direction technique adaptée à la forte croissance d'un projet",
    paragraph:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque placeat voluptatum voluptas tempora hic fuga reprehenderit, natus consequatur iure ipsam! Vitae eligendi aliquid odit hic assumenda, nihil repudiandae at rem.',
    image: '',
  },
  {
    index: 2,
    title: 'Catégorie Offres 3',
    line: "Batir sa stratégie d'organisation et la direction technique adaptée à la forte croissance d'un projet",
    paragraph:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque placeat voluptatum voluptas tempora hic fuga reprehenderit, natus consequatur iure ipsam! Vitae eligendi aliquid odit hic assumenda, nihil repudiandae at rem.',
    image: '',
  },
  {
    index: 3,
    title: 'Catégorie Offres 4',
    line: "Batir sa stratégie d'organisation et la direction technique adaptée à la forte croissance d'un projet",
    paragraph:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque placeat voluptatum voluptas tempora hic fuga reprehenderit, natus consequatur iure ipsam! Vitae eligendi aliquid odit hic assumenda, nihil repudiandae at rem.',
    image: '',
  },
  {
    index: 4,
    title: 'Catégorie Offres 5',
    line: "Batir sa stratégie d'organisation et la direction technique adaptée à la forte croissance d'un projet",
    paragraph:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque placeat voluptatum voluptas tempora hic fuga reprehenderit, natus consequatur iure ipsam! Vitae eligendi aliquid odit hic assumenda, nihil repudiandae at rem.',
    image: '',
  },
]

export default function HomeOffers() {
  const [selectedOffer, setSelectedOffer] = useState(0)
  const handleOfferChange = (index: number) => {
    setSelectedOffer(index)
  }
  return (
    <div className="flex flex-col md:flex-row">
      <div className="home-offers-left p-4 md:p-12 lg:p-16">
        <h2 className="ml-4 text-orange">Nos offres</h2>
        <ul className="my-12">
          {offers.map((offer) => (
            <li key={offer.index} className="my-6">
              <Button onClick={() => handleOfferChange(offer.index)}>
                <h4 className="text-orange text-sm uppercase">{offer.title}</h4>
              </Button>
              <p className="text-xs my-1">{offer.line}</p>
            </li>
          ))}
        </ul>
        <Button className="block md:inline-block px-6 py-3 leading-none rounded-full uppercase mt-4 md:mt-0 bg-white text-orange text-xs font-semibold shadow-md">
          Consulter toutes nos offres
        </Button>
      </div>
      <div className="home-offers-right bg-grey-darker p-4 md:p-12 lg:p-16">
        <ul>
          {offers.map((offer) => (
            <li key={offer.index} className={clsx({ hidden: selectedOffer != offer.index }, 'my-4')}>
              <h3 className="text-orange">{offer.title}</h3>
              <p className="text-sm leading-normal text-justify text-white py-8">{offer.paragraph}</p>
              <div className="flex flex-row justify-center">
                <Button className="block md:inline-block px-6 py-3 leading-none rounded-full uppercase mt-4 md:mt-0 bg-white text-orange text-xs font-semibold">
                  En savoir plus
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
