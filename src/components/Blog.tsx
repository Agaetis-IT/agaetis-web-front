import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

import Button from '../components/Button'
import CategoryTab from '../components/CategoryTab'
import Layout from '../components/Layout'
import { getIdeasByCategory, getIdeasByPage, getIdeasByTag } from '../services/wordpressService'
import { Category, IdeasDesc, IdeasPageContent, Response } from '../types/IdeasContent'
import WhitePaper from '../types/WhitePaper'
import IdeasCard from '../components/IdeasCard'
import clsx from 'clsx'
import ContactSection from '../components/ContactSection'
import Particles from '/images/particles-3.svg'
import { FormInput } from '../yup/ContactFormValidation'
import ContactForm from './ContactForm'
import SearchInput from '../components/SearchInput'
import Error from '../pages/_error'

import { useDebouncedCallback } from 'use-debounce'
import { slugify } from '../services/textUtilities'
import LoadingSpinner from './LoadingSpinner'
import { PostAPI } from '../models/IdeasAPI'

import styles from '../styles/Common.module.css'
import Head from 'next/head'
import SnackBar from './SnackBar'
import send from '../services/contactService'
import Image from 'next/image'

interface Props {
  ideasDescription: IdeasDesc[]
  categories: Category[]
  content: IdeasPageContent
  whitePapers: WhitePaper[]
  selectedCategory?: string
  tagFilter?: string
  hideSeeMore?: boolean
  errorCode?: number
}

