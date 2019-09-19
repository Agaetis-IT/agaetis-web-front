import clsx from 'clsx'
import React, { useState } from 'react'

import Button from './Button'
import SoluceTabContent from './SoluceTabContent'

const content = [
  {
    index: 0,
    sections: [
      {
        title: 'Vos besoins',
        content:
          "Face à des changements de plus en plus rapides, imprévisibles et radicaux, nous avons tout de même besoin de prendre LES bonnes décisions pour notre business ou pour notre activité.<br/><br/>Ces décisions sont de plus en plus difficiles à prendre de part la multitude de facteurs à prendre en compte et le temps de plus en plus court disponible pour prendre cette décision.<br/>A tel point qu'aujourd'hui la capacité d'anticiper et de voir le futur est un atout ",
      },
      {
        title: 'Notre réponse',
        content:
          "Nous le sentons tous : mieux comprendre le passé nous permet de mieux conjecturer le futur.<br/><br/>Aussi Agaetis propose des accompagnements alliant expertise des données (Data Scientist, Data Engineer, Architecte Big Data) et expertise des usages (User eXperience). Nous mettons en place des solutions qui permettent de répertorier, rassembler, structurer, visualiser, optimiser et expliquer vos données afin de dégager les tendances, les comportements des utilisateurs et les signaux faibles d'usage qui vous permettrons de prendre de meilleures décisions",
      },
    ],
  },

  {
    index: 1,
    sections: [
      { title: 'Test', content: 'Face à des changements radicaux ...' },
      {
        title: 'Test',
        content: 'Nous le sentons tous  mieux comprendre ...',
      },
    ],
  },

  {
    index: 2,
    sections: [
      { title: 'Vos besoins', content: 'Face à des changements radicaux ...' },
      {
        title: 'Notre réponse',
        content: 'Nous le sentons tous mieux comprendre ...',
      },
    ],
  },
  {
    index: 3,
    sections: [
      { title: 'Vos besoins', content: 'Face à des changements radicaux ...' },
      {
        title: 'Notre réponse',
        content: 'Nous le sentons tous mieux comprendre ...',
      },
    ],
  },
]

export default function SoluceTab() {
  const [currentIndex, setCurrentIndex] = useState(0)

  function onTabChange(index: number) {
    return (e: React.MouseEvent) => {
      e.preventDefault()
      setCurrentIndex(index)
    }
  }

  return (
    <>
      <div className="flex flex-row w-full mt-8 md:mt-0">
        <Button
          className={clsx(
            currentIndex === 0
              ? 'text-white bg-blue w-1/3'
              : currentIndex === 3
              ? 'hidden sm:block w-1/3 text-black bg-grey hover:bg-orange-light'
              : 'text-black bg-grey hover:bg-orange-light w-1/6 sm:w-1/4 whitespace-no-wrap overflow-hidden px-4 reverseText',
            'text-xs uppercase text-center sm:w-1/4 py-4  md:inline  border border-white font-semibold self-center'
          )}
          onClick={onTabChange(0)}
        >
          Anticiper & Valoriser
        </Button>
        <Button
          className={clsx(
            currentIndex === 1 ? 'text-white bg-blue' : 'text-black bg-grey hover:bg-orange-light',
            'text-xs uppercase text-center w-1/3 sm:w-1/4 py-4  md:inline  border border-white font-semibold self-center'
          )}
          onClick={onTabChange(1)}
        >
          Tester & Comprendre
        </Button>
        <Button
          className={clsx(
            currentIndex === 2 ? 'text-white bg-blue' : 'text-black bg-grey hover:bg-orange-light',
            'text-xs uppercase text-center w-1/3 sm:w-1/4 py-4  md:inline  border border-white font-semibold self-center'
          )}
          onClick={onTabChange(2)}
        >
          Rénover & optimiser
        </Button>
        <Button
          className={clsx(
            currentIndex === 3
              ? 'text-white bg-blue w-1/3 px-4'
              : currentIndex === 0
              ? 'hidden sm:block text-black bg-grey hover:bg-orange-light w-1/3'
              : 'text-black bg-grey hover:bg-orange-light w-1/6 sm:w-1/4 whitespace-no-wrap overflow-hidden px-4',
            'text-xs uppercase text-center w-auto sm:w-1/4 py-4 md:inline  border border-white font-semibold self-center'
          )}
          onClick={onTabChange(3)}
        >
          Guider & révéler
        </Button>
      </div>

      <SoluceTabContent
        className="flex flex-col md:flex-row w-full"
        content={content.filter(tab => currentIndex === tab.index)[0]}
      />
    </>
  )
}
