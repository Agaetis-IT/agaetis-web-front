import React from 'react'

import { Expertise } from '../types/IndexContent'

/* eslint-disable @typescript-eslint/camelcase */
interface Props {
  expertisesTitle: string
  expertisesImageDesktop: string
  expertisesImageMobile: string
  expertises: Expertise[]
}

export default function HomeExpertises({
  expertisesTitle,
  expertisesImageDesktop,
  expertisesImageMobile,
  expertises,
}: Props) {
  return (
    <>
      <div className="p-4 md:p-12 lg:px-24 lg:p-16">
        <div
          style={{
            backgroundImage: `url(${expertisesImageMobile})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'auto 100%',
          }}
          className="block md:hidden h-48 mt-4 opacity-25"
        />
        <h2 className="text-orange font-semibold text-center md:text-left -mt-24 mb-12 md:m-0">{expertisesTitle}</h2>
        <div className="hidden md:block md:mt-12">
          <img src={expertisesImageDesktop} className="block mx-auto w-full h-auto" />
        </div>
        <div className="block md:hidden">
          {expertises.map((e, index) => (
            <div key={e.title} className="flex flex-col">
              <div className="flex flex-row py-4">
                <img className="h-16 w-16" src={e.logo} />
                <div className="self-center  pl-2">
                  <h3 className="text-orange pb-2 uppercase text-sm">{e.title}</h3>
                  <p className="text-grey-darker text-xs font-bold italic">{e.items.split(',').join(' - ')}</p>
                </div>
              </div>
              {index < expertises.length - 1 && <div className="h-px w-8 my-2 bg-orange self-center"></div>}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
