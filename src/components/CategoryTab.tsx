import clsx from 'clsx'
import React, { useMemo, useState } from 'react'

import { Category, IdeasDesc } from '../types/IdeasContent'

import Button from './Button'
import IdeasCard from './IdeasCard'
import './CategoryTab.css'

interface Props {
  ideasC: IdeasDesc[]
  categories: Category[]
  toggleMore: boolean
  ideasImg1?: string
  ideasImg2?: string
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

function getBgColor(category: string) {
  if (category === 'Agaetis' || category === 'Evènements') {
    return 'bg-orange hover:bg-orange'
  } else if (category === 'Stratégie SI') {
    return 'hover:bg-blue bg-blue'
  } else if (category === 'Data') {
    return 'hover:bg-teal bg-teal'
  } else if (category === 'Service Design') {
    return 'hover:bg-light-pink bg-light-pink'
  } else if (category === 'Technologie') {
    return 'hover:bg-yellow bg-yellow'
  }
  return 'hover:bg-grey bg-grey'
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
    tags: [],
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
    tags: [],
    descriptionText: '',
    date: '',
    image: ideasImg2,
  }

  const filteredIdeas = useMemo(() => {
    const ideas = ideasC.filter(
      (idea) => categoryFilter === 'All' || idea.categories.includes(categoryFilter) || idea.categories.includes('')
    )

    if (ideasImg1 && !ideas.find((idea: IdeasDesc) => idea.id === -1)) {
      ideas.splice(0, 0, fakeIdea1)
    }
    if (ideasImg2 && !ideas.find((idea: IdeasDesc) => idea.id === -2)) {
      ideas.splice(7, 0, fakeIdea2)
    }
    return ideas.map((idea) => (
      <div key={idea.id} className={clsx(ideas.length > 2 ? 'sm:w-1/3' : 'sm:w-1/2', ' px-1')}>
        <IdeasCard
          className={clsx(
            'my-2 sm:h-ideas ',
            { 'shadow-xl sm:h-ideas hidden sm:block idea-card': idea.id < 0 },
            { [getBgColor(idea.categories[0])]: idea.id > 0 }
          )}
          {...idea}
          categories={idea.categories.filter((category) => !category.includes('_offer-'))}
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
      <div className="text-xs mx-auto">
        <Button
          className={clsx(
            'uppercase font-semibold mx-2 p-2 hover:text-white all',
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
              'uppercase font-semibold mx-1 md:mx-2 p-2 rounded-sm',
              'hover:text-white',
              slugify(category.categoryName),
              category.categoryName === categoryFilter
                ? getBgColor(category.categoryName) + ' text-white rounded-sm'
                : 'underline text-blue font-semibold'
            )}
            onClick={handleFilterChange(category.categoryName)}
          >
            {category.categoryName}
          </Button>
        ))}
      </div>
      <div className="flex flex-col md:max-w-lg sm:flex-row justify-center flex-wrap mt-2 md:p-8 mx-auto">
        {filteredIdeas.slice(0, 9)}
        {toggleMore && filteredIdeas.slice(9)}
      </div>
    </div>
  )
}
