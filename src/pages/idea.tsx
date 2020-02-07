import clsx from 'clsx'
import { NextContext } from 'next'
import Error from 'next/error'
import React, { useMemo, useState } from 'react'

import Button from '../components/Button'
import IdeaContent from '../components/IdeaContent'
import IdeasCard from '../components/IdeasCard'
import Layout from '../components/Layout'
import { getIdeaBySlug } from '../Services/wordpressService'
import IdeasContent, { IdeasDesc } from '../types/IdeasContent'

interface Props {
  data: IdeasContent
  related: IdeasDesc[]
  errorCode?: number
}

Idea.getInitialProps = async ({ query }: NextContext) => {
  // tslint:disable-next-line
  const data = await getIdeaBySlug(query.slug)
  if (!!data.acf) {
    const related = []
    for (const idea of data.acf.related_ideas) {
      const data2 = await getIdeaBySlug(idea.post_name)
      related.push(data2)
    }

    return {
      data: {
        title: data.title.rendered,
        imageUrl: data.acf.idea_image || '',
        date: data.date,
        author: data._embedded.author[0].name,
        category: data._embedded['wp:term'][0][0].name,
        content: data.content.rendered,
      },
      related: related.map(idea => {
        return {
          title: idea.title.rendered,
          id: idea.id,
          date: idea.date,
          category: idea._embedded['wp:term'][0][0].name,
          slug: idea.slug,
          descriptionText: idea.acf.idea_description,
        }
      }),
    }
  }
  return {
    data: {
      title: '',
      imageUrl: '',
      date: '',
      author: '',
      category: '',
      content: '',
    },
    related: {
      title: '',
      id: '',
      date: '',
      category: '',
      slug: '',
      descriptionText: '',
    },
    errorCode: 404,
  }
}

export default function Idea({ data, related, errorCode }: Props) {
  const [isOpenedMoreIdeas, setIsOpenedMoreIdeas] = useState(false)
  function handleToggleMoreIdeas() {
    setIsOpenedMoreIdeas(!isOpenedMoreIdeas)
  }

  if (!!errorCode) {
    return <Error statusCode={404} />
  }
  const relatedIdeas = useMemo(
    () =>
      related.map(idea => (
        <div key={idea.id} className="md:w-1/3 px-2">
          <IdeasCard
            slug={idea.slug}
            id={idea.id}
            title={idea.title}
            category={idea.category}
            className="p-4 my-2 md:h-ideas bg-grey"
          >
            {idea.descriptionText}
          </IdeasCard>
        </div>
      )),
    related
  )

  return (
    <Layout>
      <div>
        <IdeaContent content={data} />
        {related.length > 0 && (
          <>
            <div className="pb-12 mb-8 blue-underline">
              <h2 className="text-center">Ces idées peuvent vous interesser</h2>

              <div className="md:max-w-md px-4 mt-8 mx-auto flex flex-col md:flex-row justify-center">
                {relatedIdeas.slice(0, 3)}
                {isOpenedMoreIdeas && relatedIdeas.slice(3)}
              </div>
              <Button
                onClick={handleToggleMoreIdeas}
                className={clsx(
                  related.length < 4 ? 'hidden' : 'flex',
                  'flex-row justify-center uppercase rounded-full bg-orange text-xss py-2 px-6 mt-8 text-white font-semibold mx-auto'
                )}
              >
                {!isOpenedMoreIdeas ? "Voir plus d'idées" : 'Voir moins'}
              </Button>
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}
