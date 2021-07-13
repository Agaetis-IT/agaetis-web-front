import { useState } from 'react'
import clsx from 'clsx'

import Button from './Button'
import SolutionTabContent from './SolutionTabContent'

import { SolutionsContent } from '../types/SolutionsContent'

interface Props {
  content: SolutionsContent
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

export default function SolutionTab({ content }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)

  function onTabChange(index: number) {
    return (e: React.MouseEvent) => {
      e.preventDefault()
      setCurrentIndex(index)
    }
  }

  return (
    <SolutionTabContent className="flex flex-col sm:flex-row w-full" content={content} selected={currentIndex} />
  )
}
