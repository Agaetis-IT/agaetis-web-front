import { NextPageContext } from 'next'
import { CategoryAPI, PostAPI } from '../../models/IdeasAPI'
import { slugify } from '../../Services/textUtilities'
import {
  getIdeasByPage,
  getCategories,
  getIdeasPageContent,
  getAllWhitePapers,
  getIdeasByCategory,
} from '../../Services/wordpressService'
import { Category, IdeasDesc, IdeasPageContent, Response } from '../../types/IdeasContent'
import WhitePaper from '../../types/WhitePaper'
import Error from '../../pages/_error'
import Head from 'next/head'

interface Context extends NextPageContext {
  query: { categoryName: string }
}

import Blog from '../../components/Blog'
import React from 'react'
import publicRuntimeConfig from '../../config/env.config'

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

export default function blogcat({
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

export async function getServerSideProps({ query }: Context) {
  let selectedCategory = ''
  const { [0]: categories, [1]: content, [2]: whitepapers } = await Promise.all([
    getCategories(),
    getIdeasPageContent(),
    getAllWhitePapers(),
  ])
  let promiseResult: Response

  if (!query.categoryName) {
    promiseResult = await getIdeasByPage()
  } else {
    const names = categories
      .map((category: CategoryAPI) => slugify(category.name))
      .filter((name: string) => !name.includes('_offer-'))

    if (!names.includes(query.categoryName)) {
      return {
        props: {
          ideasDescription: [],
          whitePapers: [],
          categories: [],
          content: null,
          errorCode: 404,
        },
      }
    }

    selectedCategory = categories.filter((category: CategoryAPI) => category.slug == query.categoryName)[0].slug
    promiseResult = await getIdeasByCategory(selectedCategory)
  }

  return {
    props: {
      ideasDescription: promiseResult.data.map((idea: PostAPI) => ({
        id: idea.id,
        title: idea.title.rendered,
        categories: idea._embedded['wp:term'][0].map((category: { name: string }) => category.name),
        tags: [],
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
      selectedCategory: selectedCategory,
      hideSeeMore: promiseResult.pageCount <= 1,
    },
  }
}
