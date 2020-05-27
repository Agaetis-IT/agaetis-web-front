import React, { useState } from 'react'

import { compareTabs, Tab } from '../types/SolutionsContent'

import Button from './Button'
import SoluceTabContent from './SoluceTabContent'

interface Props {
  tabs: Tab[]
}

function getTabsClassNames(tabIndex: number, currentIndex: number) {
  if (tabIndex === 0) {
    if (currentIndex === 0) {
      return 'text-sm text-white bg-blue w-1/3 sm:w-1/4 py-4'
    } else if (currentIndex === 3) {
      return 'hidden text-sm sm:block w-1/3 text-black bg-light-grey hover:bg-orange-light sm:w-1/4 py-4'
    }
    return 'text-black text-sm bg-light-grey hover:bg-orange-light w-1/6 sm:w-1/4 whitespace-no-wrap overflow-hidden reverseText'
  } else if (tabIndex === 1) {
    if (currentIndex === 1) {
      return 'text-sm text-white bg-blue w-1/3 sm:w-1/4'
    }
    return 'text-sm text-black bg-light-grey hover:bg-orange-light w-1/3 sm:w-1/4'
  } else if (tabIndex === 2) {
    if (currentIndex === 2) {
      return 'text-sm text-white bg-blue w-1/3 sm:w-1/4'
    }
    return 'text-sm text-black bg-light-grey hover:bg-orange-light w-1/3 sm:w-1/4'
  } else {
    if (currentIndex === 3) {
      return 'text-sm text-white bg-blue  px-4 w-auto sm:w-1/4'
    } else if (currentIndex === 0) {
      return 'hidden text-sm sm:block text-black bg-light-grey hover:bg-orange-light w-auto sm:w-1/4'
    }
    return 'text-black text-sm bg-light-grey hover:bg-orange-light w-1/6 sm:w-1/4 whitespace-no-wrap overflow-hidden w-auto sm:w-1/4'
  }
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
      <div className="md:max-w-full mx-auto p-0 md:px-8">
        <div className="flex flex-row w-full mt-8 md:mt-0">
          <Button className={getTabsClassNames(0, currentIndex)} styleType="tab" onClick={onTabChange(0)}>
            {tabs[0].header}
          </Button>
          <Button className={getTabsClassNames(1, currentIndex)} styleType="tab" onClick={onTabChange(1)}>
            {tabs[1].header}
          </Button>
          <Button className={getTabsClassNames(2, currentIndex)} styleType="tab" onClick={onTabChange(2)}>
            {tabs[2].header}
          </Button>
          <Button className={getTabsClassNames(3, currentIndex)} styleType="tab" onClick={onTabChange(3)}>
            {tabs[3].header}
          </Button>
        </div>
      </div>
      <SoluceTabContent className="flex flex-col md:flex-row w-full" content={tabs.sort(compareTabs)[currentIndex]} />
    </>
  )
}
