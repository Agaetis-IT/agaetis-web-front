import { NextContext } from 'next'
import React from 'react'

import IdeaContent from '../components/IdeaContent'
import IdeasCard from '../components/IdeasCard'
import Layout from '../components/Layout'
import { getIdeaBySlug } from '../Services/wordpressService'
import IdeasContent from '../types/IdeasContent'

interface Props {
  data: IdeasContent
}

Idea.getInitialProps = async ({ query }: NextContext) => {
  const data = await getIdeaBySlug(query.slug)
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
  }
}

export default function Idea({ data }: Props) {
  return (
    <Layout>
      <div>
        <IdeaContent content={data} />
        {data.related.map(idea => (
          <IdeasCard slug={idea.slug} key={idea.id} id={idea.id} title={idea.title} category={idea.category}>
            {idea.descriptionText}
          </IdeasCard>
        ))}
      </div>
    </Layout>
  )
}
