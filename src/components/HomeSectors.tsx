import React, { useState } from 'react'

import './HomeSectors.css'
import Button from './Button'
import { SectorDesc } from '../types/IndexContent'
import arrowL from '../public/images/left-arrow.svg'
import arrowR from '../public/images/right-arrow.svg'
import clsx from 'clsx'

interface Props {
  title: string
  sectors: SectorDesc[]
}

export default function HomeSectors({ title, sectors }: Props) {
  const [id, setId] = useState(0)
  function handleSectorScrollLeft() {
    if (document && window && id > 0) {
      const sectors = document.getElementById('sectors')
      sectors.children[id - 1].scrollIntoView({ behavior: 'smooth' })
      setId(id - 1)
    }
  }
  function handleSectorScrollRight() {
    if (document && window && id < 7) {
      const sectors = document.getElementById('sectors')
      sectors.children[id + 1].scrollIntoView({ behavior: 'smooth' })
      setId(id + 1)
    }
  }
  return (
    <div className="bg-light-grey py-8 md:p-16 xl:px-32">
      <h2 className="text-orange font-semibold text-center md:text-left">{title}</h2>
      <div className="py-12 sectors-list" id="sectors">
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
      <div className="flex sm:hidden flex-row justify-between mx-4 sector-control">
        <div
          style={{ width: 40, height: 40 }}
          className={clsx('sector-arrow-L bg-white rounded-full flex flex-col justify-center')}
        >
          <img
            src={arrowL}
            style={{ width: 20, height: 20 }}
            onClick={handleSectorScrollLeft}
            className="block mx-auto self-center"
          />
        </div>
        <div
          style={{ width: 40, height: 40 }}
          className={clsx('sector-arrow-R bg-white rounded-full flex flex-col justify-center')}
        >
          <img
            src={arrowR}
            style={{ width: 20, height: 20 }}
            onClick={handleSectorScrollRight}
            className="block mx-auto self-center"
          />
        </div>
      </div>
    </div>
  )
}