export default function Blog({
  ideasDescription,
  whitePapers,
  categories,
  content,
  selectedCategory,
  tagFilter,
  hideSeeMore,
  errorCode,
}: Props) {
  const [modalOpenWithError, setModalOpenWithError] = useState<boolean | undefined>(undefined)
  const [postModalOpen, setPostModalOpen] = useState<boolean | undefined>(undefined)
  const [isSubmited, setIsSubmited] = useState(false)
  const [ideas, setIdeas] = useState(ideasDescription)
  const [searchFilter, setSearchFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState(selectedCategory || 'All')
  const [lastPage, setLastPage] = useState(1)
  const [isLoadingPosts, setIsLoadingPosts] = useState(false)
  const [isVisibleSeeMore, setIsVisibleSeeMore] = useState(!hideSeeMore)

  function handleOpenModal(error: boolean) {
    setModalOpenWithError(error)
    setIsSubmited(false)
  }

  function handleCloseModal() {
    setModalOpenWithError(undefined)
  }

  function handleOpenPostModal() {
    setPostModalOpen(true)
  }

  function handleClosePostModal() {
    setPostModalOpen(undefined)
  }

  async function handleSubmit(data: FormInput) {
    try {
      setIsSubmited(true)
      await send(data)
      handleOpenModal(false)
    } catch {
      handleOpenModal(true)
    }
  }

  async function handleFetchIdeas(reset?: boolean, changedCategory?: string, changedSearchFilter?: string) {
    setIsLoadingPosts(true)

    try {
      let data: IdeasDesc[] = []
      let newData: Response
      const page = reset ? 1 : lastPage + 1
      const catFilter = changedCategory ? changedCategory : categoryFilter
      const searchBarFilter = (changedSearchFilter || changedSearchFilter === ''
        ? changedSearchFilter
        : searchFilter
      ).toLocaleLowerCase()

      if (catFilter != 'All') {
        if (tagFilter) {
          newData = await getIdeasByTag(tagFilter, slugify(catFilter), page, searchBarFilter)
        } else {
          newData = await getIdeasByCategory(slugify(catFilter), page, searchBarFilter)
        }
      } else {
        if (tagFilter) {
          newData = await getIdeasByTag(tagFilter, undefined, page, searchBarFilter)
        } else {
          newData = await getIdeasByPage(page, searchBarFilter)
        }
      }

      data = newData.data
        .map((idea: PostAPI) => ({
          id: idea.id,
          title: idea.title.rendered,
          categories: idea._embedded['wp:term'][0].map((category: { name: string }) => category.name),
          tags: [],
          slug: idea.slug,
          descriptionText: idea.acf.idea_description,
          date: idea.date,
          image: (idea._embedded['wp:featuredmedia'] &&
          idea._embedded['wp:featuredmedia'][0] &&
          idea._embedded['wp:featuredmedia'][0].source_url) ||
        '',
        }))
        .filter((idea) => !idea.categories.includes('White-paper') && !idea.categories.includes('Jobs'))

      if (newData.pageCount > page) {
        setIsVisibleSeeMore(true)
      } else {
        setIsVisibleSeeMore(false)
      }

      setLastPage(page)
      setIdeas(reset ? data : ideas.concat(data))
    } catch (error) {
      handleOpenPostModal()
    }

    setIsLoadingPosts(false)
  }

  function handleFilterChange(category: string) {
    setCategoryFilter(category)
    if (!tagFilter) window.history.replaceState({}, '', `/blog${category === 'All' ? '' : '/' + slugify(category)}`)
    handleFetchIdeas(true, category)
  }

  useEffect(() => {
    setIdeas(ideasDescription)
    setCategoryFilter(selectedCategory || 'All')
    setSearchFilter('')
    setIsVisibleSeeMore(!hideSeeMore)
  }, [ideasDescription, hideSeeMore, selectedCategory])

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

  const handleSearchChanged = useDebouncedCallback((value: string) => {
    setSearchFilter(value)
    handleFetchIdeas(true, undefined, value)
  }, 600)

  if (!!errorCode) {
    return <Error statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>Agaetis : nos idées</title>
        <meta property="og:title" content="Agaetis : nos idées" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/favicon.ico`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Chacun d'entre nous a ses idées et le droit de les défendre" />
        <meta name="description" content="Chacun d'entre nous a ses idées et le droit de les défendre" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/blog`} />
      </Head>
      <Layout invertColors={false}>
        <div className="relative pt-0 md:pt-28">
          <div className="absolute mt-0 md:mt-28 bg-gray-400 top-0 left-0 right-0 bottom-0 z-back">
            <Image src={Particles} layout="responsive" quality={100} alt=""/>
          </div>
          <div className="p-6 md:p-16 lg:px-32 xl:px-48">
            <div className="mx-1 md:mx-2">
              <div>
                <h1
                  className="text-orange-500 text-2xl leading-normal font-bold"
                  dangerouslySetInnerHTML={{ __html: content.titre }}
                />
                <p className="py-6 text-xl leading-normal my-8 font-medium">{content.description}</p>
              </div>
              <SearchInput handleChange={handleSearchChanged} defaultValue={searchFilter} />
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
            <div className="flex flex-row flex-wrap mt-2 w-full justify-center">
              {cards.length ? cards : 'Aucun résultat'}
            </div>
            {isVisibleSeeMore && (
              <Button
                className={clsx(
                  'flex flex-row justify-center uppercase rounded-full bg-orange-500 text-xss leading-normal py-2 px-6 text-white font-semibold mx-auto shadow-md',
                  { 'mb-8': whitePapers.length < 2 }
                )}
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

            {false && whitePapers && whitePapers.length > 0 && (
              <div id="whitepapers" className="text-center w-full mx-auto p-6 md:py-12 bg-gray-400 my-8 underline">
                <h2 className="text-2xl leading-normal mt-4">Livres blancs</h2>
                <p className="text-sm md:max-w-md md:px-20 py-4 mx-auto leading-normal">
                  {content.white_paper_description}
                </p>
                <div className="my-4 md:my-8 flex flex-col md:flex-row justify-center md:max-w-md mx-auto">
                  {whitePapers.map((whitePaper) => (
                    <div key={whitePaper.title} className="mb-4 md:m-0">
                      <div
                        style={{
                          background: whitePaper.miniature ? 'url(' + whitePaper.miniature + ')' : '#333F48',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                        }}
                        className="shadow-xl md:w-52 h-40 md:h-32 mx-auto"
                      />
                      <h3 className="text-sm px-3 py-4 leading-normal">{whitePaper.title}</h3>
                      <Link href={`/white-papers/${whitePaper.slug}`}>
                        <Button className="rounded-full uppercase text-white text-xss md:text-cgu leading-normal font-semibold bg-orange-500 px-8 py-3 md:px-6 md:py-2">
                          Télécharger
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <ContactForm
            title="Un sujet vous intéresse ? Une question ? Contactez-nous !"
            handleSubmit={handleSubmit}
            isSubmited={isSubmited}
          />
          <SnackBar
            message="Erreur pendant le chargement des posts"
            isError
            open={postModalOpen}
            onClose={handleClosePostModal}
          />
          <SnackBar
            message={modalOpenWithError ? "Erreur pendant l'envoi du message" : 'Message envoyé'}
            isError={modalOpenWithError}
            open={modalOpenWithError}
            onClose={handleCloseModal}
          />
          <ContactSection />
        </div>
      </Layout>
    </>
  )
}
