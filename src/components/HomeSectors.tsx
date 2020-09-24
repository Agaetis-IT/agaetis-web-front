import React, { useState } from 'react'

import './HomeSectors.css'
import { SectorDesc } from '../types/IndexContent'
import arrowL from '../public/images/left-arrow.svg'
import arrowR from '../public/images/right-arrow.svg'
import clsx from 'clsx'
import VisibilitySensor from 'react-visibility-sensor'
import { LazyLoadImage } from 'react-lazy-load-image-component'

interface Props {
  title: string
  sectors: SectorDesc[]
}

export default function HomeSectors({ title, sectors }: Props) {
  const [id, setId] = useState(0)
  function handleSectorScrollLeft() {
    if (document && window && id > 0) {
      const sectors = document.getElementById('sectors')
      if (sectors) {
        sectors!.children[id - 1].scrollIntoView({ behavior: 'smooth' })
        setId(id - 1)
      }
    }
  }
  function handleSectorScrollRight() {
    if (document && window && id < sectors.length - 1) {
      const sectors = document.getElementById('sectors')
      if (sectors) {
        sectors!.children[id + 1].scrollIntoView({ behavior: 'smooth' })
        setId(id + 1)
      }
    }
  }

  return (
    <div className="bg-light-grey py-8 md:p-16 xl:px-32">
      <h2 className="text-orange font-semibold text-center md:text-left">{title}</h2>
      <div className="py-12 sectors-list" id="sectors">
        {sectors
          .filter((sector) => sector.title != '' && sector.desc != '' && sector.image != '')
          .map((sector, index) => (
            <VisibilitySensor
              key={sector.title}
              partialVisibility={false}
              onChange={(isCardVisible: boolean) => {
                if (isCardVisible) {
                  setId(index)
                }
              }}
            >
              <div className="md:bg-white w-full sm:w-auto items md:shadow-md flex flex-col justify-between">
                {
                  // eslint-disable-next-line
                  // @ts-ignore-next-line
                  <LazyLoadImage effect="blur" src={sector.image}></LazyLoadImage>
                }
                <div className="bg-white md:bg-none home-sectors-description pb-4 flex flex-col justify-between">
                  <h3 className="p-4">{sector.title}</h3>
                  <p className="text-xs text-justify leading-normal p-4">{sector.desc}</p>
                </div>
              </div>
            </VisibilitySensor>
          ))}
      </div>
      <div
        className={clsx('flex md:hidden flex-row mx-4 sector-control ', id === 0 ? 'justify-end' : 'justify-between ')}
      >
        <div
          style={{ width: 40, height: 40 }}
          className={clsx(
            'sector-arrow-L bg-white rounded-full  justify-center arrow-hover',
            id === 0 ? 'hidden' : 'flex flex-col'
          )}
          onClick={handleSectorScrollLeft}
        >
          <img src={arrowL} style={{ width: 20, height: 20 }} className="block mx-auto self-center" />
        </div>
        <div
          style={{ width: 40, height: 40 }}
          className={clsx(
            'sector-arrow-R bg-white rounded-full justify-center arrow-hover',
            id === sectors.length - 1 ? 'hidden' : 'flex flex-col'
          )}
          onClick={handleSectorScrollRight}
        >
          <img src={arrowR} style={{ width: 20, height: 20 }} className="block mx-auto self-center" />
        </div>
      </div>
    </div>
  )
}
