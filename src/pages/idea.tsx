import { NextContext } from 'next'
import React from 'react'

import IdeaContent from '../components/IdeaContent'
import Layout from '../components/Layout'
import { getIdeaById } from '../Services/wordpressService'
import IdeasContent from '../types/IdeasContent'

interface Props {
  data: IdeasContent
}

idea.getInitialProps = async ({ query }: NextContext) => {
  const data = await getIdeaById(parseInt(query.id, 10))
  return {
    data: {
      title: data.title.rendered,
      imageUrl: data.acf.idea_image,
      date: data.date,
      author: data._embedded.author[0].name,
      category: data._embedded['wp:term'][0][0].name,
      content: data.content.rendered,
    },
  }
}

export default function idea({ data }: Props) {
  return (
    <Layout>
      <IdeaContent content={data} />
    </Layout>
  )
}
