import React from 'react'

import './Hero.css'
export default function Hero() {
  return (
    <div className="hero m-0">
      <div className="darkener flex justify-center">
        <div className="p-4 md:py-32 max-w-md text-white mx-auto md:pr-32">
          <h1>
            Explorer
            <br />
            Valoriser
            <br />
            Innover
          </h1>
          <p className=" text-xs text-justify md:pr-3 pt-2">
            Nous transformons le meilleur des innovations en nouveaux gisements de valeur : nous sommes les architectes
            d'une technologie responsable.
          </p>
        </div>
      </div>
    </div>
  )
}
