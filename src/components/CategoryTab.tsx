import clsx from 'clsx'
import React, { useMemo, useState } from 'react'

import { Category, IdeasDesc } from '../types/IdeasContent'

import Button from './Button'
import IdeasCard from './IdeasCard'

interface Props {
  ideasC: IdeasDesc[]
  categories: Category[]
  toggleMore: boolean
  ideasImg1: string
  ideasImg2: string
}

function getBgColor(id: number, category: string) {
  if (id === 0 || id === 4) {
    return ''
  } else if ((id === 1 || id === 5) && category === 'All') {
    return 'bg-white'
  } else if (id === 6 && category === 'All') {
    return 'bg-teal'
  } else if (id === 7 && category === 'All') {
    return 'bg-pink'
  } else {
    return 'bg-light-grey'
  }
}

export default function CategoryTab({ ideasC, categories, toggleMore, ideasImg1, ideasImg2 }: Props) {
  const [categoryFilter, setFilter] = useState('All')
  const fakeIdea1 = {
    id: -1,
    slug: '',
    title: '',
    category: '',
    descriptionText: '',
    date: '',
    image: ideasImg1,
  }
  const fakeIdea2 = {
    id: -2,
    slug: '',
    title: '',
    category: '',
    descriptionText: '',
    date: '',
    image: ideasImg2,
  }
  if (!ideasC.find((idea: IdeasDesc) => idea.id === -1)) {
    ideasC.splice(0, 0, fakeIdea1)
  }
  if (!ideasC.find((idea: IdeasDesc) => idea.id === -2)) {
    ideasC.splice(4, 0, fakeIdea2)
  }
  const filteredIdeas = useMemo(
    () =>
      ideasC
        .filter(idea => categoryFilter === 'All' || idea.category === categoryFilter)
        .map(idea => (
          <div key={idea.id} className="md:w-1/3 px-1">
            <IdeasCard
              className={clsx(
                'p-4 my-2 md:h-ideas',
                { 'shadow-xl w-auto md:h-ideas hidden md:block': idea.image !== undefined },
                getBgColor(ideasC.indexOf(idea), categoryFilter)
              )}
              {...idea}
            >
              {idea.descriptionText}
            </IdeasCard>
          </div>
        )),
    [categoryFilter]
  )

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
        {filteredIdeas.slice(0, 9)}
        {toggleMore && filteredIdeas.slice(9)}
      </div>
    </div>
  )
}
