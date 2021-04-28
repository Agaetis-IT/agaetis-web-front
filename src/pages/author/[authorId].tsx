/* eslint-disable react-hooks/rules-of-hooks */
import Head from 'next/head'
import React, { useMemo, useState } from 'react'
import { NextPageContext } from 'next'
import publicRuntimeConfig from '../../config/env.config'

import Button from '../../components/Button'
import Layout from '../../components/Layout'
import LoadingSpinner from '../../components/LoadingSpinner'
import IdeasCard from '../../components/IdeasCard'
import ContactSection from '../../components/ContactSection'
import { getAuthorById, getAuthorPageContent, getIdeasByAuthor } from '../../Services/wordpressService'

import { PostAPI } from '../../models/IdeasAPI'
import { AuthorDescription, AuthorPageContent } from '../../types/AuthorContent'
import { IdeasDesc, Response } from '../../types/IdeasContent'

import Particles from '../../static/images/particles-3.svg'
import Linkedin from '../../static/icons/linkedin.png'
import Error from '../_error'

interface Props {
  ideasDescription: IdeasDesc[]
  author: AuthorDescription
  content: AuthorPageContent
  errorCode?: number
  hideSeeMore?: boolean
}

export default function author({ ideasDescription, author, content, errorCode, hideSeeMore }: Props) {
  const [ideas, setIdeas] = useState(ideasDescription)
  const [lastPage, setLastPage] = useState(1)
  const [isLoadingPosts, setIsLoadingPosts] = useState(false)
  const [isVisibleSeeMore, setIsVisibleSeeMore] = useState(!hideSeeMore && true)

  async function handleFetchIdeas() {
    setIsLoadingPosts(true)
    const page = lastPage + 1
    let data: IdeasDesc[] = []
    const newData: Response = await getIdeasByAuthor(author.id.toString(), page)

    data = newData.data
      .map((idea: PostAPI) => ({
        id: idea.id,
        title: idea.title.rendered,
        categories: idea._embedded['wp:term'][0].map((category: { name: string }) => category.name),
        tags: [],
        slug: idea.slug,
        descriptionText: idea.acf.idea_description,
        date: idea.date,
        image: idea.acf.idea_image,
      }))
      .filter((idea) => !idea.categories.includes('White-paper') && !idea.categories.includes('Jobs'))

    if (newData.pageCount > page) {
      setIsVisibleSeeMore(true)
    } else {
      setIsVisibleSeeMore(false)
    }

    setLastPage(page)
    setIdeas(ideas.concat(data))
    setIsLoadingPosts(false)
  }

  const cards = useMemo(() => {
    const source = ideas

    return source.map((idea) => {
      return (
        <div key={idea.id} className="m-2 mb-8 shadow-md hover:shadow-lg smooth-transition zoom-in round8">
          <IdeasCard slug={idea.slug} title={idea.title} image={idea.image} description={idea.descriptionText} />
        </div>
      )
    })
  }, [ideas])

  if (!!errorCode) {
    return <Error statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>Agaetis : articles de {'auteur'}</title>
        <meta property="og:title" content={`Agaetis : articles de ${'auteur'}`} />
        <meta property="og:image" content={`${publicRuntimeConfig.NEXT_APP_SITE_URL}/favicon.ico`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Chacun d'entre nous a ses idées et le droit de les défendre" />
        <meta name="description" content="Chacun d'entre nous a ses idées et le droit de les défendre" />
        <link rel="canonical" href={`${publicRuntimeConfig.NEXT_APP_SITE_URL}/author/${author.slug}`} />
      </Head>
      <Layout invertColors={false}>
        <div className="pt-0 md:pt-28">
          <div
            style={{
              backgroundImage: `url("${Particles}")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'left top',
              backgroundSize: 'contain',
            }}
            className="p-6 md:p-16 lg:px-32 xl:px-48 bg-light-grey"
          >
            <div className="mx-1 md:mx-2">
              <div>
                <h1 className="text-orange text-2xl font-bold" dangerouslySetInnerHTML={{ __html: content.titre }}></h1>
                <div>
                  <div className="flex flex-row items-center">
                    <img className="pt-6 mt-8 mb-8 round8 shadow-md" src={author.avatar} />
                    <p className="ml-4 text-xl leading-normal font-semibold">{author.name}</p>
                    {author.linkedInLink && (
                      <Button
                        href={author.linkedInLink}
                        className="w-6 h-6 ml-4 shadow-sm hover:shadow-md bg-white rounded-full smooth-transition p-1"
                      >
                        <img src={Linkedin} className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  {author.descriptionText && <p className="py-2 my-4">{author.descriptionText}</p>}
                </div>
                <p className="py-6 text-xl leading-normal mt-4 font-medium">{content.posts_description}</p>
              </div>
            </div>
            <div className="flex flex-row flex-wrap mt-2">{cards.length ? cards : 'Aucun résultat'}</div>
            {isVisibleSeeMore && (
              <Button
                className="flex flex-row justify-center uppercase rounded-full bg-orange text-xss py-2 px-6 text-white font-semibold mx-auto see-more shadow-md"
                onClick={() => handleFetchIdeas()}
              >
                {isLoadingPosts ? (
                  <div className="flex flex-row justify-center">
                    <LoadingSpinner color="#ffffff" size={12} />
                    Chargement
                  </div>
                ) : (
                  'Voir plus'
                )}
              </Button>
            )}
          </div>
          <ContactSection></ContactSection>
        </div>
      </Layout>
    </>
  )
}

interface Context extends NextPageContext {
  query: { authorId: string }
}

export async function getServerSideProps({ query }: Context) {
  const { [0]: author, [1]: content, [2]: posts } = await Promise.all([
    getAuthorById(query.authorId),
    getAuthorPageContent(),
    getIdeasByAuthor(query.authorId),
  ])

  return {
    props: {
      ideasDescription: posts.data.map((idea: PostAPI) => ({
        id: idea.id,
        title: idea.title.rendered,
        tags: [],
        slug: idea.slug,
        descriptionText: idea.acf.idea_description,
        date: idea.date,
        image: idea.acf.idea_image,
      })),
      author: {
        id: author.id,
        slug: author.slug,
        name: author.name,
        descriptionText: author.description,
        avatar: author.avatar_urls['96'],
        linkedInLink: author.url,
      },
      content,
      errorCode: author === undefined,
      hideSeeMore: posts.pageCount <= 1,
    },
  }
}
