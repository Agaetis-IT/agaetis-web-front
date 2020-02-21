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
      content,
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
