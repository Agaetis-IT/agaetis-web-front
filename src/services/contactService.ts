import axios from 'axios'
import sha256 from 'js-sha256'

import { FormInput } from '../yup/ContactFormValidation'

const formatContent = (content: string, name: string, mail: string, phone: string) =>
  `<html><body><p>${content}</p><h3>Contact</h3><p>${name}</p><p>${mail}</p><p>${phone}</p></body></html>`

export default async function send(data: FormInput) {
  const now = new Date()

  const key = Buffer.from(
    data.firstname +
      data.lastname +
      process.env.NEXT_PUBLIC_CONTACT_SALT +
      data.mail +
      data.subject +
      formatContent(data.message, `${data.firstname} ${data.lastname}`, data.mail, data.phone) +
      now.getTime() +
      data.captcha,
    'base64'
  )

  await axios({
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/send`,
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
