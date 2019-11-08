import clsx from 'clsx'
import React, { useState } from 'react'

import { compareTabs, Tab } from '../types/SolutionsContent'

import Button from './Button'
import SoluceTabContent from './SoluceTabContent'

interface Props {
  tabs: Tab[]
}

function getTabsClassNames(tabIndex: number, currentIndex: number) {
  if ((tabIndex === 0 && currentIndex === 3) || (tabIndex === 3 && currentIndex === 0)) {
    return 'hidden sm:block w-1/3 text-black bg-grey hover:bg-orange-light'
  }
  return clsx(
    'text-black bg-grey hover:bg-orange-light w-1/6 sm:w-1/4 whitespace-no-wrap overflow-hidden' +
      { reverseText: tabIndex === 0 }
  )
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
            currentIndex === 0 ? 'text-white bg-blue w-1/3' : getTabsClassNames(0, currentIndex),
            'sm:w-1/4 py-4 '
          )}
          styleType="tab"
          onClick={onTabChange(0)}
        >
          {tabs[0].header}
        </Button>
        <Button
          className={clsx(
            currentIndex === 1 ? 'text-white bg-blue' : 'text-black bg-grey hover:bg-orange-light',
            'w-1/3 sm:w-1/4'
          )}
          styleType="tab"
          onClick={onTabChange(1)}
        >
          {tabs[1].header}
        </Button>
        <Button
          className={clsx(
            currentIndex === 2 ? 'text-white bg-blue' : 'text-black bg-grey hover:bg-orange-light',
            'w-1/3 sm:w-1/4'
          )}
          styleType="tab"
          onClick={onTabChange(2)}
        >
          {tabs[2].header}
        </Button>
        <Button
          className={clsx(
            currentIndex === 3 ? 'text-white bg-blue w-1/3 px-4' : getTabsClassNames(3, currentIndex),
            'w-auto sm:w-1/4'
          )}
          styleType="tab"
          onClick={onTabChange(3)}
        >
          {tabs[3].header}
        </Button>
      </div>

      <SoluceTabContent className="flex flex-col md:flex-row w-full" content={tabs.sort(compareTabs)[currentIndex]} />
    </>
  )
}
