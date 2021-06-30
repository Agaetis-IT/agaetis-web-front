import clsx from 'clsx'

import Button from './Button'

import { Category } from '../types/IdeasContent'
import { slugify } from '../services/textUtilities'

import styles from '../styles/Common.module.css'

interface Props {
  categories: Category[]
  categoryFilter: string
  handleFilterChange: (category: string) => void
}

export default function CategoryTab({ categories, categoryFilter, handleFilterChange }: Props) {
  return (
    <div className="md:max-w-full mr-auto py-6">
      <div className="text-xs leading-tight mr-auto grid grid-cols-fit">
        <Button
          className={clsx(
            styles.smoothTransition,
            'uppercase font-semibold my-2 mx-1 md:mx-2 p-2 hover:text-white hover:bg-orange-500 rounded-full border-2 border-orange-500 shadow-md bg-gray-400',
            categoryFilter === 'All' ? 'bg-orange-500 text-white' : 'text-orange-500'
          )}
          onClick={() => handleFilterChange('All')}
        >
          #Toutes
        </Button>
        {categories.map((category) => (
          <Button
            key={category.categoryId}
            className={clsx(
              styles.smoothTransition,
              'uppercase font-semibold my-2 mx-1 md:mx-2 p-2 rounded-full hover:text-white shadow-md bg-gray-400 hover:bg-orange-500 border-2 border-orange-500',
              slugify(categoryFilter) === slugify(category.categoryName)
                ? 'bg-orange-500 text-white'
                : 'text-orange-500'
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
