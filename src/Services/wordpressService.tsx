import axios from 'axios'

import publicRuntimeConfig from '../config/env.config'
import { AgaetisContentApi } from '../types/AgaetisContent'
import ContactContentApi from '../types/ContactContentApi'
import { IdeasPageContent } from '../types/IdeasContent'
import IndexContent from '../types/IndexContent'
import JobsContentAPI, { convertJobsContentAPItoContent } from '../types/JobsContent'
import SolutionsContentAPI, { convertContentAPItoContent } from '../types/SolutionsContent'

export async function getWordpressPageBySlug<T>(slug: string) {
  const { data } = await axios.get<T>(`${publicRuntimeConfig.NEXT_APP_BASE_URL}/wp-json/agaetis/api/v1/pages/${slug}`)
  return data
}

export async function getIndexContent() {
  const { acf } = await getWordpressPageBySlug<{ acf: IndexContent }>('index')
  return acf
}

export async function getAgaetisContent() {
  const { acf } = await getWordpressPageBySlug<{ acf: AgaetisContentApi }>('agaetis')
  return acf
}

export async function getIdeasPageContent() {
  const { acf } = await getWordpressPageBySlug<{ acf: IdeasPageContent }>('idees')
  return acf
}

export async function getIdeaMeta(slug: string) {
  const { data } = await axios.get(`${publicRuntimeConfig.NEXT_APP_BASE_URL}/wp-json/agaetis/api/v1/meta/${slug}`)
  return data
}

export async function getPersonalDataContent() {
  const data = await getWordpressPageBySlug('donnees-personnelles')

  return data
}

export async function getSolutionsPageContent() {
  const { acf } = await getWordpressPageBySlug<{ acf: SolutionsContentAPI }>('solutions')
  return convertContentAPItoContent(acf)
}

export async function getJobsPageContent() {
  const { acf } = await getWordpressPageBySlug<{ acf: JobsContentAPI }>('jobs')
  return convertJobsContentAPItoContent(acf)
}

export async function getContactPageContent() {
  const { acf } = await getWordpressPageBySlug<{ acf: ContactContentApi }>('contact')
  return acf
}

export async function getJobContent(slug: string) {
  const data = getIdeaBySlug(slug)
  return data
}

export async function getWhitePaperContent(slug: string) {
  const data = getIdeaBySlug(slug)
  return data
}

export async function getAllIdeas() {
  const { data } = await axios.get(`${publicRuntimeConfig.NEXT_APP_BASE_URL}/wp-json/wp/v2/posts?_embed&per_page=100`)
  return data
}

export async function getAllJobs() {
  const { data } = await axios.get(`${publicRuntimeConfig.NEXT_APP_BASE_URL}/wp-json/agaetis/api/v1/jobs`)
  return data
}

export async function getAllWhitePapers() {
  const { data } = await axios.get(`${publicRuntimeConfig.NEXT_APP_BASE_URL}/wp-json/agaetis/api/v1/white-paper`)
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

export async function getCategories() {
  const { data } = await axios.get(`${publicRuntimeConfig.NEXT_APP_BASE_URL}/wp-json/wp/v2/categories/`)
  return data
}

export async function sendMessage(name: string, mail: string, content: string, date: Date) {
  await axios.post(`${publicRuntimeConfig.NEXT_APP_BASE_URL}/wp-json/agaetis/api/v1/send`, {
    author_name: name,
    author_email: mail,
    content,
    date,
  })
}

export default { getIndexContent, sendMessage }
