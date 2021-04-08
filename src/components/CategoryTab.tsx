import clsx from 'clsx'
import React, { useMemo, useState } from 'react'

import { Category, IdeasDesc } from '../types/IdeasContent'

import Button from './Button'
import IdeasCard from './IdeasCard'
import './CategoryTab.css'

interface Props {
  ideasC: IdeasDesc[]
  categories: Category[]
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
    return 'bg-orange'
  } else if (category === 'Stratégie SI') {
    return 'bg-blue'
  } else if (category === 'Data') {
    return 'bg-teal'
  } else if (category === 'Service Design') {
    return 'bg-light-pink'
  } else if (category === 'Technologie') {
    return 'bg-yellow'
  } else if (category === 'Agilité') {
    return 'bg-light-purple'
  } else if (category === 'Business Hacking') {
    return 'bg-red-lighter'
  }
  return 'bg-grey'
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

function createMarkup(content: string) {
  return { __html: content }
}

export default function CategoryTab({ ideasC, categories, ideasImg1, ideasImg2 }: Props) {
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
    return ideas.map((idea) => {
      return (
        <div key={idea.id} className={clsx(ideas.length > 2 ? 'sm:w-1/3' : 'sm:w-1/2', ' p-2')}>
          <IdeasCard
            className={clsx(
              { 'shadow-xl hidden sm:block': idea.id < 0 },
              { [getBgColor(idea.categories.filter((category) => !category.includes('_offer-'))[0])]: idea.id > 0 }
            )}
            {...idea}
            categories={idea.categories.filter((category) => !category.includes('_offer-'))}
          >
            <p dangerouslySetInnerHTML={createMarkup(idea.descriptionText)} />
          </IdeasCard>
        </div>
      )
    })
  }, [categoryFilter, fakeIdea1, fakeIdea2, ideasC])

  function handleFilterChange(category: string) {
    return () => {
      setFilter(category)
    }
  }

  return (
    <div className="flex flex-col justify-center md:max-w-full mx-auto px-2 py-6 md:p-6 xl:px-12">
      <div className="text-xs mx-auto flex flex-row flex-wrap justify-center">
        <Button
          className={clsx(
            'uppercase font-semibold my-2 mx-2 p-2 hover:text-white all rounded-full blue-border-thin',
            categoryFilter === 'All' ? 'bg-blue text-white' : 'blue-border-thin text-blue'
          )}
          onClick={handleFilterChange('All')}
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
            onClick={handleFilterChange(category.categoryName)}
          >
            {category.categoryName}
          </Button>
        ))}
      </div>
      <div className="flex flex-col md:max-w-lg sm:flex-row justify-center flex-wrap mt-2 md:p-8 mx-auto">
        {filteredIdeas}
      </div>
    </div>
  )
}
