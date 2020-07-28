import React from 'react'
import { IdeasDesc } from '../types/IdeasContent'
import { NextPageContext } from 'next'
import { getIdeasByTag } from '../Services/wordpressService'
import Head from 'next/head'
import publicRuntimeConfig from '../config/env.config'
import Layout from '../components/Layout'
import TagCard from '../components/TagCard'
import './tag.css'
interface Props {
  articles: IdeasDesc[]
  tag: string
}

interface Context extends NextPageContext {
  query: { slug: string }
}

export default function Tag({ articles, tag }: Props) {
  return (
    <>
      <Head>
        <title>{tag}</title>
        <meta property="og:title" content={`Agaetis - Tag:${tag}`} />
        <meta property="og:image" content={`${publicRuntimeConfig.NEXT_APP_SITE_URL}/favicon.ico`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={`Retrouvez ici tous nos articles en lien avec ${tag}`} />
        <meta name="description" content={`Retrouvez ici tous nos articles en lien avec ${tag}`} />
        <link rel="canonical" href={`${publicRuntimeConfig.NEXT_APP_SITE_URL}/tags/${tag.toLowerCase()}`} />
      </Head>
      <Layout invertColors={false}>
        <>
          <div className="md:max-w-md mx-auto text-xs px-4 md:px-8 ">
            <span>
              <a className="text-underline text-black" href="/">
                Accueil
              </a>
              {' > '}
              <a className="text-underline text-black" href="/ideas">
                Idées
              </a>
              {' > '}
              <b>{tag}</b>
            </span>
            <div className="md:max-w-md mx-auto md:px-8">
              <h1 className="text-center text-3xl py-8 md:pb-0 md:mt-12">{tag}</h1>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between flex-wrap my-4 md:my-12">
            {articles.map((idea) => (
              <TagCard
                key={idea.title}
                name={idea.title}
                description={idea.descriptionText}
                slug={idea.slug}
                category={idea.categories[0]}
                className="tag-card m-0 md:m-4"
              ></TagCard>
            ))}
          </div>
        </>
      </Layout>
    </>
  )
}

Tag.getInitialProps = async ({ query }: Context) => {
  const { [0]: ideas } = await Promise.all([getIdeasByTag(query.slug)])
  return {
    articles: ideas.map((idea: any) => ({
      id: idea.id,
      title: idea.title.rendered,
      categories: idea._embedded['wp:term'][0].map((category: { name: string }) => category.name),
      slug: idea.slug,
      descriptionText: idea.acf.idea_description,
      date: idea.date,
      image: idea.acf.idea_image,
    })),
    tag: query.slug.charAt(0).toUpperCase() + query.slug.slice(1),
  }
}
