import './tag.css'

import { Category, IdeasDesc } from '../types/IdeasContent'
import { getCategories, getIdeasByTag } from '../Services/wordpressService'

import CategoryTab from '../components/CategoryTab'
import Head from 'next/head'
import Layout from '../components/Layout'
import { NextPageContext } from 'next'
import React from 'react'
import publicRuntimeConfig from '../config/env.config'

interface Props {
  articles: IdeasDesc[]
  tag: string
  categories: Category[]
}

interface Context extends NextPageContext {
  query: { slug: string }
}

export default function Tag({ articles, categories, tag }: Props) {
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
              <h1 className="text-center text-3xl py-8  md:mt-12">{tag}</h1>
            </div>
          </div>

          <CategoryTab
            ideasC={articles.filter(
              (idea) => !idea.categories.includes('White-paper') && !idea.categories.includes('Jobs')
            )}
            categories={categories.filter(
              (category) => category.categoryName !== 'Jobs' && category.categoryName !== 'White-paper'
            )}
            toggleMore={true}
          />
        </>
      </Layout>
    </>
  )
}

Tag.getInitialProps = async ({ query }: Context) => {
  const { [0]: ideas, [1]: categories } = await Promise.all([getIdeasByTag(query.slug), getCategories()])
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
    categories: categories.map((category: any) => ({ categoryId: category.id, categoryName: category.name })),

    tag: query.slug.charAt(0).toUpperCase() + query.slug.slice(1),
  }
}
