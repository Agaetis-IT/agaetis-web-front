import { NextContext } from 'next'
import React from 'react'

import IdeaContent from '../components/IdeaContent'
import IdeasCard from '../components/IdeasCard'
import Layout from '../components/Layout'
import { getIdeaBySlug } from '../Services/wordpressService'
import IdeasContent, { IdeasDesc } from '../types/IdeasContent'

interface Props {
  data: IdeasContent
  related: IdeasDesc[]
}

Idea.getInitialProps = async ({ query }: NextContext) => {
  // tslint:disable-next-line
  const data = await getIdeaBySlug(query.slug)
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
      related: data.acf.related_ideas || [],
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

export default function Idea({ data, related }: Props) {
  return (
    <Layout>
      <div>
        <IdeaContent content={data} />
        <div className="">
          <h2 className="text-center">Ces idées peuvent vous interesser</h2>
        </div>
        <div className="md:max-w-md mt-4 px-4 mx-auto flex flex-col md:flex-row justify-center">
          {related.map(idea => (
            <IdeasCard
              slug={idea.slug}
              key={idea.id}
              id={idea.id}
              title={idea.title}
              category={idea.category}
              className="bg-grey"
            >
              {idea.descriptionText}
            </IdeasCard>
          ))}
        </div>
      </div>
    </Layout>
  )
}
