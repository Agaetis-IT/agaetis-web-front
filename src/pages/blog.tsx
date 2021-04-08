import Head from 'next/head'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'

import Button from '../components/Button'
import CategoryTab from '../components/CategoryTab'
import Layout from '../components/Layout'
import publicRuntimeConfig from '../config/env.config'
import { getAllWhitePapers, getCategories, getIdeasPageContent, getIdeasByPage } from '../Services/wordpressService'
import { Category, IdeasDesc, IdeasPageContent } from '../types/IdeasContent'
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

import './blog.css'

interface Props {
  ideasDescription: IdeasDesc[]
  categories: Category[]
  content: IdeasPageContent
  whitePapers: WhitePaper[]
}

function compareIdeasByDate(idea1: IdeasDesc, idea2: IdeasDesc) {
  return new Date(idea2.date).getTime() - new Date(idea1.date).getTime()
}

function Ideas({ ideasDescription, whitePapers, categories, content }: Props) {
  const [ideas, setIdeas] = useState(ideasDescription.sort(compareIdeasByDate))
  const [searchFilter, setSearchFilter] = useState('')
  const [isOpenenedModal, setOpenModal] = useState(false)
  const [isError, setIsError] = useState(true)
  const [isSubmited, setIsSubmited] = useState(false)
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [loadedPages, setLoadedPages] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const fakeIdea1 = {
    id: -1,
    slug: '',
    title: '',
    category: '',
    categories: [''],
    tags: [],
    descriptionText: '',
    date: '',
    image: content.ideasimg1,
  }

  const fakeIdea2 = {
    id: -2,
    slug: '',
    title: '',
    category: '',
    categories: [''],
    tags: [],
    descriptionText: '',
    date: '',
    image: content.ideasimg2,
  }

  function getBgColor(category: string) {
    if (category === 'Agaetis' || category === 'Evènements') {
      return 'bg-orange'
    } else if (category === 'Stratégie SI') {
      return 'bg-blue'
    } else if (category === 'Data') {
      return 'bg-teal'
    } else if (category === 'Service Design') {
      return 'bg-light-pink'
    } else if (category === 'Technologie') {
      return 'bg-yellow'
    } else if (category === 'Agilité') {
      return 'bg-light-purple'
    } else if (category === 'Business Hacking') {
      return 'bg-red-lighter'
    }
    return 'bg-grey'
  }

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

  function applyFilters(data: any[], changedCategory?: string, changedSearchFilter?: string) {
    const catFilter = changedCategory ? changedCategory : categoryFilter
    const searchBarFilter = (changedSearchFilter ? changedSearchFilter : searchFilter).toLocaleLowerCase()

    return data.filter(
      (idea) =>
        !idea.categories.includes('White-paper') &&
        !idea.categories.includes('Jobs') &&
        idea.title.toLocaleLowerCase().includes(searchBarFilter) &&
        (catFilter === 'All' || idea.categories.includes(catFilter) || idea.categories.includes(''))
    )
  }

  function createMarkup(content: string) {
    return { __html: content }
  }

  async function handleFetchMoreIdeas() {
    setIsLoading(true)
    let continueFetch = true
    let data: any = []
    let i = loadedPages
    const button = document.getElementsByClassName('see-more')[0]

    const currentDataLength = applyFilters(ideas).length
    const toAdd = currentDataLength < 7 ? 7 - currentDataLength : 9

    while (data.length < toAdd && continueFetch) {
      i++
      const { [0]: newData } = await Promise.all([getIdeasByPage(i)])

      if (newData.length < toAdd) continueFetch = false

      setLoadedPages(i)

      data = data.concat(
        applyFilters(
          newData.map((idea: any) => ({
            id: idea.id,
            title: idea.title.rendered,
            categories: idea._embedded['wp:term'][0].map((category: { name: string }) => category.name),
            slug: idea.slug,
            descriptionText: idea.acf.idea_description,
            date: idea.date,
            image: idea.acf.idea_image,
          }))
        )
      )
    }

    if (!continueFetch) {
      if (button) {
        button.classList.add('hidden')
        button.classList.remove('flex')
      }
    } else {
      data = data.slice(0, toAdd)
    }

    setIdeas(ideas.concat(data).sort(compareIdeasByDate))

    setIsLoading(false)
  }

  async function handleNewFilters(changedCategory?: string, changedSearchFilter?: string) {
    setIsLoading(true)
    let continueFetch = true
    let i = 0
    let data: any = []

    const button = document.getElementsByClassName('see-more')[0]

    if (button) {
      button.classList.add('flex')
      button.classList.remove('hidden')
    }

    while (data.length < 7 && continueFetch) {
      i++
      const { [0]: newData } = await Promise.all([getIdeasByPage(i)])

      if (newData.length < 7) continueFetch = false

      setLoadedPages(i)

      data = data.concat(
        applyFilters(
          newData.map((idea: any) => ({
            id: idea.id,
            title: idea.title.rendered,
            categories: idea._embedded['wp:term'][0].map((category: { name: string }) => category.name),
            slug: idea.slug,
            descriptionText: idea.acf.idea_description,
            date: idea.date,
            image: idea.acf.idea_image,
          })),
          changedCategory,
          changedSearchFilter
        )
      )
    }

    if (!continueFetch) {
      if (button) {
        button.classList.add('hidden')
        button.classList.remove('flex')
      }
    } else {
      data = data.slice(0, 7)
    }

    setIdeas(data.sort(compareIdeasByDate))

    setIsLoading(false)
  }

  function handleFilterChange(category: string) {
    setCategoryFilter(category)
    handleNewFilters(category)
  }

  const cards = useMemo(() => {
    const source = ideas

    if (content.ideasimg1 && !source.find((idea: IdeasDesc) => idea.id === -1)) {
      source.splice(0, 0, fakeIdea1)
    }

    if (content.ideasimg2 && !source.find((idea: IdeasDesc) => idea.id === -2)) {
      source.splice(7, 0, fakeIdea2)
    }

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
  }, [categoryFilter, fakeIdea1, fakeIdea2, ideas])

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
              <SearchInput // To change
                handleChange={(value: string) => {
                  if (searchTimeout) clearTimeout(searchTimeout)
                  setSearchTimeout(
                    setTimeout(() => {
                      setSearchFilter(value)
                      handleNewFilters(null, value)
                    }, 500)
                  )
                }}
              ></SearchInput>
            </div>
            <CategoryTab
              categories={categories.filter(
                (category) => category.categoryName !== 'Jobs' && category.categoryName !== 'White-paper'
              )}
              categoryFilter={categoryFilter}
              handleFilterChange={handleFilterChange}
            />
            <div className="flex flex-col md:max-w-lg sm:flex-row justify-center flex-wrap mt-2 md:p-8 mx-auto">
              {cards}
            </div>
            <Button
              className={clsx(
                'flex flex-row justify-center uppercase rounded-full bg-orange text-xss py-2 px-6 text-white font-semibold mx-auto see-more',
                { 'mb-8': whitePapers.length < 2 }
              )}
              onClick={handleFetchMoreIdeas}
            >
              {isLoading ? (
                <div>
                  <svg
                    className="animate-spin spinner text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Chargement
                </div>
              ) : (
                'Voir plus'
              )}
            </Button>
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

// Click on category / search => request to server, shows 7 most recent
//    >> find a way to filter while getting enough posts

export async function getServerSideProps() {
  const { [0]: ideas, [1]: categories, [2]: content, [3]: whitepapers } = await Promise.all([
    getIdeasByPage(1),
    getCategories(),
    getIdeasPageContent(),
    getAllWhitePapers(),
  ])

  return {
    props: {
      ideasDescription: ideas.map((idea: any) => ({
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
        .map((category: any) => ({ categoryId: category.id, categoryName: category.name }))
        .filter((category: any) => !category.categoryName.includes('_offer-')),
    },
  }
}

export default Ideas
