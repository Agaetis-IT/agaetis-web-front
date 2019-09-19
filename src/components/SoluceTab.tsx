import clsx from 'clsx'
import React, { useState } from 'react'

import { compareTabs, Tab } from '../types/SolutionsContent'

import Button from './Button'
import SoluceTabContent from './SoluceTabContent'

interface Props {
  tabs: Tab[]
}

export default function SoluceTab({ tabs }: Props) {
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
              : 'text-black bg-grey hover:bg-orange-light w-1/6 whitespace-no-wrap overflow-hidden reverseText',
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

      <SoluceTabContent className="flex flex-col md:flex-row w-full" content={tabs.sort(compareTabs)[currentIndex]} />
    </>
  )
}
