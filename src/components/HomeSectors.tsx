import React from 'react'

import './HomeSectors.css'
import Button from './Button'
import { SectorDesc } from '../types/IndexContent'

interface Props {
  sectors: SectorDesc[]
}

export default function HomeSectors({ sectors }: Props) {
  return (
    <div className="bg-light-grey py-8 md:p-16 xl:px-32">
      <h2 className="text-orange font-semibold text-center md:text-left">Nos secteurs d'activité</h2>
      <div className=" py-12 sectors-list ">
        {sectors
          .filter((sector) => sector.title != '' && sector.desc != '' && sector.image != '')
          .map((sector) => (
            <div key={sector.title} className="md:bg-white items md:shadow-md">
              <img src={sector.image}></img>
              <div className="bg-white md:bg-none home-sectors-description pb-4">
                <h3 className="p-4">{sector.title}</h3>
                <p className="text-xs text-justify leading-normal p-4">{sector.desc}</p>
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
