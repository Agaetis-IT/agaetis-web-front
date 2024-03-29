import { useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import { useDebouncedCallback } from 'use-debounce'

import Button from './Button'
import CategoryTab from './CategoryTab'
import ContactForm from './ContactForm'
import ContactSection from './ContactSection'
import Error from '../pages/_error'
import Layout from './Layout'
import LoadingSpinner from './LoadingSpinner'
import PostCard from './PostCard'
import SearchInput from './SearchInput'
import SnackBar from './SnackBar'

import { BlogAPI } from '../models/BlogAPI'
import { Category, convertPostAPIToCardContent, PostCardContent, Response } from '../types/PostPageContent'
import { getPostsByCategory, getPostsByPage, getPostsByTag } from '../services/wordpressService'
import { PostAPI } from '../models/PostAPI'
import { slugify } from '../services/textUtilities'

const Particles = '/images/particles-3.svg'

interface Props {
  postsDescription: PostCardContent[]
  categories: Category[]
  content: BlogAPI
  selectedCategory?: string
  tagFilter?: string
  hideSeeMore?: boolean
  errorCode?: number
}

export default function Blog({
  postsDescription,
  categories,
  content,
  selectedCategory,
  tagFilter,
  hideSeeMore,
  errorCode,
}: Props) {
  const [postModalOpen, setPostModalOpen] = useState<boolean | undefined>(undefined)
  const [posts, setPosts] = useState(postsDescription)
  const [searchFilter, setSearchFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState(selectedCategory || 'All')
  const [lastPage, setLastPage] = useState(1)
  const [isLoadingPosts, setIsLoadingPosts] = useState(false)
  const [isVisibleSeeMore, setIsVisibleSeeMore] = useState(!hideSeeMore)

  function handleOpenPostModal() {
    setPostModalOpen(true)
  }

  function handleClosePostModal() {
    setPostModalOpen(undefined)
  }

  async function handleFetchPosts(reset?: boolean, changedCategory?: string, changedSearchFilter?: string) {
    setIsLoadingPosts(true)

    try {
      let data: PostCardContent[] = []
      let newData: Response
      const page = reset ? 1 : lastPage + 1
      const catFilter = changedCategory ? changedCategory : categoryFilter
      const searchBarFilter = (
        changedSearchFilter || changedSearchFilter === '' ? changedSearchFilter : searchFilter
      ).toLocaleLowerCase()

      if (catFilter != 'All') {
        if (tagFilter) {
          newData = await getPostsByTag(tagFilter, slugify(catFilter), page, searchBarFilter)
        } else {
          newData = await getPostsByCategory(slugify(catFilter), page, searchBarFilter)
        }
      } else {
        if (tagFilter) {
          newData = await getPostsByTag(tagFilter, undefined, page, searchBarFilter)
        } else {
          newData = await getPostsByPage(page, searchBarFilter)
        }
      }

      data = newData.data.map((post: PostAPI) => convertPostAPIToCardContent(post))

      if (newData.pageCount > page) {
        setIsVisibleSeeMore(true)
      } else {
        setIsVisibleSeeMore(false)
      }

      setLastPage(page)
      setPosts(reset ? data : posts.concat(data))
    } catch (error) {
      handleOpenPostModal()
    }

    setIsLoadingPosts(false)
  }

  function handleFilterChange(category: string) {
    setCategoryFilter(category)
    if (!tagFilter) window.history.replaceState({}, '', `/blog${category === 'All' ? '' : '/' + slugify(category)}`)
    handleFetchPosts(true, category)
  }

  useEffect(() => {
    setPosts(postsDescription)
    setCategoryFilter(selectedCategory || 'All')
    setSearchFilter('')
    setIsVisibleSeeMore(!hideSeeMore)
  }, [postsDescription, hideSeeMore, selectedCategory])

  const cards = useMemo(
    () =>
      posts?.map((post) => (
        <div
          key={post.id}
          className="m-2 mb-8 shadow-md hover:shadow-lg transition-all duration-250 transform hover:scale-102 rounded-lg w-inherit"
        >
          <PostCard slug={post.slug} title={post.title} image={post.image} description={post.descriptionText} />
        </div>
      )),
    [posts]
  )

  const handleSearchChanged = useDebouncedCallback((value: string) => {
    setSearchFilter(value)
    handleFetchPosts(true, undefined, value)
  }, 600)

  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return (
    <>
      <Head>
        <title>Agaetis - Blog</title>
        <meta property="og:title" content="Agaetis - Blog" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}/blog`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/favicon.ico`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Chacun d'entre nous a ses idées et le droit de les défendre" />
        <meta name="description" content="Chacun d'entre nous a ses idées et le droit de les défendre" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/blog`} />
      </Head>
      <Layout displayedPage={'/blog'}>
        <div className="pt-0 md:pt-17">
          <div
            style={{
              backgroundImage: `url("${Particles}")`,
              backgroundPosition: 'top',
              backgroundSize: '100% auto',
              backgroundRepeat: 'no-repeat',
            }}
            className="p-6 md:p-16 lg:px-32 xl:px-48 bg-gray-400"
          >
            <div className="mx-1 md:mx-2">
              <h1 className="text-xl leading-normal mb-14 font-medium">{content.description}</h1>
              <SearchInput handleChange={handleSearchChanged} defaultValue={searchFilter} />
            </div>
            <CategoryTab
              categories={categories}
              categoryFilter={categoryFilter}
              handleFilterChange={handleFilterChange}
            />
            {isLoadingPosts ? (
              <div className="flex flex-row justify-center">
                <LoadingSpinner color="#ff7f40" size={18} />
                <span className="leading-tight">Chargement</span>
              </div>
            ) : (
              <div className="invisible">-</div>
            )}
            <div className="flex flex-row flex-wrap mt-2 w-full justify-center">
              {cards && cards.length ? cards : 'Aucun résultat'}
            </div>
            {isVisibleSeeMore && (
              <Button
                className="flex flex-row justify-center uppercase rounded-full bg-orange-500 hover:bg-orange-400 text-xss leading-normal py-2 px-6 text-white font-semibold mx-auto shadow-md hover:shadow-lg transition-all duration-250 mb-8"
                onClick={() => handleFetchPosts()}
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
          <ContactForm title="Un sujet vous intéresse ? Une question ? Contactez-nous !" />
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
