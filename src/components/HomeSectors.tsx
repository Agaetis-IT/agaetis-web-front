import { useState } from 'react'
import clsx from 'clsx'

import Button from './Button'

import { SectorDesc } from '../types/IndexContent'

import styles from '../styles/HomeSectors.module.css'
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
                    `md:bg-white w-full flex flex-row justify-between shadow-md ${styles.sectorHeader} ${styles['md:round8']}`,
                    index === openedSector ? styles.sectorHeaderOpen : styles.sectorHeaderClose
                  )}
                >
                  <img className={`bg-white h-20 w-20 absolute md:relative md:h-56 md:w-1/2 rounded-full ${styles['md:round8Image']} shadow-md md:shadow-none object-cover object-center`} src={sector.image} alt={sector.title} />
                  <div
                    className={`bg-white md:bg-none h-20 md:h-56 p-4 w-full md:w-1/2 flex flex-row md:flex-col items-center justify-between md:justify-center ml-10 md:m-0 ${styles['md:round8']} ${styles.sectorHeader}`}
                  >
                    <div className="p-0 ml-8 md:m-0 md:p-4 pt-0">
                      <h3 className="text-gray-800 md:text-black font-bold uppercase text-left text-sm">
                        {sector.title}
                      </h3>
                      <p className="text-xs text-justify leading-normal py-4 hidden md:block">{sector.desc}</p>
                    </div>
                    <img
                      src={arrowR}
                      alt=""
                      className={clsx(
                        'block md:hidden',
                        index === openedSector ? styles.offerSelectedArrow : styles.offerArrow
                      )}
                      width={10}
                      height={10}
                    />
                  </div>
                </div>
              </Button>
              <div
                className={clsx(
                  `ml-10 bg-white block md:hidden ${styles.sectorFlyout}`,
                  index === openedSector ? styles.sectorFlyoutOpen : styles.sectorFlyoutClose
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
