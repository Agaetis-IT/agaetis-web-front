import axios from 'axios'

import publicRuntimeConfig from '../config/env.config'
import { AgaetisContentApi } from '../models/AgaetisAPI'
import ContactContentApi from '../models/ContactAPI'
import { IdeasPageContent } from '../types/IdeasContent'
import IndexContentApi from '../models/IndexAPI'
import { convertContentAPItoContent } from '../types/SolutionsContent'
import { OffersPageContent } from '../types/OffersContent'
import SolutionsAPI from '../models/SolutionsAPI'

export async function getWordpressPageBySlug<T>(slug: string) {
  const { data } = await axios.get<T>(`${publicRuntimeConfig.NEXT_APP_BASE_URL}/wp-json/agaetis/api/v1/pages/${slug}`)
  return data
}

export async function getIndexContent() {
  const { acf } = await getWordpressPageBySlug<{ acf: IndexContentApi }>('index')
  return acf
}

export async function getAgaetisContent() {
  const { acf } = await getWordpressPageBySlug<{ acf: AgaetisContentApi }>('agaetis')
  return acf
}

export async function getIdeasPageContent() {
  const { acf } = await getWordpressPageBySlug<{ acf: IdeasPageContent }>('blog')
  return acf
}

export async function getOffersPageContent() {
  const { acf } = await getWordpressPageBySlug<{ acf: OffersPageContent }>('offers')
  return acf
}

export async function getIdeaMeta(slug: string) {
  const { data } = await axios.get(`${publicRuntimeConfig.NEXT_APP_BASE_URL}/wp-json/agaetis/api/v1/meta/${slug}`)
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
  return convertContentAPItoContent(acf)
}

export async function getContactPageContent() {
  const { acf } = await getWordpressPageBySlug<{ acf: ContactContentApi }>('contact')
  return acf
}

export async function getOfferContent(slug: string) {
  const { data } = await axios.get(`${publicRuntimeConfig.NEXT_APP_BASE_URL}/wp-json/agaetis/api/v1/offres/${slug}`)
  return data
}

export async function getLandingPageContent(offer: string) {
  const { data } = await axios.get(
    `${publicRuntimeConfig.NEXT_APP_BASE_URL}/wp-json/agaetis/api/v1/landingpages/${offer}`
  )
  return data
}

export async function getWhitePaperContent(slug: string) {
  const { data } = await axios.get(
    `${publicRuntimeConfig.NEXT_APP_BASE_URL}/wp-json/agaetis/api/v1/white-papers/${slug}`
  )
  return data
}

export async function getAllWhitePapers() {
  const { data } = await axios.get(`${publicRuntimeConfig.NEXT_APP_BASE_URL}/wp-json/agaetis/api/v1/white-paper`)
  return data
}

export async function getAllOffers() {
  const { data } = await axios.get(`${publicRuntimeConfig.NEXT_APP_BASE_URL}/wp-json/agaetis/api/v1/offres`)
  return data
}

export async function getCategoryOffers(slug: string) {
  const { data } = await axios.get(`${publicRuntimeConfig.NEXT_APP_BASE_URL}/wp-json/agaetis/api/v1/cat/${slug}`)
  return data
}

export async function getOfferLeaf(offer: string, slug: string) {
  const { data } = await axios.get(
    `${publicRuntimeConfig.NEXT_APP_BASE_URL}/wp-json/agaetis/api/v1/offres/${offer}/${slug}`
  )
  return data
}

export async function getCategories() {
  const { data } = await axios.get(`${publicRuntimeConfig.NEXT_APP_BASE_URL}/wp-json/wp/v2/categories?per_page=100`)
  return data
}

export async function getIdeaById(id: number) {
  const { data } = await axios.get(`${publicRuntimeConfig.NEXT_APP_BASE_URL}/wp-json/wp/v2/posts/${id}?_embed`)
  return data
}

export async function getIdeaBySlug(slug: string) {
  const { data } = await axios.get(`${publicRuntimeConfig.NEXT_APP_BASE_URL}/wp-json/agaetis/api/v1/posts/${slug}`)
  return data
}

export async function getIdeasByPage(page?: number, search?: string) {
  const res = await axios.get(
    `${publicRuntimeConfig.NEXT_APP_BASE_URL}/wp-json/agaetis/api/v1/posts?per_page=10${page ? `&page=${page}` : ''}${
      search ? `&search=${search}` : ''
    }`
  )
  return { data: res.data, pageCount: res.headers['x-wp-totalpages'] }
}

export async function getIdeasByTag(slug: string, category?: string, page?: number, search?: string) {
  const res = await axios.get(
    `${publicRuntimeConfig.NEXT_APP_BASE_URL}/wp-json/agaetis/api/v1/tags/${slug}?per_page=10${
      page ? `&page=${page}` : ''
    }${search ? `&search=${search}` : ''}${category ? `&cat_name=${category}` : ''}`
  )
  return { data: res.data, pageCount: res.headers['x-wp-totalpages'] }
}

export async function getIdeasByCategory(slug: string, page?: number, search?: string) {
  const res = await axios.get(
    `${publicRuntimeConfig.NEXT_APP_BASE_URL}/wp-json/agaetis/api/v1/categories/${slug}?per_page=10${
      page ? `&page=${page}` : ''
    }${search ? `&search=${search}` : ''}`
  )
  return { data: res.data, pageCount: res.headers['x-wp-totalpages'] }
}

export default { getIndexContent }
