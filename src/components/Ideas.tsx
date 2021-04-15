import Head from 'next/head'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'

import Button from '../components/Button'
import CategoryTab from '../components/CategoryTab'
import Layout from '../components/Layout'
import publicRuntimeConfig from '../config/env.config'
import { getIdeasByCategory, getIdeasByPage } from '../Services/wordpressService'
import { Category, IdeasDesc, IdeasPageContent, Response } from '../types/IdeasContent'
import WhitePaper from '../types/WhitePaper'
import IdeasCard from '../components/IdeasCard'
import clsx from 'clsx'
import ContactSection from '../components/ContactSection'
import Particles from '../static/images/particles-3.svg'
import { FooterFormInput } from '../yup/ContactFormValidation'
import { footerSend } from '../Services/contactService'
import ContactFormFooter from '../components/ContactFormFooter'
import ContactMessage from '../components/ContactMessage'
import SearchInput from '../components/SearchInput'
import Error from '../pages/_error'

import _ from 'lodash'
import { getBgColor } from '../Services/categoryColor'
import { createMarkup, slugify } from '../Services/textUtilities'
import LoadingSpinner from './LoadingSpinner'
import { PostAPI } from '../models/IdeasAPI'

interface Props {
  ideasDescription: IdeasDesc[]
  categories: Category[]
  content: IdeasPageContent
  whitePapers: WhitePaper[]
  errorCode?: number
  selectedCategory?: string
  hideSeeMore?: boolean
}

function Ideas({
  ideasDescription,
  whitePapers,
  categories,
  content,
  errorCode,
  selectedCategory,
  hideSeeMore,
}: Props) {
  const [isOpenenedModal, setOpenModal] = useState(false)
  const [isError, setIsError] = useState(true)
  const [isSubmited, setIsSubmited] = useState(false)
  const [ideas, setIdeas] = useState(ideasDescription)
  const [searchFilter, setSearchFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState(selectedCategory || 'All')
  const [lastPage, setLastPage] = useState(1)
  const [isLoadingPosts, setIsLoadingPosts] = useState(false)
  const [isVisibleSeeMore, setIsVisibleSeeMore] = useState(!hideSeeMore && true)

  function handleOpenModal(error: boolean) {
    setIsError(error)
    setOpenModal(true)
    setIsSubmited(false)
    setTimeout(() => {
      setOpenModal(false)
    }, 3000)
  }

  async function handleSubmit(data: FooterFormInput) {
    try {
      setIsSubmited(true)
      await footerSend(data.firstname, data.lastname, data.mail, data.message, data.phone, new Date())
      handleOpenModal(false)
    } catch {
      handleOpenModal(true)
    }
  }

  async function handleFetchIdeas(reset?: boolean, changedCategory?: string, changedSearchFilter?: string) {
    setIsLoadingPosts(true)
    let data: IdeasDesc[] = []
    let newData: Response
    const page = reset ? 1 : lastPage + 1
    const catFilter = changedCategory ? changedCategory : categoryFilter
    const searchBarFilter = (changedSearchFilter || changedSearchFilter === ''
      ? changedSearchFilter
      : searchFilter
    ).toLocaleLowerCase()

    if (catFilter != 'All') {
      newData = await getIdeasByCategory(slugify(catFilter), page, searchBarFilter)
    } else {
      newData = await getIdeasByPage(page, searchBarFilter)
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
        image: idea.acf.idea_image,
      }))
      .filter((idea) => !idea.categories.includes('White-paper') && !idea.categories.includes('Jobs'))

    if (newData.pageCount > page) {
      setIsVisibleSeeMore(true)
    } else {
      setIsVisibleSeeMore(false)
    }

    setLastPage(page)
    setIdeas(reset ? data : ideas.concat(data))
    setIsLoadingPosts(false)
  }

  function handleFilterChange(category: string) {
    setCategoryFilter(category)
    window.history.replaceState({}, '', `/blog${category === 'All' ? '' : '/' + slugify(category)}`)
    handleFetchIdeas(true, category)
  }

  const cards = useMemo(() => {
    const source = ideas

    return source.map((idea) => {
      return (
        <div key={idea.id} className={clsx(source.length > 2 ? 'sm:w-1/3' : 'sm:w-1/2', ' p-2')}>
          <IdeasCard
            className={clsx(
              { 'shadow-xl hidden sm:block': idea.id < 0 },
              { [getBgColor(idea.categories.filter((category) => !category.includes('_offer-'))[0])]: idea.id > 0 }
            )}
            {...idea}
            categories={idea.categories.filter((category) => !category.includes('_offer-'))}
          >
            <p dangerouslySetInnerHTML={createMarkup(idea.descriptionText)} />
          </IdeasCard>
        </div>
      )
    })
  }, [ideas])

  const handleSearchChanged = _.debounce((value: string) => {
    setSearchFilter(value)
    handleFetchIdeas(true, undefined, value)
  }, 400)

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
      <Layout invertColors={false}>
        <div className="pt-0 md:pt-28">
          <div
            style={{
              backgroundImage: `url("${Particles}")`,
              backgroundRepeat: 'no-repeat',
            }}
            className="bg-light-grey p-6 md:p-16 xl:px-32 shadow-none md:shadow-top"
          >
            <div className="max-w-lg mx-auto">
              <div className="">
                <h1 className="text-orange text-3xl" dangerouslySetInnerHTML={{ __html: content.titre }}></h1>
                <p className="md:max-w-lg mx-auto py-6 text-sm leading-normal mb-8">{content.description}</p>
              </div>
              <SearchInput handleChange={handleSearchChanged}></SearchInput>
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
            {isVisibleSeeMore && (
              <Button
                className={clsx(
                  'flex flex-row justify-center uppercase rounded-full bg-orange text-xss py-2 px-6 text-white font-semibold mx-auto see-more',
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

            {whitePapers && whitePapers.length > 1 && (
              <div
                id="whitepapers"
                className="text-center w-full mx-auto p-6 md:py-12 bg-light-grey my-8 blue-underline"
              >
                <h2 className="text-2xl mt-4">Livres blancs</h2>
                <p className="text-sm md:max-w-md md:px-20 py-4 mx-auto leading-normal">
                  {content.white_paper_description}
                </p>
                <div className="my-4 md:my-8 flex flex-col md:flex-row justify-center md:max-w-md mx-auto">
                  {whitePapers.slice(1).map((whitePaper) => (
                    <div key={whitePaper.title} className="mb-4 md:m-0">
                      <div
                        style={{
                          background: whitePaper.miniature ? 'url(' + whitePaper.miniature + ')' : '#333F48',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                        }}
                        className="shadow-xl md:w-ideas h-40 md:h-32 mx-auto"
                      />
                      <h3 className="text-sm px-3 py-4">{whitePaper.title}</h3>
                      <Link href={`/white-papers/${whitePaper.slug}`}>
                        <Button className="rounded-full uppercase text-white text-xss md:text-cgu font-semibold bg-orange px-8 py-3 md:px-6 md:py-2">
                          Télécharger
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <ContactFormFooter
            title="Un sujet vous intéresse ? Une question ? Contactez-nous"
            handleSubmit={handleSubmit}
            isSubmited={isSubmited}
          ></ContactFormFooter>
          {isOpenenedModal && <ContactMessage error={isError}></ContactMessage>}
          <ContactSection></ContactSection>
        </div>
      </Layout>
    </>
  )
}

export default Ideas
