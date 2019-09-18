import Link from 'next/link'
import React, { useState } from 'react'

import Button from '../components/Button'
import CategoryTab from '../components/CategoryTab'
import '../components/Common.css'
import Layout from '../components/Layout'
import { getAllIdeas, getCategories, getIdeasPageContent } from '../Services/wordpressService'
import { Category, IdeasDesc, IdeasPageContent } from '../types/IdeasContent'

interface Props {
  ideasDescription: IdeasDesc[]
  categories: Category[]
  content: IdeasPageContent
}

const whiteBooks = [
  {
    id: 0,
    title: "Titre du livre blanc#1 qui s'affiche sur deux ou trois lignes",
    src: '',
  },
  {
    id: 1,
    title: "Titre du livre blanc#1 qui s'affiche sur deux ou trois lignes",
    src: '',
  },
  {
    id: 2,
    title: "Titre du livre blanc#1 qui s'affiche sur deux ou trois lignes",
    src: '',
  },
]

Ideas.getInitialProps = async () => {
  const ideas = await getAllIdeas()
  const categories = await getCategories()
  const content = await getIdeasPageContent()
  return {
    ideasDescription: ideas.map((idea: any) => ({
      id: idea.id,
      title: idea.title.rendered,
      category: idea._embedded['wp:term'][0][0].name,
      slug: idea.slug,
      descriptionText: idea.acf.idea_description,
      date: idea.date,
    })),
    content,
    categories: categories.map((category: any) => ({ categoryId: category.id, categoryName: category.name })),
  }
}

function compareIdeasByDate(idea1: IdeasDesc, idea2: IdeasDesc) {
  return new Date(idea2.date).getTime() - new Date(idea1.date).getTime()
}

export default function Ideas({ ideasDescription, categories, content }: Props) {
  const sortedIdeas = ideasDescription.sort(compareIdeasByDate)
  const [isOpenedMoreIdeas, setIsOpenedMoreIdeas] = useState(false)

  function handleToggleMoreIdeas() {
    setIsOpenedMoreIdeas(!isOpenedMoreIdeas)
  }

  return (
    <Layout headerProps={{ invertColors: false }}>
      <div>
        <div className="md:max-w-md mx-auto px-0 md:px-8">
          <div className="text-xs px-4 md:px-0">
            <span className="text-underline">Accueil</span> > <span className="text-underline">Idées</span>
          </div>
          <h1 className="text-center text-2xl py-8">{content.titre}</h1>
          <p className="md:max-w-md mx-auto text-center px-4 md:py-6 md:px-0 text-xs leading-normal">
            {content.description}
          </p>
          <CategoryTab ideasC={sortedIdeas} categories={categories} toggleMore={isOpenedMoreIdeas} />
          <Button
            className="flex flex-row justify-center uppercase rounded-full bg-orange text-xss py-2 px-6 text-white font-semibold mx-auto"
            onClick={handleToggleMoreIdeas}
          >
            {!isOpenedMoreIdeas ? "Voir plus d'idées" : 'Voir moins'}
          </Button>
        </div>

        <div className="text-center w-full mx-auto p-6 bg-grey my-8 blue-underline">
          <h2 className="text-2xl mt-4">Livres blancs</h2>
          <p className="text-xs md:max-w-md md:px-20 py-4 mx-auto">
            Curabitur et elit sed orci consequat dapibus a quis justo. Maecenas ornare fermentum congue. Cras eget ante
            orci. Nullam placerat lacus quam, non eleifend ligula faucibus vitae. Quisque faucibus vitae nibh sit arnet
            faucibus. Pellentesque sed.
          </p>
          <div className="my-4 md:my-8 flex flex-col md:flex-row justify-center md:max-w-md mx-auto">
            {whiteBooks.map(whiteBook => (
              <div key={whiteBook.id} className="mb-4 md:m-0">
                <div className="bg-black-light shadow-xl md:w-ideas h-40 md:h-32 mx-auto" />
                <h3 className="text-sm px-3 py-4">{whiteBook.title}</h3>
                <Link href="/white-paper">
                  <Button className="rounded-full uppercase text-white text-xss md:text-cgu font-semibold bg-orange px-8 py-3 md:px-6 md:py-2">
                    Télécharger
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
