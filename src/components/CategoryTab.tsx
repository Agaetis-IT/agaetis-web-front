import React, { useState } from 'react'

import Button from './Button'
import IdeasCard from './IdeasCard'

const ideas = [
  {
    id: 0,
    category: 'Catégorie A',
    title: 'Idée #1 avec un titre qui tient sur deux ou trois lignes',
    description:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores. Donec tincidunt quam augue, a facilisis tortor accumsan enean vel auctor.',
  },
  {
    id: 1,
    category: 'Catégorie B',
    title: 'Idée #2 avec un titre qui tient sur deux ou trois lignes',
    description:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores. Donec tincidunt quam augue, a facilisis tortor accumsan enean vel auctor.',
  },
  {
    id: 2,
    category: 'Catégorie A',
    title: 'Idée #3 avec un titre qui tient sur deux ou trois lignes',
    description:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores. Donec tincidunt quam augue, a facilisis tortor accumsan enean vel auctor.',
  },
  {
    id: 3,
    category: 'Catégorie C',
    title: 'Idée #4 avec un titre qui tient sur deux ou trois lignes',
    description:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores. Donec tincidunt quam augue, a facilisis tortor accumsan enean vel auctor.',
  },
  {
    id: 4,
    category: 'Catégorie C',
    title: 'Idée #5 avec un titre qui tient sur deux ou trois lignes',
    description:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores. Donec tincidunt quam augue, a facilisis tortor accumsan enean vel auctor.',
  },
  {
    id: 5,
    category: 'Catégorie A',
    title: 'Idée #6 avec un titre qui tient sur deux ou trois lignes',
    description:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores. Donec tincidunt quam augue, a facilisis tortor accumsan enean vel auctor.',
  },
  {
    id: 6,
    category: 'Catégorie B',
    title: 'Idée #7 avec un titre qui tient sur deux ou trois lignes',
    description:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores. Donec tincidunt quam augue, a facilisis tortor accumsan enean vel auctor.',
  },
]

export default function CategoryTab() {
  const [categoryFilter, setFilter] = useState('All')

  function handleFilterChange(category: string) {
    return () => {
      setFilter(category)
    }
  }

  return (
    <div className="flex flex-col justify-center md:max-w-md mx-auto p-6">
      <div className="text-cgu">
        <Button className="bg-blue mx-2 p-2 text-white uppercase font-semibold" onClick={handleFilterChange('All')}>
          Toutes
        </Button>
        <Button
          className="mx-2 uppercase underline text-blue font-semibold"
          onClick={handleFilterChange('Catégorie A')}
        >
          Catégorie A
        </Button>
        <Button
          className="mx-2 uppercase underline text-blue font-semibold"
          onClick={handleFilterChange('Catégorie B')}
        >
          Catégorie B
        </Button>
        <Button
          className="mx-2 uppercase underline text-blue font-semibold"
          onClick={handleFilterChange('Catégorie C')}
        >
          Catégorie C
        </Button>
      </div>
      <div className="flex flex-row flex-wrap">
        {ideas
          .filter(idea => categoryFilter === 'All' || idea.category === categoryFilter)
          .map(idea => (
            <IdeasCard key={idea.id} title={idea.title} category={idea.category}>
              {idea.description}
            </IdeasCard>
          ))}
      </div>
    </div>
  )
}
