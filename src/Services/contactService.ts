import axios from 'axios'
import sha256 from 'js-sha256'

import publicRuntimeConfig from '../config/env.config'

const formatContent = (content: string, name: string, mail: string, phone: string) =>
  `<html><body><p>${content}</p><h3>Contact</h3><p>${name}</p><p>${mail}</p><p>${phone}</p></body></html>`

const formatWPContent = () =>
  `<html><body><p>Bonjour,<br/><br/>Nous vous remercions de l'intérêt que vous portez à Agaetis et son activité. Vous trouverez ci-joint le fichier .pdf que vous avez choisi. <br/><br/>Cordialement,<br/>Agaetis</p></body></html>`

export default async function send(
  firstname: string,
  lastname: string,
  mail: string,
  subject: string,
  message: string,
  phone: string,
  date: Date,
  token: string
) {
  const key = Buffer.from(
    firstname +
      lastname +
      publicRuntimeConfig.NEXT_APP_CONTACT_SALT +
      mail +
      subject +
      formatContent(message, `${firstname} ${lastname}`, mail, phone) +
      date.getTime() +
      token,
    'base64'
  )

  return axios({
    method: 'post',
    url: `${publicRuntimeConfig.NEXT_APP_SITE_URL}/send`,
    headers: {},
    data: {
      firstname,
      lastname,
      mail,
      object: subject,
      content: formatContent(message, `${firstname} ${lastname}`, mail, phone),
      date: date.getTime(),
      hash: sha256.sha256(key),
      token,
    },
  })
}

export async function sendWhitePaper(
  name: string,
  mail: string,
  date: Date,
  whitepaperTitle: string,
  file: string,
  token: string
) {
  const key = Buffer.from(
    name +
      'Envoi du livre blanc : ' +
      whitepaperTitle +
      publicRuntimeConfig.NEXT_APP_CONTACT_SALT +
      mail +
      formatWPContent() +
      file +
      date.getTime() +
      token,
    'base64'
  )

  await axios({
    method: 'post',
    url: `${publicRuntimeConfig.NEXT_APP_SITE_URL}/send/white-paper`,
    headers: {},
    data: {
      name,
      object: 'Envoi du livre blanc : ' + whitepaperTitle,
      mail,
      content: formatWPContent(),
      date: date.getTime(),
      file,
      hash: sha256.sha256(key),
      token,
    },
  })
}
