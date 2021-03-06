import React, { useEffect, useState } from 'react'

import './HomeSectors.css'
import { SectorDesc } from '../types/IndexContent'
import arrowR from '../static/images/right-arrow.svg'
import clsx from 'clsx'

interface Props {
  title: string
  sectors: SectorDesc[]
}

export default function HomeSectors({ title, sectors }: Props) {
  const [selectedSector, setSelectedSector] = useState(0)
  useEffect(() => {
    if (document && document.getElementsByClassName('sector-card-image')) {
      const items = document.getElementsByClassName('sector-card-image')
      for (let i = 0; i < items.length; i++) {
        // eslint-disable-next-line
        // @ts-ignore
        items.item(i).style.display = 'block'
      }
    }
  }, [])

  return (
    <div className="bg-light-grey p-4 md:p-16 xl:px-32">
      <h2 className="mt-8 mb-4 md:my-0 text-orange font-semibold text-center md:text-left">{title}</h2>
      <div className="py-4 pb-0 mt-4 md:mt-12" id="sectors">
        {sectors
          .filter((sector) => sector.title != '' && sector.desc != '' && sector.image != '')
          .map((sector, index) => (
            <div
              key={sector.title}
              className={clsx({
                'mb-8':
                  index !==
                  sectors.filter((sector) => sector.title != '' && sector.desc != '' && sector.image != '').length - 1,
              })}
            >
              <div className={clsx('md:bg-white w-full  md:shadow-md flex flex-row justify-between')}>
                <div
                  style={{
                    backgroundImage: `url("${sector.image}")`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                  }}
                  className="bg-white h-24 w-24 absolute md:relative md:h-auto md:w-1/2 rounded-full md:rounded-none shadow-md"
                ></div>

                <div className="bg-white md:bg-none h-24 md:h-auto p-4 md:py-8 w-full md:w-1/2 flex flex-row md:flex-col items-center justify-between md:justify-center ml-12  md:m-0 shadow-md">
                  <div className="p-0 ml-12 md:m-0 md:p-4 pt-0">
                    <h3>{sector.title}</h3>
                    <p className="text-xs text-justify leading-normal py-4 hidden md:block">{sector.desc}</p>
                  </div>
                  <img
                    style={{ width: 10, height: 10 }}
                    src={arrowR}
                    alt="arrow"
                    onClick={() => {
                      setSelectedSector(index)
                    }}
                    className={clsx(
                      index === selectedSector ? 'offer-selected-arrow' : 'offer-arrow',
                      'block md:hidden'
                    )}
                  />
                </div>
              </div>
              {index === selectedSector && (
                <p className="ml-24 px-4 bg-white text-xs text-justify leading-normal py-4 block md:hidden">
                  {sector.desc}
                </p>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}
