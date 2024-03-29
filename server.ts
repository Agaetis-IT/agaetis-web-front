/* eslint-disable @typescript-eslint/no-var-requires */
import express, { json, Request, RequestHandler, Response, urlencoded } from 'express'
import { AttachmentContent } from './src/yup/ContactFormValidation'

import axios from 'axios'
import cors from 'cors'
import { google } from 'googleapis'
import http, { ServerResponse } from 'http'
import logger from 'morgan'
import next from 'next'
import nodemailer from 'nodemailer'
import sha from 'js-sha256'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const sha256 = sha.sha256

const oAuth2Client = new google.auth.OAuth2(
  process.env.NEXT_GMAIL_CLIENT_ID,
  process.env.NEXT_GMAIL_CLIENT_SECRET,
  process.env.NEXT_PUBLIC_SITE_URL
)

const mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const verifyCaptcha = async (token: string) => {
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.NEXT_RECAPTCHA_SECRET}&response=${token}`
  const { data } = await axios.get(url)
  return data.success
}

app
  .prepare()
  .then(() => {
    const server = express()
    server.use(
      logger(
        ':date[iso] :req[x-real-ip] :method :url :status :res[content-length] - :response-time ms --- from: :referrer'
      )
    )
    server.use(urlencoded({ extended: true }) as RequestHandler)
    server.use(cors())

    const json10MBParser = json({ limit: '11mb' }) as RequestHandler
    const jsonParser = json() as RequestHandler

    server.get(/sitemap[a-zA-Z-0-9\/\-_]*.xml/, async (req: Request, res: Response) => {
      let { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}${req.url}`)
      res.set('Content-Type', 'text/xml')

      if (req.url.includes('-pt-post-')) {
        data = data.replace(new RegExp(process.env.NEXT_PUBLIC_BASE_URL!, 'g'), `${process.env.NEXT_PUBLIC_SITE_URL}/blogpost`)
      } else {
        data = data.replace(new RegExp(process.env.NEXT_PUBLIC_BASE_URL!, 'g'), process.env.NEXT_PUBLIC_SITE_URL)
      }

      res.send(data)
    })

    server.post('/send', json10MBParser, async (req: Request, res: Response) => {
      oAuth2Client.setCredentials({
        refresh_token: process.env.NEXT_GMAIL_REFRESH_TOKEN,
      })
      const captcha = verifyCaptcha(req.body.token)
      const accessToken = oAuth2Client.getAccessToken()

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          type: 'OAuth2',
          user: String(process.env.NEXT_MAIL_ADDRESS),
          clientId: String(process.env.NEXT_GMAIL_CLIENT_ID),
          clientSecret: String(process.env.NEXT_GMAIL_CLIENT_SECRET),
          refreshToken: String(process.env.NEXT_GMAIL_REFRESH_TOKEN),
          accessToken: String(accessToken),
          expires: Date.now() + 3600,
        },
      })

      const message = {
        from: process.env.NEXT_MAIL_ADDRESS,
        to: process.env.NEXT_MAIL_DEST,
        subject: req.body.object,
        html: req.body.content,
        attachments: req.body.attachments
          ? req.body.attachments.map((attachment: AttachmentContent) => ({
              filename: attachment.fileName,
              path: attachment.content,
            }))
          : [],
      }

      const key = Buffer.from(
        req.body.firstname +
          req.body.lastname +
          process.env.NEXT_PUBLIC_CONTACT_SALT +
          req.body.mail +
          req.body.object +
          req.body.content +
          req.body.date +
          req.body.token,
        'base64'
      )

      if (
        req.body.hash === sha256(key) &&
        captcha &&
        mailRegex.test(message.from!) &&
        mailRegex.test(message.to!) &&
        message.html.length > 0
      ) {
        transporter.sendMail(message, (err: any) => {
          if (err) {
            res.status(500).send()
          } else {
            res.status(200).send()
          }
        })
      } else {
        res.status(400).send()
      }
    })

    server.post('/send/white-paper', jsonParser, (req: Request, res: Response) => {
      oAuth2Client.setCredentials({
        refresh_token: process.env.NEXT_GMAIL_REFRESH_TOKEN,
      })

      const captcha = verifyCaptcha(req.body.token)

      const accessToken = oAuth2Client.getAccessToken()

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          type: 'OAuth2',
          user: String(process.env.NEXT_MAIL_ADDRESS),
          clientId: String(process.env.NEXT_GMAIL_CLIENT_ID),
          clientSecret: String(process.env.NEXT_GMAIL_CLIENT_SECRET),
          refreshToken: String(process.env.NEXT_GMAIL_REFRESH_TOKEN),
          accessToken: String(accessToken),
          expires: Date.now() + 3600,
        },
      })

      const message = {
        from: process.env.NEXT_MAIL_ADDRESS,
        to: req.body.mail,
        subject: req.body.object,
        html: req.body.content,
        attachments: [
          {
            filename: req.body.file.split('/').slice(-1)[0],
            path: req.body.file,
          },
        ],
      }

      const key = Buffer.from(
        req.body.name +
          req.body.object +
          process.env.NEXT_PUBLIC_CONTACT_SALT +
          req.body.mail +
          req.body.content +
          req.body.file +
          req.body.date +
          req.body.token,
        'base64'
      )

      const baseUrl = req.body.file.split('/').slice(0, 3).join('/')

      if (
        req.body.hash === sha256(key) &&
        captcha &&
        mailRegex.test(message.from!) &&
        mailRegex.test(message.to) &&
        message.html.length > 0 &&
        message.attachments[0].filename &&
        message.attachments[0].path &&
        baseUrl === process.env.NEXT_PUBLIC_BASE_URL
      ) {
        transporter.sendMail(message, (err: Error) => {
          if (err) {
            res.status(500).send()
          } else {
            res.status(200).send()
          }
        })
      } else {
        res.status(400).send()
      }
    })

    server.get('*', (req: Request, res: Response) => {
      return handle(req, res as ServerResponse)
    })

    http.createServer(server).listen(5000)
  })
  .catch((ex: any) => {
    console.error(ex.stack)
    process.exit(1)
  })
