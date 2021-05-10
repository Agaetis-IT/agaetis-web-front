import axios from 'axios'
import sha256 from 'js-sha256'
import React from 'react'

import publicRuntimeConfig from '../config/env.config'
import { FormInput } from '../yup/ContactFormValidation'

const formatContent = (content: string, name: string, mail: string, phone: string) =>
  `<html><body><p>${content}</p><h3>Contact</h3><p>${name}</p><p>${mail}</p><p>${phone}</p></body></html>`

const formatWPContent = () =>
  `<html><body><p>Bonjour,<br/><br/>Nous vous remercions de l'intérêt que vous portez à Agaetis et son activité. Vous trouverez ci-joint le fichier .pdf que vous avez choisi. <br/><br/>Cordialement,<br/>Agaetis</p></body></html>`

export async function send(data: FormInput) {
  const now = new Date()

  const key = Buffer.from(
    data.firstname +
      data.lastname +
      publicRuntimeConfig.NEXT_APP_CONTACT_SALT +
      data.mail +
      data.subject +
      formatContent(data.message, `${data.firstname} ${data.lastname}`, data.mail, data.phone) +
      now.getTime() +
      data.captcha,
    'base64'
  )

  return axios({
    method: 'post',
    url: `${publicRuntimeConfig.NEXT_APP_SITE_URL}/send`,
    headers: {},
    data: {
      firstname: data.firstname,
      lastname: data.lastname,
      mail: data.mail,
      object: data.subject,
      content: formatContent(data.message, `${data.firstname} ${data.lastname}`, data.mail, data.phone),
      date: now.getTime(),
      hash: sha256.sha256(key),
      token: data.captcha,
      attachments: data.attachments,
    },
  })
}

export default async function handleMailSending(
  data: FormInput,
  submittedState: (value: React.SetStateAction<boolean>) => void,
  opennedMessageState: (value: React.SetStateAction<boolean>) => void
) {
  try {
    submittedState(true)
    await send(data)
    opennedMessageState(false)
  } catch {
    opennedMessageState(true)
  }
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
