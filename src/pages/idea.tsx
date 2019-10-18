import { NextContext } from 'next'
import React from 'react'

import IdeaContent from '../components/IdeaContent'
import Layout from '../components/Layout'
import { getIdeaBySlug } from '../Services/wordpressService'
import IdeasContent from '../types/IdeasContent'

interface Props {
  data: IdeasContent
}

Idea.getInitialProps = async ({ query }: NextContext) => {
  // tslint:disable-next-line
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
        <div className="">
          <h2 className="text-center">Ces idées peuvent vous interesser</h2>
        </div>
        <div className='className="flex flex-col md:flex-row"'>
          {data.related.map(idea => (
            <div key={idea.ID}>
              <h3 className="text-sm font-semibold">{idea.post_title}</h3>
              <p>{idea.post_excerpt}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
