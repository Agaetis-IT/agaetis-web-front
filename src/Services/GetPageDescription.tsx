import axios from 'axios'

export default async function getIndexContent(id: number) {
  const { data } = await axios.get(process.env.BACKEND_URL + 'wp-json/wp/v2/pages/' + id)
  return data
}
