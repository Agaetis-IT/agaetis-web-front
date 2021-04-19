import clsx from 'clsx'
import React from 'react'
import { slugify } from '../Services/textUtilities'

import { Category } from '../types/IdeasContent'

import Button from './Button'
import './Common.css'

interface Props {
  categories: Category[]
  categoryFilter: string
  handleFilterChange: (category: string) => void
}

export default function CategoryTab({ categories, categoryFilter, handleFilterChange }: Props) {
  return (
    <div className="flex flex-col md:max-w-full mr-auto py-6">
      <div className="text-xs mr-auto flex flex-row flex-wrap">
        <Button
          className={clsx(
            'smooth-transition w-48 uppercase font-semibold my-2 mx-1 md:mx-2 p-2 hover:text-white hover:bg-orange all rounded-full border-2 border-orange shadow-md bg-light-grey',
            categoryFilter === 'All' ? 'bg-orange text-white' : 'text-orange'
          )}
          onClick={() => handleFilterChange('All')}
        >
          #Toutes
        </Button>
        {categories.map((category) => (
          <Button
            key={category.categoryId}
            className={clsx(
              'smooth-transition w-48 uppercase font-semibold my-2 mx-1 md:mx-2 p-2 rounded-full hover:text-white shadow-md bg-light-grey hover:bg-orange border-2 border-orange',
              slugify(categoryFilter) === slugify(category.categoryName) ? 'bg-orange text-white' : 'text-orange'
            )}
            onClick={() => handleFilterChange(category.categoryName)}
          >
            {'#' + category.categoryName}
          </Button>
        ))}
      </div>
    </div>
  )
}
