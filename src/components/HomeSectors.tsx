import React from 'react'

import './HomeSectors.css'
import Button from './Button'

const sectors = [
  {
    title: 'Agriculture',
    paragraph:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse tenetur iure, ipsum maiores modi fugiat corporis itaque sed eaque sint et quis ut fugit quasi repellendus! Deleniti illo vitae nam.',
    img: '../../static/images/Agriculture.png',
  },
  {
    title: 'Usine du futur',
    paragraph:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse tenetur iure, ipsum maiores modi fugiat corporis itaque sed eaque sint et quis ut fugit quasi repellendus! Deleniti illo vitae nam.',
    img: '../../static/images/Usine.png',
  },
  {
    title: 'Santé',
    paragraph:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse tenetur iure, ipsum maiores modi fugiat corporis itaque sed eaque sint et quis ut fugit quasi repellendus! Deleniti illo vitae nam.',
    img: '../../static/images/sante.png',
  },
  {
    title: 'Energie',
    paragraph:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse tenetur iure, ipsum maiores modi fugiat corporis itaque sed eaque sint et quis ut fugit quasi repellendus! Deleniti illo vitae nam.',
    img: '../../static/images/Energie.png',
  },
  {
    title: 'Mobilité',
    paragraph:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse tenetur iure, ipsum maiores modi fugiat corporis itaque sed eaque sint et quis ut fugit quasi repellendus! Deleniti illo vitae nam.',
    img: '../../static/images/Mobilite.png',
  },
  {
    title: 'Banque & Assurance',
    paragraph:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse tenetur iure, ipsum maiores modi fugiat corporis itaque sed eaque sint et quis ut fugit quasi repellendus! Deleniti illo vitae nam.',
    img: '../../static/images/banque.png',
  },
  {
    title: 'Tourisme',
    paragraph:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse tenetur iure, ipsum maiores modi fugiat corporis itaque sed eaque sint et quis ut fugit quasi repellendus! Deleniti illo vitae nam.',
    img: '../../static/images/tourisme.png',
  },
  {
    title: 'Entertainment & Culture',
    paragraph:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse tenetur iure, ipsum maiores modi fugiat corporis itaque sed eaque sint et quis ut fugit quasi repellendus! Deleniti illo vitae nam.',
    img: '../../static/images/culture.png',
  },
]
export default function HomeSectors() {
  return (
    <div className="bg-light-grey py-8 md:p-16 xl:px-32">
      <h2 className="text-orange font-semibold text-center md:text-left">Nos secteurs d'activité</h2>
      <div className=" py-12 sectors-list ">
        {sectors.map((sector) => (
          <div key={sector.title} className="md:bg-white items md:shadow-md">
            <img src={sector.img}></img>
            <div className="bg-white md:bg-none home-sectors-description pb-4">
              <h3 className="p-4">{sector.title}</h3>
              <p className="text-xs text-justify leading-normal p-4">{sector.paragraph}</p>
              <Button className="block px-6 py-3 leading-none rounded-full uppercase bg-orange text-white mt-4 text-xs font-semibold mx-auto">
                En savoir plus
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
