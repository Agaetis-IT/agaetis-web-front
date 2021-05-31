import React, { useState } from 'react'

import { SectorDesc } from '../types/IndexContent'
const arrowR = '/images/right-arrow.svg'
import clsx from 'clsx'
import Image from 'next/image'

interface Props {
  title: string
  sectors: SectorDesc[]
}

export default function HomeSectors({ title, sectors }: Props) {
  const [selectedSector, setSelectedSector] = useState(0)

  return (
    <div className="bg-gray-400 py-8 px-4 md:p-16 xl:px-32">
      <h2 className="mb-4 md:my-0 text-orange-500 font-semibold text-center md:text-left">{title}</h2>
      <div className="py-4 pb-0 md:mt-12" id="sectors">
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
              <div className={clsx('md:bg-white w-full md:shadow-md flex flex-row justify-between')}>
                <div className="bg-white h-24 w-24 absolute md:relative md:h-auto md:w-1/2 rounded-full md:rounded-none shadow-md">
                  <Image
                    src={sector.image}
                    className="rounded-full md:rounded-none"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                  />
                </div>

                <div className="bg-white md:bg-none h-24 md:h-auto p-4 md:py-8 w-full md:w-1/2 flex flex-row md:flex-col items-center justify-between md:justify-center ml-12 md:m-0 shadow-md">
                  <div className="p-0 ml-12 md:m-0 md:p-4 pt-0">
                    <h3>{sector.title}</h3>
                    <p className="text-xs text-justify leading-normal py-4 hidden md:block">{sector.desc}</p>
                  </div>
                  <Image
                    src={arrowR}
                    alt="arrow"
                    onClick={() => {
                      setSelectedSector(index)
                    }}
                    className={clsx(
                      index === selectedSector ? 'offer-selected-arrow' : 'offer-arrow',
                      'block md:hidden'
                    )}
                    width={10}
                    height={10}
                    quality={100}
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
