import axios from 'axios'

import IndexContent from '../types/IndexContent'

export async function getWordpressPage<T>(id: number) {
  const { data } = await axios.get<T>(`${process.env.BASE_URL}/wp-json/wp/v2/pages/${id}`)
  return data
}

export async function getIndexContent() {
  const { acf } = await getWordpressPage<{ acf: IndexContent }>(13)
  return acf
}

export default { getWordpressPage, getIndexContent }
