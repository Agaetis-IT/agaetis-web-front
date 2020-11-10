/* eslint-disable @typescript-eslint/no-var-requires */
import { Request, Response } from 'express'

const axios = require('axios')
const bodyParser = require('body-parser')
const express = require('express')
const { google } = require('googleapis')
const sha = require('js-sha256')
const next = require('next')
const nodemailer = require('nodemailer')
const path = require('path')
const http = require('http')
const logger = require('morgan')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: './src' })
const handle = app.getRequestHandler()
const sha256 = sha.sha256

const oAuth2Client = new google.auth.OAuth2(
  process.env.NEXT_APP_GMAIL_CLIENT_ID,
  process.env.NEXT_APP_GMAIL_CLIENT_SECRET,
  process.env.NEXT_APP_SITE_URL
)

const mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const verifyCaptcha = async (token: string) => {
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.NEXT_APP_RECAPTCHA_SECRET}&response=${token}`
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
    server.use(bodyParser.urlencoded({ extended: true }))
    server.use(bodyParser.json())

    server.get('/robots.txt', (_: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '/', 'robots.txt'))
    })

    server.get('/favicon.ico', (_: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '/', 'symbole-agaetis-p164-rgb.png'))
    })

    server.get('/google80ae36db41235209.html', (_: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '/', 'google80ae36db41235209.html'))
    })

    server.get(/sitemap[a-zA-Z-0-9\/\-_]*.xml/, async (req: Request, res: Response) => {
      const { data } = await axios.get(`${process.env.NEXT_APP_BASE_URL}${req.url}`)
      res.set('Content-Type', 'text/xml')
      res.send(data.replace(new RegExp(process.env.NEXT_APP_BASE_URL!, 'g'), process.env.NEXT_APP_SITE_URL))
    })

    /*
      /:slug : existing ideas url are /:postname, we have to respect this pattern 
    */
    server.get('/:slug', (req: Request, res: Response) => {
      const queryParams = { ...req.params, ...req.query }
      if (
        [
          'solutions',
          'blog',
          'agaetis',
          'jobs',
          'white-papers',
          'contact',
          'cookies',
          'personal-data',
          'mentions-legales',
          'sw.js',
          'offline.html',
          'manifest.json'
        ].includes(queryParams.slug) || !!queryParams.slug.match(/(workbox)|(worker)-.*\.js/)
      ) {
        return handle(req, res)
      } else if (queryParams.slug === 'ideas') {
        res.redirect(301, '/blog')
      }

      return app.render(req, res, '/idea', queryParams)
    })

    server.get('^/[0-9]{4}/[0-9]{2}/[0-9]{2}/:slug', async (req: Request, res: Response) => {
      res.status(301).redirect(`/${req.params.slug}`)
    })

    server.get('/jobs/:slug', (req: Request, res: Response) => {
      app.render(req, res, '/job', { ...req.params, ...req.query })
    })

    server.get('/offers/:slug', (req: Request, res: Response) => {
      app.render(req, res, '/offer', { ...req.params, ...req.query })
    })

    server.get('/white-papers/:slug', (req: Request, res: Response) => {
      app.render(req, res, '/white-paper', { ...req.params, ...req.query })
    })

    server.get('/tags/:slug', (req: Request, res: Response) => {
      app.render(req, res, '/tag', { ...req.params, ...req.query })
    })

    server.post('/send', async (req: Request, res: Response) => {
      oAuth2Client.setCredentials({
        // eslint-disable-next-line @typescript-eslint/camelcase
        refresh_token: process.env.NEXT_APP_GMAIL_REFRESH_TOKEN,
      })
      const captcha = verifyCaptcha(req.body.token)
      const accessToken = oAuth2Client.getAccessToken()

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          type: 'OAuth2',
          user: String(process.env.NEXT_APP_MAIL_ADDRESS),
          clientId: String(process.env.NEXT_APP_GMAIL_CLIENT_ID),
          clientSecret: String(process.env.NEXT_APP_GMAIL_CLIENT_SECRET),
          refreshToken: String(process.env.NEXT_APP_GMAIL_REFRESH_TOKEN),
          accessToken: String(accessToken),
          expires: Date.now() + 3600,
        },
      })

      const message = {
        from: process.env.NEXT_APP_MAIL_ADDRESS,
        to: 'contact@agaetis.fr',
        subject: req.body.object,
        html: req.body.content,
      }

      const key = Buffer.from(
        req.body.name +
          req.body.object +
          process.env.NEXT_APP_CONTACT_SALT +
          req.body.mail +
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
        ['Un projet ?', 'Une candidature ?'].includes(message.subject) &&
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

    server.post('/send/white-paper', (req: Request, res: Response) => {
      oAuth2Client.setCredentials({
        // eslint-disable-next-line @typescript-eslint/camelcase
        refresh_token: process.env.NEXT_APP_GMAIL_REFRESH_TOKEN,
      })

      const captcha = verifyCaptcha(req.body.token)

      const accessToken = oAuth2Client.getAccessToken()

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          type: 'OAuth2',
          user: String(process.env.NEXT_APP_MAIL_ADDRESS),
          clientId: String(process.env.NEXT_APP_GMAIL_CLIENT_ID),
          clientSecret: String(process.env.NEXT_APP_GMAIL_CLIENT_SECRET),
          refreshToken: String(process.env.NEXT_APP_GMAIL_REFRESH_TOKEN),
          accessToken: String(accessToken),
          expires: Date.now() + 3600,
        },
      })

      const message = {
        from: process.env.NEXT_APP_MAIL_ADDRESS,
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
          process.env.NEXT_APP_CONTACT_SALT +
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
        baseUrl === process.env.NEXT_APP_BASE_URL
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
      return handle(req, res)
    })

    http.createServer(server).listen(5000)
  })
  .catch((ex: any) => {
    console.error(ex.stack)
    process.exit(1)
  })
