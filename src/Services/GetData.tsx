import axios from 'axios'

export default async function getData(url: string) {
  const fetchData = await axios.get(url)
  const data = await fetchData.data
  return data
}
