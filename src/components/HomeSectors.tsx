import './HomeSectors.css'

import React, { useEffect, useState } from 'react'

import { LazyLoadImage } from 'react-lazy-load-image-component'
import { SectorDesc } from '../types/IndexContent'
import VisibilitySensor from 'react-visibility-sensor'
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

  useEffect(() => {
    if (document && document.getElementsByClassName('sector-card-image')) {
      const sectors = document.getElementById('sectors')
      const items = document.getElementsByClassName('sector-card-image')
      for (let i = 0; i < items.length; i++) {
        // eslint-disable-next-line
        // @ts-ignore
        items.item(i).style.display = 'block'
      }
      if (sectors) {
        sectors.addEventListener('wheel', (e) => {
          const delta = Math.max(-1, Math.min(1, e.deltaY))
          sectors.scrollLeft += delta * 40
          if (sectors.scrollLeft > 0 && sectors.offsetWidth + sectors.scrollLeft < sectors.scrollWidth - 1) {
            e.preventDefault()
          }
        })
      }
    }
  }, [])

  return (
    <div className="bg-light-grey py-8 md:p-16 xl:px-32" id="sectors_container">
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
              <div className="md:bg-white w-full items  md:shadow-md flex flex-col justify-between">
                <div>
                  {
                    // eslint-disable-next-line
                    // @ts-ignore-next-line
                    <LazyLoadImage
                      effect="blur"
                      wrapperClassName="sector-card-image"
                      src={sector.image}
                    ></LazyLoadImage>
                  }
                  <div className="bg-white md:bg-none home-sectors-description pb-4  ">
                    <h3 className="p-4">{sector.title}</h3>
                    <p className="text-xs text-justify leading-normal p-4">{sector.desc}</p>
                  </div>
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
