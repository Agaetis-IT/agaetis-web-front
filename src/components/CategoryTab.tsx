import clsx from 'clsx'
import React, { useState } from 'react'

import { Category, IdeasDesc } from '../types/IdeasContent'

import Button from './Button'
import IdeasCard from './IdeasCard'

interface Props {
  ideasC: IdeasDesc[]
  categories: Category[]
}
/*
const ideas = [
  {
    id: 0,
    category: 'img',
    src: '../static/images/Ideas1.png',
    title: 'Ideas1',
    description: '',
    slug: 'test',
  },
  {
    id: 1,
    category: 'Catégorie A',
    title: 'Idée #1 avec un titre qui tient sur deux ou trois lignes',
    description:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores. Donec tincidunt quam augue, a facilisis tortor accumsan enean vel auctor.',
    slug: 'test',
  },
  {
    id: 2,
    category: 'Catégorie B',
    title: 'Idée #2 avec un titre qui tient sur deux ou trois lignes',
    description:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores. Donec tincidunt quam augue, a facilisis tortor accumsan enean vel auctor.',
    slug: 'test',
  },
  {
    id: 3,
    category: 'Catégorie A',
    title: 'Idée #3 avec un titre qui tient sur deux ou trois lignes',
    description:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores. Donec tincidunt quam augue, a facilisis tortor accumsan enean vel auctor.',
    slug: 'test',
  },
  {
    id: 4,
    src: '../static/images/Ideas2.png',
    title: 'Ideas2',
    category: 'img',
    description: '',
    slug: 'test',
  },
  {
    id: 5,
    category: 'Catégorie C',
    title: 'Idée #4 avec un titre qui tient sur deux ou trois lignes',
    description:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores. Donec tincidunt quam augue, a facilisis tortor accumsan enean vel auctor.',
    slug: 'test',
  },
  {
    id: 6,
    category: 'Catégorie C',
    title: 'Idée #5 avec un titre qui tient sur deux ou trois lignes',
    description:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores. Donec tincidunt quam augue, a facilisis tortor accumsan enean vel auctor.',
    slug: 'test',
  },
  {
    id: 7,
    category: 'Catégorie A',
    title: 'Idée #6 avec un titre qui tient sur deux ou trois lignes',
    description:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores. Donec tincidunt quam augue, a facilisis tortor accumsan enean vel auctor.',
    slug: 'test',
  },
  {
    id: 8,
    category: 'Catégorie B',
    title: 'Idée #7 avec un titre qui tient sur deux ou trois lignes',
    description:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores. Donec tincidunt quam augue, a facilisis tortor accumsan enean vel auctor.',
    slug: 'test',
  },
]*/

export default function CategoryTab({ ideasC, categories }: Props) {
  const [categoryFilter, setFilter] = useState('All')

  function handleFilterChange(category: string) {
    return () => {
      setFilter(category)
    }
  }

  return (
    <div className="flex flex-col justify-center md:max-w-md mx-auto p-6">
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
              'uppercase font-semibold mx-2 p-2',
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
          ))}
      </div>
    </div>
  )
}
