import React from 'react'

import './HomeExpertises.css'

import { Expertise } from '../types/IndexContent'

/* eslint-disable @typescript-eslint/camelcase */
interface Props {
  expertises_title: string
  expertises_image_desktop: string
  expertises: Expertise[]
}

export default function HomeExpertises({ expertises_title, expertises_image_desktop, expertises }: Props) {
  return (
    <>
      <div className="hidden lg:block  md:p-16 xl:px-32">
        <h2 className="text-orange font-semibold text-center md:text-left">{expertises_title}</h2>
        <div className="md:my-16 relative" id="expertise-container-desktop">
          <img src={expertises_image_desktop} className="block mx-auto human" />
        </div>
      </div>
      <div className="block lg:hidden p-4 py-8 relative" id="expertise-container">
        <h2 className="text-orange font-semibold text-center md:text-left">{expertises_title}</h2>
        <div className="mt-8">
          {expertises.map((e) => (
            <div key={e.title} className="flex flex-row py-4 ">
              <img className="h-16 w-16" src={e.logo} />
              <div className="text-orange self-center  pl-2">
                <h3 className="pb-2 uppercase text-sm">{e.title}</h3>
                <p className="text-xs">{e.items.split(',').join(' - ')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
