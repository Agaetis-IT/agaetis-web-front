import axios from 'axios'

import publicRuntimeConfig from '../config/env.config'

export default async function send(
  name: string,
  object: string,
  mail: string,
  company: string,
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
      object,
      mail,
      content: formatContent(content, name, mail, company),
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

function formatContent(content: string, name: string, mail: string, company: string) {
  return `<html><body><p>${content}</p><h3>Contact</h3><p>${name}</p><p>${mail}</p><p>${company}</p></body></html>`
}
