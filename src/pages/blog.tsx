import { CategoryAPI, PostAPI } from '../models/IdeasAPI'
import { getIdeasByPage, getCategories, getIdeasPageContent, getAllWhitePapers } from '../Services/wordpressService'
import WhitePaper from '../types/WhitePaper'
import Head from 'next/head'
import React from 'react'

import publicRuntimeConfig from '../config/env.config'
import { Category, IdeasDesc, IdeasPageContent } from '../types/IdeasContent'
import Error from '../pages/_error'

import Blog from '../components/Blog'

interface Props {
  ideasDescription: IdeasDesc[]
  categories: Category[]
  content: IdeasPageContent
  whitePapers: WhitePaper[]
  errorCode?: number
  selectedCategory?: string
  tagFilter?: string
  hideSeeMore?: boolean
}

export default function blog({
  ideasDescription,
  whitePapers,
  categories,
  content,
  errorCode,
  selectedCategory,
  tagFilter,
  hideSeeMore,
}: Props) {
  if (!!errorCode) {
    return <Error statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>Agaetis : nos idées</title>
        <meta property="og:title" content="Agaetis : nos idées" />
        <meta property="og:image" content={`${publicRuntimeConfig.NEXT_APP_SITE_URL}/favicon.ico`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Chacun d'entre nous a ses idées et le droit de les défendre" />
        <meta name="description" content="Chacun d'entre nous a ses idées et le droit de les défendre" />
        <link rel="canonical" href={`${publicRuntimeConfig.NEXT_APP_SITE_URL}/blog`} />
      </Head>
      <Blog
        ideasDescription={ideasDescription}
        whitePapers={whitePapers}
        categories={categories}
        content={content}
        selectedCategory={selectedCategory}
        tagFilter={tagFilter}
        hideSeeMore={hideSeeMore}
      />
    </>
  )
}

export async function getServerSideProps() {
  const { [0]: ideas, [1]: categories, [2]: content, [3]: whitepapers } = await Promise.all([
    getIdeasByPage(),
    getCategories(),
    getIdeasPageContent(),
    getAllWhitePapers(),
  ])

  return {
    props: {
      ideasDescription: ideas.data.map((idea: PostAPI) => ({
        id: idea.id,
        title: idea.title.rendered,
        categories: idea._embedded['wp:term'][0].map((category: { name: string }) => category.name),
        slug: idea.slug,
        descriptionText: idea.acf.idea_description,
        date: idea.date,
        image: idea.acf.idea_image,
      })),
      whitePapers:
        whitepapers && whitepapers.length > 0
          ? whitepapers.map((whitepaper: { slug: string; acf: WhitePaper }) => ({
              slug: whitepaper.slug,
              ...whitepaper.acf,
            }))
          : [],
      content,
      categories: categories
        .map((category: CategoryAPI) => ({ categoryId: category.id, categoryName: category.name }))
        .filter((category: Category) => !category.categoryName.includes('_offer-')),
      hideSeeMore: ideas.pageCount == 1,
      tagFilter: null,
    },
  }
}
