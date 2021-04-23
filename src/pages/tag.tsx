import React, { useMemo, useState } from 'react'
import { IdeasDesc, Category } from '../types/IdeasContent'
import { NextPageContext } from 'next'
import { getIdeasByTag, getCategories } from '../Services/wordpressService'
import Head from 'next/head'
import publicRuntimeConfig from '../config/env.config'
import Layout from '../components/Layout'
import './tag.css'
import CategoryTab from '../components/CategoryTab'
import Link from 'next/link'
import LoadingSpinner from '../components/LoadingSpinner'
import IdeasCard from '../components/IdeasCard'
import { slugify } from '../Services/textUtilities'

interface Props {
  articles: IdeasDesc[]
  tag: string
  categories: Category[]
}

interface Context extends NextPageContext {
  query: { slug: string }
}

export default function Tag({ articles, categories, tag }: Props) {
  const [ideas, setIdeas] = useState(articles)
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [isLoadingPosts, setIsLoadingPosts] = useState(false)

  function applyFilters(data: IdeasDesc[], changedCategory?: string) {
    const catFilter = changedCategory ? changedCategory : categoryFilter

    return data.filter(
      (idea) =>
        !idea.categories.includes('White-paper') &&
        !idea.categories.includes('Jobs') &&
        (catFilter === 'All' || idea.categories.includes(catFilter) || idea.categories.includes(''))
    )
  }

  async function handleFetchIdeas(changedCategory?: string) {
    setIsLoadingPosts(true)
    const { [0]: newData } = await Promise.all([getIdeasByTag(tag)])

    setIdeas(
      applyFilters(
        newData.data.map((idea: any) => ({
          id: idea.id,
          title: idea.title.rendered,
          categories: idea._embedded['wp:term'][0].map((category: { name: string }) => category.name),
          slug: idea.slug,
          descriptionText: idea.acf.idea_description,
          date: idea.date,
          image: idea.acf.idea_image,
        })),
        changedCategory
      )
    )

    setIsLoadingPosts(false)
  }

  function handleFilterChange(category: string) {
    setCategoryFilter(category)
    window.history.replaceState({}, '', `/blog${category === 'All' ? '' : '/' + slugify(category)}`)
    handleFetchIdeas(category)
  }

  const cards = useMemo(() => {
    const source = ideas

    return source.map((idea) => {
      return (
        <div key={idea.id} className="w-full m-2 mb-8 shadow-md hover:shadow-lg smooth-transition zoom-in">
          <IdeasCard slug={idea.slug} title={idea.title} image={idea.image} description={idea.descriptionText} />
        </div>
      )
    })
  }, [ideas])

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
        <div className="mx-auto px-0">
          <div className=" p-0 md:p-12 lg:px-24 lg:p-16 pb-0">
            <div className="md:max-w-md mx-auto p-0 md:px-8 mt-0 md:mt-20 text-xs">
              <div className="text-xs px-4 md:px-0 ">
                <span>
                  <Link href="/">
                    <a className="text-underline text-black">Accueil</a>
                  </Link>

                  {' > '}
                  <Link href="/ideas">
                    <a className="text-underline text-black">Idées</a>
                  </Link>

                  {' > '}
                  <b>{tag}</b>
                </span>
              </div>
              <div className="md:max-w-md mx-auto md:px-8">
                <h1 className="text-center text-3xl py-8  md:mt-12">{tag}</h1>
              </div>
            </div>

            <CategoryTab
              categories={categories.filter(
                (category) => category.categoryName !== 'Jobs' && category.categoryName !== 'White-paper'
              )}
              categoryFilter={categoryFilter}
              handleFilterChange={handleFilterChange}
            />
            {isLoadingPosts ? (
              <div className="flex flex-row justify-center">
                <LoadingSpinner color="#ff7f40" size={18} />
                Chargement
              </div>
            ) : (
              <div className="invisible">-</div>
            )}
            <div className="flex flex-col md:max-w-lg sm:flex-row justify-center flex-wrap mt-2 md:p-8 mx-auto">
              {cards.length ? cards : 'Aucun résultat'}
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps({ query }: Context) {
  const { [0]: ideas, [1]: categories } = await Promise.all([getIdeasByTag(query.slug, 1), getCategories()])

  return {
    props: {
      articles: ideas.data.map((idea: any) => ({
        id: idea.id,
        title: idea.title.rendered,
        categories: idea._embedded['wp:term'][0].map((category: { name: string }) => category.name),
        slug: idea.slug,
        descriptionText: idea.acf.idea_description,
        date: idea.date,
        image: idea.acf.idea_image,
      })),
      categories: categories
        .map((category: any) => ({ categoryId: category.id, categoryName: category.name }))
        .filter((category: any) => !category.categoryName.includes('_offer-')),
      tag: query.slug.charAt(0).toUpperCase() + query.slug.slice(1),
    },
  }
}
