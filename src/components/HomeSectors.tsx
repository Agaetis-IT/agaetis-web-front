import React from 'react'

import './HomeSectors.css'

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
    <div className="bg-light-grey py-8 md:p-16">
      <h2 className="text-orange ml-4 md:ml-8 font-semibold">Nos secteurs d'activité</h2>
      <div className=" py-12 sectors-list ">
        {sectors.map((sector) => (
          <div key={sector.title} className="md:bg-white items md:shadow-md">
            <img src={sector.img}></img>
            <h3 className="p-4">{sector.title}</h3>
            <p className="text-xs text-justify leading-normal p-4">{sector.paragraph}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
