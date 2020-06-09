/* eslint-disable @typescript-eslint/camelcase */
import React from 'react'
import Particles from 'react-particles-js'

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
      <Particles
        className="hidden sm:block"
        params={{
          particles: {
            number: {
              value: 3,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            line_linked: {
              enable: false,
            },
            move: {
              speed: 1,
              out_mode: 'out',
            },
            shape: {
              type: ['image'],
              image: [
                {
                  src: '/favicon.ico',
                  height: 20,
                  width: 23,
                },
              ],
            },
            color: {
              value: '#CCC',
            },
            size: {
              value: 30,
              random: true,
              anim: {
                enable: true,
                speed: 4,
                size_min: 30,
                sync: true,
              },
            },
          },
          retina_detect: false,
        }}
      />
      <div className=" flex justify-center">
        <div className="flex flex-col hero-text md:flex-row p-6 md:p-0 md:my-6 py-16 max-w-sm md:max-w-full text-white mx-auto text-justify justify-end">
          <div className="xl:pr-48 " style={{ transform: 'translate(-50 %, -50 %)' }}>
            {valeurs.map((valeur) => (
              <h1 className="md:text-6xl font-bold" key={valeur}>
                {valeur}
              </h1>
            ))}
          </div>

          <p
            className="text-base font-thin md:p-12 md:pr-0 pt-4 leading-normal md:max-w-sm justify-end self-end"
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
        </div>
      </div>
    </div>
  )
}
