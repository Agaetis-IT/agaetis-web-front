import axios from 'axios'

import publicRuntimeConfig from '../config/env.config'

export default async function send(
  name: string,
  mail: string,
  content: string,
  date: Date,
  callback: () => void,
  error: () => void
) {
  await axios({
    method: 'post',
    url: `${publicRuntimeConfig.NEXT_APP_SITE_URL}/send`,
    headers: {},
    data: {
      name,
      mail,
      content: formatContent(content),
      date,
    },
  })
    .then(() => {
      callback()
    })
    .catch(() => {
      error()
    })
}

function formatContent(content: string) {
  return `<html><body>${content}</body></html>`
}
