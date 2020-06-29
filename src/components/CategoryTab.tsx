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
    return 'bg-light-grey md:bg-white'
  } else if (id === 6 && category === 'All') {
    return 'bg-light-grey md:bg-teal'
  } else if (id === 7 && category === 'All') {
    return 'bg-light-grey md:bg-pink'
  } else {
    return 'bg-light-grey'
  }
}

function createMarkup(content: string) {
  return { __html: content }
}

export default function CategoryTab({ ideasC, categories, toggleMore, ideasImg1, ideasImg2 }: Props) {
  const [categoryFilter, setFilter] = useState('All')
  const fakeIdea1 = {
    id: -1,
    slug: '',
    title: '',
    category: '',
    categories: [''],
    tags: [''],
    descriptionText: '',
    date: '',
    image: ideasImg1,
  }
  const fakeIdea2 = {
    id: -2,
    slug: '',
    title: '',
    category: '',
    categories: [''],
    tags: [''],
    descriptionText: '',
    date: '',
    image: ideasImg2,
  }

  const filteredIdeas = useMemo(() => {
    const ideas = ideasC.filter(
      (idea) => categoryFilter === 'All' || idea.categories.includes(categoryFilter) || idea.categories.includes('')
    )

    if (!ideas.find((idea: IdeasDesc) => idea.id === -1)) {
      ideas.splice(0, 0, fakeIdea1)
    }
    if (!ideas.find((idea: IdeasDesc) => idea.id === -2)) {
      ideas.splice(7, 0, fakeIdea2)
    }
    return ideas.map((idea) => (
      <div key={idea.id} className="sm:w-1/3 lg:w-1/4 xl:w-1/5 px-1">
        <IdeasCard
          className={clsx(
            'my-2 sm:h-ideas lg:h-ideas-lg xl:h-64',
            { 'shadow-xl w-auto sm:h-ideas lg:h-ideas-lg xl:h-64 hidden sm:block': idea.image !== undefined },
            getBgColor(ideas.indexOf(idea), categoryFilter)
          )}
          {...idea}
        >
          <p dangerouslySetInnerHTML={createMarkup(idea.descriptionText)} />
        </IdeasCard>
      </div>
    ))
  }, [categoryFilter, fakeIdea1, fakeIdea2, ideasC])

  function handleFilterChange(category: string) {
    return () => {
      setFilter(category)
    }
  }

  return (
    <div className="flex flex-col justify-center md:max-w-full mx-auto px-2 py-6 md:p-6 xl:px-12">
      <div className="text-xs ml-2">
        <Button
          className={clsx(
            'uppercase font-semibold mx-2 p-2',
            categoryFilter === 'All' ? 'bg-blue text-white rounded-sm' : 'underline text-blue font-semibold'
          )}
          onClick={handleFilterChange('All')}
        >
          Toutes
        </Button>
        {categories.map((category) => (
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
      <div className="flex flex-col sm:flex-row justify-center flex-wrap mt-2 md:p-8">
        {filteredIdeas.slice(0, 9)}
        {toggleMore && filteredIdeas.slice(9)}
      </div>
    </div>
  )
}
