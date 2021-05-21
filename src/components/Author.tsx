/* eslint-disable react-hooks/rules-of-hooks */
import Head from 'next/head'
import React, { useMemo, useState } from 'react'
import publicRuntimeConfig from '../config/env.config'

import Button from './Button'
import Layout from './Layout'
import LoadingSpinner from './LoadingSpinner'
import IdeasCard from './IdeasCard'
import ContactSection from './ContactSection'

import { AuthorDescription, AuthorPageContent } from '../types/AuthorContent'
import { IdeasDesc, Response } from '../types/IdeasContent'
import { getIdeasByAuthor } from '../Services/wordpressService'
import { PostAPI } from '../models/IdeasAPI'

import Particles from '../static/images/particles-3.svg'
import Linkedin from '../static/icons/linkedin.png'
import Error from '../pages/_error'
import SnackBar from './SnackBar'

import styles from './Common.module.css'

interface Props {
  ideasDescription: IdeasDesc[]
  author: AuthorDescription
  content: AuthorPageContent
  errorCode?: number
  hasMore: boolean
}

export default function Author({ ideasDescription, author, content, errorCode, hasMore }: Props) {
  const [postModalOpen, setPostModalOpen] = useState<boolean | undefined>(undefined)
  const [ideas, setIdeas] = useState(ideasDescription)
  const [lastPage, setLastPage] = useState(1)
  const [isLoadingPosts, setIsLoadingPosts] = useState(false)
  const [isVisibleSeeMore, setIsVisibleSeeMore] = useState(hasMore)

  function handleOpenPostModal() {
    setPostModalOpen(true)
  }

  function handleClosePostModal() {
    setPostModalOpen(undefined)
  }

  async function handleFetchIdeas() {
    setIsLoadingPosts(true)
    const page = lastPage + 1
    let data: IdeasDesc[] = []

    try {
      const newData: Response = await getIdeasByAuthor(author.id.toString(), page)

      if (newData) {
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

        setIsVisibleSeeMore(newData.pageCount > page)
        setLastPage(page)
        setIdeas(ideas.concat(data))
      }
    } catch (error) {
      handleOpenPostModal()
    }

    setIsLoadingPosts(false)
  }

  const cards = useMemo(
    () =>
      ideas.map((idea) => (
        <div
          key={idea.id}
          className={`m-2 mb-8 shadow-md hover:shadow-lg ${styles.smoothTransition} ${styles.zoomIn} ${styles.round8} ${styles.wInherit}`}
        >
          <IdeasCard slug={idea.slug} title={idea.title} image={idea.image} description={idea.descriptionText} />
        </div>
      )),
    [ideas]
  )

  if (!!errorCode) {
    return <Error statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>Agaetis : articles de {author.name}</title>
        <meta property="og:title" content={`Agaetis : articles de ${author.name}`} />
        <meta property="og:image" content={`${publicRuntimeConfig.NEXT_APP_SITE_URL}/favicon.ico`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={`Découvrez tous les articles de ${author.name}`} />
        <meta name="description" content={`Découvrez tous les articles de ${author.name}`} />
        <link rel="canonical" href={`${publicRuntimeConfig.NEXT_APP_SITE_URL}/author/${author.id}`} />
      </Head>
      <Layout invertColors={false}>
        <div className="pt-0 md:pt-28">
          <div
            style={{
              backgroundImage: `url("${Particles}")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'left top',
              backgroundSize: '100%',
            }}
            className="p-6 md:p-16 lg:px-32 xl:px-48 bg-gray-400"
          >
            <div className="mx-1 md:mx-2">
              <div>
                <h1
                  className="text-orange-500 text-2xl font-bold leading-normal"
                  dangerouslySetInnerHTML={{ __html: content.titre }}
                ></h1>
                <div>
                  <div className="flex flex-row items-center">
                    <img className={`my-8 ${styles.round8} shadow-md`} src={author.avatar} />
                    <p className="ml-4 text-xl leading-normal font-semibold">{author.name}</p>
                    {author.linkedInLink && (
                      <Button
                        href={author.linkedInLink}
                        className={`w-6 h-6 ml-4 shadow-sm hover:shadow-md bg-white rounded-full ${styles.smoothTransition} p-1`}
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
            <div className="flex flex-row flex-wrap mt-2 w-full justify-center">
              {cards.length ? cards : 'Aucun résultat'}
            </div>
            {isVisibleSeeMore && (
              <Button
                className="flex flex-row justify-center uppercase rounded-full bg-orange-500 text-xss leading-normal py-2 px-6 text-white font-semibold mx-auto shadow-md"
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
          <SnackBar
            message="Erreur pendant le chargement des posts"
            isError
            open={postModalOpen}
            onClose={handleClosePostModal}
          />
          <ContactSection />
        </div>
      </Layout>
    </>
  )
}
