import React from 'react'

interface Props {
  hero: string
  valeurs: string[]
  subtitle: string
}

import './Hero.css'
export default function Hero({ hero, valeurs, subtitle }: Props) {
  return (
    <div
      style={{
        backgroundImage: `url(${hero})`,
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
      className="m-0 hero"
    >
      <div className=" flex justify-center">
        <div className="p-6 md:p-10 md:my-6 py-16 md:py-48 max-w-sm md:max-w-md text-white mx-auto md:pr-40 text-justify justify-fix">
          {valeurs.map((valeur) => (
            <h1 className="md:text-4xl" key={valeur}>
              {valeur}
            </h1>
          ))}

          <p className="text-sm md:pr-10 pt-4 leading-normal" dangerouslySetInnerHTML={{ __html: subtitle }} />
        </div>
      </div>
    </div>
  )
}
