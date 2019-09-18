import React, { useState } from 'react'

import Button from './Button'
import IdeasCard from './IdeasCard'

const ideas = [
  {
    id: 0,
    src: '../static/images/Ideas1.png',
    alt: 'Ideas1',
  },
  {
    id: 1,
    category: 'Catégorie A',
    title: 'Idée #1 avec un titre qui tient sur deux ou trois lignes',
    description:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores. Donec tincidunt quam augue, a facilisis tortor accumsan enean vel auctor.',
  },
  {
    id: 2,
    category: 'Catégorie B',
    title: 'Idée #2 avec un titre qui tient sur deux ou trois lignes',
    description:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores. Donec tincidunt quam augue, a facilisis tortor accumsan enean vel auctor.',
  },
  {
    id: 4,
    category: 'Catégorie A',
    title: 'Idée #3 avec un titre qui tient sur deux ou trois lignes',
    description:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores. Donec tincidunt quam augue, a facilisis tortor accumsan enean vel auctor.',
  },
  {
    id: 4,
    src: '../static/images/Ideas2.png',
    alt: 'Ideas2',
  },
  {
    id: 5,
    category: 'Catégorie C',
    title: 'Idée #4 avec un titre qui tient sur deux ou trois lignes',
    description:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores. Donec tincidunt quam augue, a facilisis tortor accumsan enean vel auctor.',
  },
  {
    id: 6,
    category: 'Catégorie C',
    title: 'Idée #5 avec un titre qui tient sur deux ou trois lignes',
    description:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores. Donec tincidunt quam augue, a facilisis tortor accumsan enean vel auctor.',
  },
  {
    id: 7,
    category: 'Catégorie A',
    title: 'Idée #6 avec un titre qui tient sur deux ou trois lignes',
    description:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores. Donec tincidunt quam augue, a facilisis tortor accumsan enean vel auctor.',
  },
  {
    id: 8,
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
        <Button
          className="bg-blue mx-2 p-2 text-white uppercase font-semibold rounded-sm"
          onClick={handleFilterChange('All')}
        >
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
      <div className="flex flex-col md:flex-row justify-center flex-wrap mt-2">
        {ideas.map(idea =>
          idea.src ? (
            <img
              key={idea.id}
              src={idea.src}
              alt={idea.alt}
              className="mx-auto md:mx-0 shadow-xl w-ideas md:mx-1 my-2 h-ideas"
            />
          ) : (
            <IdeasCard key={idea.id} id={idea.id} title={idea.title} category={idea.category}>
              {idea.description}
            </IdeasCard>
          )
        )}
      </div>
    </div>
  )
}
