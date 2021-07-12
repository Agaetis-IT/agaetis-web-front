import { useState } from 'react'
import clsx from 'clsx'

import Button from './Button'
import SolutionTabContent from './SolutionTabContent'

import { compareTabs, Tab } from '../types/SolutionsContent'

interface Props {
  tabs: Tab[]
}

function getTabsClassNames(tabIndex: number, currentIndex: number) {
  if (tabIndex === 0) {
    if (currentIndex === 0) {
      return 'text-white bg-orange-500 w-1/3 py-4'
    } else if (currentIndex === 3) {
      return 'hidden sm:block w-1/3 text-black bg-gray-400 hover:bg-orange-500 py-4'
    }
    return 'text-black bg-gray-400 hover:bg-orange-500 w-1/6 whitespace-no-wrap overflow-hidden reverseText'
  } else if (tabIndex === 1) {
    if (currentIndex === 1) {
      return 'text-white bg-orange-500 w-1/3'
    }
    return 'text-black bg-gray-400 hover:bg-orange-500 w-1/3'
  } else if (tabIndex === 2) {
    if (currentIndex === 2) {
      return 'text-white bg-orange-500 w-1/3'
    }
    return 'text-black bg-gray-400 hover:bg-orange-500 w-1/3'
  } else {
    if (currentIndex === 3) {
      return 'text-white bg-orange-500 px-4 w-auto'
    } else if (currentIndex === 0) {
      return 'hidden sm:block text-black bg-gray-400 hover:bg-orange-500 w-auto'
    }
    return 'text-black bg-gray-400 hover:bg-orange-500 w-1/6 whitespace-no-wrap overflow-hidden w-auto'
  }
}

export default function SolutionTab({ tabs }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)

  function onTabChange(index: number) {
    return (e: React.MouseEvent) => {
      e.preventDefault()
      setCurrentIndex(index)
    }
  }

  return (
    <>
      <div className="md:max-w-full mx-auto p-0 md:px-8 xl:px-32">
        <div className="flex flex-row w-full mt-8 md:mt-0">
          <Button
            className={clsx(
              'text-sm leading-normal sm:w-1/4 uppercase text-center py-4 md:inline border border-white font-semibold self-center',
              getTabsClassNames(0, currentIndex)
            )}
            onClick={onTabChange(0)}
          >
            {tabs[0].header}
          </Button>
          <Button
            className={clsx(
              'text-sm leading-normal sm:w-1/4 uppercase text-center py-4 md:inline border border-white font-semibold self-center',
              getTabsClassNames(1, currentIndex)
            )}
            onClick={onTabChange(1)}
          >
            {tabs[1].header}
          </Button>
          <Button
            className={clsx(
              'text-sm leading-normal sm:w-1/4 uppercase text-center py-4 md:inline border border-white font-semibold self-center',
              getTabsClassNames(2, currentIndex)
            )}
            onClick={onTabChange(2)}
          >
            {tabs[2].header}
          </Button>
          <Button
            className={clsx(
              'text-sm leading-normal sm:w-1/4 uppercase text-center py-4 md:inline border border-white font-semibold self-center',
              getTabsClassNames(3, currentIndex)
            )}
            onClick={onTabChange(3)}
          >
            {tabs[3].header}
          </Button>
        </div>
      </div>
      <SolutionTabContent className="flex flex-col sm:flex-row w-full" content={tabs.sort(compareTabs)[currentIndex]} />
    </>
  )
}
