import React from 'react'

import './HomeExpertises.css'

/* eslint-disable @typescript-eslint/camelcase */
interface Props {
  expertises_title: string
  expertises_image_desktop: string
}

export default function HomeExpertises({ expertises_title, expertises_image_desktop }: Props) {
  return (
    <>
      <div className="hidden lg:block  md:p-16 xl:px-32">
        <h2 className="text-orange font-semibold text-center md:text-left">{expertises_title}</h2>
        <div className="md:my-16 relative" id="expertise-container-desktop">
          <img src={expertises_image_desktop} className="block mx-auto human"></img>
        </div>
      </div>
      <div className="block lg:hidden py-8 md:p-16 relative" id="expertise-container">
        <h2 className="text-orange font-semibold text-center md:text-left">{expertises_title}</h2>
        <img src={expertises_image_desktop} className="block mx-auto my-16 human"></img>
      </div>
    </>
  )
}
