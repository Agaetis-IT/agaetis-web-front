import clsx from 'clsx'
import React, { useState } from 'react'

import Button from './Button'
import SoluceTabContent from './SoluceTabContent'

const content = [
  {
    index: 0,
    sections: [
      { title: 'Vos besoins', content: 'Face à des changements radicaux ...' },
      {
        title: 'Notre réponse',
        content: 'Nous le sentons tous  mieux comprendre ...',
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
        content: 'Nous le sentons tous  mieux comprendre ...',
      },
    ],
  },
  {
    index: 3,
    sections: [
      { title: 'Vos besoins', content: 'Face à des changements radicaux ...' },
      {
        title: 'Notre réponse',
        content: 'Nous le sentons tous  mieux comprendre ...',
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
      <div className="flex flex-row w-full">
        <Button
          className={clsx(
            currentIndex === 0 ? 'text-white bg-blue' : 'text-black bg-grey hover:bg-orange-light',
            'text-xs uppercase text-center md:w-1/4 py-4  md:inline  border border-white font-semibold self-center'
          )}
          onClick={onTabChange(0)}
        >
          Anticiper & Valoriser
        </Button>
        <Button
          className={clsx(
            currentIndex === 1 ? 'text-white bg-blue' : 'text-black bg-grey hover:bg-orange-light',
            'text-xs uppercase text-center md:w-1/4 py-4  md:inline  border border-white font-semibold self-center'
          )}
          onClick={onTabChange(1)}
        >
          Tester & Comprendre
        </Button>
        <Button
          className={clsx(
            currentIndex === 2 ? 'text-white bg-blue' : 'text-black bg-grey hover:bg-orange-light',
            'text-xs uppercase text-center md:w-1/4 py-4  md:inline  border border-white font-semibold self-center'
          )}
          onClick={onTabChange(2)}
        >
          Rénover & optimiser
        </Button>
        <Button
          className={clsx(
            currentIndex === 3 ? 'text-white bg-blue' : 'text-black bg-grey hover:bg-orange-light',
            'text-xs uppercase text-center md:w-1/4 py-4 md:inline  border border-white font-semibold self-center'
          )}
          onClick={onTabChange(3)}
        >
          Guider & révéler
        </Button>
      </div>

      <SoluceTabContent
        className="flex flex-row w-full"
        content={content.filter(tab => currentIndex === tab.index)[0]}
      />
    </>
  )
}
