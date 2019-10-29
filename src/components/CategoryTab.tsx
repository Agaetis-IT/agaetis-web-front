import clsx from 'clsx'
import React, { useState } from 'react'

import { Category, IdeasDesc } from '../types/IdeasContent'

import Button from './Button'
import IdeasCard from './IdeasCard'

interface Props {
  ideasC: IdeasDesc[]
  categories: Category[]
  toggleMore: boolean
}

export default function CategoryTab({ ideasC, categories, toggleMore }: Props) {
  const [categoryFilter, setFilter] = useState('All')

  function handleFilterChange(category: string) {
    return () => {
      setFilter(category)
    }
  }

  return (
    <div className="flex flex-col justify-center md:max-w-md mx-auto px-2 py-6 md:p-6">
      <div className="text-cgu ml-2">
        <Button
          className={clsx(
            'uppercase font-semibold mx-2 p-2',
            categoryFilter === 'All' ? 'bg-blue text-white rounded-sm' : 'underline text-blue font-semibold'
          )}
          onClick={handleFilterChange('All')}
        >
          Toutes
        </Button>
        {categories.map(category => (
          <Button
            key={category.categoryId}
            className={clsx(
              'uppercase font-semibold mx-1 md:mx-2 p-2',
              category.categoryName === categoryFilter
                ? 'bg-blue  text-white rounded-sm'
                : 'underline text-blue font-semibold'
            )}
            onClick={handleFilterChange(category.categoryName)}
          >
            {category.categoryName}
          </Button>
        ))}
      </div>
      <div className="flex flex-col md:flex-row justify-center flex-wrap mt-2">
        {ideasC

          .filter(idea => categoryFilter === 'All' || idea.category === categoryFilter)
          .map(idea => (
            <IdeasCard slug={idea.slug} key={idea.id} id={idea.id} title={idea.title} category={idea.category}>
              {idea.descriptionText}
            </IdeasCard>
          ))
          .slice(0, 1)}
        {toggleMore &&
          ideasC

            .filter(idea => categoryFilter === 'All' || idea.category === categoryFilter)
            .map(idea => (
              <IdeasCard slug={idea.slug} key={idea.id} id={idea.id} title={idea.title} category={idea.category}>
                {idea.descriptionText}
              </IdeasCard>
            ))
            .slice(1)}
      </div>
    </div>
  )
}
