/* eslint-disable react-hooks/rules-of-hooks */
import { useMemo, useState } from 'react'
import Head from 'next/head'

import Button from './Button'
import ContactSection from './ContactSection'
import Error from '../pages/_error'
import Layout from './Layout'
import LoadingSpinner from './LoadingSpinner'
import PostCard from './PostCard'
import SnackBar from './SnackBar'

import { AuthorDescription, AuthorPageAPI } from '../models/AuthorAPI'
import { getPostsByAuthor } from '../services/wordpressService'
import { PostDesc, Response } from '../types/PostPageContent'
import { PostAPI } from '../models/PostAPI'

const Particles = '/images/particles-3.svg'
const Linkedin = '/icons/linkedin.png'

interface Props {
  ideasDescription: PostDesc[]
  author: AuthorDescription
  content: AuthorPageAPI
  hasMore: boolean
  errorCode?: number
}

export default function Author({ ideasDescription, author, content, hasMore, errorCode }: Props) {
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
    let data: PostDesc[] = []

    try {
      const newData: Response = await getPostsByAuthor(author.id.toString(), page)

      if (newData) {
        data = newData.data
          .map((idea: PostAPI) => ({
            id: idea.id,
            title: idea.title.rendered,
            categories: idea._embedded['wp:term'][0].map((category: { name: string }) => category.name),
            tags: [],
            slug: idea.slug,
            descriptionText: idea.acf.description,
            date: idea.date,
            image:
              (idea._embedded['wp:featuredmedia'] &&
                idea._embedded['wp:featuredmedia'][0] &&
                idea._embedded['wp:featuredmedia'][0].source_url) ||
              '',
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
          className="m-2 mb-8 shadow-md hover:shadow-lg transition-all duration-250 transform hover:scale-102 rounded-lg w-inherit"
        >
          <PostCard slug={idea.slug} title={idea.title} image={idea.image} description={idea.descriptionText} />
        </div>
      )),
    [ideas]
  )

  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return (
    <>
      <Head>
        <title>Agaetis - Articles de {author.name}</title>
        <meta property="og:title" content={`Agaetis - Articles de ${author.name}`} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}/author/${author.id}`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/favicon.ico`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={`Découvrez tous les articles de ${author.name}`} />
        <meta name="description" content={`Découvrez tous les articles de ${author.name}`} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/author/${author.id}`} />
      </Head>
      <Layout displayedPage={'/blog'}>
        <div className="pt-0 md:pt-17">
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
                <div>
                  <div className="mb-8 flex flex-row items-center">
                    <img
                      className="rounded-lg shadow-md"
                      src={author.avatar}
                      width={96}
                      height={96}
                      title={`Photo de l'auteur ${author.name}`}
                      alt={`Photo de l'auteur ${author.name}`}
                      loading="lazy"
                    />
                    <h1 className="ml-4 text-xl leading-normal font-semibold">{author.name}</h1>
                    {author.linkedInLink && (
                      <Button
                        href={author.linkedInLink}
                        className="w-6 h-6 ml-4 shadow-sm hover:shadow-md bg-white rounded-full transition-all duration-250 p-1 text-none"
                      >
                        <img
                          src={Linkedin}
                          className="w-4 h-4"
                          title="Profil LinkedIn"
                          alt="Profil LinkedIn"
                          width={16}
                          height={16}
                          loading="lazy"
                        />
                      </Button>
                    )}
                  </div>
                  {author.descriptionText && <p className="py-2 my-4">{author.descriptionText}</p>}
                </div>
                <h2 className="py-6 text-xl leading-normal mt-4 font-medium">{content.postsDescription}</h2>
              </div>
            </div>
            <div className="flex flex-row flex-wrap mt-2 w-full justify-center">
              {cards.length ? cards : 'Aucun résultat'}
            </div>
            {isVisibleSeeMore && (
              <Button
                className="flex flex-row justify-center uppercase rounded-full bg-orange-500 hover:bg-orange-400 text-xss leading-normal py-2 px-6 text-white font-semibold mx-auto shadow-md hover:shadow-lg transition-all duration-250"
                onClick={() => handleFetchIdeas()}
              >
                {isLoadingPosts ? (
                  <div className="flex flex-row justify-center">
                    <LoadingSpinner color="#ffffff" size={12} />
                    <span className="leading-tight">Chargement</span>
                  </div>
                ) : (
                  <span className="leading-tight">Voir plus</span>
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
