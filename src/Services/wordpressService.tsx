import axios from 'axios'

import IndexContent from '../types/IndexContent'

export async function getWordpressPage<T>(id: number) {
  const { data } = await axios.get<T>(`http://localhost/blogAgaetis/wp-json/wp/v2/pages/${id}`)
  return data
}

export async function getIndexContent() {
  const { acf } = await getWordpressPage<{ acf: IndexContent }>(13)
  return acf
}

export async function getAllIdeas() {
  const { data } = await axios.get('http://localhost/blogAgaetis/wp-json/wp/v2/posts?_embed')
  return data
}

export async function getIdeaById(id: number) {
  const { data } = await axios.get(`http://localhost/blogAgaetis/wp-json/wp/v2/posts/${id}?_embed`)
  return data
}

export async function getIdeaBySlug(slug: string) {
  const { data } = await axios.get(`http://localhost/blogAgaetis/wp-json/agaetis/api/v1/posts/${slug}`)
  return data
}

export async function getCategories() {
  const { data } = await axios.get(`http://localhost/blogAgaetis/wp-json/wp/v2/categories/`)
  return data
}

export async function sendMessage(name: string, mail: string, content: string, date: Date) {
  await axios.post(`http://localhost/blogAgaetis/wp-json/agaetis/api/v1/send`, {
    author_name: name,
    author_email: mail,
    content,
    date,
  })
}

export default { getWordpressPage, getIndexContent, sendMessage }
