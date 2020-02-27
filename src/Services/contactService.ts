import axios from 'axios'

import publicRuntimeConfig from '../config/env.config'

export default async function send(
  name: string,
  object: string,
  mail: string,
  company: string,
  content: string,
  phone: string,
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
      content: formatContent(content, name, mail, company, phone),
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

export async function sendWhitePaper(
  name: string,
  mail: string,
  date: Date,
  whitepaperTitle: string,
  file: string,
  callback: () => void,
  error: () => void
) {
  await axios({
    method: 'post',
    url: `${publicRuntimeConfig.NEXT_APP_SITE_URL}/send/white-paper`,
    headers: {},
    data: {
      name,
      object: 'Envoi du livre blanc : ' + whitepaperTitle,
      mail,
      content: formatWPContent(),
      date,
      file,
    },
  })
    .then(() => {
      callback()
    })
    .catch(() => {
      error()
    })
}

function formatContent(content: string, name: string, mail: string, company: string, phone: string) {
  return `<html><body><p>${content}</p><h3>Contact</h3><p>${name}</p><p>${mail}</p><p>${phone}</p><p>${company}</p></body></html>`
}

function formatWPContent() {
  return `<html><body><p>Bonjour,<br/><br/>Nous vous remercions de l'intérêt que vous portez à Agaetis et son activité. Vous trouverez ci-joint le fichier .pdf que vous avez choisi. <br/><br/>Cordialement,<br/>Agaetis</p></body></html>`
}
