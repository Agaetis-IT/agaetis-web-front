import clsx from 'clsx'
import React from 'react'

import { Category } from '../types/IdeasContent'

import Button from './Button'
import './CategoryTab.css'

interface Props {
  categories: Category[]
  categoryFilter: string
  handleFilterChange: (category: string) => void
}

function slugify(s: string) {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return s
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

function getBorderColor(category: string, selected: boolean) {
  if (category === 'Agaetis' || category === 'Evènements') {
    return clsx('hover:bg-orange orange-border-thin', selected ? 'bg-orange text-white' : 'text-orange')
  } else if (category === 'Stratégie SI') {
    return clsx('hover:bg-blue blue-border-thin', selected ? 'bg-blue text-white' : 'text-blue')
  } else if (category === 'Data') {
    return clsx('hover:bg-teal teal-border-thin', selected ? 'bg-teal text-white' : 'text-teal')
  } else if (category === 'Service Design') {
    return clsx('hover:bg-light-pink pink-border-thin', selected ? 'bg-light-pink text-white' : 'text-light-pink')
  } else if (category === 'Technologie') {
    return clsx('hover:bg-yellow yellow-border-thin', selected ? 'bg-yellow text-white' : 'text-yellow')
  } else if (category === 'Agilité') {
    return clsx(
      'hover:bg-light-purple purple-light-border-thin',
      selected ? 'bg-light-purple text-white' : 'text-light-purple'
    )
  } else if (category === 'Business Hacking') {
    return clsx(
      'hover:bg-red-lighter red-lighter-border-thin',
      selected ? 'bg-red-lighter text-white' : 'text-red-lighter'
    )
  }
  return clsx('hover:bg-grey grey-border-thin', selected ? 'bg-grey text-white' : 'text-grey')
}

export default function CategoryTab({ categories, categoryFilter, handleFilterChange }: Props) {
  return (
    <div className="flex flex-col justify-center md:max-w-full mx-auto px-2 py-6 md:p-6 xl:px-12">
      <div className="text-xs mx-auto flex flex-row flex-wrap justify-center">
        <Button
          className={clsx(
            'uppercase font-semibold my-2 mx-2 p-2 hover:text-white all rounded-full blue-border-thin',
            categoryFilter === 'All' ? 'bg-blue text-white' : 'blue-border-thin text-blue'
          )}
          onClick={() => handleFilterChange('All')}
        >
          Toutes
        </Button>
        {categories.map((category) => (
          <Button
            key={category.categoryId}
            className={clsx(
              'uppercase font-semibold my-2 mx-1 md:mx-2 p-2 rounded-full hover:text-white',
              slugify(category.categoryName),
              getBorderColor(category.categoryName, categoryFilter === category.categoryName)
            )}
            onClick={() => handleFilterChange(category.categoryName)}
          >
            {category.categoryName}
          </Button>
        ))}
      </div>
    </div>
  )
}
