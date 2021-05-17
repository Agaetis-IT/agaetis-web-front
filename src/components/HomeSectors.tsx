import React, { useState } from 'react'

import './HomeSectors.css'
import './Common.css'
import { SectorDesc } from '../types/IndexContent'
import arrowR from '../static/images/right-arrow.svg'
import clsx from 'clsx'
import Button from './Button'

interface Props {
  title: string
  sectors: SectorDesc[]
}

export default function HomeSectors({ title, sectors }: Props) {
  const [selectedSector, setSelectedSector] = useState(0)
  const [isOpennedSector, setIsOpennedSector] = useState(false)

  const handleSectorChange = (index: number) => {
    selectedSector !== index ? setIsOpennedSector(true) : setIsOpennedSector(!isOpennedSector)
    setSelectedSector(index)
  }

  return (
    <div className="bg-light-grey p-4 md:p-12 lg:px-24 lg:p-16 my-8 shadow-md">
      <h2 className="mt-2 mb-6 md:my-0 text-orange font-semibold text-center md:text-left">{title}</h2>
      <div className="mb-6 md:mt-12" id="sectors">
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
              <Button
                className="w-full md:cursor-default"
                onClick={() => {
                  handleSectorChange(index)
                }}
              >
                <div
                  className={clsx(
                    'md:bg-white w-full flex flex-row justify-between shadow-md sector-header md:round8',
                    index === selectedSector && isOpennedSector ? 'sector-header-open' : 'sector-header-close'
                  )}
                >
                  <div
                    style={{
                      backgroundImage: `url("${sector.image}")`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                    }}
                    className="bg-white h-20 w-20 absolute md:relative md:h-56 md:w-1/2 rounded-full shadow-md md:shadow-none md:round8-image"
                  />

                  <div
                    className={clsx(
                      'bg-white md:bg-none h-20 md:h-56 p-4 w-full md:w-1/2 flex flex-row md:flex-col items-center justify-between md:justify-center ml-10 md:m-0 md:round8 sector-header',
                      index === selectedSector && isOpennedSector ? 'sector-header-open' : 'sector-header-close'
                    )}
                  >
                    <div className="p-0 ml-8 md:m-0 md:p-4 pt-0">
                      <h3 className="text-grey-darker md:text-black font-bold uppercase text-left text-sm">
                        {sector.title}
                      </h3>
                      <p className="text-xs text-justify leading-normal py-4 hidden md:block">{sector.desc}</p>
                    </div>
                    <img
                      style={{ width: 10, height: 10 }}
                      src={arrowR}
                      alt="arrow"
                      className={clsx(
                        index === selectedSector && isOpennedSector ? 'offer-selected-arrow' : 'offer-arrow',
                        'block md:hidden'
                      )}
                    />
                  </div>
                </div>
              </Button>
              <div
                className={clsx(
                  'ml-10 bg-white block md:hidden sector-flyout',
                  index === selectedSector && isOpennedSector ? 'sector-flyout-open' : 'sector-flyout-close'
                )}
              >
                <div className="m-4">
                  <p className="text-xs text-justify leading-normal">{sector.desc}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
