import React from 'react'

import './HomeConvictions.css'
import clsx from 'clsx'

const convictions = [
  {
    title: 'Performance économique',
    description: "Protéger et limiter l'impact financier d'une action malveillante",
    img: '../../static/icons/Performance.png',
  },
  {
    title: 'Impact sociétal',
    description: 'Inscrire nos actions dans une démarche responsable et éthique',
    img: '../../static/icons/Impact.png',
  },

  {
    title: "Soutien à l'humain",
    description: 'Mettre les technologies au service des métiers',
    img: '../../static/icons/Soutien.png',
  },
  {
    title: 'Innovation',
    description: 'Stimuler et proposer des approches disruptives en matière de protection des données stratégiques',
    img: '../../static/icons/Innovation.png',
  },
]

export default function HomeConvictions() {
  return (
    <div className="bg-orange py-8 md:p-16 xl:px-32">
      <h2 className="mt-8 mb-4 md:my-0 text-white text-center md:text-left">Nos convictions</h2>
      <div className="convictions-container text-white my-8 lg:my-0">
        {convictions.map((conviction, index) => (
          <div
            key={conviction.title}
            className={clsx(
              'flex flex-col md:flex-row lg:py-8 justify-start lg:my-8',
              index % 2 === 0 ? 'lg:pr-8 xl:pr-16' : 'lg:pl-8 xl:pl-16 pr-0'
            )}
          >
            <img src={conviction.img}></img>
            <span className="flex flex-col justify-center px-8">
              <h3 className="uppercase font-semibold mb-4">{conviction.title}</h3>
              <p>{conviction.description}</p>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}