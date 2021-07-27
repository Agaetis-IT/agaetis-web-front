import { useState } from 'react'
import clsx from 'clsx'

import Button from './Button'

import { SectorDesc } from '../types/IndexContent'

const arrowR = '/images/right-arrow.svg'

interface Props {
  title: string
  sectors: SectorDesc[]
}

export default function HomeSectors({ title, sectors }: Props) {
  const [openedSector, setOpenedSector] = useState(-1)

  const handleSectorChange = (index: number) => {
    setOpenedSector(openedSector !== index ? index : -1)
  }

  return (
    <div className="bg-gray-400 p-4 md:p-12 lg:px-24 lg:p-16 mt-8 shadow-md">
      <h2 className="mt-2 mb-6 md:my-0 text-orange-500 font-semibold text-2xl text-center md:text-left">{title}</h2>
      <div className="mb-6 md:mt-12">
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
                    'md:bg-white w-full flex flex-row justify-between shadow-md overflow-hidden transition-all duration-500 md:rounded-lg',
                    index === openedSector
                      ? 'rounded-tr-lg rounded-tl-6xl rounded-bl-6xl'
                      : 'rounded-r-lg rounded-l-6xl'
                  )}
                >
                  <img
                    className="bg-white h-20 w-20 absolute md:relative md:h-56 md:w-1/2 rounded-full md:rounded-l-lg md:rounded-r-none shadow-md md:shadow-none object-cover object-center"
                    src={sector.image}
                    alt={sector.title}
                  />
                  <div className="bg-white md:bg-none h-20 md:h-56 p-4 w-full md:w-1/2 flex flex-row md:flex-col items-center justify-between md:justify-center ml-10 md:m-0 md:rounded-lg overflow-hidden transition-all duration-500">
                    <div className="p-0 ml-8 md:m-0 md:p-4 pt-0">
                      <h3 className="text-gray-800 md:text-black font-bold uppercase text-left text-sm">
                        {sector.title}
                      </h3>
                      <p className="text-xs text-justify leading-normal py-4 hidden md:block">{sector.desc}</p>
                    </div>
                    <img
                      src={arrowR}
                      className={clsx(
                        'block md:hidden transform transition-all duration-500',
                        index === openedSector ? '-rotate-90' : 'rotate-90'
                      )}
                      width={10}
                      height={10}
                      alt="Flèche"
                    />
                  </div>
                </div>
              </Button>
              <div
                className={clsx(
                  'ml-10 bg-white block md:hidden overflow-hidden transition-all duration-500 rounded-b-lg',
                  index === openedSector ? 'max-h-50' : 'max-h-0'
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
