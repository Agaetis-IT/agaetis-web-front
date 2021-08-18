import axios from 'axios'

import { AgaetisAPI } from '../models/AgaetisAPI'
import ContactAPI from '../models/ContactAPI'
import { BlogAPI } from '../models/BlogAPI'
import IndexAPI from '../models/IndexAPI'
import SolutionsAPI from '../models/SolutionsAPI'
import { AuthorPageAPI } from '../models/AuthorAPI'

axios.defaults.timeout = 10000

export async function getWordpressPageBySlug<T>(slug: string) {
  const { data } = await axios.get<T>(`${process.env.NEXT_PUBLIC_BASE_URL}/wp-json/agaetis/api/v1/pages/${slug}`)
  return data
}

export default async function getIndexContent() {
  const { acf } = await getWordpressPageBySlug<{ acf: IndexAPI }>('index')
  return acf
}

export async function getAgaetisContent() {
  const { acf } = await getWordpressPageBySlug<{ acf: AgaetisAPI }>('agaetis')
  return acf
}

export async function getBlogPageContent() {
  const { acf } = await getWordpressPageBySlug<{ acf: BlogAPI }>('blog')
  return acf
}

export async function getAuthorPageContent() {
  const { acf } = await getWordpressPageBySlug<{ acf: AuthorPageAPI }>('author')
  return acf
}

/* export async function getOffersPageContent() {
  const { acf } = await getWordpressPageBySlug<{ acf: OffersPageContent }>('offers')
  return acf
} */

export async function getPostMeta(slug: string) {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/wp-json/agaetis/api/v1/meta/${slug}`)
  return data
}

export async function getPersonalDataContent() {
  const data = await getWordpressPageBySlug<{ title: { rendered: string }; content: { rendered: string } }>(
    'personal-data'
  )

  return data
}

export async function getMentionsLegalesContent() {
  const data = await getWordpressPageBySlug<{ title: { rendered: string }; content: { rendered: string } }>(
    'mentions-legales'
  )

  return data
}

export async function getSolutionsPageContent() {
  const { acf } = await getWordpressPageBySlug<{ acf: SolutionsAPI }>('solutions')
  return acf
}

export async function getContactPageContent() {
  const { acf } = await getWordpressPageBySlug<{ acf: ContactAPI }>('contact')
  return acf
}

/* export async function getOfferContent(slug: string) {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/wp-json/agaetis/api/v1/offres/${slug}`)
  return data
} */

export async function getAllLandingPages() {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/wp-json/agaetis/api/v1/landingpages`)
  return data
}

export async function getLandingPageContent(offer: string) {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/wp-json/agaetis/api/v1/landingpages/${offer}`)
  return data
}

/* export async function getWhitePaperContent(slug: string) {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/wp-json/agaetis/api/v1/white-papers/${slug}`)
  return data
} */

/* export async function getAllWhitePapers() {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/wp-json/agaetis/api/v1/white-paper`)
  return data
} */

/* export async function getAllOffers() {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/wp-json/agaetis/api/v1/offres`)
  return data
} */

/* export async function getCategoryOffers(slug: string) {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/wp-json/agaetis/api/v1/cat/${slug}`)
  return data
} */

/* export async function getOfferLeaf(offer: string, slug: string) {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/wp-json/agaetis/api/v1/offres/${offer}/${slug}`)
  return data
} */

export async function getCategories() {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/wp-json/wp/v2/categories?per_page=100`)
  return data
}

export async function getTags() {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/wp-json/agaetis/api/v1/tags`)
  return data
}

export async function getPostById(id: number) {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/wp-json/wp/v2/posts/${id}?_embed`)
  return data
}

export async function getPostBySlug(slug: string) {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/wp-json/agaetis/api/v1/posts/${slug}`)
  return data
}

export async function getPostsByPage(page?: number, search?: string) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/wp-json/agaetis/api/v1/posts?per_page=10${page ? `&page=${page}` : ''}${
      search ? `&search=${search}` : ''
    }`
  )
  return { data: res.data, pageCount: res.headers['x-wp-totalpages'] }
}

export async function getPostsByTag(slug: string, category?: string, page?: number, search?: string) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/wp-json/agaetis/api/v1/tags/${slug}?per_page=10${page ? `&page=${page}` : ''}${
      search ? `&search=${search}` : ''
    }${category ? `&cat_name=${category}` : ''}`
  )
  return { data: res.data, pageCount: res.headers['x-wp-totalpages'] }
}

export async function getPostsByCategory(slug: string, page?: number, search?: string) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/wp-json/agaetis/api/v1/categories/${slug}?per_page=10${
      page ? `&page=${page}` : ''
    }${search ? `&search=${search}` : ''}`
  )
  return { data: res.data, pageCount: res.headers['x-wp-totalpages'] }
}

export async function getPostsByAuthor(authorId: string, page?: number) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/wp-json/agaetis/api/v1/posts?per_page=10&author=${authorId}${
      page ? `&page=${page}` : ''
    }`
  )
  return { data: res.data, pageCount: res.headers['x-wp-totalpages'] }
}

export async function getAuthorById(id: string) {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/wp-json/wp/v2/users/${id}`)
  return data
}

export async function getAllAuthors() {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/wp-json/wp/v2/users`)
  return data
}
